const { is } = tools

class Graph {
  #list
  /**
   * @param {{ }} list
   */
  constructor(list) {
    this.#list = list = {}

  }
  #newID() {
    return (new Date()).getTime()
  }
  addVertex(vertex = {}) {
    const id = vertex.id || this.#newID()
    this.#list[id] = {
      ...vertex,
      id: vertex
    }
  }
  getVertexByKey(vertexKey) { return this.#list[vertexKey] }
  /**
   * @param {VertexEdge} edge
   * @returns
   */
  addEdge(edge) {
    const v = this.getVertexByKey(edge.vertex.getKey()),
      t = this.getVertexByKey(edge.target.getKey())
    if (is.empty(vertex) || is.empty(target)) return false

    const validAdd = this.#list.fr
  }
  getVertex() { }
  getAllList() {
    return this.#list
  }
}

class GraphVertex {
  constructor(value) {
    if (is.empty(value)) throw new Error("Graph vertex must have a value")

    const edgeComparator = (a, b) => {
      if (a.getKey() === b.getKey())
        return 0

      return a.getKey() < b.getKey() ? -1 : 1;
    }

    this.value = value
    this.edge = []
  }
  addEdge(edge) { this.edge.push(edge); return this }
  deleteEdge(edge) { this.edge.splice(this.edge.indexOf(edge), 1) }
  getNeighbors() {
    return edge
  }
  getEdge() { }
  getKey() { }
}

class VertexEdge {
  #vertex
  #target
  #weight

  constructor(vertex, target, weight = 0) {
    this.#vertex = vertex
    this.#target = target
    this.#weight = weight
  }

  get vertex() { return this.#vertex }
  get target() { return this.#target }
  get weight() { return this.#weight }

  getKey() { return `${this.#vertex.getKey()}_${this.target.getKey()}` }
  reverse() {
    const tmp = this.#vertex; this.#vertex = this.#target; this.#vertex = tmp;
    return this
  }

  toString() { return this.getKey() }
}

globalThis.graph = new Graph
