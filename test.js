import { tools, DOM, Algorithm } from "./index.js"

const { is, each, Mono, path, calcRatio } = tools
const log = ()=>{}, g = ()=>{}, gend = ()=>{}
function test(value, target) {
  g(value, target); log("equalsType: " + (typeof value === typeof target), typeof value); log("equals: " + (value === target)); gend()
}

log("is NUMBER TRUE")
test(is.num(1), true)
test(is.num(0), true)
test(is.num(9999999999999), true)

log("is NUMBER FALSE")
test(is.num(undefined), false)
test(is.num(null), false)
test(is.num("0"), false)
test(is.num(new Number()), false)
test(is.num(Number), false)

log("is STRING TRUE")
test(is.str("0"), true)
test(is.str("str"), true)

log("is STRING FALSE")
test(is.str(undefined), false)
test(is.str(null), false)
test(is.str(0), false)
test(is.str({}), false)
test(is.str(new String()), false)

log("is BOOLEAN TRUE")
test(is.bool(true), true)
test(is.bool(false), true)
test(is.bool(!0), true)

log("is BOOLEAN FALSE")
test(is.bool(undefined), false)
test(is.bool(null), false)
test(is.bool(new Boolean()), false)

log("is OBJECT TRUE")
test(is.obj({}), true)
test(is.obj(new Number()), true)
test(is.obj(new (class { })), true)

log("is OBJECT FALSE")
test(is.obj(undefined), false)
test(is.obj(null), false)
test(is.obj(0), false)

log("is NAN TRUE")
test(is.NaN(NaN), true)
test(is.NaN("str" / 1), true)

log("is NAN FALSE")
test(is.NaN(undefined), false)
test(is.NaN(null), false)
test(is.NaN(0), false)

log("is NONZEROVALUE TRUE")
test(is.nonZeroValue(1), true)
test(is.nonZeroValue("0"), true)
test(is.nonZeroValue({}), true)

log("is NONZEROVALUE FALSE")
test(is.nonZeroValue(0), false)
test(is.nonZeroValue(null), false)
test(is.nonZeroValue(undefined), false)
