import each from "./each.js"
import is from "./types.js"

/**
 * @param {Object} obj
 * @param {Object} value
 */
let eachobj = (x, z) => { each.obj(z, (y, k) => { x[k] = y }) }
export function Extend(obj, value) { let x = {}; if (is.obj(obj) && is.obj(value)) { eachobj(x, obj); eachobj(x, value) }; return x }
/**
 * @param {new} target
 * @param {Object} proto
 */
Extend.pro = (target, proto) => each.obj(proto, (x, k) => target.prototype[k] = x);
/**
 * @param {Object} target
 * @param {Object} proto
 */
export function Mixin(target, proto) { each.obj(proto, (x, k) => { is.func(x) ? target[k] = x.bind(target) : target[k] = x }) }
