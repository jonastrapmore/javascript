let i = 1
let antwoord

do {
  console.log(`Variabele: ${i}`)
  antwoord = confirm('Blijven tellen?')
  i++
} while (antwoord)
