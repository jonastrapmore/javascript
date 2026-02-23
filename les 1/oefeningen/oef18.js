function reeks(number, operator, stop = 100) {
    let rij = `${number}`
    let stap = 0
    while (number < stop) {
        number = operator(number, stap)
        rij += ` ${number}`
        stap++
    }
    return rij;
}

console.log('Maal 2:')
const maal2 = reeks(
    1,
    function (number) {
        return number * 2
    })
console.log(maal2)

console.log('Afwisselend plus 5 en min 2 (grens op 30):')
const afwisselend = reeks(
    2,
    function (number, stap) {
        if (stap % 2 === 0) {
            return number + 5;
        } else {
            return number - 2;
        }
    },
    30)
console.log(afwisselend)