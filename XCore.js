import each from "./each.js"
import { Extend, Mixin, } from "./extend.js"
import list from "./list.js"
import is from "./types.js"

let XCore = new Core()
class Core {
  #version = "v0.8"

  has(target) {
    let x = false
    if (is.str(target) && XCore.hasKitWithName(target)) return true
    each.obj(XCore, z => x = (z == target)); return x
  }
  hasKitWithName(name) {
    return (is.str(name) && name != "" || !is.empty(XCore.self[name]))
  }
  define(name, value) {
    if (!is.str(name) && is.empty(value)) return
    Object.defineProperty(XCore, name, {
      value: value, enumerable: is.array(value),
      writable: false, configurable: false
    })
  }
  get version() { return XCore.#version }
}
export default XCore