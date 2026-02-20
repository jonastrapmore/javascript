const leeftijden = [32, 33, 16, 40, 7, 56];

function isMeerderjarig(leeftijd) {
  return leeftijd >= 18;
}

// Beide opties zijn equivalent, hier zou de tweede optie de voorkeur genieten
// omdat deze korter en duidelijker is en de isMeerderjarig heel weinig code bevat.
const meerderjarigen = leeftijden.filter(isMeerderjarig);
const meerderjarigen2 = leeftijden.filter(leeftijd => leeftijd >= 18);

console.log('Meerderjarigen:', meerderjarigen);
console.log('Meerderjarigen2:', meerderjarigen2);