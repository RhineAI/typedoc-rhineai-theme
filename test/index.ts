/**
 * @description A test number variable
 * @public
 */
export const testVariableA = 10

/**
 * @description A test string variable
 * @public
 */
export const testVariableB = 'Text'

export const testVariableC = 10

/**
 * A test class for demonstrating TSDoc documentation
 *
 * @remarks
 * This class demonstrates the usage of various TSDoc tags, including:
 * - Property documentation
 * - Method documentation
 * - Parameter and return value descriptions
 * - Example code
 *
 * @example
 * Basic usage:
 * ```typescript
 * const instance = new TestClass('Hello', 42)
 * console.log(instance.greet()) // Output: Hello, World!
 * ```
 *
 * @example
 * Using generic methods:
 * ```typescript
 * const result = instance.transform([1, 2, 3], (x) => x * 2)
 * console.log(result) // Output: [2, 4, 6]
 * ```
 *
 * @public
 */
export class TestClass {
  /**
   * The name identifier of the class
   * @readonly
   */
  public readonly name: string

  /**
   * Internal counter
   * @defaultValue 0
   */
  private _count: number

  /**
   * Creates a TestClass instance
   *
   * @param name - The name of the instance
   * @param initialCount - Initial count value
   * @throws {@link Error} If name is an empty string
   */
  constructor(name: string, initialCount = 0) {
    if (!name) {
      throw new Error('Name cannot be empty')
    }
    this.name = name
    this._count = initialCount
  }

  /**
   * Gets the current count value
   * @returns The current counter value
   */
  get count(): number {
    return this._count
  }

  /**
   * Returns a greeting message
   *
   * @param target - The target of the greeting, defaults to "World"
   * @returns Formatted greeting string
   *
   * @example
   * ```typescript
   * instance.greet() // "Hello, World!"
   * instance.greet("TypeDoc") // "Hello, TypeDoc!"
   * ```
   */
  public greet(target = 'World'): string {
    return `${this.name}, ${target}!`
  }

  /**
   * Increments the counter value
   *
   * @param amount - The amount to increase, must be positive
   * @returns The updated count value
   * @throws {@link RangeError} If amount is not positive
   *
   * @see {@link TestClass.reset} Reset the counter
   */
  public increment(amount = 1): number {
    if (amount <= 0) {
      throw new RangeError('Amount must be positive')
    }
    this._count += amount
    return this._count
  }

  /**
   * Resets the counter to initial value
   * @param value - The value to reset to, defaults to 0
   */
  public reset(value = 0): void {
    this._count = value
  }

  /**
   * Transforms an array
   *
   * @typeParam T - The element type of the input array
   * @typeParam U - The element type of the output array
   * @param items - The array to transform
   * @param transformer - The transformation function
   * @returns A new transformed array
   *
   * @example
   * ```typescript
   * const numbers = [1, 2, 3]
   * const doubled = instance.transform(numbers, n => n * 2)
   * // doubled = [2, 4, 6]
   * ```
   */
  public transform<T, U>(items: T[], transformer: (item: T) => U): U[] {
    return items.map(transformer)
  }

  /**
   * Static factory method that creates an instance with default configuration
   *
   * @returns A new TestClass instance
   */
  public static createDefault(): TestClass {
    return new TestClass('Default', 0)
  }
}

/**
 * User configuration options interface
 *
 * @remarks
 * Used to configure the behavior of {@link TestClass}
 *
 * @public
 */
export interface TestOptions {
  /**
   * Whether to enable debug mode
   * @defaultValue false
   */
  debug?: boolean

  /**
   * Maximum number of retries
   * @defaultValue 3
   */
  maxRetries?: number

  /**
   * Custom log handler function
   * @param message - Log message
   * @param level - Log level
   */
  logger?: (message: string, level: 'info' | 'warn' | 'error') => void
}

/**
 * Status enum for operation results
 *
 * @public
 */
export enum TestStatus {
  /** Operation pending */
  Pending = 'pending',
  /** Operation in progress */
  Running = 'running',
  /** Operation completed */
  Completed = 'completed',
  /** Operation failed */
  Failed = 'failed',
}

/**
 * Represents the result of an async operation
 *
 * @typeParam T - The data type returned on success
 * @public
 */
export type TestResult<T> =
  | { status: TestStatus.Completed; data: T }
  | { status: TestStatus.Failed; error: Error }
  | { status: TestStatus.Pending | TestStatus.Running }
