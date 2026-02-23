function reeks(number, operator, stop = 100) {
    let rij = `${number}`
    while (number < stop) {
        number = operator(number)
        rij += ` ${number}`
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

console.log('Kwadraat:')
const kwadraat = reeks(
    2,
    function (number) {
        return number ** 2
    },
    1000)
console.log(kwadraat)