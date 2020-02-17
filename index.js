const mure = {}
const M = 'M'
const U = 'U'
const I = 'I'
const EMPTY = ''
const SPACE = ' '
const symbols = [M, I, U, EMPTY, SPACE]
const rule3patt = /III/gi
const rule4patt = /UU/gi

mure.axiom = 'MI'

mure.isValid = str => [...str].reduce((o,ch) => symbols.includes(ch)&&o,true);

mure.rules = [
  str => str.endsWith(I),
  str => str[0] === M,
  str => str.match(rule3patt) !== null, // Replace with matchall
  str => str.match(rule4patt) !== null // Replace with matchall
]

mure.apply = [
  str => (str += U),
  str => (str += str.slice(1)),
  str => str.replace(rule3patt, U), // Replace with matchall
  str => str.replace(rule4patt, EMPTY) // Replace with matchall
];

Object.freeze(mure.rules)
Object.freeze(mure.apply)

mure.canApply = (str, rule) => {
  if(!mure.isValid(str)) throw new SyntaxError('Invalid MIU String')
  else if (rule-1 in mure.rules) return mure.rules[rule-1](str)
}

mure.canApplyWhich = str => mure.rules.flatMap((v,i) => mure.canApply(str, i+1)?[i+1]:[]);

mure.applyRule = (str = mure.axiom, rule) => {
  if(!mure.isValid(str)) throw new SyntaxError('Invalid MIU String')
  if(rule-1 in mure.apply) return mure.apply[rule-1](str)
}

mure.possibility = (iterations, start = mure.axiom) => {
  let temp = []
  let main
  let total
  if (Array.isArray(start)) {
    main = [...start]
    total = [start]
  } else {
    main = [start]
    total = [start]
  }
  for(let i = 0;i < iterations;i++) {
    total.push(Array.from(main = main.map(
      m => mure.canApplyWhich(m).map((rule) => mure.applyRule(m, rule))
    ).flat()));
  }
  return total
}

module.exports = Object.freeze(mure)