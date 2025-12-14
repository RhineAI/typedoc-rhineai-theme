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
 * 一个用于演示 TSDoc 文档的测试类
 *
 * @remarks
 * 这个类展示了各种 TSDoc 标签的使用方式，包括：
 * - 属性文档
 * - 方法文档
 * - 参数和返回值描述
 * - 示例代码
 *
 * @example
 * 基本用法：
 * ```typescript
 * const instance = new TestClass('Hello', 42)
 * console.log(instance.greet()) // 输出: Hello, World!
 * ```
 *
 * @example
 * 使用泛型方法：
 * ```typescript
 * const result = instance.transform([1, 2, 3], (x) => x * 2)
 * console.log(result) // 输出: [2, 4, 6]
 * ```
 *
 * @public
 */
export class TestClass {
  /**
   * 类的名称标识
   * @readonly
   */
  public readonly name: string

  /**
   * 内部计数器
   * @defaultValue 0
   */
  private _count: number

  /**
   * 创建一个 TestClass 实例
   *
   * @param name - 实例的名称
   * @param initialCount - 初始计数值
   * @throws {@link Error} 如果 name 为空字符串
   */
  constructor(name: string, initialCount = 0) {
    if (!name) {
      throw new Error('Name cannot be empty')
    }
    this.name = name
    this._count = initialCount
  }

  /**
   * 获取当前计数值
   * @returns 当前的计数器值
   */
  get count(): number {
    return this._count
  }

  /**
   * 返回一个问候语
   *
   * @param target - 问候的目标，默认为 "World"
   * @returns 格式化的问候字符串
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
   * 增加计数器的值
   *
   * @param amount - 增加的数量，必须为正数
   * @returns 更新后的计数值
   * @throws {@link RangeError} 如果 amount 不是正数
   *
   * @see {@link TestClass.reset} 重置计数器
   */
  public increment(amount = 1): number {
    if (amount <= 0) {
      throw new RangeError('Amount must be positive')
    }
    this._count += amount
    return this._count
  }

  /**
   * 重置计数器到初始值
   * @param value - 重置到的值，默认为 0
   */
  public reset(value = 0): void {
    this._count = value
  }

  /**
   * 对数组进行转换操作
   *
   * @typeParam T - 输入数组的元素类型
   * @typeParam U - 输出数组的元素类型
   * @param items - 要转换的数组
   * @param transformer - 转换函数
   * @returns 转换后的新数组
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
   * 静态工厂方法，创建一个默认配置的实例
   *
   * @returns 新的 TestClass 实例
   */
  public static createDefault(): TestClass {
    return new TestClass('Default', 0)
  }
}

/**
 * 用户配置选项接口
 *
 * @remarks
 * 用于配置 {@link TestClass} 的行为
 *
 * @public
 */
export interface TestOptions {
  /**
   * 是否启用调试模式
   * @defaultValue false
   */
  debug?: boolean

  /**
   * 最大重试次数
   * @defaultValue 3
   */
  maxRetries?: number

  /**
   * 自定义日志处理函数
   * @param message - 日志消息
   * @param level - 日志级别
   */
  logger?: (message: string, level: 'info' | 'warn' | 'error') => void
}

/**
 * 操作结果的状态枚举
 *
 * @public
 */
export enum TestStatus {
  /** 操作待处理 */
  Pending = 'pending',
  /** 操作进行中 */
  Running = 'running',
  /** 操作已完成 */
  Completed = 'completed',
  /** 操作失败 */
  Failed = 'failed',
}

/**
 * 表示一个异步操作的结果
 *
 * @typeParam T - 成功时返回的数据类型
 * @public
 */
export type TestResult<T> =
  | { status: TestStatus.Completed; data: T }
  | { status: TestStatus.Failed; error: Error }
  | { status: TestStatus.Pending | TestStatus.Running }
