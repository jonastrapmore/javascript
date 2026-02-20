const number = Number(prompt('Geef een getal:'));

// Een switch werkt op basis van gelijkheid.
// In dit geval willen we op condities testen, de switch waarde wordt true, en elke case wordt een conditie.
// De conditie die eerst true is, wordt uitgevoerd.
switch (true) {
  case (0 <= number && number < 1000):
    console.log('Kleiner dan 1000');
    break;
  case (1000 <= number && number < 2000):
    console.log('Tussen 1000 en 2000');
    break;
  case (2000 <= number && number < 3000):
    console.log('Tussen 2000 en 3000');
    break;
  default:
    console.log('???');
    break;
}

// In dit geval kies je beter voor de if-structuur.
// Onderstaande code is veel beter leesbaar.

if (0 <= number && number < 1000) {
  console.log('Kleiner dan 1000');
} else if (1000 <= number && number < 2000) {
  console.log('Tussen 1000 en 2000');
} else if (2000 <= number && number < 3000) {
  console.log('Tussen 2000 en 3000');
} else {
  console.log('???');
}