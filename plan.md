# Account Service SDK Generation Plan

## Overview
This plan outlines the Test-Driven Development (TDD) approach for generating a Nestia SDK from the @apps/account service and distributing it as a shared package in the monorepo.

## Current Status
-  Nestia configuration complete in `apps/account/nestia.config.ts`
-  TypeScript configuration with Nestia transformers ready
-  Package scripts for SDK generation available
- � Controllers need to be created
- � SDK generation and distribution pending

## Phase 1: Controller Foundation (TDD)

### Test 1.1: shouldCreateAccountController ✅
- **Goal**: Create a basic AccountController with health check endpoint
- **Test**: Unit test for controller instantiation and health endpoint
- **Implementation**: Create `src/account/account.controller.ts` with `@Controller('account')` and `@Get('health')` endpoint
- **Expected**: Controller responds with basic health status

### Test 1.2: shouldHaveTypedRouteDecorator ✅
- **Goal**: Replace @Get with @TypedRoute.Get for Nestia integration
- **Test**: Verify the controller uses @TypedRoute decorators
- **Implementation**: Update health endpoint to use `@TypedRoute.Get('health')`
- **Expected**: Controller works with Nestia's type-safe routing

### Test 1.3: shouldReturnTypedResponse ✅
- **Goal**: Define proper response types for SDK generation
- **Test**: Verify health endpoint returns typed response
- **Implementation**: Create DTO interface for health response
- **Expected**: Response follows defined type structure

## Phase 2: SDK Generation (TDD)

### Test 2.1: shouldGenerateLocalSDK ✅
- **Goal**: Generate SDK in `src/api` directory
- **Test**: Run `pnpm nestia:build` and verify local SDK generation
- **Implementation**: Execute SDK generation command
- **Expected**: `src/api` directory contains functional SDK code

### Test 2.2: shouldGenerateDistributedPackage ✅
- **Goal**: Generate distributed SDK package in `packages/api-sdk`
- **Test**: Verify `packages/api-sdk` directory is created with proper structure
- **Implementation**: Verify distributed package generation
- **Expected**: Complete package structure with package.json, lib/, and TypeScript files

### Test 2.3: shouldHaveValidPackageJson ✅
- **Goal**: Validate generated package.json configuration
- **Test**: Verify package.json has correct name, dependencies, and scripts
- **Implementation**: Check package metadata and dependencies
- **Expected**: Package named `@shop-be/api-sdk` with proper configuration

## Phase 3: Account Service Features (TDD)

### Test 3.1: shouldCreateAccountDTO ✅
- **Goal**: Create Account data transfer object
- **Test**: Unit test for Account DTO with validation
- **Implementation**: Create `src/account/dto/account.dto.ts` with Typia validation
- **Expected**: DTO with proper type definitions and validation rules

### Test 3.2: shouldCreateAccountService ✅
- **Goal**: Create AccountService with business logic
- **Test**: Unit test for AccountService methods
- **Implementation**: Create `src/account/account.service.ts` with CRUD operations
- **Expected**: Service handles account operations with proper error handling

### Test 3.3: shouldImplementCreateAccountEndpoint ✅
- **Goal**: Add POST endpoint for account creation
- **Test**: E2E test for account creation via HTTP
- **Implementation**: Add `@TypedRoute.Post()` endpoint with validation
- **Expected**: Endpoint creates account and returns typed response

### Test 3.4: shouldImplementGetAccountEndpoint ✅
- **Goal**: Add GET endpoint for account retrieval
- **Test**: E2E test for account retrieval via HTTP
- **Implementation**: Add `@TypedRoute.Get(':id')` endpoint
- **Expected**: Endpoint returns account data with proper typing

### Test 3.5: shouldImplementUpdateAccountEndpoint
- **Goal**: Add PUT endpoint for account updates
- **Test**: E2E test for account modification via HTTP
- **Implementation**: Add `@TypedRoute.Put(':id')` endpoint
- **Expected**: Endpoint updates account and returns confirmation

### Test 3.6: shouldImplementDeleteAccountEndpoint
- **Goal**: Add DELETE endpoint for account removal
- **Test**: E2E test for account deletion via HTTP
- **Implementation**: Add `@TypedRoute.Delete(':id')` endpoint
- **Expected**: Endpoint removes account and returns confirmation

## Phase 4: SDK Integration (TDD)

### Test 4.1: shouldRegenerateSDKWithAllEndpoints
- **Goal**: Regenerate SDK with all new endpoints
- **Test**: Verify SDK contains all CRUD operations
- **Implementation**: Run `pnpm nestia:build` after adding all endpoints
- **Expected**: SDK includes type-safe functions for all operations

### Test 4.2: shouldHaveTypedSDKFunctions
- **Goal**: Verify SDK functions are properly typed
- **Test**: Import and test SDK functions in separate test file
- **Implementation**: Test each generated SDK function
- **Expected**: All functions have proper TypeScript types and runtime validation

### Test 4.3: shouldIntegrateWithOtherServices
- **Goal**: Test SDK usage in external services
- **Test**: Create example service that uses the generated SDK
- **Implementation**: Import and use SDK in mock external service
- **Expected**: SDK works seamlessly across service boundaries

## Phase 5: Documentation and Swagger (TDD)

### Test 5.1: shouldGenerateSwaggerDocumentation
- **Goal**: Generate OpenAPI documentation
- **Test**: Run `pnpm nestia:swagger` and verify output
- **Implementation**: Generate swagger.json file
- **Expected**: Complete OpenAPI specification with all endpoints

### Test 5.2: shouldHaveValidSwaggerSchema
- **Goal**: Validate generated Swagger schema
- **Test**: Verify schema contains all endpoints and DTOs
- **Implementation**: Parse and validate swagger.json
- **Expected**: Schema includes all endpoints with proper type definitions

### Test 5.3: shouldServeSwaggerUI
- **Goal**: Serve Swagger UI for API documentation
- **Test**: Access Swagger UI via HTTP endpoint
- **Implementation**: Configure Swagger UI serving
- **Expected**: Interactive API documentation available

## Phase 6: Monorepo Integration (TDD)

### Test 6.1: shouldBuildSDKInTurboPipeline
- **Goal**: Integrate SDK generation into Turbo build pipeline
- **Test**: Run `pnpm build` and verify SDK is included
- **Implementation**: Update turbo.json with SDK build tasks
- **Expected**: SDK builds automatically with monorepo build

### Test 6.2: shouldHandleGitIgnoreForSDK
- **Goal**: Configure Git to ignore generated SDK files appropriately
- **Test**: Verify generated files are properly ignored/tracked
- **Implementation**: Update .gitignore with SDK-specific rules
- **Expected**: Local SDK ignored, distributed package tracked

### Test 6.3: shouldConfigureESLintForSDK
- **Goal**: Configure ESLint to ignore generated SDK files
- **Test**: Run linting and verify no errors on generated files
- **Implementation**: Update ESLint configuration
- **Expected**: Generated files excluded from linting

### Test 6.4: shouldConfigurePrettierForSDK
- **Goal**: Configure Prettier to ignore generated SDK files
- **Test**: Run formatting and verify generated files unchanged
- **Implementation**: Update Prettier configuration
- **Expected**: Generated files excluded from formatting

## Phase 7: E2E Testing with SDK (TDD)

### Test 7.1: shouldRunNestiaE2ETests
- **Goal**: Execute Nestia's E2E test generation
- **Test**: Run `pnpm nestia:e2e` and verify test generation
- **Implementation**: Generate E2E test structure
- **Expected**: Complete E2E test suite for all endpoints

### Test 7.2: shouldPassAllE2ETests
- **Goal**: All generated E2E tests should pass
- **Test**: Run generated E2E tests
- **Implementation**: Execute E2E test suite
- **Expected**: All tests pass with proper validation

### Test 7.3: shouldIntegrateWithVitest
- **Goal**: Integrate Nestia E2E tests with Vitest
- **Test**: Run E2E tests through Vitest configuration
- **Implementation**: Configure Vitest for E2E testing
- **Expected**: E2E tests execute through standard test runner

## Success Criteria

1. **Functional SDK**: Generated SDK provides type-safe access to all account service endpoints
2. **Monorepo Integration**: SDK package is properly distributed and consumable by other services
3. **Documentation**: Complete OpenAPI documentation with Swagger UI
4. **Test Coverage**: All endpoints covered by unit and E2E tests
5. **Development Workflow**: SDK regeneration integrated into build pipeline
6. **Code Quality**: All generated code follows project standards and is properly excluded from linting

## Key Commands

- `pnpm nestia:build` - Generate SDK
- `pnpm nestia:swagger` - Generate OpenAPI documentation
- `pnpm nestia:e2e` - Generate E2E tests
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run E2E tests
- `pnpm build` - Build entire monorepo including SDK

## Notes

- Follow strict TDD methodology: Red � Green � Refactor
- Each test should be small and focused on a single behavior
- Always run all tests before moving to the next phase
- Commit frequently with clear messages about structural vs behavioral changes
- Use meaningful test names that describe expected behavior
- Implement only the minimum code needed to make tests pass