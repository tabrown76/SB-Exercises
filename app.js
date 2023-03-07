const dailyRainTotals = [[1.2, 0.35, 2.2], [1.7, 0.6, 0.1], [2.5, 0.9, 1.5]];

// dailyRainTotals.map((hourlyRainTotals) => {
//     return hourlyRainTotals.reduce((sum, inchesOfRain) => {
//         return sum + inchesOfRain;
//     })
// })

dailyRainTotals.map((hourlyRainTotals) => hourlyRainTotals.reduce((sum, inchesOfRain) => sum + inchesOfRain));

// const makeMath = (num) => {
//     return {
//         square: num * num,
//         double: num * 2
//     };
// };

const makeMath = (num) => 
    ({
        square: num * num,
        double: num * 2
    }); //for objects/object literals, must include parens

// const cat = {
//     name: 'Bubs',
//     meow: function(){
//         return `${this.name} says MEOW!!`;
//     }
// };

const cat = {
    name: 'Bubs',
    meow: () => {
        return `${this.name} says MEOW!!`;
    }
}; //don't use 'this' w/an arrow function

