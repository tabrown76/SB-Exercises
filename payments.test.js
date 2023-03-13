describe('submitPaymentInfo()', function() {
    let curPayment;
  
    beforeEach(function() {
      billAmtInput.value = '50';
      tipAmtInput.value = '10';
      curPayment = createCurPayment();
    });
  
    afterEach(function() {
      billAmtInput.value = '';
      tipAmtInput.value = '';
      paymentTbody.innerHTML = '';
      summaryTds[0].innerHTML = '';
      summaryTds[1].innerHTML = '';
      summaryTds[2].innerHTML = '';
      allPayments = {};
      paymentId = 0;
    });
  
    it('should create a new payment object in allPayments', function() {
      submitPaymentInfo();
  
      expect(Object.keys(allPayments).length).toEqual(1);
      expect(allPayments['payment1']).toEqual(curPayment);
    });
});

describe("createCurPayment function", function() {
  afterEach(function() {
    billAmtInput.value = '';
    tipAmtInput.value = '';
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    allPayments = {};
    paymentId = 0;
  });

  it('should return undefined if billAmt or tipAmt is empty', function () {
    billAmtInput.value = '';
    tipAmtInput.value = '';

    expect(createCurPayment()).toBeUndefined();

    billAmtInput.value = '50';
    expect(createCurPayment()).toBeUndefined();

    billAmtInput.value = '';
    tipAmtInput.value = '5';
    expect(createCurPayment()).toBeUndefined();
  });

  it('should return undefined if billAmt is negative or tipAmt is less than 0', function () {
    billAmtInput.value = '-10';
    tipAmtInput.value = '5';

    expect(createCurPayment()).toBeUndefined();

    billAmtInput.value = '50';
    tipAmtInput.value = '-5';

    expect(createCurPayment()).toBeUndefined();
  });

  it('should return a valid curPayment object if inputs are valid', function () {
    billAmtInput.value = '50';
    tipAmtInput.value = '10';

    let expectedOutput = {
      billAmt: '50',
      tipAmt: '10',
      tipPercent: 20,
    };

    expect(createCurPayment()).toEqual(expectedOutput);
  });
});

describe("Test appendPaymentTable() function", function () {
  beforeEach(function () {
    billAmtInput.value = '100';
    tipAmtInput.value = '15';
  });

  afterEach(function () {
    paymentTbody.innerHTML = '';
    summaryTds[0].innerHTML = '';
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    allPayments = {};
    paymentId = 0;
    billAmtInput.value = '';
    tipAmtInput.value = '';
  });

  it("should add a new payment to paymentTable tbody", function () {
    let curPayment = createCurPayment();
    appendPaymentTable(curPayment);
    let paymentRows = paymentTbody.querySelectorAll('tr');
    expect(paymentRows.length).toEqual(1);
    expect(paymentRows[0].querySelectorAll('td')[0].innerText).toEqual('$100');
    expect(paymentRows[0].querySelectorAll('td')[1].innerText).toEqual('$15');
    expect(paymentRows[0].querySelectorAll('td')[2].innerText).toEqual('15%');
  });
});

describe("updateSummary()", function() {
  beforeEach(function () {
    paymentTbody.innerHTML = ''; // Clear payment table
    summaryTds[0].innerHTML = ''; // Clear summary table
    summaryTds[1].innerHTML = '';
    summaryTds[2].innerHTML = '';
    allPayments = {}; // Reset allPayments object
  });

  it('should update the summary table with correct values', function () {
    // Create payment objects and add them to allPayments
    let payment1 = {billAmt: 10, tipAmt: 2, tipPercent: 20};
    allPayments['payment1'] = payment1;
    let payment2 = {billAmt: 20, tipAmt: 3, tipPercent: 15};
    allPayments['payment2'] = payment2;

    updateSummary();

    expect(summaryTds[0].innerHTML).toEqual('$30');
    expect(summaryTds[1].innerHTML).toEqual('$5');
    expect(summaryTds[2].innerHTML).toEqual('18%');
  });
});
