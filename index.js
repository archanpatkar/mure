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
  str => str.match(rule3patt) !== null,
  str => str.match(rule4patt) !== null
]

mure.apply = [
  str => (str += U),
  str => (str += str.slice(1)),
  str => {
    // Array.from(str.matchAll(rule4patt)).map(match =>
    //   Array.from(match.input)
    //   .map((ch,i) => i >= match.index && i <= match.index+2?U:ch)
    //   .join("")
    // )
    // str.replace(rule3patt, U)
  }, 
  str => Array.from(str.matchAll(rule4patt)).map(match =>
            Array.from(match.input)
            .filter((ch,i) => i < match.index || i > match.index+1)
            .join("")
        )
]

mure.canApply = (str, rule) => {
  if(!mure.isValid(str)) throw new SyntaxError('Invalid MIU String')
  else if (rule-1 in mure.rules) return mure.rules[rule-1](str.toUpperCase())
}

mure.canApplyWhich = str => mure.rules.flatMap((v,i) => mure.canApply(str, i+1)?[i+1]:[]);

mure.applyRule = (str = mure.axiom, rule) => {
  if(!mure.isValid(str)) throw new SyntaxError('Invalid MIU String')
  if(rule-1 in mure.apply) return mure.apply[rule-1](str.toUpperCase())
}

mure.possibility = (iterations, start = mure.axiom) => Array(iterations).fill(0).reduce((p,c) =>
      !p[1].push(Array.from(p[0] = p[0].map(
        m => mure.canApplyWhich(m).map(rule => mure.applyRule(m, rule))
      ).flat(2))) && p,
      [Array.isArray(start)?[...start]:[start],[start]])[1];

Object.freeze(mure.apply)
Object.freeze(mure.rules)
module.exports = Object.freeze(mure)