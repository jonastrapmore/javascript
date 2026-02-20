// Oneindige lus!
// Let op als je while combineert met continue.
let getal = 10,teller = 1;

while (teller <= 10) {
  // teller++; // Dit zou een oplossing kunnen zijn.

  console.log(`${teller} maal ${getal} = ${teller * getal}`);

  // Als teller 3 is, gaat hij altijd in de IF en dus krijgen we geen verhoging meer (teller++)
  if (teller % 2 !== 0) {
    continue;
  }

  // Teller zal nooit verhoogd worden...
  teller++;
}