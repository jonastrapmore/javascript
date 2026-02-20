// Vraag invoer aan de gebruiker, de tweede (optionele) parameter is de default waarde.
const postcode = prompt('Vul uw postcode in:', '2440');

// Vraag bevestiging aan de gebruiker, default is false (nee).
const success = confirm(`Is ${postcode} de correcte postcode?`);
console.log('Success:', success)
