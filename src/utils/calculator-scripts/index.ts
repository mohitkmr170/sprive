const rateCalc = require('./v2/rateCalc.js');
const overpaymentCalc = require('./v2/SimpleOverpaymentCalc.js');
const overpaymentAmtCalc = require('./v2/OverpaymentAmountCalc.js');
var monthlyOverpaymentCalc = require('./v2/SimpleMonthlyOverpaymentCalc');

/**
 *
 * @param outstandingLoan : number : Total Mortgage Amount
 * @param monthlyPayment : number : Monthly mortgage payment
 * @param outstandingTermYrs : number : Mortgage term
 * @param desiredOutstandingTermYrs : number : Updated mortgage term
 */

export function calculateGoal(
  outstandingLoan: number,
  monthlyPayment: number,
  outstandingTermYrs: number,
  desiredOutstandingTermYrs: number,
) {
  let numberPayments = outstandingTermYrs * 12;
  let interestRate =
    rateCalc(numberPayments, monthlyPayment, -outstandingLoan) * 12;
  let interestCalc = overpaymentCalc(
    outstandingLoan,
    outstandingTermYrs,
    interestRate * 100,
    0,
  );

  let overpaymentAmountCalc = overpaymentAmtCalc.calculateRequiredOverpaymentAmt(
    outstandingLoan,
    outstandingTermYrs,
    desiredOutstandingTermYrs,
    interestRate * 100,
  );

  let interestCalcWithOverpayments = overpaymentCalc(
    outstandingLoan,
    desiredOutstandingTermYrs, //Initially it was outstandingTermYrs, changed!
    interestRate * 100,
    overpaymentAmountCalc,
  );
  let newGoal = {
    monthlyOverPayment: Math.round(overpaymentAmountCalc),
    totalSavings: Math.round(
      interestCalc.totalInterest - interestCalcWithOverpayments.totalInterest,
    ),
  };
  return newGoal;
}

/**
 *
 * @param outstandingLoan : number : outstanding Mortgage Amount
 * @param outstandingTermYrs : number : Mortgage term
 * @param monthlyPayment : number : Monthly mortgage payment
 */

export function getErcBreach(
  outstandingLoan: number,
  outstandingTermYrs: number,
  monthlyPayment: number,
) {
  //calculate the number of years that might cause an ERC breach
  const maxAnnualOverpayment = outstandingLoan / 10; //10 %
  const maxMonthlyOverpayment = maxAnnualOverpayment / 12;

  let numberPayments = outstandingTermYrs * 12;
  let interestRate =
    rateCalc(numberPayments, monthlyPayment, -outstandingLoan) * 12;

  //Calculate the period which might trigger an ERC breach - ***add a buffer of 1 year in the UI***
  let ercCalcM_erc_based = monthlyOverpaymentCalc.calculatePayments(
    outstandingLoan,
    outstandingTermYrs,
    interestRate * 100,
    maxMonthlyOverpayment,
  );
  let ercCalcM_monthly_payment_based = monthlyOverpaymentCalc.calculatePayments(
    outstandingLoan,
    outstandingTermYrs,
    interestRate * 100,
    monthlyPayment,
  );
  let minErcYrsM_erc_based = ercCalcM_erc_based.monthlypayments
    .filter(z => z.balance === 0)
    .reduce((x, y) => (x.year < y.year || x.month < y.month ? x : y));
  let minErcYrsM_monthly_payment_based = ercCalcM_monthly_payment_based.monthlypayments
    .filter(z => z.balance === 0)
    .reduce((x, y) => (x.year < y.year || x.month < y.month ? x : y));
  console.log(
    'Min years before risk of triggering ERC: %s years, %s year',
    minErcYrsM_erc_based.year,
    minErcYrsM_monthly_payment_based.year,
    minErcYrsM_monthly_payment_based.month,
  );
  return Math.max(
    minErcYrsM_erc_based.year,
    minErcYrsM_monthly_payment_based.year,
  );
}
