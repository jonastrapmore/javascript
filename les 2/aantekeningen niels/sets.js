//sets
let myset = new Set();
myset.add(1);
myset.add(2);
myset.add(2); //dubbel element wordt genegeerd
console.log(myset); // Set(2) { 1, 2 }
console.log(myset.has(1)); // true
console.log(myset.has(3)); // false
myset.delete(2);
console.log(myset); // Set(1) { 1 }
myset.clear();
console.log(myset); // Set(0) {}

const reeks = [1,3, ,5]

console.log(reeks) 