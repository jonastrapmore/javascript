// Variabelen declareren

// Er is in JavaScript geen onderscheid tussen een integer en een float, double, ...
let getal1 = 17;                              // Een number, wordt later nog aangepast, daarom let.
const getal2 = 3;                             // Een number, wordt later niet meer aangepast, daarom const.
const getal3 = 3.14;                          // Een number

const string1 = 'dag';                        // Single-quoted string
const string2 = "Jan";                        // Double-quoted string
const string3 = '17';
const string4 = '3';
const string5 = `${getal1} ${string2} 2024`;  // Template string

const bool1 = true;
const bool2 = false;

let var1;                                     // Gedeclareerde variabele die later een waarde krijgt
const var2 = null;

console.log('Datatypes controleren');
console.log('getal1:', typeof getal1);        // Resultaat: 'number'
console.log('getal2:', typeof getal2);        // Resultaat: 'number'
console.log('getal3:', typeof getal3);        // Resultaat: 'number'
console.log('string1:', typeof string1);      // Resultaat: 'string'
console.log('string2:', typeof string2);      // Resultaat: 'string'
console.log('string3:', typeof string3);      // Resultaat: 'string'
console.log('string4:', typeof string4);      // Resultaat: 'string'
console.log('string5:', typeof string5);      // Resultaat: 'string'
console.log('bool1:', typeof bool1);          // Resultaat: 'boolean'
console.log('bool2:', typeof bool2);          // Resultaat: 'boolean'

// \n print een lege lijn uit.
console.log('\nRekenkundige operatoren')
console.log('getal1 + getal2:', getal1 + getal2);                       // Resultaat: 20
console.log('getal1 - getal2:', getal1 - getal2);                       // Resultaat: 14
console.log('getal1 * getal2:', getal1 * getal2);                       // Resultaat: 51
console.log('getal1 / getal2:', getal1 / getal2);                       // Resultaat: 5.66
console.log('getal1 % getal2:', getal1 % getal2);                       // Resultaat: 2
console.log('getal1 ** 2 (getal1 tot de tweede macht):', getal1 ** 2);  // Resultaat: 289

console.log('\nIncrements');
console.log('Pre-increment: eerst + 1, dan tonen - ++getal1:', ++getal1);   // Resultaat: 18
console.log('Post-increment: eerst tonen, dan + 1 - getal1++:', getal1++);  // Resultaat: 18
console.log('Vorige increment is nu pas zichtbaar:', getal1);               // Resultaat: 19
console.log('Pre-decrement: eerst - 1, dan tonen - --getal1:', --getal1);   // Resultaat: 18
console.log('Post-decrement: eerst tonen, dan - 1 - getal1--:', getal1--);  // Resultaat: 18
console.log('Vorige decrement is nu pas zichtbaar:', getal1);               // Resultaat: 17

console.log('\nVergelijkingsoperatoren');
console.log('getal1 == getal2:', getal1 == getal2);         // Resultaat: false
console.log('!(getal1 == getal2):', !(getal1 == getal2));   // Resultaat: true
console.log('getal1 != getal2:', getal1 != getal2);         // Resultaat: true
console.log('getal1 > getal2:', getal1 > getal2);           // Resultaat: true
console.log('getal1 >= getal2:', getal1 >= getal2);         // Resultaat: true
console.log('getal1 < getal2:', getal1 < getal2);           // Resultaat: false
console.log('getal1 <= getal2:', getal1 <= getal2);         // Resultaat: false
console.log('getal1 == string3:', getal1 == string3);       // Resultaat: true
console.log('getal1 === string3:', getal1 === string3);     // Resultaat: false, === controleert ook het datatype

console.log('\nConverteren van strings naar getallen');
console.log('Number(string3):', Number(string3));     // Resultaat: 17
console.log('Number(30 40 50):', Number('30 40 50')); // Resultaat: NaN

console.log('\nLogische operatoren');
console.log('bool1 && bool2:', bool1 && bool2);             // Resultaat: false
console.log('bool1 || bool2:', bool1 || bool2);             // Resultaat: true

console.log('\nString operatoren');
console.log('string1 + string2:', string1 + string2);       // Resultaat: 'dagJan'

