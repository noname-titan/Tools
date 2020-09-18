// require[s]
// const { say } = require("./second")



// Class

class Tools {
    /** @type { Tools } */
    static #self_
    /** @type { Boolean } */
    static #fastMode

    constructor(fast = true) {
        if (!(Tools.#self_ == undefined || Tools.#self_ == null)) {
            return Tools.#self_
        }
        Tools.#fastMode = fast
        Tools.#self_ = this

        init(Tools.#fastMode)
    }
    static getSelf() {
        return Tools.#self_
    }
}

// Function[s] to help

function init(bool) {
    if (!(Tools.getSelf == undefined || Tools.getSelf == null)) { return false }

    function foreach_(list, callback) {
        for (let item of list) {
            callback(item)
        }
    }
    var methodNameList = [
        "checkArray", "isArray", "getIsNotArray",
        "foreach", "sort", "filter", "includes",
        "split", "slice", "reduce", "reverse", "join",
        "min", "max", "minmax", "indexOf", "PI",

    ]
    foreach_(methodNameList, (item) => {
        Tools.prototype[item] = () => {
            console.log(`Function ${item} not found.`)
        }
    })
    if (bool) {
        var link = Tools.prototype
        link.isArray = function isArray(target) {
            return Array.isArray(target)
        }
        link.getIsNotArray = function getIsNotArray(target, type) {
            throw new Error(`This ${type} is not an array.`, target)
        }
        link.checkArray = function checkArray(target, type) {
            if (!link.isArray(target)) {
                link.getIsNotArray(type, target)
            }
        }
        /**
         * @param { String } target
         * @param { String } [separator]
         */
        link.split = function split(target, separator = "") {
            if (typeof target == "string")
                return target.split(separator)
        }
        /**
         * @param { any[] } target
         * @param { number } [start]
         * @param { number } [count]
         */
        link.splice = function splice(target, start = 0, count = 0) {
            link.checkArray(target)
            return target.splice(start, count)
        }
        /**
         * @param { Number[] } target
         */
        link.min = function min(target) {
            link.checkArray(target)
            return Math.min(target)
        }
    }
}

function checkArray(target, type) {
    if (!isArray(target)) {
        getIsNotArray(type, target)
    }
}
function isArray(target) {
    return Array.isArray(target)
}
function getIsNotArray(type, target) {
    throw new Error(`This ${type} is not an array.`, target)
}

// Function[s] to export

/**
 * @param { any[] } arr
 */
function reverse(arr) {
    checkArray(arr, "argument")

    let result = new Array()
    for (let i = arr.length - 1; i >= 0; i--) {
        result.push(arr[i])
    }
    return result
}
function foreach(target, callback) {
    for (let i = 0; i < target.length; i++) {
        callback(target[i], i)
    }
}
function splitter(target) {
    let result = new Array()
    switch (typeof target) {
        case "object":
            throw new Error("This element is an ( array | object ) of the type", target)
        case "string":
            for (let i = 0; i < target.length; i++) {
                result.push(target[i])
            }
            foreach(target, (char) => {
                result.push(char)
            })
            break
        case "number":
            foreach(target.toString(), (char) => {
                result.push(Number(char))
            })
            break
        default:
            throw new Error("uff")
    }
    return result
}
function sort(arr) {
    let result = new Array()
    checkArray(arr, "argument")
    switch (typeof (arr[0])) {
        case "number":
            foreach(arr, () => {
                result.push(
                    arr.splice(
                        arr.indexOf(Math.min(...arr)), 1
                    )[0]
                )
            })
            break
        case "string":
            result = arr
            result.sort((item1, item2) => {
                if (item1 < item2)
                    return -1;
                if (item1 > item2)
                    return 1;
                return 0;
            })

            break
        default:
            throw new Error("uff")
            break
    }
    return result
}
console.log(sort(["asdad", "fdfsd", "sad"]))

// Export[s]
exports.reverse = reverse
exports.foreach = foreach
exports.splitter = splitter
exports.sort = sort