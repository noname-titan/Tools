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
const is = Object.freeze({
  /**
   * @param {*} value 
   * @param {allTypes} type
   */
  type: (value, type) => typeof value === type,
  func: value => is.type(value, "function"),
  num: value => is.type(value, "number"),
  str: value => is.type(value, "string"),
  obj: value => is.type(value, "object"),
  empty: value => (value === null || value === undefined),

  array: value => Array.isArray(value),

  notClass: value => (value === globalThis || is.empty(value))
})
//#endregion

//#region Each
/**
 * @param {*[]} arr
 * @param {iterator} fn
 */
const each = (arr, fn) => {
  for (const i = 0; i < arr.length; i++)
    if (fn(arr[i], i) === true) return
}
/**
 * @param {{ }} obj
 * @param {iteratorOBJ} fn
 */
each.obj = (obj, fn) => {
  for (const k in obj)
    if (Object.hasOwnProperty.call(obj, k))
      if (fn(obj[k], k) === true) return
}
//#endregion

//#region Object Extender
/**
 * @param {{ }} target
 * @param {{ }} obj
 */
const EXTEND = (target, obj) => each.obj(obj, (x, k) => target[k] = x)
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
const _listMono = ["Mono"]
/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 * 
 * If the item is in the list returns "false". So it's okay.
 * 
 * Else "True". This means that the item is present in the list.
 * @class
 */
function Mono() {
  if (!is.notClass(this))
    throw new Error("This element is a class. Call 'new'")
  return Mono.force(new.target.name)
}
Mono.has = self => _listMono.includes(self);
/**
 * Сhecks whether this item is in the list and returns the result.
 * After checking, it is added to the list.
 * 
 * If the item is in the list returns "false". So it's okay.
 * 
 * Else "True". This means that the item is present in the list.
 * @param {string} self <-- new.target.name
 */
Mono.force = self => {
  const has = Mono.has(self)
  if (!has) _listMono.push(self)
  return has
}
//#endregion

//#region Path
/** @param  {...string} str */
const path = (...str) => {
  const z = "", y = "/"
  each(str, (x, i) => {
    x = x.trim()
    if (i > 0 && x.slice(0, 3) == "../") {
      z = z.slice(0, z.lastIndexOf("/")); x = s.slice(2)
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
const getJSON = (url, fn) => {
  const x = new XMLHttpRequest()
  x.open('GET', url, true)
  x.responseType = 'json'
  x.onload = () => fn(x.status === 200 ? null : x.status, x.response)
  x.send()
}, getData = (url, fn) => getJSON(path(location.origin, url), fn)

//#endregion

//#region Calc
/**
 * @param {HTMLImageElement} img
 * @returns {string}
 */
const getBase64Image = img => {
  const x = $$.createElement("canvas");
  x.width = img.width;
  x.height = img.height;
  x.getContext("2d").drawImage(img, 0, 0)
  return x.toDataURL("image/png")
}
/**
 * @param {HTMLImageElement} img
 * @returns {string}
 */
getBase64Image.pro = img => getBase64Image(img).replace(/^data:image\/(png|jpg);base64,/, "")
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
  getJSON,
  calcRatio,
  getBase64Image

})
//#endregion

//#region XCore
class XCore {
  static #self = new XCore()

  #version = "v0.7"
  #tools = _tools_

  constructor() {
    if (new.target !== XCore)
      throw new TypeError("Cannot inherit from the XCore class")
    if (Mono.force(new.target.name))
      throw new Error("The Kit objects must be in a single instance")
  }

  /**
   * @param {string | Object} target
   */
  has(target) {
    let x = false
    if (is.str(target) && XCore.self.hasKitWithName(target))
      return true
    each.obj(XCore.self, value => x = (value == target))
    return x
  }
  /**
   * @param {string} name
   */
  hasKitWithName(name) {
    if (is.str(name) && name != "") return !is.empty(XCore.self[name])
    return false
  }
  define(name, kit) {
    if (!is.str(name) && is.empty(kit)) return
    Object.defineProperty(XCore.#self, name, {
      value: kit,
      writable: false,
      enumerable: is.array(kit),
      configurable: false
    })
  }

  static get self() { return XCore.#self }
  get tools() { return _tools_ }
  get version() { return XCore.#self.#version }
}
//#endregion

//#region Export
const xcore = XCore.self
globalThis.XCore = xcore
globalThis.tools = _tools_
export { xcore as XCore, _tools_ as tools }
//#endregion