/**
 * TypeScript Decorator Examples
 *
 * @remarks
 * A collection of useful decorators demonstrating various patterns
 * including class, method, property, and parameter decorators.
 *
 * @packageDocumentation
 */

/**
 * Decorator metadata storage
 *
 * @internal
 */
const metadataStore = new WeakMap<object, Map<string | symbol, unknown>>()

/**
 * Sets metadata on a target
 *
 * @param target - Target object
 * @param key - Metadata key
 * @param value - Metadata value
 *
 * @internal
 */
function setMetadata(target: object, key: string | symbol, value: unknown): void {
  let metadata = metadataStore.get(target)
  if (!metadata) {
    metadata = new Map()
    metadataStore.set(target, metadata)
  }
  metadata.set(key, value)
}

/**
 * Gets metadata from a target
 *
 * @param target - Target object
 * @param key - Metadata key
 * @returns Metadata value or undefined
 *
 * @internal
 */
function getMetadata<T>(target: object, key: string | symbol): T | undefined {
  return metadataStore.get(target)?.get(key) as T | undefined
}

// ============================================================================
// Class Decorators
// ============================================================================

/**
 * Seals a class, preventing new properties from being added
 *
 * @returns Class decorator
 *
 * @example
 * ```typescript
 * @sealed
 * class MyClass {
 *   name = 'test'
 * }
 *
 * const obj = new MyClass()
 * obj.newProp = 'value' // Error in strict mode
 * ```
 *
 * @public
 */
export function sealed<T extends new (...args: unknown[]) => object>(
  constructor: T
): T {
  Object.seal(constructor)
  Object.seal(constructor.prototype)
  return constructor
}

/**
 * Options for the singleton decorator
 *
 * @public
 */
export interface SingletonOptions {
  /**
   * Whether to lazy-initialize the instance
   * @defaultValue true
   */
  lazy?: boolean
}

/**
 * Makes a class a singleton (only one instance ever created)
 *
 * @param options - Singleton options
 * @returns Class decorator
 *
 * @example
 * ```typescript
 * @singleton()
 * class DatabaseConnection {
 *   connect() { ... }
 * }
 *
 * const db1 = new DatabaseConnection()
 * const db2 = new DatabaseConnection()
 * console.log(db1 === db2) // true
 * ```
 *
 * @public
 */
export function singleton(options: SingletonOptions = {}) {
  return function <T extends new (...args: any[]) => object>(
    constructor: T
  ): T {
    let instance: InstanceType<T> | undefined

    return class extends constructor {
      constructor(...args: any[]) {
        if (instance) {
          return instance
        }
        super(...args)
        instance = this as InstanceType<T>
      }
    } as T
  }
}

/**
 * Adds logging to all methods of a class
 *
 * @param prefix - Log prefix
 * @returns Class decorator
 *
 * @example
 * ```typescript
 * @loggable('UserService')
 * class UserService {
 *   getUser(id: string) { return { id } }
 * }
 *
 * const service = new UserService()
 * service.getUser('123')
 * // Logs: [UserService] getUser called with: ["123"]
 * // Logs: [UserService] getUser returned: {"id":"123"}
 * ```
 *
 * @public
 */
export function loggable(prefix: string) {
  return function <T extends new (...args: unknown[]) => object>(
    constructor: T
  ): T {
    const original = constructor

    const newConstructor = function (this: object, ...args: unknown[]) {
      const instance = new original(...args)

      // Wrap all methods
      const prototype = Object.getPrototypeOf(instance)
      const propertyNames = Object.getOwnPropertyNames(prototype)

      for (const name of propertyNames) {
        if (name === 'constructor') continue

        const descriptor = Object.getOwnPropertyDescriptor(prototype, name)
        if (descriptor && typeof descriptor.value === 'function') {
          const originalMethod = descriptor.value

          Object.defineProperty(instance, name, {
            value: function (...methodArgs: unknown[]) {
              console.log(`[${prefix}] ${name} called with:`, methodArgs)
              const result = originalMethod.apply(this, methodArgs)

              if (result instanceof Promise) {
                return result.then((resolved: unknown) => {
                  console.log(`[${prefix}] ${name} resolved:`, resolved)
                  return resolved
                })
              }

              console.log(`[${prefix}] ${name} returned:`, result)
              return result
            },
            writable: true,
            configurable: true,
          })
        }
      }

      return instance
    } as unknown as T

    newConstructor.prototype = original.prototype
    return newConstructor
  }
}

// ============================================================================
// Method Decorators
// ============================================================================

/**
 * Binds a method to its class instance
 *
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class Counter {
 *   count = 0
 *
 *   @bind
 *   increment() {
 *     this.count++
 *   }
 * }
 *
 * const counter = new Counter()
 * const increment = counter.increment
 * increment() // Works! 'this' is bound
 * ```
 *
 * @public
 */
export function bind<T extends (...args: unknown[]) => unknown>(
  _target: object,
  propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value

  return {
    configurable: true,
    get(this: object): T {
      if (!originalMethod) return undefined as unknown as T

      const bound = originalMethod.bind(this) as T
      Object.defineProperty(this, propertyKey, {
        value: bound,
        configurable: true,
        writable: true,
      })
      return bound
    },
  }
}

/**
 * Options for the debounce decorator
 *
 * @public
 */
export interface DebounceOptions {
  /**
   * Debounce delay in milliseconds
   */
  wait: number

  /**
   * Whether to call on the leading edge
   * @defaultValue false
   */
  leading?: boolean
}

/**
 * Debounces a method call
 *
 * @param options - Debounce options
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class SearchBox {
 *   @debounce({ wait: 300 })
 *   search(query: string) {
 *     // Called at most once per 300ms
 *     api.search(query)
 *   }
 * }
 * ```
 *
 * @public
 */
export function debounce(options: DebounceOptions) {
  return function <T extends (...args: unknown[]) => unknown>(
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const callNow = options.leading && !timeoutId

      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      timeoutId = setTimeout(() => {
        timeoutId = undefined
        if (!options.leading) {
          originalMethod?.apply(this, args)
        }
      }, options.wait)

      if (callNow) {
        return originalMethod?.apply(this, args)
      }
    } as T

    return descriptor
  }
}

/**
 * Throttles a method call
 *
 * @param wait - Minimum time between calls in milliseconds
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class ScrollHandler {
 *   @throttle(100)
 *   onScroll(event: Event) {
 *     // Called at most once per 100ms
 *     this.updatePosition()
 *   }
 * }
 * ```
 *
 * @public
 */
export function throttle(wait: number) {
  return function <T extends (...args: unknown[]) => unknown>(
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value
    let lastCall = 0

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const now = Date.now()

      if (now - lastCall >= wait) {
        lastCall = now
        return originalMethod?.apply(this, args)
      }
    } as T

    return descriptor
  }
}

/**
 * Memoizes the result of a method based on its arguments
 *
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class Calculator {
 *   @memoize
 *   fibonacci(n: number): number {
 *     if (n <= 1) return n
 *     return this.fibonacci(n - 1) + this.fibonacci(n - 2)
 *   }
 * }
 *
 * const calc = new Calculator()
 * calc.fibonacci(40) // First call: slow
 * calc.fibonacci(40) // Second call: instant (cached)
 * ```
 *
 * @public
 */
export function memoize<T extends (...args: unknown[]) => unknown>(
  _target: object,
  _propertyKey: string | symbol,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value
  const cache = new Map<string, unknown>()

  descriptor.value = function (this: unknown, ...args: unknown[]) {
    const key = JSON.stringify(args)

    if (cache.has(key)) {
      return cache.get(key)
    }

    const result = originalMethod?.apply(this, args)
    cache.set(key, result)
    return result
  } as T

  return descriptor
}

/**
 * Measures and logs the execution time of a method
 *
 * @param label - Optional label for the log
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class DataProcessor {
 *   @measure('processData')
 *   processData(items: unknown[]) {
 *     // ... heavy processing
 *   }
 * }
 *
 * // Logs: [processData] Execution time: 123.45ms
 * ```
 *
 * @public
 */
export function measure(label?: string) {
  return function <T extends (...args: unknown[]) => unknown>(
    _target: object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value
    const logLabel = label ?? String(propertyKey)

    descriptor.value = function (this: unknown, ...args: unknown[]) {
      const start = performance.now()

      const result = originalMethod?.apply(this, args)

      if (result instanceof Promise) {
        return result.finally(() => {
          const duration = performance.now() - start
          console.log(`[${logLabel}] Execution time: ${duration.toFixed(2)}ms`)
        }) as ReturnType<T>
      }

      const duration = performance.now() - start
      console.log(`[${logLabel}] Execution time: ${duration.toFixed(2)}ms`)
      return result
    } as T

    return descriptor
  }
}

/**
 * Retries a method on failure
 *
 * @param attempts - Maximum number of attempts
 * @param delay - Delay between retries in milliseconds
 * @returns Method decorator
 *
 * @example
 * ```typescript
 * class ApiClient {
 *   @retry(3, 1000)
 *   async fetchData(): Promise<Data> {
 *     const response = await fetch('/api/data')
 *     if (!response.ok) throw new Error('Failed')
 *     return response.json()
 *   }
 * }
 * ```
 *
 * @public
 */
export function retry(attempts: number, delay: number) {
  return function <T extends (...args: unknown[]) => Promise<unknown>>(
    _target: object,
    _propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>
  ): TypedPropertyDescriptor<T> {
    const originalMethod = descriptor.value

    descriptor.value = async function (this: unknown, ...args: unknown[]) {
      let lastError: Error | undefined

      for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
          return await originalMethod?.apply(this, args)
        } catch (error) {
          lastError = error as Error
          console.warn(`Attempt ${attempt}/${attempts} failed:`, error)

          if (attempt < attempts) {
            await new Promise((resolve) => setTimeout(resolve, delay))
          }
        }
      }

      throw lastError
    } as T

    return descriptor
  }
}

// ============================================================================
// Property Decorators
// ============================================================================

/**
 * Makes a property observable (logs changes)
 *
 * @param onChange - Optional callback when value changes
 * @returns Property decorator
 *
 * @example
 * ```typescript
 * class Settings {
 *   @observable((newVal, oldVal) => console.log(`Changed: ${oldVal} -> ${newVal}`))
 *   theme = 'light'
 * }
 *
 * const settings = new Settings()
 * settings.theme = 'dark'
 * // Logs: Changed: light -> dark
 * ```
 *
 * @public
 */
export function observable<T>(onChange?: (newValue: T, oldValue: T) => void) {
  return function (target: object, propertyKey: string | symbol): void {
    const privateKey = Symbol(`_${String(propertyKey)}`)

    Object.defineProperty(target, propertyKey, {
      get(this: Record<symbol, T>) {
        return this[privateKey]
      },
      set(this: Record<symbol, T>, newValue: T) {
        const oldValue = this[privateKey]
        if (oldValue !== newValue) {
          this[privateKey] = newValue
          onChange?.(newValue, oldValue)
        }
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Validates a property value
 *
 * @param validator - Validation function
 * @param message - Error message if validation fails
 * @returns Property decorator
 *
 * @example
 * ```typescript
 * class User {
 *   @validate(v => v.length >= 3, 'Name must be at least 3 characters')
 *   name: string = ''
 *
 *   @validate(v => v > 0 && v < 150, 'Age must be between 0 and 150')
 *   age: number = 0
 * }
 * ```
 *
 * @public
 */
export function validate<T>(validator: (value: T) => boolean, message: string) {
  return function (target: object, propertyKey: string | symbol): void {
    const privateKey = Symbol(`_${String(propertyKey)}`)

    Object.defineProperty(target, propertyKey, {
      get(this: Record<symbol, T>) {
        return this[privateKey]
      },
      set(this: Record<symbol, T>, value: T) {
        if (!validator(value)) {
          throw new Error(`Validation failed for ${String(propertyKey)}: ${message}`)
        }
        this[privateKey] = value
      },
      enumerable: true,
      configurable: true,
    })
  }
}

/**
 * Marks a property with metadata
 *
 * @param key - Metadata key
 * @param value - Metadata value
 * @returns Property decorator
 *
 * @example
 * ```typescript
 * class Entity {
 *   @metadata('db:column', 'user_id')
 *   @metadata('db:type', 'uuid')
 *   id: string = ''
 * }
 * ```
 *
 * @public
 */
export function metadata(key: string, value: unknown) {
  return function (target: object, propertyKey: string | symbol): void {
    const metaKey = `${String(propertyKey)}:${key}`
    setMetadata(target.constructor, metaKey, value)
  }
}

/**
 * Gets metadata from a decorated property
 *
 * @param target - Class constructor
 * @param propertyKey - Property name
 * @param key - Metadata key
 * @returns Metadata value or undefined
 *
 * @public
 */
export function getPropertyMetadata<T>(
  target: object,
  propertyKey: string | symbol,
  key: string
): T | undefined {
  const metaKey = `${String(propertyKey)}:${key}`
  return getMetadata<T>(target, metaKey)
}

// ============================================================================
// Parameter Decorators
// ============================================================================

/**
 * Marks a parameter as required
 *
 * @returns Parameter decorator
 *
 * @example
 * ```typescript
 * class UserService {
 *   createUser(@required name: string, @required email: string) {
 *     // Implementation
 *   }
 * }
 * ```
 *
 * @public
 */
export function required(
  target: object,
  propertyKey: string | symbol,
  parameterIndex: number
): void {
  const existingRequired: number[] =
    getMetadata(target, `${String(propertyKey)}:required`) ?? []
  existingRequired.push(parameterIndex)
  setMetadata(target, `${String(propertyKey)}:required`, existingRequired)
}

/**
 * Injects a dependency by type/key
 *
 * @param key - Injection key
 * @returns Parameter decorator
 *
 * @example
 * ```typescript
 * class UserController {
 *   constructor(
 *     @inject('UserService') private userService: UserService,
 *     @inject('Logger') private logger: Logger
 *   ) {}
 * }
 * ```
 *
 * @public
 */
export function inject(key: string) {
  return function (
    target: object,
    propertyKey: string | symbol | undefined,
    parameterIndex: number
  ): void {
    const metaKey = propertyKey ? `${String(propertyKey)}:inject` : 'constructor:inject'
    const existingInjects: Array<{ index: number; key: string }> =
      getMetadata(target, metaKey) ?? []
    existingInjects.push({ index: parameterIndex, key })
    setMetadata(target, metaKey, existingInjects)
  }
}

/**
 * Gets injection metadata for a constructor or method
 *
 * @param target - Class constructor
 * @param propertyKey - Method name (undefined for constructor)
 * @returns Array of injection info
 *
 * @public
 */
export function getInjectMetadata(
  target: object,
  propertyKey?: string | symbol
): Array<{ index: number; key: string }> {
  const metaKey = propertyKey ? `${String(propertyKey)}:inject` : 'constructor:inject'
  return getMetadata(target, metaKey) ?? []
}
