# Example Project

This is the root documentation for the example project.

## Overview

This project demonstrates the TypeDoc RhineAI Theme capabilities with various TypeScript modules.

## Features

- **Models**: User and Product data models
- **Services**: HTTP client and event handling
- **Utilities**: String, array, and date helpers
- **Components**: Reusable UI components

## Quick Start

```typescript
import { User } from './models/User';
import { HttpClient } from './services/HttpClient';

const client = new HttpClient('https://api.example.com');
const user = await client.get<User>('/users/1');
```

## Architecture

```
example/
├── models/          # Data models
├── services/        # Business logic services
├── utils/           # Utility functions
├── types/           # Type definitions
└── components/      # UI components
```

| Module | Description |
|--------|-------------|
| models | Data structures and entities |
| services | API clients and event handlers |
| utils | Helper functions |
| types | TypeScript interfaces |
| components | Reusable components |

> **Note**: This is a demonstration project for testing TypeDoc theme rendering.
