const getal1 = Number(prompt('geef het eerste getal in: ','0'))
const getal2 = Number(prompt('geef het tweede getal in: ','0'))
const getal3 = Number(prompt('geef het derde getal in: ','0'))

const grootsteGetal = Math.max(getal1, getal2, getal3)
const kleinsteGetal = Math.min(getal1, getal2, getal3)
const middelsteGetal = getal1 + getal2 + getal3 - grootsteGetal - kleinsteGetal

console.log(`Het kleinste getal is ${kleinsteGetal}.`)
console.log(`Het middelste getal is ${middelsteGetal}.`)
console.log(`Het grootste getal is ${grootsteGetal}.`)