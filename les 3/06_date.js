// Datum voorbeeld 1

// Vraag de datum van vandaag op
const today = new Date();

// Geeft informatie weer in het Engels. Bijvoorbeeld: Wed Mar 31 2021 14:00:00 GMT+0200 (Central European Summer Time)
console.log(`De huidige datetime is:`);
console.log(`  Uitgeprint zonder formatting: ${today}`)

// getDate === dag van de maand
// getMonth === maand (0-11), 0 = januari
const date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
const hour = today.getHours();
const minutes = today.getMinutes().toString().padStart(2, '0'); // Vul de string op met een 0 als het getal 1 cijfer heeft

console.log(`  Via getDate, getMonth, getFullYear, getHours en getMinutes: ${date} ${hour}:${minutes}`);

// Datum voorbeeld 2
/**
 * Given a date, extract the weekday in the given locale as a full-length string.
 *
 * @param date The date for which to retrieve the weekday
 * @param locale The locale with which to format the date. Accepts all ISO 639-1 standard language codes such as
 *              'nl-BE' (Belgian Dutch), 'fr-FR' (French French), 'en-GB' (British English), 'pt-BR' (Brazilian
 *              Portuguese) etc.
 * @return {string} The weekday in the given locale.
 */
function getWeekday(date, locale) {
  return date.toLocaleDateString(locale, {
    weekday: 'long'
  });
}

function getMonth(date, locale) {
  return date.toLocaleDateString(locale, {
    month: 'long'

  });
}

console.log('\nVia toLocaleDateString:');
console.log(`  Het is vandaag ${getWeekday(today, "nl-NL")} ${today.getDate()} ${getMonth(today, "nl-NL")}`);
console.log(`  Aujourdhui, c'est ${getWeekday(today, "fr-FR")} ${today.getDate()} ${getMonth(today, "fr-FR")}`);
console.log(`  Today, the date is ${getWeekday(today, "en-GB")} ${getMonth(today, "en-GB")} ${today.getDate()} `);

const weekday = getWeekday(today, "nl-NL");


// Datum voorbeeld 3
// De Intl (international) formatter is heel gelijkaardig aan de toLocaleDateString methode, met het grote verschil dat
// de Intl formatter herbruikt kan worden en dus sneller is als je meerdere datums moet formatteren.
const formatter = new Intl.DateTimeFormat('sv-SE', {
  weekday: 'long',
  day: '2-digit',
  month: 'long'
});

console.log(`\nVia Intl.DateTimeFormat:\n  ${formatter.format(today)}`);
