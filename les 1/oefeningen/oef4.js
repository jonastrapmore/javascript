/*
Schrijf een script dat de gebruiker vraagt om een getal in te geven en afhankelijk van de waarde één van de volgende dingen uitprint.
*/
const getal = Number(prompt('geef een getal in: '))
if (getal < 10) {
    console.log('Het getal is kleiner dan 10.')
} else if (getal <= 20) {
    console.log(`het kwadraat van dit getaal is ${getal ** 2}.`)
} else {
    console.log('Het getal is groter dan 20.')
}