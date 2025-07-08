#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const { SdkConfigurator } = require('./index');

program
  .name('sdk-config')
  .description('Configure SDK packages for Nestia')
  .version('0.0.1');

program
  .command('configure')
  .description('Configure SDK package.json with predefined settings')
  .option('-p, --path <path>', 'Path to package.json directory', '.')
  .option('-c, --config <config>', 'Path to sdk.config.ts/.js/.cjs file')
  .option('-s, --service <service>', 'Path to service directory (for auto-detection)')
  .action((options) => {
    try {
      const configurator = new SdkConfigurator(options.config);
      
      const result = configurator.configureSdk({
        packagePath: path.join(options.path, 'package.json'),
        servicePath: options.service
      });
      
      console.log(chalk.green('✅ Configuration successful!'));
      console.log(chalk.gray(`   Package: ${result.packageName}`));
      console.log(chalk.gray(`   Path: ${result.packagePath}`));
    } catch (error) {
      console.error(chalk.red(`❌ ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('auto-configure [service-path]')
  .description('Auto-configure SDK from nestia.config.ts and sdk.config.ts')
  .action((servicePath) => {
    try {
      const cwd = process.cwd();
      let resolvedServicePath;
      
      if (servicePath) {
        // If service path is provided
        resolvedServicePath = path.resolve(servicePath);
      } else {
        // Auto-detect service path
        // When run via pnpm filter, we need to check multiple locations
        
        // First check if we're in SDK package directory
        if (cwd.includes('packages') && cwd.includes('-sdk')) {
          // We're in SDK package, go up to find the service
          resolvedServicePath = path.resolve(cwd, '../..');
        } else if (fs.existsSync(path.join(cwd, 'nestia.config.ts'))) {
          // We're in service directory
          resolvedServicePath = cwd;
        } else {
          // Try to find service directories in common locations
          const repoRoot = path.resolve(cwd, '../..');
          const appsDir = path.join(repoRoot, 'apps');
          
          if (fs.existsSync(appsDir)) {
            // Look for service directories with nestia.config.ts
            const serviceDirs = fs.readdirSync(appsDir)
              .map(dir => path.join(appsDir, dir))
              .filter(dir => fs.statSync(dir).isDirectory() && fs.existsSync(path.join(dir, 'nestia.config.ts')));
            
            if (serviceDirs.length === 1) {
              // If only one service found, use it
              resolvedServicePath = serviceDirs[0];
            } else if (serviceDirs.length > 1) {
              // Multiple services found, try to match by naming convention
              const currentDirName = path.basename(cwd);
              const matchingService = serviceDirs.find(dir => 
                path.basename(dir) === currentDirName.replace('-sdk', '') ||
                path.basename(dir) === currentDirName.replace('sdk-config', 'account')
              );
              
              if (matchingService) {
                resolvedServicePath = matchingService;
              } else {
                // Default to account service for now
                const accountService = serviceDirs.find(dir => path.basename(dir) === 'account');
                if (accountService) {
                  resolvedServicePath = accountService;
                } else {
                  throw new Error(`Multiple services found but could not determine which one to use: ${serviceDirs.map(d => path.basename(d)).join(', ')}`);
                }
              }
            } else {
              throw new Error('No service directories with nestia.config.ts found in apps/ directory.');
            }
          } else {
            throw new Error('Could not auto-detect service directory. Please provide service path or run from service directory.');
          }
        }
      }
      
      const configurator = new SdkConfigurator();
      
      // Try to detect SDK package path from nestia config
      const sdkPackagePath = configurator.autoDetectFromNestia(resolvedServicePath);
      if (!sdkPackagePath) {
        throw new Error('Could not detect SDK package path from nestia.config.ts. Please ensure distribute is configured.');
      }
      
      console.log(chalk.gray(`Detected service: ${resolvedServicePath}`));
      console.log(chalk.gray(`Detected SDK package: ${sdkPackagePath}`));
      
      const result = configurator.configureSdk({
        packagePath: path.join(sdkPackagePath, 'package.json'),
        servicePath: resolvedServicePath
      });
      
      console.log(chalk.green('✅ Auto-configuration successful!'));
      console.log(chalk.gray(`   Package: ${result.packageName}`));
      console.log(chalk.gray(`   Path: ${result.packagePath}`));
    } catch (error) {
      console.error(chalk.red(`❌ ${error.message}`));
      process.exit(1);
    }
  });

program
  .command('list')
  .description('List all available SDK configurations')
  .option('-c, --config <config>', 'Path to sdk.config.json')
  .action((options) => {
    try {
      const configurator = new SdkConfigurator(options.config);
      const sdks = configurator.listSdks();
      
      if (sdks.length === 0) {
        console.log(chalk.yellow('No SDK configurations found'));
        return;
      }
      
      console.log(chalk.bold('\nAvailable SDK Configurations:'));
      console.log(chalk.gray('─'.repeat(60)));
      
      sdks.forEach(sdk => {
        console.log(`${chalk.cyan(sdk.key.padEnd(20))} ${chalk.white(sdk.name.padEnd(30))} ${chalk.gray(sdk.description || '')}`);
      });
      
      console.log(chalk.gray('─'.repeat(60)));
      console.log(chalk.gray(`\nTotal: ${sdks.length} SDK(s)`));
    } catch (error) {
      console.error(chalk.red(`❌ ${error.message}`));
      process.exit(1);
    }
  });

// Custom SDK configuration
program
  .command('set <sdk-name>')
  .description('Manually set SDK package configuration')
  .requiredOption('-n, --name <name>', 'Package name')
  .option('-d, --description <description>', 'Package description')
  .option('-p, --path <path>', 'Path to package.json', '.')
  .action((sdkName, options) => {
    try {
      const packageJsonPath = path.join(options.path, 'package.json');
      const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      pkg.name = options.name;
      if (options.description) {
        pkg.description = options.description;
      }
      
      fs.writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2) + '\n');
      
      console.log(chalk.green('✅ Package configuration updated!'));
      console.log(chalk.gray(`   Name: ${options.name}`));
      if (options.description) {
        console.log(chalk.gray(`   Description: ${options.description}`));
      }
    } catch (error) {
      console.error(chalk.red(`❌ ${error.message}`));
      process.exit(1);
    }
  });

program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}