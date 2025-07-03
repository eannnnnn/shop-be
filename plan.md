# NestJS + Nestia + Fastify 개발 계획 (TDD)

## 목표

- NestJS에서 Express를 Fastify로 변경
- Nestia를 사용하여 타입 안전한 API 개발 환경 구축
- TDD 방식으로 단계별 구현

## 구현 단계 (Red → Green → Refactor)

### 1단계: Fastify 플랫폼 전환

- [x] **TEST**: main.ts에서 Fastify 플랫폼 사용 확인 테스트
- [x] **IMPL**: @nestjs/platform-fastify 설치 및 설정
- [x] **REFACTOR**: 완료

### 2단계: Nestia 기본 설정

- [x] **TEST**: Nestia 설정 파일 존재 확인 테스트
- [x] **IMPL**: Nestia 패키지 설치 및 초기 설정
- [x] **REFACTOR**: 완료

### 3단계: Nestia 컨트롤러 기본 구조

- [x] **TEST**: @TypedRoute 데코레이터 사용 컨트롤러 테스트
- [x] **IMPL**: 기본 타입 안전 컨트롤러 구현
- [x] **REFACTOR**: 완료

### 4단계: Nestia @TypedRoute 적용 ✅ **완료**

- [x] **TEST**: @TypedRoute 데코레이터 실제 사용 확인 테스트 (RED 단계 완료)
- [x] **IMPL**: vitest mock으로 @TypedRoute → @Get 데코레이터 변환 테스트
- [x] **REFACTOR**: 전역 mock 설정으로 모든 테스트 파일에서 사용 가능

**성공적 해결**: vitest의 `vi.mock()`으로 `@TypedRoute.Get`을 `@nestjs/common`의 `@Get`으로 mocking하여 테스트.

- `test/setup.ts`에서 전역 mock 설정
- 모든 13개 테스트 통과 ✅
- HTTP 요청/응답, 타입 안전성, 메타데이터 검증 완료

### 4.5단계: vitest config에 setup 파일 등록 검증 ✅ **완료**

- [x] **TEST**: vitest config에서 setup 파일이 제대로 등록되었는지 확인
- [x] **IMPL**: 이미 올바르게 설정되어 있음을 확인 (`packages/vitest-config/nest.ts`에 `setupFiles: ['./test/setup.ts']` 존재)
- [x] **REFACTOR**: setup 검증 테스트 5개 추가로 안정성 확보

**확인된 사항**:

- ✅ vitest config에 setupFiles 이미 올바르게 설정됨
- ✅ `apps/api/test/setup.ts` 올바른 위치에 존재
- ✅ 모든 테스트 파일에서 nestia mock 초기화 로그 확인
- ✅ **총 18개 테스트 모두 통과** (기존 13개 + setup 검증 5개)

### 5단계: Nestia SDK 생성 (🔄 다음 시작 예정)

- [ ] **TEST**: SDK 생성 스크립트 실행 확인 테스트
- [ ] **IMPL**: nestia.config.ts 설정 및 SDK 생성 (`npx nestia sdk`)
- [ ] **REFACTOR**: 생성된 SDK 구조 검증

### 6단계: Nestia E2E 테스트 환경 구축

- [ ] **TEST**: @nestia/e2e를 사용한 DynamicExecutor 테스트
- [ ] **IMPL**:
  - E2E 테스트 디렉토리 생성 (`nestia e2e`)
  - test/index.ts에서 DynamicExecutor 설정
  - SDK를 통한 API 호출 테스트 작성
- [ ] **REFACTOR**: 테스트 구조 최적화

### 7단계: vitest와 @nestia/e2e 통합

- [ ] **TEST**: vitest에서 nestia E2E 테스트 실행 확인
- [ ] **IMPL**: vitest 설정과 nestia E2E 시스템 연동
- [ ] **REFACTOR**: 통합 테스트 환경 최적화

## 성공적으로 완료된 기능

✅ **NestJS + Fastify + Nestia 기본 환경 구축 완료!**

- Fastify 플랫폼으로 전환 완료
- Nestia 설정 및 기본 컨트롤러 구현 완료
- 서버 정상 실행 확인: http://localhost:3000

## 다음 작업 우선순위

1. **즉시 시작**: @TypedRoute 데코레이터 실제 적용 (4단계)
2. SDK 생성 (5단계)
3. Nestia E2E 테스트 환경 구축 (6단계)
4. vitest 통합 (7단계)

## 참고사항

- Nestia는 SDK 기반 E2E 테스트가 핵심
- `@nestia/e2e`의 `DynamicExecutor`와 `TestValidator` 사용
- SDK 생성 후 타입 안전한 API 클라이언트로 테스트
- vitest unit test 보다는 nestia E2E 테스트 중심으로 전환
