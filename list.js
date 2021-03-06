//#region Types
/** @typedef {(a, b) => *} comparator */
/** @typedef {(value, index: n, array: *[]) => string} _toString */
//#endregion 

import { XCore, tools } from "./main.js"

if (XCore == null || XCore == undefined)
  throw new Error("This file will not work without the main part\n" +
    "Please read more: https://github.com/noname-titan/Tools")

const { each, is } = tools

//#region List
class List {

  //#region Private Params
  #list
  //#endregion

  constructor() { this.#list = [] }

  //#region Static Methods
  /** @param {*[]} arr */
  static withArray(arr) {
    if (!is.array(arr)) arr = [arr]
    const x = new List(); x.push(...arr); return x
  }
  //#endregion

  //#region Getters
  get len() { return this.#list.length }
  //#endregion

  //#region Methods

  //#region Get Item
  /** @param {n} [index] */
  get(index = this.#list.len - 1) { return this.#list[index] }
  //#endregion

  //#region See | Copy? Item
  /**
   * @param {*} item
   * @param {n} [fromIndex]
   */
  includes(item, fromIndex) {
    if (is.num(fromIndex)) return this.#list.includes(item, fromIndex)
    return this.#list.includes(item)
  }
  toArray() { return [...this.#list] }
  /** @param {_toString} fn */
  toString(fn) { return this.toArray().map(fn).toString() }
  copy() { const x = new List(); x.fromArray(this.#list); return x }
  //#endregion

  //#region Add Item
  push(...value) { this.#list.push(...value); return this }
  unshift(...items) { this.#list.unshift(...items); return this }
  /** @param {[]} arr */
  fromArray(arr) { this.#list = [...arr] }
  //#endregion

  //#region Delete | Slice item
  /** @param {n} [index] */
  delete(index) {
    const x = this.splice(index)
    this.push(...x.splice(1))
    return x[0]
  }
  pop() { return this.#list.pop() }
  shift() { return this.#list.shift() }
  /**
   * @param {n} start
   * @param {n} [end]
   */
  splice(start, end) {
    if (is.num(end)) return this.#list.splice(start, end)
    return this.#list.splice(start)
  }
  //#endregion

  //#region Each Items
  /** @param {iterator} fn */
  each(fn) { each(this.#list, fn); return this }
  //#endregion

  //#region Sort Item
  /** @param {comparator} compare */
  sort(compare) { this.#list.sort(compare); return this }
  //#endregion

  //#endregion

}
//#endregion

//#region My Algr
class Stack {

  //#region Private Params
  #list
  //#endregion

  constructor() { this.#list = new List() }

  //#region Methods
  isEmpty() { return this.#list.len == 0 }
  peek() { return this.isEmpty() ? null : this.#list.get() }
  toArray() { return this.#list.toArray() }
  /** @param {_toString} fn */
  toString(fn) { return this.#list.toString(fn) }
  add(value) { this.#list.push(value) }
  delete() { return this.isEmpty() ? null : this.#list.pop() }
  //#endregion

}
class Queue {

  //#region Private Params
  #list
  //#endregion

  constructor() { this.#list = new List() }

  //#region Methods
  isEmpty() { return this.#list.len == 0 }
  peek() { return this.isEmpty() ? null : this.#list.get(0) }
  toArray() { return this.#list.toArray() }
  /** @param {_toString} fn */
  toString(fn) { return this.#list.toString(fn) }
  add(value) { this.#list.push(value) }
  delete() { return this.isEmpty() ? null : this.#list.shift() }
  //#endregion

}
//#endregion

//#region Other Algr
class Comparator {
  /**
   * @param {function(a: *, b: *)} [compareFn] - It may be custom compare
   * function that, let's say may compare custom objects together.
   */
  constructor(compareFn) {
    this.compare = compareFn || Comparator.defaultCompareFunction;
  }
  static defaultCompareFunction(a, b) {
    if (a === b) return 0
    return a < b ? -1 : 1
  }
  /** Checks if two variables are equal. */
  equal(a, b) { return this.compare(a, b) === 0 }

  /** Checks if variable "a" is less than "b". */
  lessThan(a, b) { return this.compare(a, b) < 0 }

  /** Checks if variable "a" is greater than "b". */
  greaterThan(a, b) { return this.compare(a, b) > 0 }

  /** Checks if variable "a" is less than or equal to "b". */
  lessThanOrEqual(a, b) { return this.lessThan(a, b) || this.equal(a, b) }

  /** Checks if variable "a" is greater than or equal to "b". */
  greaterThanOrEqual(a, b) {
    return this.greaterThan(a, b) || this.equal(a, b)
  }

  /** Reverses the comparison order. */
  reverse() {
    const compareOriginal = this.compare
    this.compare = (a, b) => compareOriginal(b, a)
  }
}
class LinkedListNode {
  /**
   * @param {*} value
   * @param {LinkedListNode} [next]
   */
  constructor(value, next = null) {
    this.value = value; this.next = next
  }
  toString(fn) { return fn ? fn(this.value) : `${this.value}` }
}
class LinkedList {
  /** @param {comparator} [comparatorFn] */
  constructor(comparatorFn) {
    /** @type {LinkedListNode} */
    this.head = null
    /** @type {LinkedListNode} */
    this.tail = null
    this.compare = new Comparator(comparatorFn)
  }

  /** @param {*} value */
  prepend(value) {
    this.head = new LinkedListNode(value, this.head)
    if (!this.tail) this.tail = this.head
    return this
  }

  /** @param {*} value */
  append(value) {
    const newNode = new LinkedListNode(value)
    if (!this.head) {
      this.head = newNode; this.tail = newNode
    } else {
      this.tail.next = newNode; this.tail = newNode
    }
    return this
  }

  /** @param {*} value */
  delete(value) {
    if (!this.head) return null
    let d
    while (this.head && this.compare.equal(this.head.value, value)) {
      d = this.head; this.head = this.head.next
    }
    let c = this.head
    if (c !== null) while (c.next)
      if (this.compare.equal(c.next.value, value)) {
        d = c.next; c.next = c.next.next
      } else c = c.next
    if (this.compare.equal(this.tail.value, value)) this.tail = currentNode
    return d
  }

  /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   */
  find({ value = undefined, callback = undefined }) {
    if (!this.head) return null
    let c = this.head
    while (c) {
      if (callback && callback(c.value)) return c
      if (value !== undefined
        && this.compare.equal(c.value, value)) return c
      c = c.next
    }
    return null
  }
  deleteTail() {
    let d = this.tail
    if (this.head === this.tail) { this.head = this.tail = null; return d }
    let c = this.head
    while (c.next) if (!c.next.next) { c.next = null } else c = c.next
    this.tail = c; return d
  }
  deleteHead() {
    if (!this.head) return null
    let d = this.head
    if (this.head.next) this.head = this.head.next
    else this.head = this.tail = null
    return d
  }

  /** 
   * @param {*[]} values - Array of values that need
   * to be converted to linked list. 
   */
  fromArray(values) { values.forEach(x => this.append(x)); return this }

  /** @return {LinkedListNode[]} */
  toArray() {
    const n = [], c = this.head; while (c) { n.push(c); c = c.next }; return n
  }

  /**
   * @param {function} [fn]
   * @return {string}
   */
  toString(fn) { return this.toArray().map(n => n.toString(fn)).toString() }

  /**
   * Reverse a linked list.
   * @returns {LinkedList}
   */
  reverse() {
    let c = this.head, p, n;
    while (c) { n = c.next; c.next = p; p = c; c = n }
    this.tail = this.head
    this.head = p
    return this
  }
}
//#endregion

class XEvent {

  //#region Private
  /** @type {string[]} */ #list
  #fns = {}
  //#endregion

  /** @param {string[]} eventList */
  constructor(eventList) {
    each(this.#list = [...eventList], e => this.#fns[e] = { fn: [] })
  }

  //#region Static Methods
  /** @param {string} name */
  hasWithName(name) { return this.#list.includes(name) }
  /** @param {string} name */
  hasFunc(name) {
    if (is.empty(this.#fns[name]))
      return is.func(this.#fns[name].fn[0])
    return false
  }
  /**
   * @param {string} name
   * @param {any[]} args
   * @param {any} [self]
   */
  call(name, args, self = null) {
    if (this.hasFunc(name))
      each(this.#fns[name].fn, f => { f.apple(self, args); return false })
  }
  /**
   * @param {string} name
   * @param {(...args: any) => void} callback
   * @param {{ }} config
   */
  addEvent(name, callback, config) {
    let x = false
    if (x = this.hasWithName(name)) this.#fns[name].fn.push(callback)
    return x
  }
  /**
   * @param {string} name
   * @param {(...args: any) => void} callback
   */
  removeEvent(name, callback) {
    if (this.hasWithName(name))
      each(this.#fns[name].fn, (f, i) => {
        if (f == callback) this.#fns[name].fn.splice(i, 1)
      })
  }
  /** @param {string} name */
  clearEvent(name) { if (this.hasWithName(name)) this.#fns[name].fn = [] }
}
//#region Event
//#endregion

//#region #### Export Tools
const _tools_ = Object.freeze({ List, Stack, Queue, LinkedList, Comparator, XEvent })
//#endregion

//#region Algorithm Kit
XCore.define("Algorithm", _tools_)
//#endregion

//#region Export
export default _tools_
//#endregion