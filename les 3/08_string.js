// Voorbeeld constructor object String vs primitive string

// Genereer een nieuwe object String
const a = new String('Thomas More');
// Genereer een primitive string
const b = 'Thomas More';
// Genereer een primitive string
const c = String(('Thomas More'));
console.log('Object String:', typeof a);
console.log('Primitive string: ', typeof b);
console.log('Primitive string v2: ', typeof c);


// Voorbeeld 2
console.log('\nVoorbeeld 2:');

function checkMail(mailadres) {
  let resultaat = "";

  // Zoekt naar karakter(s) in een string, start op 0, geeft -1 terug als het karakter niet gevonden wordt.
  if (mailadres.length === 0) {
    resultaat = "Gelieve een mailadres in te vullen";
  } else if (mailadres.search('@') === -1) {
    resultaat = "Dit is geen geldig mailadres";
  } else if ((mailadres.search('@') >= 0) && (mailadres.indexOf("@") > mailadres.lastIndexOf("."))) {
    resultaat = "Het punt staat voor het @-teken. Dit is geen geldig mailadres";
  } else {
    //mailadres = mailadres.replace('@', ' AT ');
    mailadres = mailadres.replace('@', ' AT ').replaceAll('.', ' DOT ');
    resultaat = 'Gecodeerd adres: ' + mailadres;
  }
  return resultaat;
}

console.log('Input: ""\n Output:', checkMail(""))
console.log('Input: "thomas"\n Output:', checkMail("thomas"))
console.log('Input: "be.thomasmore@alanTuring"\n Output:', checkMail("be.thomasmore@alanTuring"))
console.log('Input: "alanTuring@thomasmore.be"\n Output:', checkMail("alanTuring@thomasmore.be"))


// Voorbeeld 3
console.log('\nVoorbeeld 3:');

function vervang(inputTekst) {
  return inputTekst.replaceAll("JavaScript", "TypeScript");
}

const inputTekst = `JavaScript is een scripttaal die veel gebruikt wordt om webpagina's interactief te maken en webapplicaties te ontwikkelen. Events vormen het hart van een JavaScript-pagina. Event-handling staat toe dat de JavaScript opdrachten op het juiste moment worden uitgevoerd, wanneer de juiste gebeurtenis heeft plaatsgevonden.`
console.log('Input:', inputTekst);
console.log('\nOutput:', vervang(inputTekst));