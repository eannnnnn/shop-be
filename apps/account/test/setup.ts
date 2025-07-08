import { Delete, Get, Patch, Post, Put } from '@nestjs/common';
import 'reflect-metadata';
import { vi } from 'vitest';

// NestJS 테스트 환경을 위한 글로벌 설정

// @nestia/core를 @nestjs/common 데코레이터로 전역 mocking
vi.mock('@nestia/core', () => ({
  TypedRoute: {
    Get: (path?: string) => Get(path),
    Post: (path?: string) => Post(path),
    Put: (path?: string) => Put(path),
    Delete: (path?: string) => Delete(path),
    Patch: (path?: string) => Patch(path),
  },
  TypedBody: () => (_target: any, _propertyKey?: string, _parameterIndex?: number) => {
    // @Body() 데코레이터와 같은 기능
    return _target;
  },
  TypedParam: (_property?: string) => (_target: any, _propertyKey?: string, _parameterIndex?: number) => {
    // @Param() 데코레이터와 같은 기능
    return _target;
  },
  TypedQuery: () => (_target: any, _propertyKey?: string, _parameterIndex?: number) => {
    // @Query() 데코레이터와 같은 기능
    return _target;
  },
}));

console.log('🔧 Nestia mocks initialized for vitest testing');
