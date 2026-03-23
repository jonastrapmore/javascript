const zin = prompt("Geef een zin in: ")
const zinArray = zin.split('')
const output = []

zinArray.forEach(letter => {
    if (letter === ' ') {
        output.push(letter)
    } else {
        output.push(String.fromCharCode(((letter.charCodeAt(0) - 97 + 3) % 26) + 97))
    }
})

console.log(output.join(''))