// Array.sort - sorteert de elementen in de array op ALFABETISCHE volgorde.
// Eerst hoofdletters A-Z, dan a-z
const kleuren = ["rood", "geel", "blauw", "groen", "zwart", "wit"];
kleuren.sort();
console.log('Gesorteerde kleuren:\n  ', kleuren);

// Cijfers worden ook vergeleken op basis van de ASCII tabel.
// Daardoor is 1 < 10000 < 20 < 32 < 4 < 5
const getallen = [5, 4, 10000, 20, 1, 32, 4];
getallen.sort();
console.log('Gesorteerde getallen:\n  ', getallen);