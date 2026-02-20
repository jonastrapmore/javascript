// 1. Initialisaties
const question = 'Hoeveel is 20 + 60 ?';
const answer = 80;
const correct = 'Prima, ga zo door!';
const wrong  = 'Jammer, volgende keer beter!';

// 2. Vraag stellen
const response = Number(prompt(question, '0'));

// 3. Controleer het antwoord
const result = (response === answer) ? correct : wrong;

// 4. Schrijf resultaat naar de terminal
console.log(result);