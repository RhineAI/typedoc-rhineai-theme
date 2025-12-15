# Types

TypeScript type definitions and interfaces.

## Common Types

### `Result<T, E>`

A discriminated union for handling success/failure:

```typescript
type Result<T, E = Error> =
  | { success: true; data: T }
  | { success: false; error: E };
```

### `Nullable<T>`

```typescript
type Nullable<T> = T | null | undefined;
```

## API Types

Types for API communication:

### Request Types

- `ApiRequest` - Base request interface
- `PaginatedRequest` - Pagination parameters
- `FilteredRequest` - Filter options

### Response Types

- `ApiResponse<T>` - Standard API response
- `PaginatedResponse<T>` - Paginated results
- `ErrorResponse` - Error details

## Usage

```typescript
import type { ApiResponse, Result } from './types';

async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const response: ApiResponse<User> = await api.get(`/users/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error };
  }
}
```

## Conventions

1. Prefix interfaces with `I` only when necessary to avoid conflicts
2. Use `type` for unions and intersections
3. Use `interface` for object shapes that may be extended
