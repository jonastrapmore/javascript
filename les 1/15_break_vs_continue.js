const max = 100;

// We drukken enkel de even getallen af.
for (let teller = 1; teller <= max; teller++) {
  if (teller % 2 !== 0) {
    // % is de modulo => geeft de rest terug na deling
    // teller = 3 => 3 % 2 => 1 want 1 * 2 = 2 => rest 1 (oneven getal)
    // teller = 4 => 4 % 2 => 2 want 2 * 2 = 4 => rest 0 (even getal)
    // console.debug(teller, 'wordt overgeslagen aangezien het geen even getal is');
    continue;
  }
  console.log('Even getal', teller);
}

console.log('\n');

let target = 500; // wijzig eventueel deze waarde
let n = 0;

// (opzettelijke) oneindige lus
while (true) {
  n++;
  // console.debug(n);
  if (n === target) {
    break; // spring uit de lus
  }
}

console.log('n heeft het doel bereikt:', n);
