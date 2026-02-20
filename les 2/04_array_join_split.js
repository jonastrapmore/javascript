// Array.join - voegt elementen samen tot een string.
const mijnArray = ['info@tm.be','admin@tm.be','support@tm.be'];
console.log(mijnArray.join());
console.log(mijnArray.join(";"));

// Omgekeerd: string.split(), splits een string naar een array
const emails  = "info@tm.be;admin@tm.be;support@tm.be";
const mijnMails = emails.split(";");
console.log(mijnMails);
