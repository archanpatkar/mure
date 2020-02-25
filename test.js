const mure = require('./index')

const str = 'MII'

// console.log("MIIIIII");
// console.log([..."MIIIIII".matchAll(rule3patt)]);

console.log(mure.applyRule("MIIIUUIUuuUUIII",4));

console.log(mure.applyRule("MIIIIIIUIIUIII",3));
// console.log(mure.isValid(str));
// console.log(mure.isValid("archan"));
// console.log(mure.isValid("MI"));
// let t = mure.canApplyWhich(str);
// console.log(t);
// t.forEach(f => console.log(f.toString()));

// console.log(mure.applyRule(mure.applyRule(str, 2), 3))

// console.log(mure.possibility(3,str))
