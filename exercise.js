//1
undefined
undefined

//2
{yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

//3
'Your name is Alejandro and you like purple.'
'Your name is Melissa and you like green.'
'Your name is undefined and you like green.'

//4
Maya
Marisa
Chi

//5
Raindrops on roses
Whiskers on kittens
["Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]

//6
[10, 30, 20]

const obj = {
    numbers: {
        a: 1,
        b: 2
    }
};

const {a, b} = obj.numbers;

//7
let arr = [1, 2];
[1, 2] = [2, 1];

//8
const raceResults = ([first, second, third, ...rest]) => ({ first, second, third, rest });