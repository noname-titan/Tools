//#region Types
/** @typedef {number} n */
/**
 * @typedef {"string" | "number" | "bigint" | "boolean" |
 * "symbol" | "undefined" | "object" | "function"} allTypes
 */
/** @typedef {(value, index: n) => (void | boolean)} iterator */
/** @typedef {(value, name: string) => (void | boolean)} iteratorOBJ */
//#endregion



//#region Check type
let is = Object.freeze({
  /**
   * @param {*} value 
   * @param {allTypes} type
   */
  type: (value, type) => typeof value === type,
  func: value => is.type(value, "function"),
  num: value => is.type(value, "number"),
  str: value => is.type(value, "string"),
  obj: value => is.type(value, "object"),
  empty: value => (value == null || value == undefined),

  array: value => Array.isArray(value),

  notClass: value => (value == globalThis || is.empty(value))
})
//#endregion

//#region Each
/**
 * @param {*[]} arr
 * @param {iterator} fn
 */
let each = (arr, fn) => {
  for (let i = 0; i < arr.length; i++)
    if (fn(arr[i], i) === true) return
}
/**
 * @param {{ }} obj
 * @param {iteratorOBJ} fn
 */
each.obj = (obj, fn) => {
  for (let k in obj)
    if (Object.hasOwnProperty.call(obj, k))
      if (fn(obj[k], k) === true) return
}
//#endregion

//#region Object Extender
/**
 * @param {{ }} target
 * @param {{ }} obj
 */
let EXTEND = (target, obj) => each.obj(obj, (x, k) => target[k] = x)
/**
 * @param {new} target
 * @param {{ }} proto
 */
EXTEND.pro = (target, proto) => each.obj(proto,
  (x, k) => target.prototype[k] = x);
/**
 * @param {{ }} target
 * @param {{ }} proto 
 */
EXTEND.binder = (target, proto) => each.obj(proto,
  (x, k) => is.func(x) ? target[k] = x.bind(target) : target[k] = x)
//#endregion

//#region Object Singleton
/** @type {string[]} */
let _listMono = []
/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 * 
 * If the item is in the list returns "false". So it's okay.
 * 
 * Else "True". This means that the item is present in the list.
 * @param {string} self <-- new.target.name
 * @returns 
 */
let Mono = self => {
  let has = Mono.has(self)
  if (!has) _listMono.push(self)
  return has
}
Mono.has = self => {
  let has = false
  each(_listMono, x => has = (x == self))
  return has
}
//#endregion

//#region Path
/** @param  {...string} str */
let path = (...str) => {
  let z = "", y = "/"
  each(str, (x, i) => {
    x = x.trim()
    if (i > 0 && x.slice(0, 3) == "../") {
      z = z.slice(0, z.lastIndexOf("/"))
      x = s.slice(2)
    }
    if (i > 0 && x[0] !== y) x = y + x
    if (i < str.length && x.endsWith(y)) x = x.slice(0, x.length - 1)
    z += x
  })
  return z
}
//#endregion

//#region Get [Read] doc or code
/**
 * @param {string} url
 * @param {(err: null | n, res: JSON | any) => void} fn
 */
let request = (url, fn) => {
  let x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'json'
  x.onload = () => fn(x.status === 200 ? null : x.status, x.response)
  x.send()
}, getData = (url, fn) => request(location.origin + (url[0] !== "/" ? "/" + url : url), fn)

//#endregion

//#region Calc
/** @type {(a: n, b: n, c: n, d: n) => n} */
const calcRatio = (() => {
  let x = v => "number" == typeof v,
    y = (...v) => v.every(u => x(u)),
    z = (...v) => v.reduce((a, b) => a + (x(b) ? 1 : 0), 0)
  return (a, b, c, d) => {
    if (z(a, b, c, d) !== 3) throw new Error("Bad arguments")
    if (y(a, c, d)) return a * d / c
    if (y(a, b, d)) return a * d / b
    if (y(a, b, c)) return c * b / a
    if (y(b, c, d)) return c * b / d
  }
})()
//#endregion

//#region #### Export Tools
const _tools_ = Object.freeze({

  is,
  each,
  EXTEND,
  Mono,
  path,
  getData,
  request,
  calcRatio

})
//#endregion

//#region BasicKit
class BasicKit {

  //#region Private Param
  static #version = "v0.1"
  static #self = new BasicKit("Name")
  #name
  //#endregion

  /** @param {string} name */
  constructor(name) {
    if (Mono(new.target.name))
      throw new Error("the Kit objects must be in a single instance")
    this.#name = name
  }

  //#region Getter
  get name() { return this.#name }
  static get version() { return BasicKit.#version }
  //#endregion

}
//#endregion

//#region ToolKit
/** ToolKit Util */
const usingTools = {}

class ToolKit extends BasicKit {

  //#region Static Param
  static #self = new ToolKit()
  static #tools = _tools_
  //#endregion

  constructor() { super("ToolKit"); ToolKit.use(this) }

  //#region Private Static Methods
  static #eachK(fn) { each.obj(usingTools, fn) }
  //#endregion

  //#region Static Methods
  /** @param {BasicKit} kit */
  static use(kit) {
    if (kit instanceof BasicKit && !ToolKit.hasKitWithName(kit.name)) {
      usingTools[kit.name] = kit; return true
    } else return false
  }
  /** 
   * @param {string} kitName
   * @returns {BasicKit | null} 
   */
  static get(kitName) {
    return ToolKit.hasKitWithName(kitName)
      ? usingTools[kitName]
      : null
  }
  /**
   * @returns {string[]}
   */
  static getToolNameList() {
    let z = []
    ToolKit.#eachK(x => z.push(x.name))
    return z
  }
  /** @param {string} kitName */
  static hasKitWithName(kitName) { return !is.empty(usingTools[kitName]) }
  /** @param {BasicKit} kit */
  static hasKit(kit) { return !is.empty(usingTools[kit.name]) }
  //#endregion

  //#region Static Getter
  static get BasicKit() { return BasicKit }
  static get tools() { return _tools_ }
  static get self() { return ToolKit.#self }
  //#endregion

  //#region Getter
  get tools() { return _tools_ }
  //#endregion

}
//#endregion

//#region Export
globalThis.ToolKit = ToolKit
globalThis.tools = _tools_
export { ToolKit, _tools_ as tools }
//#endregion