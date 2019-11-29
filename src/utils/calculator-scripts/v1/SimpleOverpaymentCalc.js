module.exports = function(
  initial,
  years,
  rate,
  monthlyOverpayment,
  overpayments = []
) {
  const monthlyRatePct = rate / 1200;
  const monthlyPayment =
    monthlyRatePct === 0
      ? initial / years / 12
      : (initial * monthlyRatePct) /
        (1 - Math.pow(1 / (1 + monthlyRatePct), years * 12));
  let balance = initial;
  let baseline = initial;
  let payments = [{ overpayment: 0, balance, baseline }];
  let partial;
  let totalInterest = 0;

  for (let year = 0; year < years; year++) {
    let interestYearly = 0;
    let overpaymentYearly = 0;
    for (let month = 1; month <= 12; month++) {
      const overpayment = overpayments
        .filter(x => +x.year === year && +x.month === month)
        .reduce((acc, val) => acc + +val.amount, 0);
      let interestMonth = balance * monthlyRatePct;
      interestYearly += interestMonth;
      overpaymentYearly += overpayment;
      balance -=
        monthlyPayment + monthlyOverpayment + overpayment - interestMonth;
      baseline -= monthlyPayment - baseline * monthlyRatePct;

      if (balance <= 0) {
        balance = 0;
        if (partial === undefined && month !== 12) {
          partial = month;
        }
      }

      //console.log("Year: " + year + " Monthly: " + month + " Balance: " + balance)
    }

    //console.log("Total Interest: " + totalInterest +  " Interest Yearly: " + interestYearly)
    totalInterest += interestYearly;

    payments.push({
      baseline,
      interestYearly,
      balance,
      partial,
      overpayment: overpaymentYearly + +monthlyOverpayment * (partial || 12)
    });
    if (partial) partial = 0;
  }
  return { totalInterest, monthlyPayment, payments };
};

//let result = this.calculatePayments(300000,25,1.9,100)

//console.log(result.totalInterest)
//console.log(result.monthlyPayment)
