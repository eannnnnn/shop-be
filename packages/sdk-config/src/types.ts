export interface SdkPackageConfig {
  /**
   * Package name (e.g., @shop-be/account-sdk)
   * Optional - auto-generated from service package.json if not provided
   */
  name?: string;
  
  /**
   * Package description
   * Optional - auto-generated from service name if not provided
   */
  description?: string;
  
  /**
   * Source app directory (e.g., apps/account)
   * Optional - auto-detected from service path if not provided
   */
  source?: string;
  
  /**
   * Package version (optional, defaults to 0.1.0)
   */
  version?: string;
  
  /**
   * Package keywords for npm
   */
  keywords?: string[];
  
  /**
   * Author information (overrides global default)
   */
  author?: string;
  
  /**
   * License (overrides global default)
   */
  license?: string;
  
  /**
   * Repository URL (overrides global default)
   */
  repository?: string;
  
  /**
   * Custom package.json fields
   */
  custom?: {
    homepage?: string;
    bugs?: {
      url?: string;
      email?: string;
    };
    engines?: Record<string, string>;
    [key: string]: any;
  };
}

export interface SdkDefaults {
  /**
   * Default author for all SDK packages
   */
  author: string;
  
  /**
   * Default repository URL
   */
  repository: string;
  
  /**
   * Default license
   */
  license: string;
}

export interface SdkConfig {
  /**
   * SDK package configurations
   */
  packages: Record<string, SdkPackageConfig>;
  
  /**
   * Default values for all SDK packages
   */
  defaults: SdkDefaults;
}