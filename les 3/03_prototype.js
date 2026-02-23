// JavaScript maakt gebruik van prototype inheritance.
// Door een property toe te voegen aan Object.prototype, wordt deze property toegevoegd aan alle onderliggende objecten.

// Voeg twee debugging prototypes toe aan Object.prototype.
// Deze methodes zijn beschikbaar voor alle objecten.
Object.prototype.objectName = 'UNKNOWN';
Object.prototype.debug = function() {
  console.log(`-------------${this.objectName}-------------`);
  console.log(this)
  console.log('--------------------------------------------');
}

const alan = {
  objectName: 'Alan Turing Object',
  name: {
    first: 'Alan',
    last: 'Turing',
  },
  life: {
    birth: 1912,
    death: 1954,
  },
  age() {
    return this.life.death - this.life.birth;
  },
  accomplishments: [
    'Turing Machine',
    'Enigma Codebreaker',
  ],
}

// Deze methode werkt om dat alan een object is en alle objecten de debug methode hebben in hun prototype.
alan.debug();

// Elk object heeft een prototype, je kan elke soort object uitbreiden met nieuwe methodes, niet enkel de bestaande
// objecten.
Array.prototype.keepEven = function() {
  return this.filter(i => i % 2 === 0);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log(numbers.keepEven());