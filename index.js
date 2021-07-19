const fs = require("fs");
//const loader = require("@assemblyscript/loader");
const AsBind = require("as-bind/dist/as-bind.cjs.js");

const imports = { 
    index: {
        string_log: v => console.log(v)
    }
 };

const task = async() => {
    const wasmModule = await AsBind.instantiate(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
    module.exports = wasmModule.exports;

    wasmModule.exports.trash(10000);

    let a = string_repeat("A", 30);
    let b = string_repeat("B", 30);
    let c = string_repeat("C", 60);
    let d = string_repeat("D", 60);

    wasmModule.exports.string_parameter(a, b, c, d);

}
task();

function string_repeat(input, length){
    let str = "";
    for(let i=0; i < length; i++){
        str += input;
    }

    return str;
}