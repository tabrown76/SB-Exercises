const {square} = require('./square');

describe('square function', function(){
    test('should square a number', function(){
        const res = square(3);
        expect(res).toEqual(9);
    })
    
    test('should square negative numbers', function(){
        const res = square(-9);
        expect(res).toEqual(81);
    })
})
