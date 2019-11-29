const rateCalc = require('./v2/rateCalc.js');
const overpaymentCalc = require('./v2/SimpleOverpaymentCalc.js');
const overpaymentAmtCalc = require('./v2/OverpaymentAmountCalc.js');

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