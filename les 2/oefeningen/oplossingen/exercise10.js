const n = Number(prompt('Up until which number do you want to find all prime numbers?'))

const primes = Array(n + 1).fill(true).map((_,i) => (i % 2 !== 0 || i === 2) && i >= 2);
let maxLength = 1

for (let p = 3; p < n; p += 2) {
  for (let q = Math.pow(p, 2); q <= n; q += 2*p) {
    primes[q] = false;
  }

  maxLength = p.toString().length
}

const finalPrimes = []
primes.forEach((isPrime, i) => {
  if (isPrime) finalPrimes.push(i)
})

console.log()
const rowSize = 20
for (let i = rowSize; i < finalPrimes.length; i += rowSize) {
  const row = finalPrimes.slice(i - rowSize, i).map(x => x.toString().padEnd(maxLength, ' ')).join(' ')
  console.log(row)
}

