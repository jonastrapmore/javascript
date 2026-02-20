/*
Los de vorige oefening opnieuw op, maar gebruik dit keer een switch.
*/
const getal = Number(prompt('geef een getal in: '))
switch (true) {
    case getal < 10:
        console.log('Het getal is kleiner dan 10.')
        break
    case getal <= 20:
        console.log(`het kwadraat van dit getaal is ${getal ** 2}.`)
        break
    default:
        console.log('Het getal is groter dan 20.')
}
