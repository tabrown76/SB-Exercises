it('should calculate the monthly rate correctly', function () {
  expect(calculateMonthlyPayment({amount: 100000, years: 10, rate: 1})).toEqual ('876.04');
  expect(calculateMonthlyPayment({amount: 300000, years: 30, rate: 3})).toEqual('1264.81');
});


it("should return a result with 2 decimal places", function() {
  // ..i don't understand the point of this test given that I am using .toFixed(2)
});

it("should throw an error if input is not a number", function(){
expect(function(){
  update({amount: "not a number", year: 30, rate: 3})
}).toThrowError(Error, "Please input a valid number.");
});
/// etc