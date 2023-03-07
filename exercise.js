// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

const filterOutOdds = (...nums) => nums.filter((num) => num % 2 === 0);

//findMin
const findMin = (...nums) => {
    return nums.reduce((min, val) => (min < val ? min : val));
}

//mergeObjects
const mergeObjects = (objA, objB) => {
    return {...objA, ...objB};
}

//doubleAndReturnArgs
const doubleAndReturnArgs = (arr, ...args) => {
    const doubledArgs = args.map(val => val * 2);
    return [...arr, ...doubledArgs];
}

//slice
//removeRandom
const removeRandom = (...items) => {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items.filter((item, index) => index !== randomIndex);
}

//extend
const extend = (array1, array2) => {
    return [...array1, ...array2];
}

//addKeyVal
const addKeyVal = (obj, key, val) => {
    return {...obj, [key]: val};
}

//removeKey
const removeKey = (obj, key) => {
    const {[key]: _, ...rest} = obj;
    return rest;
}

//combine
const combine = (obj1, obj2) => {
    return {...obj1, ...obj2};
}

//update
const update = (obj, key, val) => {
    return {...obj, [key]: val};
}