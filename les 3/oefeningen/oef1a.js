const thehobit = {
    title: 'The Hobbit',
    author: 'J.R.R Tolkien',
    published: 1937,
}

const ninetheenEightFour = {
    title: '1984',
    author: 'George Orwell',
    published: 1949,
    wordCount: 88900,
}

const prideAndPrejudice = {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    published: 1813,
    wordCount: 124713,
}

console.log(thehobit)
console.log(ninetheenEightFour)
console.log(prideAndPrejudice)

console.log(`Totaal woorden 1984 en P&P: ${ninetheenEightFour.wordCount + prideAndPrejudice.wordCount}`)