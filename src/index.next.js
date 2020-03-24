// Some ideas that may make it into the next release
mure.lazilyApplyAll = function*(str) {
    let t;
    let o = [];
    for(let r of mure.canApplyWhich(str)) 
        Array.isArray(t = mure.applyRule(str,r))&&o.push(t)? yield* t:yield t;
    return flat(o);
} 

mure.moreLazyPossibility = function*(start = mure.axiom,iters=Infinity) {
    let current = !Array.isArray(start) ? [start] : start; let i = 0;
    while(i < iters) 
    {
      let temp = []
      for(let c of current) temp.push(yield* mure.lazilyApplyAll(c))
      yield ++i;
      current = flat(temp)
    }
}

// Tests

// test('mure.lazilyApplyAll', () => {
//     expect([...mure.lazilyApplyAll('MI')]).toEqual(mure.applyAll('MI'))
//     expect([...mure.lazilyApplyAll('MUI')]).toEqual(mure.applyAll('MUI'))
//     expect([...mure.lazilyApplyAll('MIUU')]).toEqual(mure.applyAll('MIUU'))
//     expect([...mure.lazilyApplyAll('MIIIU')]).toEqual(mure.applyAll('MIIIU'))
//     expect([...mure.lazilyApplyAll('MIIUI')]).toEqual(mure.applyAll('MIIUI'))
//     expect([...mure.lazilyApplyAll('MIUUIII')]).toEqual(mure.applyAll('MIUUIII'))
// })