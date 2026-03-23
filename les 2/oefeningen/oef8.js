const score = [23, 45, 5, 39, 48, 59, 76, 49, 57, 89, 60, 82]
console.log(`originale cijfers: [ ${score.join(', ')} ]`)
console.log(`op 20: [ ${score.map(x=>x/5).join(', ')} ]`)

const geslaagd = score.filter(x=>x>=50)
const gebuisd = score.filter(x=>x<50)

console.log(`er zijn ${geslaagd.length} geslaagde studenten: [ ${geslaagd.join(', ')} ]`)
console.log(`er zijn ${gebuisd.length} gebuisde student: [ ${gebuisd.join(', ')} ]`)