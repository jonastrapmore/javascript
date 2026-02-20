// Deze variabelen is globaal en kan gebruikt worden in de maakSom functie (en elke andere functie).
let som = 0;

function maakSom(getal1, getal2) {
  // Deze variabele is lokaal en bestaat enkel in de scope van de maakSom functie.
  let zelfdeSom = getal1 + getal2;
  som = getal1 + getal2;
  return som;
}

console.log('1/ som =', som);
console.log('2/ som =', maakSom(5, 6));
console.log('3/ som =', som);
console.log('4/ som =', zelfdeSom); // Produces ReferenceError: zelfdeSom is not defined