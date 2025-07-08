/**
 * Health check response DTO
 */
export interface HealthResponseDto {
  /**
   * Status of the service
   */
  status: string;
  
  /**
   * Timestamp of the health check
   */
  timestamp: string;
}