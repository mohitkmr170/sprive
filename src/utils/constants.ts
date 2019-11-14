import {Dimensions, StyleSheet} from 'react-native';

/**
 * App Constants
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
    SMALL: 12,
    SMALLISH: 10,
    SMALLER: 8,
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
      SEMI_BOLD: '500',
      BOLD: 'bold',
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
export const ICON_NAME = {
  LEFT_ICON: 'chevrons-left',
  RIGHT_ICON: 'chevrons-right',
};
export const DB_KEYS = {
  ACCESS_TOKEN: 'response.accessToken',
  IS_FETCHING: 'isFetching',
  TOTAL_INTEREST: 'response.data.totalInterest',
  AUTH_STATUS: 'status',
  CURRENT_USER_EMAIL: 'response.data.email',
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
  MORTGAGE_INPUT_DATA: {
    LOCALE_STRING_MORTGAGE_DATA: 'mortgageForm.mortgageData',
    LOCALE_STRING_WORKOUT: 'mortgageForm.letUsWorkOut',
    LOCALE_STRING_TAKE_YOUR_BEST: 'mortgageForm.takeYourBest',
    BUTTON_LOCALE_STRING: 'global.calculateNow',
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
  },
  SET_GOAL_SCREEN: {
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
  },
  GRAPH_COMPONENT: {
    PROJECTED_TIME: 'stackBarGraphComponent.projectedTime',
    SAVING: 'stackBarGraphComponent.saving',
    MONTHS: 'stackBarGraphComponent.months',
    PROJECTED_INT: 'stackBarGraphComponent.projectIntereste',
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
  },
};
