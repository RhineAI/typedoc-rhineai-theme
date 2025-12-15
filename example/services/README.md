# Services

Core services for handling business logic and external communications.

## HttpClient

A robust HTTP client with built-in retry logic and interceptors.

### Features

- Automatic retry on failure
- Request/Response interceptors
- TypeScript generics support
- Configurable timeout

### Example

```typescript
const client = new HttpClient('https://api.example.com', {
  timeout: 5000,
  retries: 3
});

// GET request
const users = await client.get<User[]>('/users');

// POST request
const newUser = await client.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```

## EventEmitter

A type-safe event emitter implementation.

### Usage

```typescript
interface Events {
  'user:login': { userId: string };
  'user:logout': void;
}

const emitter = new EventEmitter<Events>();
emitter.on('user:login', ({ userId }) => {
  console.log(`User ${userId} logged in`);
});
```

## Cache

See the [cache](./cache/README.md) subdirectory for caching utilities.
