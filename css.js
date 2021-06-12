import each from "./each.js"
import is from "./types.js"

//#region Types
/**
 * @typedef {HTMLElement | HTMLDivElement | Element |
 * HTMLDocument | Document} docElement
 */
//#endregion

/**
 * @param {docElement} target
 * @param {string | string[]} css
 */
export function add(target, css) {
  if (is.array(css)) return target.classList.add(...css)
  target.classList.add(css)
}
/**
 * @param {docElement} target
 * @param {string | string[]} css
 */
export function remove(target, css) {
  if (is.array(css)) return target.classList.remove(...css)
  target.classList.remove(css)
}
/**
 * @param {docElement} target
 * @param {string} css
 * @returns {boolean}
 */
export function contains(target, css) { return target.classList.contains(css) }
/**
 * @param {HTMLDivElement} target
 * @param {string} css
 */
export function toggle(target, css) { return target.classList.toggle(css) }
/**
 * @param {HTMLDivElement} target
 * @param {string} css
 */
toggle.each = function toggleEach(target, css) {
  if (is.array(css)) return each(css, z => { target.classList.toggle(z) })
  target.classList.toggle(css)
}
/**
 * @param {docElement} target 
 * @param {CSSStyleDeclaration} style
 */
export function styler(target, style) {
  each.obj(style, (x, y) => target.style[y] = x)
}
/**
 * @param {docElement} target 
 * @param {CSSStyleDeclaration} style
 */
styler.set = function stylerSet(target, style) {
  each.obj(style, (x, y) => target.style.setProperty(y, x))
}