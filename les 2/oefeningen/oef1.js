let arr =  ["Jonas","Corne", "Stefan", "Ann", "Liesa"]
console.log(arr.length)
console.log(`Eerste element: ${arr[0]}`)
console.log(`Derde element: ${arr[2]}`)
console.log(`Vijfde element: ${arr[4]}`)

arr.sort()
console.log(arr)

let extraNaam = prompt("geef een extra naam op: ")

arr.push(extraNaam)
console.log(arr)

console.log(arr.join(';'))