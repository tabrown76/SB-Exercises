const teaOrder = {
    variety : 'oolong',
    teaName : 'winter sprout',
    origin : 'taiwan',
    price : 12.99,
    hasCaffeine : true,
    quantity : 3
};

// const price = teaOrder.price;
// const quantity = teaOrder.quantity;
// const teaName = teaOrder.teaName;

const {price, quantity, ...others} = teaOrder;

const {brewTemp = 175} = teaOrder;

const {teaName: tea} = teaOrder;

function checkout(tea){
    const {quantity, price} = teaOrder;
    return quantity * price;
}

const students = [
    {name: 'Drake', gpa: 4.6},
    {name: 'Henrietta', gpa: 4.4},
    {name: 'Tung', gpa: 4.0},
    {name: 'Harry', gpa: 3.8},
    {name: 'Ant', gpa: 3.2}
];

const [topStudent, secondBest,, fourth] = students;
const [first, ...losers] = students;
const fifth = students[4];

const order2 = {
    variety : 'green',
    teaName : 'silver needle',
    origin : 'taiwan',
    price : 12.99,
    hasCaffeine : true
};

function checkout(tea){
    const {quantity, price} = teaOrder;
    return quantity * price;
}

function getTotal({quantity: qty = 1 , price}){
    return qty * price;
}

const longJumpResults = ['Tammy', 'Jessica', 'Violet'];
const swimMeetResults = ['Japan', 'France', 'Chile'];

function awardMedals([gold, silver, bronze]){
    return {
        gold, silver, bronze
    };
}

// const {Rated} = movie;
// const {rating, advisory} = movie;

Ratings: [
    {Source: 'Internet Movie Database', Value: '8.3/10'},
    {Source: 'Rotten Tomatoes', Value: '93%'},
    {Source: 'Metacritic', Value: '88/100'}
]

const {Rated: {rating, advisory}} = movie;

const {Ratings: [{Value: imdbRating}, {Value: rtRating}, {Value: metaRating}]} = movie;

let delicious = 'Mayonnaise';
let disgusting = 'Whipped Cream';

// let temp = delicious;
// delicious = disgusting;
// disgusting = temp;

// let both = [delicious, disgusting];
// [disgusting, delicious] = both;

[disgusting, delicious] = [delicious, disgusting];