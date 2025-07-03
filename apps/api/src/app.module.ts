import { Module } from '@nestjs/common';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { TypedController } from './typed.controller.js';

@Module({
  controllers: [AppController, TypedController],
  providers: [AppService],
})
export class AppModule {}
