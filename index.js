const mure = {}
const symbols = ['M', 'I', 'U', '', ' ']
const patt = [/III/gi, /UU/gi]
const [M, I, U, ...extra] = symbols
const errorGen = () => { throw new SyntaxError('Invalid MIU String') }
const app = obj => (str = mure.axiom, rule) => mure.isValid(str) && (rule - 1 in obj) ? obj[rule - 1](str.toUpperCase()) : errorGen()
mure.axiom = 'MI'
mure.isValid = str => [...str].reduce((o, ch) => symbols.includes(ch.toUpperCase()) && o, true)
mure.matchAll = (str, ch, times) => [...str].reduce((acc, v, i) => v === ch
  ? Array(times).fill(0).reduce((acc, _, k) => str[i + k] === ch, true)
    ? !acc.push({ index: i, input: str }) ? acc : acc : acc : acc, [])
mure.rules = [
  str => str.endsWith(I),
  str => str[0] === M,
  str => str.match(patt[0]) !== null,
  str => str.match(patt[1]) !== null
]
mure.apply = [
  str => (str += U),
  str => (str += str.slice(1)),
  str => mure.matchAll(str, I, 3).map((match, a, b, c, o = false) => Array.from(match.input)
    .map((ch, i) => (i >= match.index && i <= match.index + 2) ? (!o ? ((o = true) && U) : '') : ch)
    .join('')
  ),
  str => mure.matchAll(str, U, 2).map(match =>
    Array.from(match.input)
      .filter((ch, i) => i < match.index || i > match.index + 1)
      .join('')
  )
]
mure.canApply = app(mure.rules)
mure.applyRule = app(mure.apply)
mure.canApplyWhich = str => mure.rules.flatMap((v, i) => mure.canApply(str, i + 1) ? [i + 1] : [])
mure.possibility = (iterations, start = mure.axiom) => Array(iterations).fill(0).reduce(p =>
  (p[1].add(new Set(p[0] = p[0].map(
    m => mure.canApplyWhich(m).map(rule => mure.applyRule(m, rule))
  ).flat(2)))) ? p : p,
[Array.isArray(start) ? [...start] : [start], new Set([new Set([start])])])[1]
Object.freeze(mure.apply)
Object.freeze(mure.rules)
module.exports = Object.freeze(mure)
