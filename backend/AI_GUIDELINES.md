# AI Development Guidelines

## General Principles
- **Clean Code**: Write code that is easy to read, understand, and maintain.
- **SOLID**: Apply SOLID principles in all design decisions.
- **Functional Programming**: Prefer functional programming patterns where appropriate (immutability, pure functions).

## Coding Standards

### No Hardcoded Strings
- **NEVER** use hardcoded strings (magic strings) in the code.
- **ALWAYS** move strings to a dedicated constants file (e.g., `src/shared/constants.ts`) or a specific constants object.
- **Descriptive Names**: Constants must have descriptive names that clearly indicate their purpose and context.

### Architecture
- **Clean Architecture**: Respect the dependency rule. Inner layers (Domain, Application) should not know about outer layers (Infrastructure).
- **Dependency Injection**: Always inject dependencies (repositories, use cases) to facilitate testing and reduce coupling.

## Examples

### Bad ❌
```typescript
// Hardcoded string
console.log('User disconnected');

// Direct instantiation (Coupling)
const repository = new MongoRepository();
```

### Good ✅
```typescript
// Using constants
console.log(APP_CONSTANTS.LOG_MESSAGES.USER_DISCONNECTED);

// Dependency Injection
const createService = (repository: Repository) => { ... }
```
