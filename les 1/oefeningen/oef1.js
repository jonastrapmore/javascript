/*
Schrijf een script dat aan gebruikers vraagt om hun naam en voornaam apart in te geven. 
Vraag daarna aan de gebruiker of de juist correct ingegeven is, 
toon vervolgens een gepaste boodschap afhankelijk van het gekozen antwoord.
*/

const voornaam = prompt('Geef je voornaam in: ')
const achternaam = prompt('Geef je achternaam in: ')

console.log(`Je naam is ${voornaam} ${achternaam}`)

const isCorrect = confirm('Is dit correct?')

if (isCorrect) {
    console.log('Bedankt voor de bevestiging!')
} else {
    console.log('Sorry voor de verwarring, voeg het programma opnieuw uit om je correcte naam in te geven.')
}
