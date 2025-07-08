/**
 * Data transfer object for updating an existing account
 * @format email
 * @minLength username 3
 * @maxLength username 50
 * @minLength firstName 1
 * @maxLength firstName 100
 * @minLength lastName 1
 * @maxLength lastName 100
 */
export interface UpdateAccountDto {
  /**
   * Email address of the account holder
   */
  email?: string;
  
  /**
   * Username for the account
   */
  username?: string;
  
  /**
   * First name of the account holder
   */
  firstName?: string;
  
  /**
   * Last name of the account holder
   */
  lastName?: string;
  
  /**
   * Whether the account is active
   */
  isActive?: boolean;
}