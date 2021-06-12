import each from "./each.js"
import is from "./types.js"

/**
 * @param {Object} obj
 * @param {Object} value
 */
export const Extend = (obj, value) => {
  let x = {}
  if (is.obj(obj) && is.obj(value)) {
    each.obj(obj, (z, k) => { x[k] = z }); each.obj(value, (z, k) => { x[k] = z })
  }
  return x
}
/**
 * @param {new} target
 * @param {Object} proto
 */
Extend.pro = (target, proto) => each.obj(proto,
  (x, k) => target.prototype[k] = x);
/**
 * @param {Object} target
 * @param {Object} proto
 */
export const Mixin = (target, proto) => {
  each.obj(proto,
    (x, k) => is.func(x) ? target[k] = x.bind(target) : target[k] = x)
}