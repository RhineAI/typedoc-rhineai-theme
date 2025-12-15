# Utilities

A collection of utility functions for common operations.

## String Utilities

Functions for string manipulation:

- `capitalize(str)` - Capitalize first letter
- `truncate(str, length)` - Truncate with ellipsis
- `slugify(str)` - Convert to URL-friendly slug

```typescript
import { capitalize, slugify } from './string';

capitalize('hello'); // 'Hello'
slugify('Hello World'); // 'hello-world'
```

## Array Utilities

Helper functions for arrays:

- `chunk(arr, size)` - Split into chunks
- `unique(arr)` - Remove duplicates
- `groupBy(arr, key)` - Group by property

```typescript
import { chunk, unique } from './array';

chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
unique([1, 1, 2, 3, 3]); // [1, 2, 3]
```

## Date Utilities

Date formatting and manipulation:

- `formatDate(date, format)` - Format dates
- `addDays(date, days)` - Add days to date
- `diffInDays(date1, date2)` - Calculate difference

---

## Tree Shaking

All utilities support tree shaking. Import only what you need:

```typescript
// Good - only imports capitalize
import { capitalize } from './string';

// Avoid - imports everything
import * as stringUtils from './string';
```
