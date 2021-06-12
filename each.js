import is from "./types.js"

//#region Types
/** @typedef {(value, index: n) => (void | boolean)} iterator */
/** @typedef {(value, name: string) => (void | boolean)} iteratorOBJ */
//#endregion

/**
 * @param {Array} arr
 * @param {iterator} fn
 */
export default function each(arr, fn) {
  if (!is.array(arr) || !is.func(fn)) throw new TypeError("bad Arguments")
  for (let i = 0; i < arr.length; i++)
    if (fn(arr[i], i) === true) return
}
/**
 * @param {Object} obj
 * @param {iteratorOBJ} fn
 */
each.obj = function eachObj(obj, fn) {
  for (const k in obj)
    if (Object.hasOwnProperty.call(obj, k))
      if (fn(obj[k], k) === true) return
}