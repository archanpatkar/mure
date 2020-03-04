const mure = require('./index')

console.log("MIIIIIII");
console.log(mure.matchAll("MIIIIIII","I",3));
console.log(mure.applyRule("MIIIIIII",3));
console.log("MIIUUIUUIUUUUUUI");
console.log(mure.matchAll("MIIUUIUUIUUUUUUI","U",2));
console.log(mure.applyRule("MIIUUIUUIUUUUUUI",4));
console.log("Possibility: MI");
console.log(mure.possibility(5));

// console.log(mure.matchAll2("MIIUUIUUIUUUUUUI","U",2));

// console.log(mure.possibility(4))