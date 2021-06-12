//#region Types
/** @typedef {number} n */
/**
 * @typedef {"string" | "number" | "bigint" | "boolean" |
 * "symbol" | "undefined" | "object" | "function"} allTypes
 */
//#endregion

/**
 * @param {*} value
 * @param {allTypes} target
 */
function type(value, target) { return target === typeof value }
/**
 * @param {*} value
 * @param {new} target
 */
function instance(value, target) { return value instanceof target }
function empty(value) { return value === undefined || value === null }
function num(value) { return "number" === typeof value || value instanceof Number }
function str(value) { return "string" === typeof value || value instanceof String }
function obj(value) { return "object" === typeof value && value instanceof Object }
function bool(value) { return "boolean" === typeof value || value instanceof Boolean }
function func(value) { return "function" === typeof value && value instanceof Function }
function array(value) { return Array.isArray(value) }
function NaN(value) { return "number" === typeof value && isNaN(value) }
function nonZeroValue(value) { return !(empty(value) || value === 0 || NaN(value)) }
/**
 * Returns "TRUE" if the element being checked is an instance of the class
 * @param {*} value
 */
function notClass(value) { return value === globalThis || empty(value) }
export default is = Object.freeze({
  type, instance, empty, num, str, obj, bool, func, array, NaN, nonZeroValue, notClass
})