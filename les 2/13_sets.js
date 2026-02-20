// Een set is een collectie van unieke elementen, er kunnen dus geen dubbele elementen in een set zitten.
// In vergelijking met een array is het voor een set veel sneller om te controleren of een element in de set zit.
// Als de volgorde van de elementen niet belangrijk is gebruik je dus beter een set dan een array.

// Een lege set
const emptySet = new Set();

// Een set met een aantal elementen
const languages = new Set(['JavaScript', 'Python', 'Java', 'C++', 'JavaScript']);
console.log(languages);

// Voeg een element toe aan de set
languages.add('C#');

// Verwijder een element uit de set
languages.delete('Java');

// Controleer of een element in de set zit
console.log('Python in set: ', languages.has('Python'));

// Itereren over de set
console.log('Talen in de set:')
for (const language of languages) {
  console.log(language);
}

