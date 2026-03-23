const input = prompt("Geef een array in, gescheiden door komma's: ", '')
const array = input.split(',')
if(checkpalindrome(array)){
    console.log('De array is een palindrome')
}else{
    console.log('De array is geen palindrome')
}

function checkpalindrome(array)
{
    for(let i = 0; i < array.length / 2; i++)
    {
        if(array[i] !== array[array.length - 1 - i])
        {
            return false
        }
    }
    return true
}