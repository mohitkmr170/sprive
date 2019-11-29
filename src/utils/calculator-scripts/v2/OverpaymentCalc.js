const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]
const mortgageAmount = 300000
const mortgageType = "Repayment"
//const mortgageType = "Interest Only"
const interestRatePct = 0.019
const introRatePeriodYrs = 2
const revertRatePct = 0.025
const loanPeriodYrs = 25
const startDate = new Date(2019, 3, 1)
const startingYr = 2019
const startingMonth = "April"

const monthlyOverpaymentAmt = 1000

const feesAddedToLoan = 500 

const interestInterval = 12 //interest calculated monthly

function calcInterestSavedByOverpayment(mortgageType, cumulativeInterestNoOverpayment, cumulativeInterestPaidOff){
    if(mortgageType == "Interest Only") return 0

    return Math.max((cumulativeInterestNoOverpayment - cumulativeInterestPaidOff), 0)
}

function calcEndBalanceWithNoOverpayment(interestRate, basicMonthlyPayment, startBalance, loanPeriodYrs, periodNumber, previousEndBalanceWithNoOverpayment) {
    if (periodNumber == 0) {
        return FV(interestRate / interestInterval, 1, basicMonthlyPayment, -1 * startBalance, 0)
    }

    var ratePerPeriod = interestRate / interestInterval
    var pmtCalc = pmt(ratePerPeriod, (loanPeriodYrs * interestInterval) - periodNumber, -1 * previousEndBalanceWithNoOverpayment, 0)

    //console.log("PMT(%s,%s,%s,%s", ratePerPeriod,  (loanPeriodYrs * interestInterval) - periodNumber, -1 * previousEndBalanceWithNoOverpayment,0)
    //console.log(pmtCalc)

    return FV(interestRate / interestInterval, 1, pmtCalc, -1 * previousEndBalanceWithNoOverpayment)
}

function calcInterestWithNoOverpayment(interestRatePct, loanPeriodYrs, periodNumber, previousEndBalanceWithNoOverpayment, currentEndBalanceWithNoOverpayment) {
    if (periodNumber == 0) {
        return ipmt(interestRatePct / interestInterval, 1, loanPeriodYrs * interestInterval, -1 * mortgageAmount, 0, 0)
    }
    if (currentEndBalanceWithNoOverpayment == 0) {
        return 0
    }
    return ipmt(interestRatePct / interestInterval, 1, (loanPeriodYrs * interestInterval) - periodNumber, -1 * previousEndBalanceWithNoOverpayment, 0, 0)
}

function calcMinMonthlyRepayment(interestRatePct, loanPeriodYrs, startBalance, periodNumber) {
    return pmt(interestRatePct / interestInterval, (loanPeriodYrs * interestInterval) - periodNumber, -1 * startBalance, 0, 0)
}

function calcMonthlyOverpaymentAmt(previousTotalMonthlyPayment, startBalance, previousBasicMonthlyPayment) {
    if (previousTotalMonthlyPayment > startBalance) {
        if (startBalance > previousBasicMonthlyPayment) {
            return startBalance - previousBasicMonthlyPayment
        }
        else {
            return 0
        }
    }
    else {
        return monthlyOverpaymentAmt
    }
}

function calcBasicMonthlyPayment(minMonthlyRepayment, minMonthlyInterestOnly, startBalance, previousBasicMonthlyPayment, previousMonthlyOverpayment, monthlyInterestPaid, periodNumber) {
    var basicMonthlyPayment = 0

    if (periodNumber == 0) {
        if (mortgageType == "Repayment") {
            return minMonthlyRepayment
        }
        else {
            return minMonthlyInterestOnly
        }
    }
    if (mortgageType == "Repayment") {
        //Repayment
        if (minMonthlyRepayment > previousBasicMonthlyPayment) {
            return minMonthlyRepayment
        }

        if (startBalance > previousBasicMonthlyPayment) {
            if ((previousBasicMonthlyPayment + previousMonthlyOverpayment) > startBalance) {
                basicMonthlyPayment = previousBasicMonthlyPayment + minMonthlyInterestOnly
            }
            else {
                basicMonthlyPayment = previousBasicMonthlyPayment
            }
        }
        else {
            basicMonthlyPayment = startBalance + monthlyInterestPaid
        }
    }
    else{
        //Interest Only
        if((minMonthlyInterestOnly > previousBasicMonthlyPayment) || (startBalance <= 0)){
            return minMonthlyInterestOnly
        }
        else{
            if(startBalance < previousBasicMonthlyPayment){
                return startBalance + minMonthlyInterestOnly
            }
            else{
                if ((previousBasicMonthlyPayment + previousMonthlyOverpayment) > startBalance) {
                    basicMonthlyPayment = previousBasicMonthlyPayment + minMonthlyInterestOnly
                }
                else {
                    basicMonthlyPayment = previousBasicMonthlyPayment
                }   
            }
        }
    }

    return basicMonthlyPayment
}


function calcMinMonthlyInterestOnly(interestRatePct, loanPeriodYrs, startBalance, cumulativeOffsetSavings, averageOffsetCurrentAccountBalance, mortgageType) {
    var fv = 0
    const pv = -1 * startBalance + cumulativeOffsetSavings + averageOffsetCurrentAccountBalance
    if (mortgageType = "Interest Only") {
        fv = pv
    }
    return ipmt(interestRatePct / interestInterval, 1, loanPeriodYrs * interestInterval, pv, fv, 0)
}

// function ipmt(pv, pmt, rate, per) {
//     var tmp = Math.pow(1 + rate, per);
//     return 0 - (pv * tmp * rate + pmt * (tmp - 1));
// }

function ipmt(rate, period, periods, present, future, type) {
    // Credits: algorithm inspired by Apache OpenOffice

    // Initialize type
    var type = (typeof type === 'undefined') ? 0 : type;

    // Evaluate rate and periods (TODO: replace with secure expression evaluator)
    rate = eval(rate);
    periods = eval(periods);

    // Compute payment
    var payment = pmt(rate, periods, present, future, type);

    // Compute interest
    var interest;
    if (period === 1) {
        if (type === 1) {
            interest = 0;
        } else {
            interest = -present;
        }
    } else {
        if (type === 1) {
            interest = FV(rate, period - 2, payment, present, 1) - payment;
        } else {
            interest = FV(rate, period - 1, payment, present, 0);
        }
    }

    // Return interest
    return interest * rate;
}

function FV(rate, nper, pmt, pv, type) {

    var pow = Math.pow(1 + rate, nper),
        fv;

    pv = pv || 0;
    type = type || 0;

    if (rate) {
        fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
    } else {
        fv = -1 * (pv + pmt * nper);
    }

    //console.log("FV: rate: %s nper: %s pmt: %s pv: %s type:%s fv: %s", rate, nper, pmt, pv, type, fv)
    return fv;
}

function pmt(rate_per_period, number_of_payments, present_value, future_value, type) {
    if (!future_value) future_value = 0;
    if (!type) type = 0;

    if (rate_per_period != 0.0) {
        // Interest rate exists
        var q = Math.pow(1 + rate_per_period, number_of_payments);
        return -(rate_per_period * (future_value + (q * present_value))) / ((-1 + q) * (1 + rate_per_period * (type)));

    } else if (number_of_payments != 0.0) {
        // No interest rate, but number of payments exists
        return -(future_value + present_value) / number_of_payments;
    }

    return 0;
}

function getNextMonth(date) {
    if (date.getMonth() == 11) {
        var current = new Date(date.getFullYear() + 1, 0, 1);
    } else {
        var current = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    }
    return current
}

function calculateMonthlySchedule() {
    const introRatePeriods = introRatePeriodYrs * 12
    var date = startDate
    var interestRate = interestRatePct
    var minMonthlyRepayment
    var minMonthlyInterestOnly
    var basicMonthlyPayment
    var totalMonthlyPayment
    var monthlyInterestPaid
    var averageOffsetCurrentAccountBalance = 0
    var startBalance = mortgageAmount + feesAddedToLoan
    var previousBasicMonthlyPayment
    var previousMonthlyOverpayment
    var previousTotalMonthlyPayment
    var endBalanceWithNoOverpayment
    var previousEndBalanceWithNoOverpayment = 0
    var interestWithNoOverpayment

    var cumulativeOverpayment = 0
    var cumulativeOffsetSavings = 0
    var cumulativeCapitalPaidOff = 0
    var cumulativeInterestPaidOff = 0
    var cumulativeTotalMonthlyPayment = 0
    var cumulativeInterestNoOverpayment = 0
    var redemptionCharges = 0
    var endBalance = 0
    var monthlyOverpayment = 0

    var initialRepaymentMonthlyLoanAmt

    var i = 0
    var balanceOutstanding = true
    var balanceWithOverpaymentOutstanding = true
    var lastPayoffPeriod = 0

    while (balanceOutstanding || balanceWithOverpaymentOutstanding) {

        if (i >= introRatePeriods) interestRate = revertRatePct

        minMonthlyRepayment = calcMinMonthlyRepayment(interestRate, loanPeriodYrs, startBalance, i)
        if (i == 0) initialRepaymentMonthlyLoanAmt = minMonthlyRepayment

        minMonthlyInterestOnly = calcMinMonthlyInterestOnly(interestRate, loanPeriodYrs, startBalance, cumulativeOffsetSavings, 0)

        monthlyInterestPaid = (startBalance - cumulativeOffsetSavings - averageOffsetCurrentAccountBalance) * interestRate / 12

        basicMonthlyPayment = calcBasicMonthlyPayment(minMonthlyRepayment, minMonthlyInterestOnly, startBalance, previousBasicMonthlyPayment, previousMonthlyOverpayment, monthlyInterestPaid, i)

        monthlyOverpayment = calcMonthlyOverpaymentAmt(previousTotalMonthlyPayment, startBalance, previousBasicMonthlyPayment)

        totalMonthlyPayment = basicMonthlyPayment + monthlyOverpayment

        cumulativeOverpayment = cumulativeOverpayment + monthlyOverpayment

        monthlyCapitalPaid = basicMonthlyPayment - monthlyInterestPaid + monthlyOverpayment

        endBalance = FV(interestRate / interestInterval, 1, totalMonthlyPayment, -1 * startBalance + cumulativeOffsetSavings + averageOffsetCurrentAccountBalance, 0)

        if (balanceOutstanding) {
            cumulativeCapitalPaidOff = cumulativeCapitalPaidOff + monthlyCapitalPaid
            cumulativeInterestPaidOff = cumulativeInterestPaidOff + monthlyInterestPaid
            cumulativeTotalMonthlyPayment = cumulativeTotalMonthlyPayment + totalMonthlyPayment
        }

        if (endBalance <= 0) {
            balanceOutstanding = false
            if (lastPayoffPeriod == 0) lastPayoffPeriod = i + 1
            //break
        }

        endBalanceWithNoOverpayment = calcEndBalanceWithNoOverpayment(interestRate, basicMonthlyPayment, startBalance, loanPeriodYrs, i, previousEndBalanceWithNoOverpayment)
        interestWithNoOverpayment = calcInterestWithNoOverpayment(interestRate, loanPeriodYrs, i, previousEndBalanceWithNoOverpayment, endBalanceWithNoOverpayment)

        cumulativeInterestNoOverpayment = cumulativeInterestNoOverpayment + interestWithNoOverpayment

        // console.log("Year: %s Month: %s Interest Rate: %s MinMonthlyRepayment: %s MinMonthlyInterestOnly: %s StartBalance: %s BasicMonthlyPayment: %s EndBalance: %s TotalMonthlyPayment: %s EndBalanceWithNoOverpayment: %s InterestWithNoOverpayment: %s CumulativeInterestNoOverpayment: %s, TotalMonthlyPayment: %s, CumulativeInterestPaid: %s",
        //     date.getFullYear(), monthNames[date.getMonth()], interestRate, minMonthlyRepayment, minMonthlyInterestOnly, startBalance, basicMonthlyPayment, endBalance, totalMonthlyPayment, endBalanceWithNoOverpayment, interestWithNoOverpayment, cumulativeInterestNoOverpayment, totalMonthlyPayment, cumulativeInterestPaidOff)


        if (endBalanceWithNoOverpayment <= 0) {
            balanceWithOverpaymentOutstanding = false
            //break
        }

        date = getNextMonth(date)
        startBalance = endBalance
        previousBasicMonthlyPayment = basicMonthlyPayment
        previousMonthlyOverpayment = monthlyOverpayment
        previousTotalMonthlyPayment = totalMonthlyPayment
        previousEndBalanceWithNoOverpayment = endBalanceWithNoOverpayment

        i++;
    }

    console.log("Summary: ")

    console.log("Average Capital Loan Annual Payments: %s", initialRepaymentMonthlyLoanAmt * 12)
    console.log("Initial Repayment Monthly Loan Payment: %s", initialRepaymentMonthlyLoanAmt)
    // console.log("Average Interest Only Annual Payments: %s",averageInterestOnlyAnnualPayments)
    // console.log("Initial Interest Only Monthly Payment: %s",initialInterestOnlyMonthlyPayments)
    console.log("Interest over term of loan: %s", cumulativeInterestPaidOff)
    console.log("Cumulative Interest No Overpayment: %s", cumulativeInterestNoOverpayment)
    console.log("Interest Saved by Overpayment/Offset: %s", calcInterestSavedByOverpayment(mortgageType, cumulativeInterestNoOverpayment, cumulativeInterestPaidOff))
    console.log("Sum of all payments: %s", cumulativeTotalMonthlyPayment)
    console.log("Mortgage repayment time in years: %s", lastPayoffPeriod / 12)
    // console.log("Mortgage Repayment time in Years: %s",mortgageRepaymentTimeYrs)
}

calculateMonthlySchedule();
