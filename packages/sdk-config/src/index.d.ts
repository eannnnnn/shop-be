import { SdkConfig } from './types';

export class SdkConfigurator {
  constructor(configPath?: string);
  loadConfig(): SdkConfig | null;
  configureSdk(sdkName: string, options?: { packagePath?: string }): {
    success: boolean;
    packageName: string;
    packagePath: string;
  };
  listSdks(): Array<{
    key: string;
    name: string;
    description: string;
  }>;
}

export { SdkConfig, SdkPackageConfig, SdkDefaults } from './types';