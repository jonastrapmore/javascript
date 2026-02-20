const nummer = [1, 2, 3, 4, 5];

// De callback functie heeft twee parameters: de accumulator en het huidige element in de array.
// De accumulator is het resultaat van de vorige callback functie aanroep.
// De startwaarde voor de accumulator wordt gespecificeerd via de tweede parameter van reduce (niet van de callback).
const som = nummer.reduce((accumulator, currentValue) => {
  return accumulator + currentValue;
}, 0)

console.log('Som: ', som)

// Dit zal 0 opleveren, omdat de startwaarde van de accumulator 0 is.
// 0 * 1 = 0, 0 * 2 = 0, 0 * 3 = 0, 0 * 4 = 0, 0 * 5 = 0
const product = nummer.reduce((accumulator, currentValue) => {
  return accumulator * currentValue;
}, 0)

console.log('Product: ', product)