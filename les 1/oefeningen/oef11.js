/*
Vraag de gebruiker om een getal. Vertrek van het ingegeven getal en tel er 12 bij op zolang de som kleiner blijft dan 100. Print de totale reeks uit in de console.
*/

/*met een for loop*/
const getal = Number(prompt('Geef een getal in: '))
let reeks = ''

for (let i = getal; i < 100; i += 12) {
    reeks += i + ' '
}

console.log(reeks)