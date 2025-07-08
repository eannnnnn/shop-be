# Account Service

Account service for user authentication, profile management, and account operations.

## Features

- User registration and authentication
- Profile management
- Account operations and settings
- JWT-based authentication

## Development

### Prerequisites

- Node.js >= 18
- pnpm

### Installation

```bash
pnpm install
```

### Running the service

```bash
# Development mode
pnpm run dev

# Production mode
pnpm run start:prod
```

### Testing

```bash
# Unit tests
pnpm run test

# Watch mode
pnpm run test:watch

# E2E tests
pnpm run test:e2e

# Coverage
pnpm run test:cov
```

### API Documentation

```bash
# Generate Swagger documentation
pnpm run nestia:swagger

# Run E2E tests
pnpm run nestia:e2e
```

### SDK Generation

```bash
# Generate SDK for client libraries
pnpm run build:sdk
```

This will generate a TypeScript SDK in `packages/account-sdk` that can be used by client applications.

## API Endpoints

### Account Management

- `GET /accounts` - Get all accounts
- `GET /accounts/:id` - Get account by ID
- `POST /accounts` - Create new account
- `PUT /accounts/:id` - Update account
- `DELETE /accounts/:id` - Delete account

## Tech Stack

- **Framework**: NestJS with Fastify
- **Testing**: Vitest
- **Validation**: Typia
- **SDK Generation**: Nestia
- **Language**: TypeScript

## Architecture

This service follows Domain-Driven Design principles with:

- Controllers for HTTP request handling
- Services for business logic
- DTOs for data validation
- Test-Driven Development approach