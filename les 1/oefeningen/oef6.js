/*Schrijf een programma dat uitrekent hoeveel iemand voor een bioscoopkaartje moet betalen.

Het programma vraagt gebruikers om hun leeftijd en beslist dan op basis van volgende regels.

a. Jonger dan 5 jaar: Gratis
b. Tussen 5 en 12 jaar: Halve prijs
c. Tussen 13 en 54 jaar: Vol tarief
d. Ouder dan 54 jaar: Gratis
c. De ingegeven leeftijd kan niet omgevormd worden naar een getal: Foutmelding
*/

// Hieronder de if-else statement
/*const leeftijd = Number(prompt("Wat is je leeftijd?"))
if (leeftijd < 5) {
    console.log('Je ticket is gratis.')
}else if (leeftijd < 12) {
    console.log('Je betaalt je ticket aan halve prijs.')
} else if (leeftijd < 54) {
    console.log('Je krijgt geen korting.')
} else if (leeftijd > 54) {
    console.log('Je ticket is gratis.')
} else {
    console.log('Je hebt geen geldige leeftijd ingegeven.')
}*/

/* hieronder de switch statement */
const leeftijd = Number(prompt("Wat is je leeftijd?"))
switch (true) {
    case leeftijd < 5:
        console.log('Je ticket is gratis.')
        break;
    case leeftijd < 12:
        console.log('Je betaalt je ticket aan halve prijs.')
        break;
    case leeftijd < 54:
        console.log('Je krijgt geen korting.')
        break;
    case leeftijd > 54:
        console.log('Je ticket is gratis.')
        break;
    default:        console.log('Je hebt geen geldige leeftijd ingegeven.')
}