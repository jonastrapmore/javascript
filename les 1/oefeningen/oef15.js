const getal = Number(prompt('Geef een getal in:',"7"))
console.log(berekenTafel(getal))




function berekenTafel(getal) {
    let uitvoer = ''
    for (let i = 1; i <= 10; i++) {
        uitvoer += `${getal} x ${i} = ${getal * i}\n`
    }
    return uitvoer
}