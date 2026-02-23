Object.prototype.objectName = 'UNKNOWN';
Object.prototype.debug = function() {
  console.log(`-------------${this.objectName}-------------`);
  console.log(this)
  console.log('--------------------------------------------');
}

const alan = {
  firstName: 'Alan',
  name: 'Turing',
  birthYear: 1912,
  deathYear: 1954,
  age() {
    return this.deathYear - this.birthYear;
  },
}

console.log('Print alle properties via for...in:')
// Onderstaande lus itereert over alle properties van het object alan.
// De variabele bevat de naam van de property, die vervolgens gebruikt kan worden om de waarde van de property uit te lezen.
for (const property in alan) {
  // De for-in lus kan een fout resultaat opleveren omdat deze lus ook door de properties van alle bovenliggende objecten
  // itereert en dit meestal niet het beoogde resultaat is.
  // Onderstaand log statement print dus ook de objectName en debug properties uit.
  console.log('  ' + property + ':', alan[property]);
}

console.log('\nPrint alle properties via for...in met een hasOwnProperty check:')
for (const property in alan) {
  // Print enkel de properties van dit object, niet diegene in het prototype.
  if (alan.hasOwnProperty(property)) {
    console.log('  ' + property + ':', alan[property]);
  }
}


// Gebruik best altijd de Object.entries, Object.keys of Object.values methodes om over objecten te itereren.
// Deze zullen de properties uit het prototype nooit meenemen.
console.log('\nPrint alle properties via Object.entries:')
for (const item of Object.entries(alan)) {
  // Item is een array met twee elementen, de eerste is de property naam en de tweede is de waarde.
  console.log('  ' + item[0] + ':', item[1]);
}

console.log('\nPrint alle properties via Object.keys:')
for (const key of Object.keys(alan)) {
  // Object.keys geeft een array terug met alle property namen.
  console.log('  ' + key + ':', alan[key]);
}

console.log('\nPrint alle WAARDES via Object.values:')
for (const value of Object.values(alan)) {
  // Object.values geeft een array terug met alle property waarden.
  // De keys zijn niet beschikbaar in deze array.
  console.log('  ' + value);
}