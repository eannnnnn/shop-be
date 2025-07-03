# Shop Backend

E-commerce backend service built with NestJS and TypeScript.

## 🏗️ Architecture

This is a monorepo structured project using:

- **NestJS** - Progressive Node.js framework for APIs
- **TypeScript** - Type-safe JavaScript
- **pnpm** - Fast, disk space efficient package manager
- **Turborepo** - High-performance build system

## 📁 Project Structure

```
shop-be/
├── apps/
│   └── api/          # Main NestJS application
├── packages/
│   ├── api/          # Shared API types and DTOs
│   ├── eslint-config/    # Shared ESLint configuration
│   ├── jest-config/      # Shared Jest configuration
│   └── typescript-config/ # Shared TypeScript configuration
└── docs/             # Project documentation
```

## 📚 Documentation

- **[ESLint Configuration Guide](./docs/eslint-configuration.md)** - ESLint 설정 철학과 근거
- **[ESLint Rules Reference](./docs/eslint-rules-reference.md)** - 규칙별 상세 설명과 예시

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development Commands

```bash
# Lint code
pnpm lint

# Run tests
pnpm test

# Build all packages
pnpm build

# Type check
pnpm type-check
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# E2E tests
pnpm test:e2e

# Test coverage
pnpm test:cov
```

## 🔧 Code Quality

This project enforces high code quality standards through:

- **ESLint** - NestJS optimized linting with automated bug prevention
- **TypeScript** - Strict type checking
- **Prettier** - Consistent code formatting
- **Jest** - Comprehensive testing framework

See our [ESLint Configuration Guide](./docs/eslint-configuration.md) for detailed information about our code quality approach.

## 📦 Packages

- `@shop-be/api-app` - Main NestJS application
- `@shop-be/api` - Shared API types and DTOs
- `@shop-be/eslint-config` - NestJS optimized ESLint configuration
- `@shop-be/jest-config` - Shared Jest configuration
- `@shop-be/typescript-config` - Shared TypeScript configuration

## 🤝 Contributing

1. Follow our ESLint rules (see [documentation](./docs/eslint-configuration.md))
2. Write tests for new features
3. Ensure all checks pass before submitting PR

## 📄 License

This project is licensed under the MIT License.
