describe("sumPaymentTotal function", function() {
    beforeEach(function () {
      // setup logic
      allPayments = {
        payment1: {
          billAmt: 50,
          tipAmt: 10,
          tipPercent: 20
        },
        payment2: {
          billAmt: 30,
          tipAmt: 6,
          tipPercent: 20
        },
        payment3: {
          billAmt: 25,
          tipAmt: 5,
          tipPercent: 20
        }
      };
    });
  
    it('should return the sum of all tip amounts with key "tipAmt"', function () {
      let result = sumPaymentTotal('tipAmt');
      expect(result).toEqual(21);
    });
  
    afterEach(function() {
      // teardown logic
      allPayments = {};
    });
});

describe("calculateTipPercent function", function() {
    it("should calculate tip percentage correctly", function() {
      let billAmt = 50;
      let tipAmt = 10;
      let expectedPercent = 20;
  
      expect(calculateTipPercent(billAmt, tipAmt)).toEqual(expectedPercent);
    });
  
    afterEach(function() {
      // reset allPayments and paymentId
      allPayments = {};
      paymentId = 0;
  
      // reset paymentTable and summaryTable
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
    });
});
  
describe("appendTd", function() {
    let tr;
  
    beforeEach(function() {
      tr = document.createElement('tr');
    });
  
    afterEach(function() {
      tr.innerHTML = '';
    });
  
    it("should append a new td element to the given tr element", function() {
      let value = "test value";
      appendTd(tr, value);
  
      expect(tr.childElementCount).toEqual(1);
      expect(tr.children[0].tagName).toEqual('TD');
      expect(tr.children[0].innerText).toEqual(value);
    });
});
  