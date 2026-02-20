/*
vraag de gebruiker om één getal in te geven, print vervolgens uit of het getal even of oneven is.
*/
const getal = Number(prompt('geef een getal in: '))
const isEven = getal % 2 === 0 ? 'even' : 'oneven'

console.log(`Het getal ${getal} is ${isEven}.`)