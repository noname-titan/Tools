//#region Types
/**
 * @typedef {"string" | "number" | "bigint" | "boolean" |
 * "symbol" | "undefined" | "object" | "function"} allTypes
 */
//#endregion

class is {
  constructor() { throw new Error("You can't create objects from the 'is' class") }
  /**
   * @param {*} value
   * @param {allTypes} target
   */
  static type(value, target) { return value instanceof target }
  /**
   * @param {*} value
   * @param {new} target
   */
  static instance(value, target) { return value instanceof target }
  static empty(value) { return value === undefined || value === null }
  static num(value) { return "number" === typeof value || value instanceof Number }
  static str(value) { return "string" === typeof value || value instanceof String }
  static obj(value) { return "object" === typeof value && value instanceof Object }
  static bool(value) { return "boolean" === typeof value || value instanceof Boolean }
  static func(value) { return "function" === typeof value && value instanceof Function }
  static array(value) { return Array.isArray(value) }
  static NaN(value) { return "number" === typeof value && isNaN(value) }
  static nonZeroValue(value) { return !(empty(value) || value === 0 || NaN(value)) }
  /**
   * Returns "TRUE" if the element being checked is an instance of the class
   * @param {*} value
   */
  static notClass(value) { return value === globalThis || empty(value) }
}
export default is