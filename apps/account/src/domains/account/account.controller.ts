import { TypedParam, TypedRoute } from '@nestia/core';
import { BadRequestException, Body, Controller, NotFoundException } from '@nestjs/common';

import { AccountService } from './account.service';
import { type AccountDto } from './dto/account.dto';
import { type CreateAccountDto } from './dto/create-account.dto';
import { type HealthResponseDto } from './dto/health-response.dto';
import { type UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @TypedRoute.Get('health')
  health(): HealthResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  @TypedRoute.Post()
  async create(@Body() createAccountDto: CreateAccountDto): Promise<AccountDto> {
    return this.accountService.create(createAccountDto);
  }

  @TypedRoute.Get(':id')
  async findOne(@TypedParam('id') id: string): Promise<AccountDto> {
    // Validate UUID format first
    const uuidRegex = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const account = await this.accountService.findOne(id);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  @TypedRoute.Put(':id')
  async update(@TypedParam('id') id: string, @Body() updateAccountDto: UpdateAccountDto): Promise<AccountDto> {
    // Validate UUID format first
    const uuidRegex = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const account = await this.accountService.update(id, updateAccountDto);
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }
}
