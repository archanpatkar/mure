// function getRandomInt (max) {
//   return Math.floor(Math.random() * Math.floor(max))
// }

// function selectRandomRule (str) {
//   const rules = canAppyHowMany(str)
//   return rules[getRandomInt(rules.length)]
// }

// function findold (start, end, iterations) {
//   console.log('Randomized Bruteforce Solution for MU Puzzle')
//   console.log('Starting String: ' + start)
//   console.log('To Find: ' + end)
//   let main = start
//   let i = 0
//   while (i < iterations) {
//     console.log('Iteration: ' + (i + 1))
//     const rule = getRandomInt(4) + 1
//     if (rule != undefined) {
//       console.log('Before Rule Application: ' + main)
//       console.log('Applying Rule: ' + rule)
//       main = applyRule(main, rule)
//       console.log('After Rule Application: ' + main)
//     }
//     i++
//   }
// }

// function find (start, end, iterations) {
//   console.log('Randomized Bruteforce Solution for MU Puzzle')
//   console.log('Starting String: ' + start)
//   console.log('To Find: ' + end)
//   const order = []
//   const output = [start]
//   let main = start
//   let i = 0
//   while (i < iterations && main != end) {
//     console.log('Iteration: ' + (i + 1))
//     const rule = selectRandomRule(main)
//     if (rule != undefined) {
//       console.log('Before Rule Application: ' + main)
//       console.log('Applying Rule: ' + rule)
//       order.push(rule)
//       main = applyRule(main, rule)
//       console.log('After Rule Application: ' + main)
//     }
//     output.push(main)
//     i++
//   }
//   return [order, output]
// }

// function find2 (start, end, iterations) {
//   console.log('Randomized Bruteforce Solution for MU Puzzle')
//   console.log('Starting String: ' + start)
//   console.log('To Find: ' + end)
//   const order = []
//   const output = [start]
//   let main = start
//   let i = 0
//   while (i < iterations && main != end) {
//     console.log('Iteration: ' + (i + 1))
//     const rules = canAppyHowMany(main)
//     if (rules != undefined) {
//       for (const rule of rules) {
//         console.log('Before Rule Application: ' + main)
//         console.log('Applying Rule: ' + rule)
//         order.push(rule)
//         main = applyRule(main, rule)
//         console.log('After Rule Application: ' + main)
//       }
//     }
//     output.push(main)
//     i++
//   }
//   return [order, output]
// }

// const problem = 'MI'
// const tofind = 'MII'

// console.log(possibliltyTree(problem, 12))
// // console.log(find2(problem,tofind,6));
