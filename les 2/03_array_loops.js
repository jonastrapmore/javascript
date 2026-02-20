const countries = ['Brazil', 'Mexico', , 'Belgium', 'Germany', 'Sweden'];

// FOR
console.log('FOR\n------------')
for (let i = 0; i < countries.length; i++) {
  console.log(countries[i]);
}

// WHILE
console.log('\nWHILE\n------------')
let i = 0;
while (i < countries.length) {
  console.log(countries[i]);
  i++;
}

// DO WHILE
console.log('\nDO WHILE\n------------')
i = 0;
do {
  console.log(countries[i]);
  i++;
} while (i < countries.length);

// FOR...IN
console.log('\nFOR...IN\n------------')
for (const index in countries) {
  console.log(countries[index]);
}

// forEach
console.log('\nforEach\n------------')
// De functionele array methodes nemen een callback functie aan als argument.
// Deze wordt doorgaans meegegeven als een arrow functie.
countries.forEach(val => console.log(val));

console.log('\nforEach met key\n------------')
// De forEach methode kan ook de index van het element meekrijgen.
countries.forEach((val, key) => console.log(key, val));

// FOR...OF
console.log('\nFOR...OF\n------------')
for (const country of countries) {
  console.log(country);
}