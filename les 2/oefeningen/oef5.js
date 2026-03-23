const groente = new Set()
const fruit = new Set()


let invoer = prompt("Geef een fruit of groente in, of druk op enter om te stoppen:", '')
while(invoer !== '')
{
    let split = invoer.split(' ')
    if(split.length === 2 && split[0] ==='g')
    {
        groente.add(split[1])
    } else if (split.length ===2 && split[0] === 'f')
    {
        fruit.add(split[1])
    }
    invoer = prompt("Geef een fruit of groente in, of druk op enter om te stoppen:", '')
}

console.log('Groenten:', groente)
console.log('Fruit:', fruit)