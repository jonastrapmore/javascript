let num = 13;

if (num > 10) {
  console.log("Het nummer is groter dan 10");
} else if (num === 10) {
  console.log("Het nummer is gelijk aan 10");
} else if (num < 10) {
  console.log("Het nummer is kleiner dan 10");
} else {
  console.log("Het nummer is geen getal");
}

const name = "Jeroen";
const age = 42;
const myName = "Jeroen";
const myAge = 42;

// Accolades zijn optioneel als er maar 1 statement is, maar het is een goede gewoonte om ze altijd te gebruiken.
if (name === myName && age === myAge) console.log("Ben jij mijn dubbelganger?")

if (name === myName && age === myAge)
  console.log("Ben jij mijn dubbelganger?")
