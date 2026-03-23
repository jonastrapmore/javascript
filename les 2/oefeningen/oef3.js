const nummers = []

//invoeren van de getallen tot je op enter drukt
let invoer = prompt("Geef een getal in, of druk op enter om te stoppen:", '')
while(invoer !== '')
{
    let parsedNumer = Number(invoer)
    if(!Number.isNaN(parsedNumer))
    {
        nummers.push(parsedNumer)
    }
    invoer = prompt("Geef een getal in, of druk op enter om te stoppen:", '')
}

//min en max zoeken
let min = nummers[0]
let max = nummers[0]
for(const nummer of nummers)
{
    if (nummer > max) 
    {
        max = nummer
    }
    if (nummer < min)
    {
        min = nummer
    }
}

//som maken van de getallen
let som = nummers.reduce((total, num) => total + num, 0)

//gemiddele van de getallen
let gem = som / nummers.length

//mediaan zoeken
nummers.sort((a,b) => a-b)
let mediaan = 0
if(nummers.length %2 === 0)
{
    const middelste = nummers.length / 2
    mediaan = (nummers[middelste -1] + nummers[middelste]) /2
}
else
{
    mediaan = nummers[(numbers.length/2) - 0.5]
}

//uiteschrijven naar scherm
console.log(`Je hebt volgende getallen ingegeven: ${nummers}`)
console.log(`Het kleinste getal is: ${min}`)
console.log(`Het grootste getal is: ${max}`)
console.log(`De som van de getallen: ${som}`)
console.log(`Het gemiddelde van getallen is: ${gem}`)
console.log(`de mediaan ${mediaan}`)