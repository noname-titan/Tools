const Tools = (() => {
    class Tools {
        //#region Constructor
        /** @type { any[] } */
        #arr
        /** @type {{ }} */
        #event
        /**
         * @param { any[] } arr
         */
        constructor(arr) {
            this.#arr = arr || new Array()
            this.result = new Array()
            this.#event = Tools.#arr_to_object(Tools.#event_names)
        }
        //#endregion

        //#region Add Remove Set - array
        /**
         * @param { string | any[] } value
         */
        set arr(value) {
            this.#callEvent("change")
            this.#arr = value
        }
        /** @returns { any[] } */
        get arr() {
            return this.#arr
        }
        set add(value = []) {
            this.#callEvent("added")
            if (Array.isArray(value)) {
                this.#arr.push(...value)
            } else {
                this.#arr.push(value)
            }
        }
        removeWithIndex(index) {

            if (!typeof index == "number") {
                return new Error("Is not number")
            } else if (index >= this.#arr.length) {
                return new Error("The digit is too large from the length of the array")
            }
            this.#callEvent("removed")
            this.#arr.splice(index, 1)
        }
        //#endregion

        //#region Then
        then(callback = _callback_) {
            this.arr = this.result
            this.result = []
            return this
        }
        done() {
            this.then()
            return this.arr
        }
        //#endregion

        //#region User use functions
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
            for (let i = this.arr.length - 1; i >= 0; i--) {
                const el = this.arr[i];
                if (fn(el, i)) {
                    this.result.push(el)
                }
            }
            return this
        }
        sort() {
            let self = _getSelf()
            let arrs = self.#arr_to_object(self.#arr_types, { before: "_" }, new Array())
            let result = new Array()
            for (let i = 0; i < this.arr.length; i++) {
                arrs["_" + self.type(this.arr[i])].push(this.arr[i])
            }
            for (const name in arrs) {
                if (arrs.hasOwnProperty(name)) {
                    arrs[name] = self.sorter_fn[name](arrs[name].slice())
                }
                if (arrs[name] !== undefined) {
                    result.push(...arrs[name])
                }

            }
            this.result = result
            return this
        }
        //#endregion

        //#region static forEach
        static forEach = (arr = [], callback = _callback_) => {
            arr.forEach(callback)
        }
        static #arr_to_object = (arr = [], { before, after } = {}, value = undefined) => {
            let self = _getSelf()
            let result = {}
            let af = "", bef = ""

            if (before) bef = before
            if (after) af = after
            self.forEach(arr, (name) => {
                result[bef + name + af] = value
            })
            return result
        }
        //#endregion

        //#region Event
        /** @param { "change" | "added" | "deleted" } event */
        on(event = new String(), callback = event_fn) {
            var self = _getSelf()

            if (self.isString(event) && self.#isEvent(event)) {
                self.#add(this, event, callback)
            }
            return this
        }
        /** @param { "change" | "added" | "deleted" } event */
        off(event = new String()) {
            var self = _getSelf()

            if (self.isString(event) && self.#isEvent(event)) {
                self.#remove(this, event)
            }
            return this
        }
        /** @param { "change" | "added" | "deleted" } event */
        once(event = new String(), callback = event_fn) {
            let t = this
            let self = _getSelf()
            if (self.isString(event) && self.#isEvent(event)) {
                self.#add(t, event, (el, i) => {
                    callback(el, i)
                    self.#remove(t, event)
                })
            }
        }
        #callEvent = (name) => {
            var self = _getSelf()

            if (self.#isEvent(name) && !self.isEmpty(this.#event[name])) {
                this.#event[name].call(this.arr, name)
            }
        }
        //#endregion 

        //#region static Event
        static #event_names = ["change", "added", "deleted"]
        static #isEvent = (str) => {
            let res = false
            let self = _getSelf()
            self.#event_names.forEach((name) => {
                if (name == str) res = true
            })
            return res
        }
        static #add = (self, type, callback) => {
            self.#event[type] = callback
        }
        static #remove = (self, type) => {
            self.#event[type] = undefined;
        }
        //#endregion

        //#region static isType
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
        static isEmpty(param) {
            return (param == undefined | param == null)
        }
        //#endregion

        //#region static sorter fn
        static #arr_types = ["string", "number", "object", "boolean", "function", "bigint", "symbol", "undefined"]
        static sorter_fn = {
            _string: (arr) => { return arr.sort() },
            _number: (arr) => {
                var result = new Array()
                for (; 0 < arr.length;) {
                    result.push(
                        arr.splice(
                            arr.indexOf(Math.min(...arr)), 1
                        )[0]
                    )
                }
                return result
            },
            _object: (arr) => { return arr },
            _function: (arr) => { return arr },
            _boolean: (arr) => { return arr },
            _bigint: (arr) => { return arr },
            _symbol: (arr) => { return arr },
            _undefined: (arr) => { return arr },
        }
        //#endregion

        //#region static Help
        /**
         * @param { string } type
         */
        static help(type) {
            if (!_getSelf().isString(type)) {
                return new Error("is not string")
            }

            switch (type + "") {
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
                    if (type + "" == "" || type == undefined || type == null) {
                        console.log("use class, sort, add, remove, filter, reverse")
                    } else {
                        console.log("I didn't understand")
                    }
                    break;
            }
            return _getSelf()
        }
        //#endregion
    }
    //#region unknown
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
    function _fn_(element, index) { return !0 }
    /**
     * @param { any[] } self
     * @param { string } event_name
     */
    function event_fn(self, event_name) { }
    function _getSelf() { return Tools }
    //#endregion

    try { exports.Tools = Tools } catch { }
    return Tools
})();
globalThis.Tools = Tools