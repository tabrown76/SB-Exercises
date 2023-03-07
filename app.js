// function sum(){
//     return arguments.reduce((sum, val) =>{
//         return sum + val;
//     })
// } //arguments is an 'array like object'; won't work

function sum(){
    const args = Array.from(arguments);
    return args.reduce((sum, val) =>{
        return sum + val;
    })
}

const max = function() {
    const args = Array.from(arguments);
    args.reduce((max, currVal) => {
        return currVal > max ? currVal : max;
    })
}

function sum(...nums){
    return nums.reduce((sum, n) => sum + n);
}

const sumAll = (...values) => {
    if(!values.length) return undefined;
    return values.reduce((sum, n) => sum + n);
}

function makeFamily(parent1, parent2, ...kids){
    return{
        parents: [parent1, parent2],
        children: kids.length ? kids : 0
    };
}

const things = [23, 45, true, false, 0, 'hello', 'goodbye', undefined];
const filterByType = (type, ...vals) => { //rest
    return vals.filter(v => typeof v === type);
}

filterByType('number', ...things); //spread
console.log(...things);

max(...something)
[...something]
{...something}

const nums = [4, 5, 88, 123, 0.92, 34];
Math.max(...nums)

const palette = ['lavender berry', 'sunflower yellow', 'orchid orange'];
const paletteCopy = ['sky blue', ...palette, 'grass green'];

const greenTeas = ['snow jasmine', 'fragrant leaf'];
const oolongTeas = ['honey orchid', 'winter sprout'];
const herbalTeas = ['african solstice', 'marshmallowroot'];
const coffees = ['guatemala red cat', 'snow leopard blend'];

const allTeas = [...greenTeas, ...oolongTeas, ...herbalTeas];

const withCaffeine = [...greenTeas, ...oolongTeas, ...coffees, 'earl gray'];

const vowels = 'aeiou';
const vowelArr = [...vowels, 'sometimes y'];

const tea = {
    type: 'oolong',
    name: 'winter sprout',
    origin: 'taiwan'
};

const teaData = {
    steepTime : '30s',
    brewTemp : 175
}

const tea2 = {...tea};

const teaTin = {...tea, price: 22.99};

const newTea = {...tea, name: 'golden frost'};

const fullTea = {...tea, ...teaData};