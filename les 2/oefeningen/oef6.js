const array1 = [1, 2, 3, 4, 5];
const array2 = [4, 5, 6, 7, 8];

function findDubbeleArray(array1, array2)
{
    return array1.filter((element) => array2.includes(element))
}

function findDubbeleSet(array1, array2)
{
    let set1 = new Set(array1)
    let set2 = new Set(array2)

    return Array.from(set1.intersection(set2))
}

console.log(array1)
console.log(array2)
console.log(`Gemeenschappelijke elementen (array): ${findDubbeleArray(array1, array2)}`)
console.log('Gemeenschappelijke elementen (set)', findDubbeleSet(array1, array2))