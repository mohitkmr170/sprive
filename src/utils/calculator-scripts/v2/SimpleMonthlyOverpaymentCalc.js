const calculatePayments = function(
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
  let monthlypayments = [{ overpayment: 0, balance, baseline }];
  let partial;
  let totalInterest = 0;

  for (let year = 0; year < years; year++) {
    let interestYearly = 0;
    let overpaymentYearly = 0;
    for (let month = 1; month <= 12; month++) {
      const overpaymentArr = overpayments.filter(
        x => +x.year === year && +x.month === month
      );

      const overpayment = overpaymentArr.reduce(
        (acc, val) => acc + +val.amount,
        0
      );

      let interestMonth = balance * monthlyRatePct;
      interestYearly += interestMonth;

      overpaymentYearly +=
        overpaymentArr.length == 0 ? monthlyOverpayment : overpayment;

      balance -=
        monthlyPayment +
        (overpaymentArr.length == 0 ? monthlyOverpayment : overpayment) -
        interestMonth;
      baseline -= monthlyPayment - baseline * monthlyRatePct;

      if (balance <= 0) {
        balance = 0;
        if (partial === undefined && month !== 12) {
          partial = month;
        }
      }

      monthlypayments.push({
        year,
        month,
        baseline,
        interestYearly,
        balance,
        partial,
        interestMonth,
        overpayment:
          overpaymentArr.length == 0 ? monthlyOverpayment : overpayment
      });
    }
    totalInterest += interestYearly;
    if (partial) partial = 0;
  }
  return { totalInterest, monthlyPayment, monthlypayments };
};

const calculateTimeBetweenDates = function(period1, period2) {
  totalMonthsPeriod1 = 12 * period1.years + period1.months;
  totalMonthsPeriod2 = 12 * period2.years + period2.months;

  diffMonths = totalMonthsPeriod1 - totalMonthsPeriod2;

  if (diffMonths < 12) return { years: 0, months: diffMonths };
  else var years = Math.floor(diffMonths / 12);
  var months = diffMonths % 12;
  return { years: years, months: months };
};

module.exports = {
  calculatePayments,
  calculateTimeBetweenDates
};
