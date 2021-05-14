//#region Types
/** @typedef { (a, b) => n } comparator */
//#endregion

function List_() {
  if (is.notClass(this)) return new List()

  this.name = "List"
  let list = []

  EXTEND.binder(this, {

    push: value => list.push(value),
    pop: () => list.pop(),
    len: () => list.length,
    /** @param { comparator } compare */
    sort: compare => list.sort(compare),
    toArray: () => [...list]

  })
}

class List {

  //#region Private params
  #list
  //#endregion

  constructor() { this.#list = [] }

  //#region Static methods
  /**
   * @param { *[] } arr
   */
  static withArray(arr) {
    if (!is.array(arr)) arr = [arr]
    let x = new List()
    x.push(...arr)
    return x
  }
  //#endregion

  //#region Getters
  get len() { return this.#list.length }
  //#endregion

  //#region Methods
  push(...value) { this.#list.push(...value) }
  pop() { this.#list.pop() }
  /** @param { comparator } compare */
  sort(compare) { this.#list.sort(compare) }
  toArray() { return [...this.#list] }
  toString() { return this.toArray().toString() }
  copy() { return new List() }
  //#endregion

}

class LinkedList { }
class Stack_ { }
class Queue { }
