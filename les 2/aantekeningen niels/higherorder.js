// Reduce
// let cijfers = [1, 2, 3, 4, 5]

// let sum = cijfers.reduce((acc, val) => {
//   console.log("Reducing with acc:", acc, "and val:", val);
//   return acc - val
// }, 0)

// console.log(sum)

// Map
// let numbers = [1, 2, 3, 4, 5]

// let squared = numbers.map(num => {
//   console.log("Mapping number:", num);
//   return num * num
// })

// console.log(squared)

// // Filter
let values = [1, 2, 3, 4, 5]
let evenNumbers = values.filter(val => {
  // console.log("Filtering value:", val);
  return val % 2 === 0
})

console.log(evenNumbers)