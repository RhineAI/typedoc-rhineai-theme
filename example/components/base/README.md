# Base Component

The foundation class for all UI components.

## Overview

`Component` provides a minimal, framework-agnostic base for building UI components.

## API

### Constructor

```typescript
constructor(props?: ComponentProps)
```

### Methods

| Method | Description |
|--------|-------------|
| `render()` | Returns the component's HTML string |
| `mount(container)` | Attaches component to DOM |
| `unmount()` | Removes component from DOM |
| `update(props)` | Updates props and re-renders |

### Properties

- `props` - Component properties
- `state` - Internal state
- `element` - DOM element reference

## Example Implementation

```typescript
class Button extends Component<ButtonProps> {
  render() {
    const { label, variant = 'primary' } = this.props;
    return `
      <button class="btn btn-${variant}">
        ${label}
      </button>
    `;
  }

  onClick(handler: () => void) {
    this.element?.addEventListener('click', handler);
  }
}
```

## State Management

Components support reactive state:

```typescript
this.setState({ count: this.state.count + 1 });
// Automatically triggers re-render
```

---

*Part of the Component system*
