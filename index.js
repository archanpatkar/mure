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

mure.isValid = (str) => {
  for (const ch in str) {
    if (!(ch in symbols)) {
      throw new SyntaxError('Invalid MIU String')
    }
  }
  return true
}

mure.rules = {
  1: str => {
    if (str.endsWith(I)) return true
  },
  2: str => {
    if (str[0] === M) return true
  },
  3: str => {
    if (str.match(rule3patt) !== undefined) return true
  },
  4: str => {
    if (str.match(rule4patt) !== undefined) return true
  }
}

mure.apply = {
  1: str => {
    return (str += U)
  },
  2: str => {
    const x = str.slice(1)
    str += x
    return str
  },
  3: str => {
    return str.replace(rule3patt, U)
  },
  4: str => {
    return str.replace(rule4patt, EMPTY)
  }
}

Object.freeze(mure.rules)
Object.freeze(mure.apply)

mure.canApply = (str, rule) => {
  if (rule in mure.rules) return mure.rules[rule](str)
}

mure.canApplyWhich = (str) => {
  const out = []
  for (const rule in mure.rules) {
    if (mure.canApply(str, rule)) {
      out.push(rule)
    }
  }
  return out
}

mure.applyRule = (str = mure.axiom, rule) => {
  if (rule in mure.apply) return mure.apply[rule](str)
}

mure.possibilityTree = (iterations, start = mure.axiom) => {
  // console.log('Starting String: ' + start)
  let temp = []
  let main
  let total
  if (Array.isArray(start)) {
    main = [...start]
    total = [...start]
  } else {
    main = [start]
    total = [start]
  }
  let i = 0
  while (i < iterations) {
    for (const m of main) {
      const rules = mure.canApplyWhich(m)
      if (rules !== undefined) {
        for (const rule of rules) {
          const val = mure.applyRule(m, rule)
          console.log(temp);
          console.log(val);
          if(!(val in temp)){
            console.log("Here!");
            temp.push(val)
          }
        }
      }
    }
    if (temp.length > 0) {
      main = temp
      total.push(Array(...main))
      temp = []
    }
    i++
  }
  return total
}

module.exports = Object.freeze(mure)
