const thehobit = {
    title: 'The Hobbit',
    author: 'J.R.R Tolkien',
    published: 1937,
    getinfo,
}

const ninetheenEightFour = {
    title: '1984',
    author: 'George Orwell',
    published: 1949,
    wordCount: 88900,
    getinfo,
}

const prideAndPrejudice = {
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    published: 1813,
    wordCount: 124713,
    getinfo,
}

function getinfo(){
    if (this.wordCount !== undefined) {
        return `${this.title} by ${this.author}, published in ${this.published} (${this.wordCount} words)`
    }

    return `${this.title} by ${this.author}, published in ${this.published}`
}

console.log(thehobit.getinfo())
console.log(ninetheenEightFour.getinfo())
console.log(prideAndPrejudice.getinfo())

thehobit.wordCount = 95356
console.log(thehobit.getinfo())