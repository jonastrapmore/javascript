/*
Schrijf een programma dat de gebruiker vraagt om een getal in te lezen en dat vervolgens een overeenkomstig aantal plustekens uitprint.
*/
const aantal = Number(prompt('Hoeveel plustekens wil je zien?'))
let plustekens = ''
for (let i = 0; i < aantal; i++) {
    plustekens += '+'
}
console.log(plustekens)
