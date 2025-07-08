import { Injectable } from '@nestjs/common';

import { type AccountDto } from './dto/account.dto';
import { type CreateAccountDto } from './dto/create-account.dto';
import { type UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountService {
  private readonly accounts: AccountDto[] = [];

  private generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (character) => {
      const random = Math.random() * 16 | 0;
      const value = character === 'x' ? random : (random & 0x3 | 0x8);
      return value.toString(16);
    });
  }

  private isValidUUID(id: string): boolean {
    const uuidRegex = /^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i;
    return uuidRegex.test(id);
  }

  async create(createAccountDto: CreateAccountDto): Promise<AccountDto> {
    const now = new Date().toISOString();
    const account: AccountDto = {
      id: this.generateUUID(),
      ...createAccountDto,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    };

    this.accounts.push(account);
    return account;
  }

  async findAll(): Promise<AccountDto[]> {
    return [...this.accounts];
  }

  async findOne(id: string): Promise<AccountDto | null> {
    if (!this.isValidUUID(id)) {
      return null;
    }

    const account = this.accounts.find(account => account.id === id);
    return account || null;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<AccountDto | null> {
    if (!this.isValidUUID(id)) {
      return null;
    }

    const accountIndex = this.accounts.findIndex(account => account.id === id);
    
    if (accountIndex === -1) {
      return null;
    }

    const updatedAccount: AccountDto = {
      ...this.accounts[accountIndex]!,
      ...updateAccountDto,
      updatedAt: new Date().toISOString(),
    };

    this.accounts[accountIndex] = updatedAccount;
    return updatedAccount;
  }

  async remove(id: string): Promise<boolean> {
    if (!this.isValidUUID(id)) {
      return false;
    }

    const accountIndex = this.accounts.findIndex(account => account.id === id);
    
    if (accountIndex === -1) {
      return false;
    }

    this.accounts.splice(accountIndex, 1);
    return true;
  }
}
