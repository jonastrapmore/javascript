const dag = prompt("Geef de dag in");
const uitspraak = (dag === "zaterdag" || dag === "zondag") ? "Het is weekend" : "Helaas, nog even werken";
console.log(uitspraak);