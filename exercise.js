//1
{1, 2, 3, 4}

//2
"ref"

//3
{
    [[1, 2, 3], true],
    [[1, 2, 3], false]
}

//4
const hasDuplicate = (arr) => {
    return new Set(arr).size === arr.length;
}

//5
const vowelCount = (str) => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const newMap = new Map();

   for(let i = 0; i < str.length; i++){
    let char = str[i].toLowerCase();
    if(vowels.includes(char)){
        if(newMap.has(char)){
            newMap.set(char, newMap.get(char) +1);
        } else{
            newMap.set(char, 1);
        }
    }
   }
    return newMap;
}