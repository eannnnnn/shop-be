import { TypedRoute } from '@nestia/core';
import { Controller } from '@nestjs/common';

export interface HelloResponse {
  message: string;
  timestamp: number;
}

@Controller('typed')
export class TypedController {
  /**
   * Hello World API with typed response
   *
   * @returns Typed hello message with timestamp
   */
  @TypedRoute.Get('hello')
  async getHello(): Promise<HelloResponse> {
    return {
      message: 'Hello from Nestia + Fastify!',
      timestamp: Date.now(),
    };
  }
}
