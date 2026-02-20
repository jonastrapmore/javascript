// We initialiseren een array van 10 elementen met nullen
const simpelArray = new Array(10).fill(0);
console.log(simpelArray);

// We initialiseren een array van 10 elementen met een lege string.
// Daarna vullen we deze vanaf de 3e index (incl.) tot de laatste (excl.) op met de string 'test'.
const stringArray = new Array(10).fill('');
stringArray.fill('test', 3, stringArray.length);
console.log(stringArray);