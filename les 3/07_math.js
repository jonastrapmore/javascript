// Voorbeeld 1: volume cilinder

function berekenVolumeCilinder(straal, hoogte) {
  let volume = Math.pow(straal, 2) * Math.PI * hoogte;
  // Afronden op 2 decimalen
  volume = Math.round(volume * 100) / 100;

  // Afronden op 2 decimalen, gebruik Number object methode ToFixed
  // volume = volume.toFixed(2);

  return volume;
}

console.log(`Het volume van een cilinder met een straal van 10cm en een hoogte van 5cm is ${berekenVolumeCilinder(10, 5)}cm³`);

// Voorbeeld 2: dobbelstenen

function gooiDobbelstenen() {
  return [randomIntFromInterval(1, 6), randomIntFromInterval(1, 6), randomIntFromInterval(1, 6)];
}

/**
 * Genereer een willekeurig geheel getal tussen minimum en maximum. (inclusief).
 *
 * @param minimum Het minimum getal
 * @param maximum Het maximum getal
 * @return {number} Het willekeurige getal
 */
function randomIntFromInterval(minimum, maximum) {
  // Genereer een willekeurig getal tussen 0 (inclusief) en 1 (exclusief)
  const randomDecimal = Math.random();

  // Schaal dit getal naar het bereik tussen minimum en maximum
  // Het bereik wordt bepaald door (maximum - minimum + 1)
  // Dit zorgt ervoor dat alle gehele getallen tussen minimum en maximum kunnen worden gegenereerd.
  const scaledRandom = randomDecimal * (maximum - minimum + 1);

  // Verschuif het bereik, zodat het begint bij minimum in plaats van bij 0.
  const shiftedRandom = scaledRandom + minimum;

  // Afronden naar beneden (naar het dichtstbijzijnde gehele getal)
  // zodat de functie een integer retourneert binnen het bereik [minimum, maximum]
  return Math.floor(shiftedRandom);
}


console.log(`De dobbelstenen tonen ${gooiDobbelstenen().join(', ')}`);