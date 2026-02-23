const getal = Number(prompt('Geef een getal in:'))

for (let i = 1; i <= getal; i++) {
    let uitvoer = `${(i + ':').padEnd(5, ' ')} `
    let tussenuitkomst = i

    do {
        uitvoer += tussenuitkomst.toString().padEnd(5, ' ')
        if (tussenuitkomst === 1) {
            break
        }
        tussenuitkomst = tussenuitkomst % 2 === 0 ? tussenuitkomst / 2 : 3 * tussenuitkomst + 1
    } while (true)
    console.log(uitvoer)
}