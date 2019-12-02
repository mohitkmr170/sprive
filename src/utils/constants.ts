import {Dimensions, StyleSheet} from 'react-native';

/**
 * App Constants
 */

/*
TODO : Number conventions to be added in future(best practice) to be researched on
*/

export const APP_CONSTANTS = {
  HIT_SLOP: {left: 20, right: 20, top: 20, bottom: 20},
  GRAPH_HEIGHT: 200,
  LOGIN_FORM: 'logIn',
  SIGNUP_FORM: 'signup',
  MORTGAGE_INPUT_FORM: 'MortgageInput',
  GENERAL_ERROR: 'Something went wrong!',
  LOG_OUT: 'Logged Out!',
  FALSE_TOKEN: 'FALSE TOKEN',
  MONTH_NAMES: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  DATE_FORMAT: 'YYYY-MM-DD',
  MONTH_NUMBER: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  LISTENER: {
    DID_FOCUS: 'didFocus',
  },
  LOADER_SIZE: {
    SMALL: 'small',
    LARGE: 'large',
  },
};

export const STYLE_CONSTANTS = {
  device: {
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    WINDOW_HEIGHT: Dimensions.get('window').height,
    WINDOW_WIDTH: Dimensions.get('window').width,
    DEVICE_TYPE_ANDROID: 'Android',
    DEVICE_TYPE_IOS: 'IOS',
  },
  elevation: {
    BASIC: 5,
  },
  margin: {
    EXTRA_HUMUNGOUS: 52,
    SLIGHT_HUMUNGOUS: 48,
    HUMONGOUS: 40,
    HUGE: 36,
    HUGER: 32,
    HUGISH: 28,
    LARGER: 24,
    LARGE: 22,
    LARGEST: 20,
    LARGISH: 18,
    NORMAL: 16,
    SMALL: 12,
    SMALLISH: 10,
    SMALLER: 8,
    SMALLEST: 4,
  },
  padding: {
    HUMONGOUS: 44,
    HUGE: 32,
    HUGISH: 28,
    LARGER: 24,
    LARGE: 22,
    LARGEST: 20,
    LARGISH: 18,
    NORMAL: 16,
    BELOW_NORMAL: 14,
    SMALL: 12,
    SMALLISH: 10,
    SMALLER: 8,
    ABOVE_SMALLEST: 6,
    SMALLEST: 4,
  },
  font: {
    SIZE: {
      LARGEST_HUMONGOUS: 52,
      HUMONGOUS: 48,
      HUGEST: 36,
      HUGER: 28,
      HUGE: 24,
      HUGISH: 22,
      LARGEST: 20,
      LARGER: 18,
      LARGE: 16,
      LARGISH: 15,
      NORMAL: 14,
      SMALL: 12,
      SMALLER: 11,
      TINY: 10,
    },
    LINEHEIGHT: {
      LARGEST_HUMONGOUS: 76,
      HUMONGOUS: 48,
      HUGEST: 36,
      HUGER: 28,
      HUGE: 24,
      HUGISH: 22,
      LARGER: 20,
      LARGISH: 18,
      LARGE: 16,
      NORMAL: 14,
      SMALL: 12,
      SMALLER: 11,
    },
    WEIGHT: {
      NORMAL: 'normal',
      SEMI_BOLD: '600',
      BOLD: '900',
    },
  },
  border: {
    WIDTH: {
      LIGHTER: StyleSheet.hairlineWidth, // lighter:0.125,
      LIGHT: StyleSheet.hairlineWidth, // light:0.25,
      NORMAL: StyleSheet.hairlineWidth * 2, // normal:0.5,
      HEAVY: 1, // heavy:1.0,
      HEAVIER: 2, // heavier:1.5,
      HEAVIEST: 3, // heaviest:3,
    },
  },
};
export const ICON = {
  UP: 'ios-arrow-round-up',
  DOWN: 'ios-arrow-round-down',
};
export const ICON_NAME = {
  LEFT_ICON: 'chevrons-left',
  RIGHT_ICON: 'chevrons-right',
};
export const DB_KEYS = {
  ACCESS_TOKEN: 'response.accessToken',
  IS_FETCHING: 'isFetching',
  META_TOTAL: 'response.meta.total',
  META_SKIP: 'response.meta.skip',
  TOTAL_INTEREST: 'response.data.totalInterest',
  AUTH_STATUS: 'status',
  CURRENT_USER_EMAIL: 'response.data.email',
  DATA_ID: 'response.data.id',
  DATA_OF_ZERO_ID: 'response.data[0].id',
  NEW_MORTGAGE_TERM: 'response.data[0].new_mortgage_term',
  GOAL_OVERPAYMENT: 'response.data[0].monthly_overpayment_amount',
  GOAL_INTEREST_SAVED: 'response.data[0].total_interest_saved',
  MORTGAGE_BALANCE: 'response.data[0].mortgage_balance',
  MORTGAGE_PAYMENT: 'response.data[0].mortgage_payment',
  MORTGAGE_TERM: 'response.data[0].mortgage_term',
  ERROR: 'error',
  FORM_MORTGAGE_MORTGAGE_AMOUNT: 'MortgageInput.values.mortgageAmount',
  FORM_MORTGAGE_TIMEPERIOD: 'MortgageInput.values.timePeriod',
  FORM_MORTGAGE_MONTHLY_MORTGAGE_AMOUNT:
    'MortgageInput.values.monthlyMortgagePayment',
  USER_ID: 'response.data.id', //Same
  BALANCE_AMOUNT: 'response.data.balance_amount',
  MONTHLY_TARGET: 'response.data.monthly_target',
  RESPONSE_DATA: 'response.data',
  CREATED_AT: 'response.data[0].createdAt',
  RESPONSE: 'response',
  PROJECTED: {
    INTEREST_SAVING: 'response.data.projected_data.projected_interest_savings',
    YEARS_SAVED: 'response.data.projected_data.projected_time_savings.years',
    MONTHS_SAVED: 'response.data.projected_data.projected_time_savings.months',
  },
  PROJECTED_DATA: {
    PROJECTED_TIME_YEARS: 'response.data.projected_time_savings.years',
    PROJECTED_TIME_MONTHS: 'response.data.projected_time_savings.months',
    INTEREST_SAVING: 'response.data.projected_interest_savings',
    ESTIMATED_TIME_YEARS: 'response.data.estimated_time_savings.years',
    ESTIMATED_TIME_MONTHS: 'response.data.estimated_time_savings.months',
  },
  ERROR_MESSAGE: 'response.data.message',
  PAYMENT_HISTORY: {
    AMOUNT: 'amount',
    PAYMENT_DATE: 'payment_date',
    REFERENCE_NUMBER: 'reference_number',
    ID: 'id',
    IS_OVERPAYMENT: 'is_overpayment'
  },
  REPORT_ISSUE: {
    ISSUE_CATEGORY_BUG: 'Issue/Bug',
    ISSUE_CATEGORY_BUG_VALUE: 1,
    ISSUE_CATEGORY_LABEL_KEY: 'label',
    ISSUE_CATEGORY_ID_KEY: 'id',
    ISSUE_CATEGORY_VALUE_KEY: 'value',
  }
};
export const NAVIGATION_SCREEN_NAME = {
  AUTH_STACK: 'Auth',
  APP_STACK: 'App',
  LOGIN_SCREEN: 'LoginScreen',
  SIGNUP_SCREEN: 'SignUpScreen',
  DASHBOARD_SCREEN: 'DashboardScreen',
  SET_GOAL_SCREEN: 'SetGoalScreen',
  MORTGAGE_INPUT_SCREEN: 'MortgageInputScreen',
  SAVE_INTEREST_SCREEN: 'SaveInterestScreen',
  TAB_NAVIGATOR: 'TabNavigatorScreen',
  OVERPAYMENT: 'OverPaymentScreen',
  OVERPAYMENT_HISTORY: 'OverpaymentHistoryScreen',
  REPORT_ISSUE: 'ReportIssueScreen',
  UPDATE_MORTGAGE: 'UpdateMortgageScreen',
};

export const LOCALE_STRING = {
  LOGIN_SCREEN: {
    LOGIN_BUTTON: 'login.loginButton',
    SIGNIN_TO_ACCOUNT: 'login.signInToAccount',
    FORGOT_PASSWORD: 'login.forgotPassword',
    DONT_HAVE_ACCOUNT: 'login.dontHaveAccount',
    SIGNUP: 'signUp.signUpText',
    LOGIN_SIGNIN: 'login.signIn',
  },
  SIGNUP_FORM: {
    SIGNUP_BUTTON: 'signUp.singUpButton',
    REG_AND_SEC: 'signUp.regAndSec',
    SETUP_ACCOUNT: 'signUp.setupAccc',
    BY_CLICKING: 'signUp.byClickingText',
    TERMS_AND_CONDITION: 'signUp.T&C',
    AND_OUR: 'signUp.andOur',
    PRIVACY_POLICY: 'signUp.privacyPolicy',
    ACCOUNT_EXIST: 'signUp.accountAlreadyExist',
  },
  SHOW_INTEREST_SCREEN: {
    SAVE_INTEREST: 'mortgageForm.mortgageData',
    CARD_TEXT: 'saveInterest.cardText',
    SAVE_MONEY: 'saveInterest.saveMoney',
    FIRST_HEADER: 'saveInterest.firstHeader',
    FIRST_ITEM: 'saveInterest.firstListItem',
    SECOND_HEADER: 'saveInterest.secondHeader',
    SECOND_LIST_ONE: 'saveInterest.secondListOne',
    SECOND_LIST_TWO: 'saveInterest.secondListTwo',
    SAVE_BUTTON_TEXT: 'saveInterest.buttonText',
  },
  LOADING: 'Loading',
  INVALID_AMOUNT: 'global.invalidAmount',
  MORTGAGE_INPUT_DATA: {
    LOCALE_STRING_MORTGAGE_DATA: 'mortgageForm.mortgageData',
    LOCALE_STRING_WORKOUT: 'mortgageForm.letUsWorkOut',
    LOCALE_STRING_TAKE_YOUR_BEST: 'mortgageForm.takeYourBest',
    BUTTON_LOCALE_STRING: 'global.calculateNow',
    INVALID_AMOUNT: 'validationMessages.inValidAmount',
    TITLE: 'mortgageForm.title',
  },
  VALIDATIONS: {
    IS_REQUIRED: 'validationMessages.required',
    INVALID_CARD_DETAILS: 'validationMessages.invalidCardDetails',
    MIN_ERROR: 'validationMessages.minError',
    MAX_ERROR: 'validationMessages.maxError',
    POSITIVE_NUMBER: 'validationMessages.positiveNumber',
    MORTGAGE_LIMIT: 'validationMessages.maxLimitMortgage',
    MONTHLY_MORTGAGE_LIMIT: 'validationMessages.maxLimitMonthlyMortgage',
    LENGTH_TEN: 'validationMessages.length10',
    INVALID_EMAIL: 'validationMessages.invalidEmail',
    ALPHA_NUMERIC: 'validationMessages.alphaNumberic',
    YEAR_RANGE: 'validationMessages.yearRange',
    WHITE_SPACES: 'validationMessages.whiteSpaces',
  },
  SET_GOAL_SCREEN: {
    TITLE: 'setGoalScreen.title',
    HOW_QUICKLY: 'setGoalScreen.howQuickly',
    SET_TARGET: 'setGoalScreen.setTarget',
    YOU_CAN_ADJUST: 'setGoalScreen.youCanAdjust',
    BASED_ON_TARGET: 'setGoalScreen.basedOnTarget',
    ESTIMATE: 'setGoalScreen.estimate',
    OVER_PAYMENT: 'setGoalScreen.overPayment',
    MONTHS: 'setGoalScreen.months',
    ESTIMATE_INTEREST: 'setGoalScreen.estimateInterest',
    SAVINGS: 'setGoalScreen.savings',
    SET_GOAL: 'setGoalScreen.setGoal',
    ERC_TITLE: 'setGoalScreen.ercTitle',
    ERC_MESSAGE: 'setGoalScreen.ercMessage',
  },
  GRAPH_COMPONENT: {
    PROJECTED_TIME: 'stackBarGraphComponent.projectedTime',
    SAVING: 'stackBarGraphComponent.saving',
    MONTHS: 'stackBarGraphComponent.months',
    YEARS: 'stackBarGraphComponent.years',
    MONTH: 'stackBarGraphComponent.month',
    YEAR: 'stackBarGraphComponent.year',
    PROJECTED_INT: 'stackBarGraphComponent.projectInterested',
  },
  DASHBOARD_SCREEN: {
    THIS_MONTH: 'dashBoard.thisMonth',
    OVER_PAYMENT: 'dashBoard.overPaymentTarget',
    PAYMENT_REMINDER: 'dashBoard.paymentReminder',
    AMOUNT_LEFT: 'dashBoard.amountLeft',
    INCOME: 'dashBoard.income',
    SPENT: 'dashBoard.spent',
    AVAILABLE_BALANCE: 'dashBoard.avaialbleBalance',
    MAKE_OVERPAYMENT: 'dashBoard.makeOverPayment',
    MY_PROGRESS: 'dashBoard.myProgress',
    PROJECTED_MORTGAGE: 'dashBoard.projectedMortgage',
    KEEP_IT_UP: 'dashBoard.keepItUp',
  },
  STATUS_OVERLAY: {
    MESSAGE: 'statusOverlay.message',
    CONTINUE: 'statusOverlay.continue',
    OH_NO: 'statusOverlay.ohNo',
    PAID: 'statusOverlay.paid',
    NEXT: 'statusOverlay.next',
    TRY_AGAIN: 'statusOverlay.tryAgain',
    BRILLIANT: 'statusOverlay.brilliant',
    WENT_WRONG: 'statusOverlay.wentWrong',
    CANCEL: 'statusOverlay.cancel',
  },
  OVER_PAYMENT_HISTORY: {
    OVER_PAYMENT: 'overPaymentHistory.overPayment',
    OVER_PAYMENT_HISTORY: 'overPaymentHistory.overPaymentHistory',
    SEARCH_MONTH: 'overPaymentHistory.searchMonth',
    OVER_PAYMENT_OF: 'overPaymentHistory.overPaymentOf',
    AVAILABLE_BALANCE: 'overPaymentHistory.availableBalance',
    MONTHLY_TARGET: 'overPaymentHistory.monthlyTarget',
    BASIC_INFO: 'overPaymentHistory.basicInfo',
    PAY_NOW: 'overPaymentHistory.payNow',
    ACCOUNT_NUMBER: 'overPaymentHistory.accNumber',
    SORT_CODE: 'overPaymentHistory.sortCode',
    REFERENCE_CODE: 'overPaymentHistory.refCode',
    ON_TARCK: 'overPaymentHistory.onTrack',
    YEAR: 'overPaymentHistory.year',
  },
  REPORT_ISSUE: {
    PLACEHOLDER: 'reportIssue.placeHolder',
    REPORT_AN_ISSUE: 'reportIssue.reportAnIssue',
    HAVE_AN_ISSUE: 'reportIssue.haveAnIssue',
    BUG_CATEGORY: 'reportIssue.bugCategory',
    ISSUE: 'reportIssue.issue',
    CHARACTERS_LIMIT: 'reportIssue.characterLimit',
    CHAR_LEFT: 'reportIssue.chLeft',
    REPORT_ISSUE: 'reportIssue.reportIssue',
    BUG_REPORTED: 'reportIssue.bugReported'
  },
  UPDATE_MORTGAGE: {
    UPDATE_MORTGAGE: 'updateMortgage.updateMortgage',
    INFO: 'updateMortgage.info',
    UPDATE: 'updateMortgage.update',
  },
};

export const FE_FORM_VALUE_CONSTANTS = {
  MORTGAGE_INPUT: {
    MORTGAGE_BALANCE: 'mortgageAmount',
    MORTGAGE_TERM: 'timePeriod',
    MORTGAGE_PAYMENT: 'monthlyMortgagePayment',
  },
};
