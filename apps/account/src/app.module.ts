import { Module } from '@nestjs/common';

import { AccountModule } from './domains/account/account.module.js';

@Module({
  imports: [AccountModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
