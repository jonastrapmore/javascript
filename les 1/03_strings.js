// ------- Strings -------------------------
const string = 'The revolution will not be televised.';

// Foutief
// const badString1 = This is a test;
// const badString2 = 'This is a test;
// const badString3 = This is a test ';

// Single quotes vs. double quotes
const sgl = 'Single quotes.';
const dbl = "Double quotes";

// Single quotes in double en omgekeerd
const sglDbl = 'Would you eat a "fish supper"?';
const dblSgl = "I'm feeling blue.";

// Een single-quoted sting kan geen single quote bevatten tenzij je een escape character gebruikt.
const bigmouth = 'I\'ve got no right to take my place...';

// Concatenating strings
const one = 'Hello, ';
const two = 'how are you?';
const joined = one + two;

// Afwisselen variabele en tekst.
const response = one + 'I am fine — ' + two;


// -------  Template literals -------------------------

// Gebruik maken van backtick characters (` `)
// Kunnen variabelen bevatten zonder
let song = 'Fight the Youth'; // Regular string
song = `Fight the Youth`; // Template literal

const score = 9;
const highestScore = 10;
let output;
// Schakelen met de + operator tussen tekst en variabelen
output = 'I like the song "' + song + '". I gave it a score of ' + (score / highestScore * 100) + '%.';

// Zelfde code maar met Template literals
output = `I like the song "${song}". I gave it a score of ${score/highestScore * 100}%.`;

// Wanneer je een line-break wilt toevoegen, kun je gebruik maken van de \n
output = 'I like the song "' + song + '".\nI gave it a score of ' + (score / highestScore * 100) + '%.';

// Template literals respecteren de line breaks in jouw code
output = `I like the song "${song}".
        I gave it a score of ${score/highestScore * 100}%.`;

console.log(output)