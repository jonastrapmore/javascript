const getallen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Loop door elk element in de array en transformeer elk element naar het kwadraat van het element.
const kwadraten = getallen.map(getal => getal * getal);

console.log('Originele getallen:', getallen);
console.log('Kwadraten:', kwadraten);

// De callback functie heeft een optionele tweede parameter, de index van het element in de array.
const evenKwadratenOnevenHelft = getallen.map((getal, index) => {
  return index % 2 === 0 ? getal * getal : getal / 2;
})

console.log('Even indexen kwadrateren, oneven indexen halveren:', evenKwadratenOnevenHelft);