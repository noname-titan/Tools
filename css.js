import each from "./each.js"
import is from "./types.js"

//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElements */
//#endregion

/**
 * @param {targetElements} target
 * @param {string | string[]} css
 */
export function add(target, css) {
  if (is.array(css)) return target.classList.add(...css)
  target.classList.add(css)
}
/**
 * @param {targetElements} target
 * @param {string | string[]} css
 */
export function remove(target, css) {
  if (is.array(css)) return target.classList.remove(...css)
  target.classList.remove(css)
}
/**
 * @param {targetElements} target
 * @param {string} css
 * @returns {boolean}
 */
export function contains(target, css) { return target.classList.contains(css) }
/**
 * @param {targetElements} target
 * @param {string} css
 */
export function toggle(target, css) { return target.classList.toggle(css) }
/**
 * @param {targetElements} target
 * @param {string} css
 */
toggle.each = (target, css) => {
  if (is.array(css)) return each(css, z => { target.classList.toggle(z) })
  target.classList.toggle(css)
}
/**
 * @param {targetElements} target 
 * @param {CSSStyleDeclaration} style
 */
export function styler(target, style) { each.obj(style, (x, y) => { target.style[y] = x }) }
/**
 * @param {HTMLElement | HTMLDivElement} target 
 * @param {CSSStyleDeclaration} style
 */
styler.set = (target, style) => each.obj(style, (x, y) => target.style.setProperty(y, x))