# AI Development Guidelines (Frontend)

## General Principles
- **Clean Code**: Code must be readable, maintainable, and self-documenting.
- **SOLID**: strict adherence to SOLID principles.
- **Clean Architecture**: Separation of concerns. UI components should not contain business logic. hexagonal architecture.
- **Functional Programming**: Prefer functional components and hooks.
- **No Direct HTML**: strictly prohibit the use of raw HTML tags (`div`, `span`, `button`, etc.) in presentation or business components. Use **Material UI (MUI)** components instead to maintain consistency and allow global adjustments.
- **Component Consistency**: All UI elements must come from Material UI to maintain a consistent Look & Feel.

## Coding Standards

### No Hardcoded Strings
- **STRICT PROHIBITION**: Never use hardcoded strings (magic strings) in components or logic.
- **Constants**: All strings (labels, error messages, API routes, action types) must be defined in `src/shared/constants` or feature-specific constant files.
- **Naming**: Use uppercase with underscores for constants (e.g., `BUTTON_LABELS.SUBMIT`).

### Architecture & Folder Structure
- **Components**: Presentation only. Receive data via props.
- **Hooks**: Encapsulate logic and state management.
- **Services**: Handle API calls and external communication.
- **Adapters**: Transform data between API and UI formats to decouple layers.

### Examples

#### Bad ❌
```tsx
// Hardcoded string & mixed logic
const Button = () => {
  const handleClick = () => fetch('/api/users'); // Hardcoded URL
  return <button onClick={handleClick}>Click Me</button>; // Hardcoded label
}
```

#### Good ✅
```tsx
// Constants used & Logic separated
import { LABELS, API_ROUTES } from '@/shared/constants';
import { useUserActions } from '@/hooks/useUserActions';

const UserButton = ({ onClick }: Props) => (
  <button onClick={onClick}>{LABELS.CLICK_ME}</button>
);
```
