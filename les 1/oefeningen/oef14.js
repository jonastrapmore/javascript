const getal1 = Number(prompt("Geef een getal:",0));
const getal2 = Number(prompt("Geef nog een getal:",0));

console.log(`de ingegeven getallen zijn ${getal1} en ${getal2}`);
console.log(`De som van de getallen is ${berekenSom(getal1, getal2)}`);
console.log(`Het verschil van de getallen is ${berekenVerschil(getal1, getal2)}`);
console.log(`Het product van de getallen is ${berekenProduct(getal1, getal2)}`);

function berekenSom(a, b){
    return a+b
}

function berekenVerschil(a, b){
    return a-b
}

function berekenProduct(a, b){
    return a*b
}