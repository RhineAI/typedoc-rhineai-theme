# Cache Module

Efficient caching utilities for performance optimization.

## Overview

The cache module provides:

- In-memory caching with TTL support
- LRU eviction strategy
- Type-safe cache keys

## API

### Basic Usage

```typescript
import { Cache } from './Cache';

const cache = new Cache<string>({ ttl: 60000 });

// Set a value
cache.set('user:123', 'John Doe');

// Get a value
const name = cache.get('user:123');

// Check existence
if (cache.has('user:123')) {
  // ...
}
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `ttl` | `number` | `300000` | Time to live in ms |
| `maxSize` | `number` | `1000` | Maximum entries |
| `onEvict` | `function` | `undefined` | Eviction callback |

## Best Practices

> **Warning**: Avoid caching sensitive data without encryption.

1. Set appropriate TTL values
2. Monitor cache hit rates
3. Use namespaced keys to avoid collisions
