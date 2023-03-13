window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values  = { amount: 300000, years: 30, rate: 3.0 };
  const amount = document.querySelector('#loan-amount');
  const years = document.querySelector('#loan-years');
  const rate = document.querySelector('#loan-rate');

  amount.value = values.amount;
  years.value = values.years;
  rate.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const newValues = getCurrentUIValues();
  
  if(isNaN(parseFloat(newValues.amount)) || isNaN(parseFloat(newValues.years)) || isNaN(parseFloat(newValues.rate))){
    throw new Error("Please input a valid number.");
  }else{
    updateMonthly(calculateMonthlyPayment(newValues));
  }
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const monthlyRate = (values.rate / 100) / 12;
  const n = Math.floor(values.years * 12);

  return (
    (values.amount * monthlyRate) /
    (1 - Math.pow((1 + monthlyRate), -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const payment = document.querySelector('#monthly-payment');
  payment.innerText = '$' + monthly;
}