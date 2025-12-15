# Models

This module contains data models used throughout the application.

## Available Models

### User

The `User` class represents a user entity with authentication capabilities.

```typescript
const user = new User('john_doe', 'john@example.com');
user.activate();
```

### Product

The `Product` class represents items in the catalog.

## Usage Guidelines

1. Always validate input before creating model instances
2. Use the provided factory methods when available
3. Models are immutable after creation

---

See also: [Types](../types/README.md) for related interfaces.
