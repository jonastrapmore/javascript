// Een object is een manier om data die samen hoort te groeperen.

// Een leeg object zonder waarden, kunnen later toegevoegd worden
const emptyObject = {}

// Een object met twee properties.
const person = {
  firstName: 'Alan',
  name: 'Turing',
}

// Een object met vijf properties, waarvan er één een methode is.
const alan = {
  firstName: 'Alan',
  name: 'Turing',
  birthYear: 1912,
  deathYear: 1954,
  age() {
    // Om andere eigenschappen in het object te gebruiken moet je de this.propertyName syntax gebruiken.
    return this.deathYear - this.birthYear;
  },
}

// Via de puntnotatie en array (vierkante haken) notatie, kunnen properties en methodes uitgelezen en aangepast worden.

// Properties kunnen aangepast worden door de huidige waarde te overschrijven of een nieuwe property toe te voegen.
alan.name = 'TURING';
alan.accomplishments = 'Turing Machine, Enigma Codebreaker';

// Gebruik zoveel mogelijk deze manier (puntnotatie) om properties/methodes te gebruiken.
// Deze syntax is veel properder en leesbaarder.
console.log(
  `${alan.firstName} ${alan.name} was born in ${alan.birthYear} and died in ${alan.deathYear} at age ${alan.age()}.`
);

// Gebruik de syntax met vierkante haken als de property niet hardcoded is, maar uit een variabele komt.
console.log(
  `${alan['firstName']} ${alan['name']} was born in ${alan['birthYear']} and died in ${alan['deathYear']} at age ${alan['age']()}.`
);

