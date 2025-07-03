# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `pnpm run dev` - Start all apps in development mode (API on port 3001, Web on port 3000)
- `pnpm run dev --filter=api` - Start only the NestJS API
- `pnpm run dev --filter=web` - Start only the Next.js web app

### Building

- `pnpm run build` - Build all apps and packages
- `pnpm run build --filter=<app-name>` - Build specific app (ensure packages are built first)

### Testing

- `pnpm run test` - Run unit tests across all packages
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run test --filter=<app-name>` - Run tests for specific app/package

### Code Quality

- `pnpm run lint` - Run ESLint on all packages
- `pnpm format` - Format code with Prettier (formats `**/*.{ts,tsx,md}`)

### Running Single Tests

- In apps/api: `pnpm test <test-file-name>` or `pnpm test:e2e <spec-file>`
- Jest watch mode: `pnpm test -- --watch`

## Architecture

### Monorepo Structure

Turborepo-based monorepo with:

- **apps/**
  - `api` - NestJS backend API (port 3001)
  - `web` - Next.js frontend application (port 3000)
- **packages/** - Shared code with `@repo/` namespace:
  - `@repo/api` - Shared NestJS resources (DTOs, entities)
  - `@repo/eslint-config` - ESLint configurations with Prettier
  - `@repo/jest-config` - Jest configurations for different environments
  - `@repo/typescript-config` - Shared TypeScript configs
  - `@repo/ui` - React component library

### Technology Stack

- **Package Manager**: pnpm@8.15.5
- **Build System**: Turborepo
- **Backend**: NestJS with TypeScript
- **Frontend**: Next.js with TypeScript
- **Testing**: Jest (unit), Playwright (E2E)
- **Linting**: ESLint with Prettier integration
- **Node Version**: >=18

### Key Patterns

**API Structure (NestJS)**:

- Modular architecture with feature modules
- Controllers handle HTTP requests
- Services contain business logic
- Shared DTOs and entities in `@repo/api`
- Configuration via environment variables

**Frontend Structure (Next.js)**:

- App or Pages router (check `apps/web/`)
- Shared components from `@repo/ui`
- TypeScript throughout

**Package Dependencies**:

- Internal packages use `workspace:*` protocol
- Shared configs extend from base configurations
- ESLint configs: base, library, nest, next, react-internal

### Development Workflow

1. Install dependencies: `pnpm install`
2. Build packages first if running individual apps
3. Use Turbo filters for targeted operations: `--filter=<package-name>`
4. Remote caching available via Vercel (run `npx turbo login` and `npx turbo link`)

### Configuration Files

- **ESLint**: Configurations in `@repo/eslint-config/`
- **Prettier**: Base config in `@repo/eslint-config/prettier-base.js`
- **TypeScript**: Configs in `@repo/typescript-config/`
- **Jest**: Configs in `@repo/jest-config/`
- **VS Code**: ESLint working directories set to auto mode

### Turbo Pipeline

- `dev`: No cache, persistent process
- `build`: Depends on upstream builds, outputs to `.next/**`
- `lint`, `test`, `test:e2e`: Standard tasks with caching
