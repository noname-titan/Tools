import is from "./types.js"

const $d = document

//#region Types
/**
 * @typedef {HTMLElement | HTMLDivElement | Element | HTMLDocument | Document} docElement
 */
//#endregion

/**
 * @param {string} query
 * @param {docElement} primary
 */
export default search = function search(query, primary = $d) { return primary.querySelector(query) }
/**
 * @param {string} query
 * @param {docElement} primary
 */
search.all = function searchAll(query, primary = $d) { return primary.querySelectorAll(query) }
/**
 * @param {string} query
 * @param {docElement} primary
 */
search.id = function searchId(query, primary = $d) { return primary.getElementById(query) }
search.newDiv = function newDiv(tag = "div") { $d.createElement(is.str(tag) ? tag : "div") }
search.scrollTo = function scrollTo(target) { target.scrollIntoView({ behavior: "smooth" }) }