const massa = Number(prompt("Geef je massa in:"))
console.log('Op welke planeet wil je jouw gewicht berekenen?')
console.log('    A. Maan')
console.log('    B. Jupiter')
console.log('    C. Mars')
console.log('    D. Venus')
console.log('    E. Neptunus')
const planeet = prompt('Jouw keuze: ')

let gewicht = 0
let naamPlaneet = ''

switch (planeet) {
    case 'A':
        naamPlaneet = 'Maan'
        gewicht = massa * 1.625
        break
    case 'B':
        naamPlaneet = 'Jupiter'
        gewicht = massa * 25.93
        break
    case 'C':
        naamPlaneet = 'Mars'
        gewicht = massa * 3.728
        break
    case 'D':
        naamPlaneet = 'Venus'
        gewicht = massa * 8.872
        break
    case 'E':
        naamPlaneet = 'Neptunus'
        gewicht = massa * 11.28
        break
}
if (gewicht === 0 || isNaN(gewicht)) {
    console.log(massa)
    console.log(gewicht)
    console.log(naamPlaneet)
    console.log('Je hebt geen geldige planeet gekozen of je opgegeven massa kon niet geconverteerd worden naar een getal.')
} else {
    console.log(`Jouw gewicht op ${naamPlaneet} is ${gewicht} Newton`)
}