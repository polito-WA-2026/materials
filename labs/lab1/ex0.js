/* 
Create a function that, given an array of strings, for each string computes and prints a new one composed by
the first two and last two characters. For instance, ‘spring’ yields ‘spng’.
*/

function removeCharacters(string) {
    if (string.length < 2) {
        return " ";
    }
    return string.slice(0, 2) + string.slice(-2,);
}

string1 = "spring";
string1 = "d"
string1 = "ca"
string1 = "cat"
string2 = removeCharacters(string1)
console.log(string2)

function removeCharactersFromArray(array) {
    for (let i = 0; i < array.length; i++) {
        array[i] = removeCharacters(array[i]);
    }
    return array;
}

array1 = ["spring", "summer", "autumn", "winter"];
array2 = removeCharactersFromArray(array1);
console.log(array2)

