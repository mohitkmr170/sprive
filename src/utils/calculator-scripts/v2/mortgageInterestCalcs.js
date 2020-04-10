var rateCalc = require('./rateCalc');
var yearlyOverpaymentCalc = require('./SimpleOverpaymentCalc');
var overpaymentAmtCalc = require('./OverpaymentAmountCalc');
var monthlyOverpaymentCalc = require('./SimpleMonthlyOverpaymentCalc');

var outstandingLoan = 125000;
var outstandingTerm = {years: 25, months: 0};
var monthlyPayment = 1204.0;
var numberPayments = outstandingTerm.years * 12;
var desiredOutstandingTerm = {years: 10, months: 0};
var monthlyOverpayment = 502; //set by goal so this should be populated from what is calculated by the backend

// var outstandingLoan = 250000
// var outstandingTerm = { years: 10, months: 0 }
// var monthlyPayment = 5000.00
// var numberPayments = outstandingTerm.years * 12
// var desiredOutstandingTerm = { years: 10, months: 0 }
// var monthlyOverpayment = 50 //set by goal so this should be populated from what is calculated by the backend

var interestRate =
  rateCalc.rate(numberPayments, monthlyPayment, -outstandingLoan) * 12;

var interestCalc = yearlyOverpaymentCalc.calculatePayments(
  outstandingLoan,
  outstandingTerm.years,
  interestRate * 100,
  0,
);

var overpaymentAmountCalc = overpaymentAmtCalc.calculateRequiredOverpaymentAmt(
  outstandingLoan,
  outstandingTerm.years,
  desiredOutstandingTerm.years,
  interestRate * 100,
);
var interestCalcWithOverpaymentsM = monthlyOverpaymentCalc.calculatePayments(
  outstandingLoan,
  outstandingTerm.years,
  interestRate * 100,
  overpaymentAmountCalc,
);

console.log('Mortgage outstanding: ' + outstandingLoan);
console.log(
  'Mortgage term: %s yrs %s months',
  outstandingTerm.years,
  outstandingTerm.months,
);
console.log(
  'Desired mortgage: %s yrs %s months',
  desiredOutstandingTerm.years,
  desiredOutstandingTerm.months,
);

console.log('Monthly payment: ' + monthlyPayment);
console.log('Interest rate: ' + interestRate);
console.log('');
console.log('=================================');
console.log('');

//Total Interest
console.log(
  'Total Interest without overpayments: ' + interestCalc.totalInterest,
);

//Required Overpayment calc
console.log(
  'Required overpayment to be mortgage free in %s years, %s months: %s',
  desiredOutstandingTerm.years,
  desiredOutstandingTerm.months,
  parseFloat(overpaymentAmountCalc).toFixed(2),
);

//Total Interest with Overpayments
console.log(
  'Total Interest with overpayments: ' +
    interestCalcWithOverpaymentsM.totalInterest,
);

console.log(
  'Estimated interest savings with £%s monthly overpayment:',
  parseFloat(overpaymentAmountCalc).toFixed(2),
  interestCalc.totalInterest - interestCalcWithOverpaymentsM.totalInterest,
);

var estimatedTimeSavings = monthlyOverpaymentCalc.calculateTimeBetweenDates(
  outstandingTerm,
  desiredOutstandingTerm,
);

console.log(
  'Estimated time savings: %s years %s months',
  estimatedTimeSavings.years,
  estimatedTimeSavings.months,
);

//calculate the number of years that might cause an ERC breach
const maxAnnualOverpayment = outstandingLoan / 10;
const maxMonthlyOverpayment = maxAnnualOverpayment / 12;

//Calculate the period which might trigger an ERC breach - ***add a buffer of 1 year in the UI***
var ercCalcM = monthlyOverpaymentCalc.calculatePayments(
  outstandingLoan,
  outstandingTerm.years,
  interestRate * 100,
  maxMonthlyOverpayment,
);
var minErcYrsM = ercCalcM.monthlypayments
  .filter(z => z.balance === 0)
  .reduce((x, y) => (x.year < y.year || x.month < y.month ? x : y));
console.log(
  'Min years before risk of triggering ERC: %s years %s months',
  minErcYrsM.year,
  minErcYrsM.month,
);

//calculate the projected time saving given overpayment history
var existingOverpayments = [
  {year: 0, month: 1, amount: 150},
  {year: 0, month: 2, amount: 100},
];

var interestCalcWithHistoricalOverpaymentsM = monthlyOverpaymentCalc.calculatePayments(
  outstandingLoan,
  outstandingTerm.years,
  interestRate * 100,
  monthlyOverpayment,
  existingOverpayments,
);
console.log(
  'Projected interest saving taking historical overpayments into account: ' +
    (interestCalc.totalInterest -
      interestCalcWithHistoricalOverpaymentsM.totalInterest),
);

var interestCalcWithHistoricalOverpaymentsYrsM = interestCalcWithHistoricalOverpaymentsM.monthlypayments
  .filter(z => z.balance === 0)
  .reduce((x, y) => (x.year < y.year || x.month < y.month ? x : y));

var projectedTimeSaving = monthlyOverpaymentCalc.calculateTimeBetweenDates(
  outstandingTerm,
  {
    years: interestCalcWithHistoricalOverpaymentsYrsM.year,
    months: interestCalcWithHistoricalOverpaymentsYrsM.month,
  },
);
console.log(
  'Projected time saving taking historical overpayments into account: %s years %s months',
  projectedTimeSaving.years,
  projectedTimeSaving.months,
);

console.log(
  'Projected mortgage free in: %s years %s months',
  interestCalcWithHistoricalOverpaymentsYrsM.year,
  interestCalcWithHistoricalOverpaymentsYrsM.month,
);

console.log('');
console.log('=================================');
