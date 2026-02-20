// Opvragen getal
const getal = Number(prompt("Geef een getal in", "1"));

// De functie geeft iets terug, dus we moeten dit opvangen in een variabele
const faculteit = berekenFaculteit(getal);

// We printen het resultaat nu uit, merk op dat de functie berekenFaculteit pas later gedefinieerd wordt.
// Dit is mogelijk door hoisting.
// De interpreter verhuist alle functies naar boven in het script
console.log(`De faculteit ${getal}! is: ${faculteit}`)

// Naam van de functie is berekenFaculteit.
// De naam "waarde" is zelf te kiezen voor deze variable.
function berekenFaculteit(waarde) {
  let resultaat = 1;

  for (let i = 1; i <= waarde; i++) {
    resultaat *= i;
  }

  // We geven de waarde in resultaat door via de functie
  return resultaat;
}