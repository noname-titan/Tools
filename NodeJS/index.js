class Tools {
    /**
     * @param { any[] } arr
     */
    constructor(arr) {
        this.arr = arr || new Array()
        this.result = new Array()
    }
    then(callback = _callback_) {
        for (let i = 0; i < this.result.length; i++) {
            const el = this.result[i]
            callback(el, i)
        }
        return this
    }
    foreach(callback = _callback_) {
        for (let i = 0; i < this.arr.length; i++) {
            const el = this.arr[i];
            callback(el, i)
        }
        return this
    }
    filter(fn = _fn_) {
        this.result = new Array()
        for (let i = 0; i < this.arr.length; i++) {
            const el = this.arr[i];
            if (fn(el, i)) {
                this.result.push(el)
            }
        }
        return this
    }
    reverse(fn = _fn_) {
        this.result = new Array()
        for (let i = this.arr.length - 1; i > 0; i--) {
            const el = this.arr[i];
            if (fn(el, i)) {
                this.result.push(el)
            }
        }
        return this
    }
    sort() {
        var self = _getSelf()
        var arrs = {
            _string: new Array(),
            _number: new Array(),
            _object: new Array(),
            _boolean: new Array(),
            _function: new Array(),
            _bigint: new Array(),
            _symbol: new Array(),
            _undefined: new Array()
        }
        var result = new Array()
        for (let i = 0; i < this.arr.length; i++) {
            arrs["_" + self.type(this.arr[i])].push(this.arr[i])
        }

        for (const name in arrs) {
            if (arrs.hasOwnProperty(name)) {
                arrs[name] = self["sort" + name](arrs[name].slice())
            }
            if (arrs[name] !== undefined) {
                result.push(...arrs[name])
            }

        }
        this.result = result
        return this
    }
    on(event = new String(), callback = _function_) {
        var self = _getSelf()

        if (self.isString(event)) {
            self.add(this, event, callback)
        }
        return this
    }
    static getSelf() {
        return Tools
    }
    static add(self, type, callback) {
        // add
    }
    static remove(self, type) {
        // remove
    }
    static type(param) {
        return typeof param
    }
    static isObject(param) {
        return this.type(param) == "object"
    }
    static isString(param) {
        return this.type(param) == "string"
    }
    static isNumber(param) {
        return this.type(param) == "number"
    }
    static isArray(param) {
        return Array.isArray(param)
    }
    static sort_string(arr) { return arr.sort() }
    static sort_number(arr) {
        var result = new Array()
        for (; 0 < arr.length;) {
            result.push(
                arr.splice(
                    arr.indexOf(Math.min(...arr)), 1
                )[0]
            )
            console.log(arr, result)
        }
        return result
    }
    static sort_object(arr) { return arr }
    static sort_function(arr) { return arr }
    static sort_boolean(arr) { return arr }
    static sort_bigint(arr) { return arr }
    static sort_symbol(arr) { return arr }
    static sort_undefined(arr) { return arr }
    /**
     * @param { string } type
     */
    static help(type) {
        if (!_getSelf().isString(type)) {
            return new Error("is not string")
        }
        
        switch (type+"") {
            case "add":
                console.log("create class with 'new' and call needs methods")
                break;
            case "sort":
                console.log("sort")
                break;
            case "add":
                console.log("add")
                break;
            case "remove":
                console.log("remove")
                break;
            case "filter":
                console.log("filter")
                break;
            case "reverse":
                console.log("reverse")
                break;
            default:
                if (type+"" == "" || type == undefined || type == null) {
                    console.log("use class, sort, add, remove, filter, reverse")
                }else{
                    console.log("I didn't understand")
                }
                break;
        }
        return _getSelf()
    }
}


Tools.help()
var format = "use class"
/**
 * @returns {any}
 */
function _function_() {
    var args = arguments
}
/**
 * @param { any } element
 * @param { number } index
 * @returns { any }
 */
function _callback_(element, index) { }
/**
 * @param { any } element
 * @param { Number } index
 */
function _fn_(element, index) {
    return new Boolean()
}
function _getSelf() {
    return Tools
}
function foreach(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i)
    }
}

/**
 * @param { Tools } self
 * @param { Function } callback
 */
function _change(self, callback) {
    callback(self.arr, callback)
}