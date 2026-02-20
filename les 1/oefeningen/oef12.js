/*
In een natuurpark zijn 50 leeuwen aanwezig. Het aantal groeit jaarlijks met 15%. Ga na hoelang het duurt vooraleer er meer dan 1000 zijn.

Stel, voordat je de berekening uitvoert, de vraag of dat het jaartal getoond moet worden. 
Als dit zo is, moet je voor elk jaar uitprinten hoeveel leeuwen er zijn. Als het jaartal niet getoond moet worden, print je de hoeveelheid leeuwen op één lijn achter elkaar uit.
*/
const toonJaren = confirm('Wil je het aantal jaren zien?')

let leeuwen = 50
let jaar = 0
let uitvoer = `${leeuwen} `

while (leeuwen < 1000) {
  jaar += 1
  leeuwen = Math.floor(leeuwen * 1.15)
  uitvoer += `${leeuwen} `

  if (toonJaren) {
    console.log(`${jaar}: ${leeuwen}`)
  }
}

if (!toonJaren) {
  console.log(uitvoer)
}