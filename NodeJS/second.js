/**
 * @param { String } text
 */
function* say(text) {
    if(!(typeof text === "string")){
        throw new Error("uuff")
    }
    for (let i = 0; i < text.length; i++) {
        yield text.split()[i]
    }
}
exports.say = say
