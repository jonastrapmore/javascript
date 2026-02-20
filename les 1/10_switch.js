// Stel dat de variabele kleur elders in het script de waarde "blauw" heeft gekregen
const kleur = prompt('Kies een kleur: ', 'rood');
let hex;

switch (kleur) {
  case 'rood':
    // Start hier als de kleur rood is.
    hex = '#FF0000';
    break; // Stop hier
  case 'groen':
    // Start hier als de kleur groen is.
    hex = '#00FF00';
    break;
  case 'blauw':
    // Start hier als de kleur blauw is.
    hex = '#0000FF';
    break;
  default:
    // Voer deze code als de kleur niet gekend is.
    hex = undefined;
}

console.log(`De hexadecimale waarde van ${kleur} is ${hex}`);