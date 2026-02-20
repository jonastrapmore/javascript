// Voorbeelden van arrays
const leeg = []; // Een lege array.
const leeg2 = new Array(5); // Een lege array met 5 lege plaatsen.
const tientallen = [10, 20, 30, 40, 50]; // Een array met 5 numerieke waarden.
const diversen = ['Hello', 'World', 10, 20, true]; // Een array met verschillende types. Nooit gebruiken!
const reeks = [1, , 3]; // Een array met een lege plaats tussen 1 en 3.


// Vervang het element op positie 0 in de array "tientallen" door 0
// De array heeft vijf numerieke waarden, index van 0 t.e.m. 4
tientallen[0] = 0;

// Voeg een nieuw element toe aan de array tientallen.
// Posities 5, 6, 7, 8 en 9 worden opgevuld met lege waarden.
tientallen[10] = 100;

// Lees de waarde van de array tientallen uit op positie 2.
const waarde = tientallen[2];

console.log('tientallen:', tientallen);

// Als de lengte aangepast wordt naar een hoog getal, worden de lege plaatsen toegevoegd.
tientallen.length = 100;
console.log('Tientallen nadat de lengte aangepast is naar 100:', tientallen);

// Als de lengte ingesteld wordt op een getal dat kleiner is dan de huidige lengte, worden de overige waarden verwijderd.
tientallen.length = 2;
console.log('Tientallen nadat de lengte aangepast is naar 2:', tientallen);
