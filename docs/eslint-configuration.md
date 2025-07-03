# ESLint 설정 철학과 근거

## 🎯 기본 철학

본 프로젝트의 ESLint 설정은 **"실용적 완벽주의"**를 추구합니다. 코드의 완벽함보다는 **실제 개발에서 문제가 되는 버그를 방지하고, NestJS 생태계에서 권장하는 패턴을 자연스럽게 따르도록** 돕는 것에 초점을 맞췄습니다.

### 핵심 가치

- **🛡️ 버그 방지 우선**: 런타임 에러를 일으킬 수 있는 패턴을 사전 차단
- **🚀 개발 속도**: 과도한 제약 없이 빠른 개발 지원
- **🎯 목적 지향**: NestJS와 TypeScript의 강점을 최대한 활용
- **👥 팀 협업**: 일관된 코드 스타일로 코드 리뷰 효율성 증대

## 🏗️ 설정 구조와 근거

### 1. Base Configuration 철학

#### 왜 TypeScript 중심인가?

```javascript
// TypeScript 전용 규칙들
'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }]
```

**근거**: NestJS는 TypeScript First 프레임워크입니다. 타입 안전성이 곧 런타임 안정성으로 직결되므로, TypeScript의 강점을 최대한 활용하는 것이 핵심입니다.

#### 왜 Unicorn 규칙을 선별적으로 적용하는가?

**선택된 규칙들의 공통점**:

```javascript
'unicorn/better-regex': 'error',           // 정규식 실수 방지
'unicorn/explicit-length-check': 'error',  // 의도 명확화
'unicorn/prefer-array-find': 'error',      // 성능과 의도 명확화
'unicorn/no-unnecessary-await': 'error',   // 성능 최적화
```

**근거**: 이 규칙들은 모두 **"실제 버그나 성능 문제를 일으킬 수 있는 패턴"**을 다룹니다. 단순한 코드 스타일이 아닌, 실질적인 문제 해결에 초점을 맞췄습니다.

**제외된 규칙들의 이유**:

```javascript
// 제외: 'unicorn/no-array-for-each'
// 이유: NestJS에서 forEach는 자연스러운 패턴 (DI, 미들웨어 등)

// 제외: 'unicorn/prefer-top-level-await'
// 이유: 서버 애플리케이션에서는 부적절한 패턴
```

#### 왜 Import 순서를 강제하는가?

```javascript
'import-x/order': [
  'error',
  {
    groups: ['builtin', 'external', 'internal', 'parent', 'sibling'],
    'newlines-between': 'always',
  }
]
```

**근거**: NestJS 프로젝트는 의존성이 복잡합니다. 일관된 import 순서는:

- **코드 리뷰 시 변경사항 파악 용이**
- **순환 의존성 조기 발견**
- **모듈 구조 이해 도움**

#### 왜 Perfectionist를 최소한으로 사용하는가?

```javascript
// 사용: sort-imports, sort-named-imports만
// 제외: sort-objects, sort-exports 등
```

**근거**: 과도한 정렬 강제는 **개발 흐름을 방해**합니다. import 정렬은 도구가 자동으로 할 수 있지만, 객체나 export 정렬은 **개발자의 논리적 의도**를 해칠 수 있습니다.

### 2. NestJS Configuration 철학

#### 왜 NestJS 전용 플러그인이 필요한가?

**1. 의존성 주입 검증**

```javascript
'@darraghor/nestjs-typed/injectable-should-be-provided': 'error'
```

**근거**: NestJS의 DI는 런타임에 해결됩니다. 컴파일 타임에는 문제를 발견할 수 없어 실제 서버 구동 시 에러가 발생합니다. 이를 사전에 방지하는 것이 중요합니다.

**2. 파라미터 매칭 검증**

```javascript
'@darraghor/nestjs-typed/param-decorator-name-matches-route-param': 'error'
```

**근거**: NestJS에서 가장 흔한 실수 중 하나입니다. 라우트 `:userId`와 `@Param('id')` 불일치는 런타임에만 발견되는 치명적 버그입니다.

#### 왜 OpenAPI/Swagger 관련 규칙을 제외했는가?

**제외된 규칙들**:

```javascript
'@darraghor/nestjs-typed/controllers-should-supply-api-tags': 'off'
'@darraghor/nestjs-typed/api-method-should-specify-api-response': 'off'
'@darraghor/nestjs-typed/api-property-matches-property-optionality': 'off'
```

**근거**:

- **Nestia 사용**: TypeScript 타입만으로 OpenAPI 스펙 자동 생성
- **코드 간소화**: 별도 데코레이터 없이도 완벽한 API 문서화
- **타입 안전성**: TypeScript 타입과 API 스펙의 완벽한 동기화
- **개발 효율성**: 중복 작업 제거 (타입 정의 = API 스펙)

#### 왜 NestJS 특화 약어를 허용하는가?

```javascript
allowList: {
  dto: true,    // Data Transfer Object
  api: true,    // Application Programming Interface
  auth: true,   // Authentication
  jwt: true,    // JSON Web Token
  orm: true,    // Object-Relational Mapping
}
```

**근거**:

- **도메인 특화 언어**: NestJS 생태계에서는 표준 용어들
- **개발 효율성**: `createUserDto` vs `createUserDataTransferObject`의 실용성
- **커뮤니티 관례**: NestJS 공식 문서와 예제에서 사용하는 패턴

#### 왜 경고(warning)와 에러(error)를 구분하는가?

**에러로 분류한 규칙들**:

- 런타임 크래시를 일으킬 수 있는 패턴
- 보안 취약점을 만들 수 있는 패턴
- 타입 안전성을 해치는 패턴

**경고로 분류한 규칙들**:

- 코드 품질을 높이지만 당장 문제가 되지 않는 패턴
- ~~API 문서화 관련~~ (Nestia 사용으로 불필요)

**근거**: **개발 중단 없는 점진적 개선**을 위해서입니다. 에러는 빌드를 막아 즉시 수정을 강제하지만, 경고는 개발 흐름을 방해하지 않으면서도 개선 포인트를 알려줍니다.

## 🔍 실제 적용 사례로 보는 철학

### Nestia 기반 개발 흐름

```typescript
// 기존 Swagger 방식 (불필요)
@ApiTags('users')
@Controller('users')
export class UserController {
  @Get()
  @ApiOkResponse({ type: [User] })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}

// Nestia 방식 (권장)
@Controller('users')
export class UserController {
  @Get()
  findAll(): Promise<User[]> {
    // 타입만으로 OpenAPI 스펙 자동 생성
    return this.userService.findAll();
  }
}
```

**근거**:

- **중복 제거**: 타입 정의와 API 스펙이 하나로 통합
- **일관성 보장**: TypeScript 컴파일러가 타입 안전성 검증
- **자동 동기화**: 타입 변경 시 API 스펙 자동 업데이트

### 현재 프로젝트 린트 결과 분석

```bash
# Nestia 적용 후 예상 결과
✖ 2 problems (0 errors, 2 warnings)  # OpenAPI 관련 경고 제거됨
```

**이 결과가 의미하는 것**:

- **0개 에러**: 코드가 정상 동작하며 빌드에 문제없음
- **적은 경고**: OpenAPI 관련 불필요한 경고 제거로 노이즈 감소
- **집중도 향상**: 실제 중요한 이슈에만 집중 가능

## 🎯 설정 철학의 검증

### 1. 버그 방지 효과

- **의존성 주입 오류**: 컴파일 타임 감지로 런타임 크래시 방지
- **API 파라미터 불일치**: 개발 단계에서 조기 발견
- **타입 안전성**: TypeScript + Nestia 조합으로 완벽한 타입-API 동기화

### 2. 개발 생산성

- **자동 수정 가능**: 대부분 규칙이 `--fix` 옵션 지원
- **학습 곡선 완만**: 복잡한 규칙보다 직관적 규칙 우선
- **개발 흐름 비방해**: 과도한 제약 없는 실용적 접근
- **API 문서화 자동화**: Nestia로 타입만 작성하면 문서 자동 생성

### 3. NestJS + Nestia 생태계 적합성

- **데코레이터 패턴 지원**: NestJS 핵심 패러다임 존중
- **DI 컨테이너 활용**: 의존성 주입 패턴 최적화
- **Type-First API 개발**: TypeScript 타입 중심의 현대적 개발 방식

## 🔮 설정 철학의 지속성

### 왜 이 철학이 지속 가능한가?

**1. 기술 트렌드 적합성**

- TypeScript First: 타입 안전성은 계속 중요해질 것
- Type-First API: Nestia, tRPC 등 타입 중심 API 도구 확산
- 자동화 도구: ESLint, Prettier 등 도구 생태계 성숙

**2. 팀 확장성**

- 명확한 기준: 새로운 팀원도 쉽게 이해
- 자동화된 검증: 휴먼 에러 최소화
- 점진적 학습: 에러→경고 단계별 적용
- 타입 중심 개발: 타입만 알면 API 스펙 자동 이해

**3. 프로젝트 성장 대응**

- 확장 가능한 설정: 필요시 규칙 추가 용이
- 성능 고려: 린트 시간 최적화
- 유지보수성: 복잡하지 않은 설정 구조
- API 진화 대응: 타입 변경만으로 API 스펙 자동 업데이트

---

## 💡 결론: 실용적 완벽주의

본 ESLint 설정은 **"Perfect is the enemy of good"** 철학을 바탕으로 합니다.

완벽한 코드보다는 **동작하는 코드, 유지보수 가능한 코드, 팀이 함께 만들어갈 수 있는 코드**를 우선시합니다.

**핵심은**:

- 🛡️ **실제 문제가 되는 것만** 강제
- 🚀 **개발 속도를 해치지 않으면서** 품질 향상
- 🎯 **NestJS + Nestia 생태계에 특화된** 실용적 접근
- �� **팀 전체가 이해하고 따를 수 있는** 명확한 기준
- ⚡ **타입 중심 개발**로 코드와 문서의 완벽한 동기화

이를 통해 **개발자 경험(DX)과 코드 품질을 동시에 달성**하는 것이 우리 ESLint 설정의 궁극적 목표입니다.
