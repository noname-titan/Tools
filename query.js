
//#region Types
/** @typedef {HTMLElement | HTMLDivElement | Element} targetElements */
//#endregion

const $d = document
/**
 * @param {string} query
 * @param {targetElements | HTMLDocument | Document} primary
 */
export default function search(query, primary = $d) { return primary.querySelector(query) }
/**
 * @param {string} query
 * @param {targetElements | HTMLDocument | Document} primary
 */
search.all = function searchAll(query, primary = $d) { return primary.querySelectorAll(query) }
/**
 * @param {string} query
 * @param {targetElements | HTMLDocument | Document} primary
 */
search.id = function searchId(query, primary = $d) { return primary.getElementById(query) }
search.newDiv = $d.createElement; (fn => search.newDiv = fn.bind($d))($d.createElement);
/** @param {targetElements} target */
search.scrollTo = target => target.scrollIntoView({ behavior: "smooth" })