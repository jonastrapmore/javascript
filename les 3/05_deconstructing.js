const alan = {
  firstName: 'Alan',
  name: 'Turing',
  birthYear: 1912,
  deathYear: 1954,
  age() {
    return this.deathYear - this.birthYear;
  },
}

// Deconstructing syntax kan gebruikt worden om de properties uit een object te halen en in variabelen te steken.
// Het is belangrijk dat je hierbij dezelfde property namen gebruikt.
// De volgorde van de properties is niet belangrijk.
// Je moet enkel de properties vermelden die je nodig hebt, hieronder wordt age() niet bewaard in een variabele.
const { birthYear, deathYear, firstName, name } = alan;
console.log(`${firstName} ${name} was born in ${birthYear} and died in ${deathYear}.`);


const accomplishments = ['Turing machine', 'Enigma code breaking', 'Turing test'];
// Deconstructing kan ook gebruikt worden om de elementen van een array te bewaren in variabelen.
// Je kan de elementen die je niet nodig hebt overslaan door een komma te plaatsen.
// In tegenstelling tot een object, is de volgorde bij deconstructing met array wel belangrijk.
// De naamgeving is daarentegen niet belangrijk, je kan eender welke naam gebruiken voor de elementen uit de array.
const [firstAccomplishment, , accomplishment3] = accomplishments;
console.log(firstAccomplishment, accomplishment3)

// Je moet enkel de properties vermelden die je nodig hebt, hieronder worden het tweede en derde element in de array genegeerd.
const [theFirstAccomplishment] = accomplishments;
console.log(theFirstAccomplishment)

