# ESLint 규칙 레퍼런스

## 🏗️ Base Configuration 규칙

### TypeScript 규칙

#### `@typescript-eslint/no-unused-vars`

**목적**: 미사용 변수/매개변수 제거로 코드 정리

```typescript
// ❌ Bad
function processUser(id: string, name: string) {
  // name 미사용
  return getUserById(id);
}

// ✅ Good
function processUser(id: string, _name: string) {
  // _ 접두사로 의도적 미사용 표시
  return getUserById(id);
}
```

#### `@typescript-eslint/consistent-type-imports`

**목적**: 타입 import 일관성으로 번들 크기 최적화

```typescript
// ❌ Bad
import { User } from './user.entity';
const user: User = new User();

// ✅ Good
import { type User } from './user.entity';
const user: User = new User();
```

### Unicorn 핵심 규칙

#### `unicorn/better-regex`

**목적**: 정규식 가독성과 성능 향상

```typescript
// ❌ Bad
const isDigit = /[0-9]/.test(char);

// ✅ Good
const isDigit = /\d/.test(char);
```

#### `unicorn/explicit-length-check`

**목적**: 명확한 길이 검사로 의도 명시

```typescript
// ❌ Bad
if (users.length) {
  // ...
}

// ✅ Good
if (users.length > 0) {
  // ...
}
```

#### `unicorn/prefer-array-find`

**목적**: 적절한 배열 메서드 사용으로 성능 최적화

```typescript
// ❌ Bad
const user = users.filter((u) => u.id === targetId)[0];

// ✅ Good
const user = users.find((u) => u.id === targetId);
```

#### `unicorn/prevent-abbreviations`

**목적**: 코드 가독성 향상 (NestJS 특화 약어 허용)

```typescript
// ✅ 허용되는 NestJS 약어들
interface CreateUserDto {
  // dto 허용
  // ...
}

@Controller('api/users') // api 허용
export class UserController {
  constructor(private readonly authService: AuthService) {} // auth 허용
}
```

### Import 관리 규칙

#### `import-x/order`

**목적**: 일관된 import 순서로 가독성 향상

```typescript
// ✅ Good
import { Injectable } from '@nestjs/common'; // external
import { Repository } from 'typeorm'; // external

import { DatabaseModule } from '../database'; // internal
import { User } from './user.entity'; // sibling
```

#### `import-x/no-cycle`

**목적**: 순환 의존성 방지로 아키텍처 안정성 확보

```typescript
// ❌ Bad
// user.service.ts
import { OrderService } from './order.service';

// order.service.ts
import { UserService } from './user.service'; // 순환 의존성!
```

## 🚀 NestJS Configuration 규칙

### 의존성 주입 검증

#### `@darraghor/nestjs-typed/injectable-should-be-provided`

**목적**: DI 컨테이너 설정 누락 방지

```typescript
// ❌ Bad
@Injectable()
export class UserService {
  // providers 배열에 추가되지 않으면 런타임 에러
}

// user.module.ts에서 providers에 누락된 경우 ESLint가 경고
```

#### `@darraghor/nestjs-typed/param-decorator-name-matches-route-param`

**목적**: 라우트 파라미터와 데코레이터 불일치 방지

```typescript
// ❌ Bad
@Get(':userId')
getUser(@Param('id') id: string) {  // 파라미터 이름 불일치
  // ...
}

// ✅ Good
@Get(':userId')
getUser(@Param('userId') userId: string) {
  // ...
}
```

## 🎯 Nestia 기반 API 개발 접근법

### 왜 OpenAPI 관련 규칙을 제외했는가?

**기존 Swagger 방식 (복잡함)**:

```typescript
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get()
  @ApiOkResponse({
    type: [User],
    description: 'Get all users',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  findAll(@Query('page') page?: number): Promise<User[]> {
    return this.userService.findAll(page);
  }
}

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    description: 'User email',
    format: 'email',
  })
  email: string;
}
```

**Nestia 방식 (간소함)**:

```typescript
@Controller('users')
export class UserController {
  /**
   * Get all users
   *
   * @param page Page number for pagination
   * @returns List of users
   */
  @Get()
  findAll(@Query('page') page?: number): Promise<User[]> {
    return this.userService.findAll(page);
  }

  /**
   * Create a new user
   */
  @Post()
  create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }
}

// TypeScript 인터페이스만으로 충분
export interface CreateUserDto {
  /** User name */
  name: string;

  /** User email */
  email: string;
}
```

### Nestia의 장점

1. **타입 안전성**: TypeScript 컴파일러가 검증
2. **자동 동기화**: 타입 변경 시 API 스펙 자동 업데이트
3. **중복 제거**: 데코레이터와 타입 정의 분리 불필요
4. **성능**: 런타임 리플렉션 없이 컴파일 타임 생성
5. **클라이언트 SDK**: 자동 생성되는 타입 안전한 클라이언트

### 테스트 파일 특별 규칙

테스트 파일(`*.spec.ts`, `*.e2e-spec.ts`)에서는 다음 규칙들이 완화됩니다:

```typescript
// 테스트 파일에서 허용
describe('UserController', () => {
  let controller: UserController;
  let service: any; // @typescript-eslint/no-explicit-any 허용

  // 단순한 테스트 로직에 집중
  it('should return users', () => {
    // 테스트 로직
  });
});
```

## 🚫 의도적으로 제외된 규칙들

### OpenAPI/Swagger 관련 규칙들 (Nestia 사용으로 불필요)

- `@darraghor/nestjs-typed/controllers-should-supply-api-tags`: Nestia가 자동 생성
- `@darraghor/nestjs-typed/api-method-should-specify-api-response`: 타입으로 충분
- `@darraghor/nestjs-typed/api-property-matches-property-optionality`: 타입 기반 검증
- `@darraghor/nestjs-typed/api-enum-property-best-practices`: TypeScript enum 사용
- `@darraghor/nestjs-typed/api-property-returning-array-should-set-array`: 타입으로 명확

### 과도한 Unicorn 규칙들

- `unicorn/no-array-for-each`: NestJS에서 forEach 자주 사용
- `unicorn/prefer-top-level-await`: 서버 애플리케이션 특성상 부적합
- `unicorn/no-nested-ternary`: 가독성 vs 표현력 트레이드오프
- 30+ DOM 관련 규칙들: 서버 사이드에서 불필요

### 과도한 Perfectionist 규칙들

- `perfectionist/sort-objects`: 객체 정렬 강제는 개발 흐름 방해
- `perfectionist/sort-exports`: export 순서는 개발자 재량
- 복잡한 그룹핑 규칙들: 실용성 부족

## ⚙️ 설정 커스터마이징

### 프로젝트별 override

```javascript
// apps/api/eslint.config.js
export default [
  ...nestConfig,
  {
    files: ['**/*.ts'],
    rules: {
      // 프로젝트별 추가 규칙
      'no-console': 'off', // 개발 환경에서 console 허용
    },
  },
];
```

### 규칙 비활성화

```typescript
// 특정 줄에서만 비활성화
// eslint-disable-next-line @darraghor/nestjs-typed/injectable-should-be-provided
@Injectable()
export class SpecialService {
  // 특별한 경우
}

// 파일 전체 비활성화
/* eslint-disable @darraghor/nestjs-typed/param-decorator-name-matches-route-param */
```

### Nestia 설정 예시

```typescript
// nestia.config.ts
import { INestiaConfig } from '@nestia/sdk';

export const config: INestiaConfig = {
  input: './src/**/*.controller.ts',
  output: './src/api',
  distribute: './packages/api',
  swagger: {
    output: './swagger.json',
    security: {
      bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
};
```

---

## 📚 참고 자료

- [ESLint Official Docs](https://eslint.org/docs/latest/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [NestJS Typed Plugin](https://github.com/darraghoriordan/eslint-plugin-nestjs-typed)
- [Nestia Documentation](https://nestia.io/)
- [Unicorn Plugin](https://github.com/sindresorhus/eslint-plugin-unicorn)
- [Import X Plugin](https://github.com/un-es/eslint-plugin-import-x)
