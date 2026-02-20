/*
Vraag de gebruiker om twee getallen in te geven. 
Bereken vervolgens de som, het verschil, het product, het quotient en de rest na gehele deling (modulo) van deze getallen. 
Als de gebruiker op enter drukt zonder iets in te geven moet de defaultwaarde gebruikt worden. 
Voor het eerste getal is dit 0 en voor het tweede getal 1 (want delen door 0 kan niet).
*/

const getal1 = Number(prompt('geef getal 1 in: ',0))
const getal2 = Number(prompt('geef getal 2 in: ',1))

console.log(`De som van ${getal1} en ${getal2} is ${getal1 + getal2}`)
console.log(`Het verschil tussen ${getal1} en ${getal2} is ${getal1 - getal2}`)
console.log(`Het product van ${getal1} en ${getal2} is ${getal1 * getal2}`)
console.log(`Het quotiënt van ${getal1} en ${getal2} is ${getal1 / getal2}`)
console.log(`De rest van de deling van ${getal1} door ${getal2} is ${getal1 % getal2}`)