/*
NOTES : This is kept here temporarily, will be modified later
*/

export const APP_KEYS = {
  APP_NAME: 'Sprive',
  SPRIVE_WEB_URL: 'https://www.sprive.co.uk',
};
export const LOCAL_KEYS = {
  ADDRESS_LINE1: 'item.address_line_1',
  ADDRESS_LINE2: 'item.address_line_2',
  CITY: 'item.town_or_city',
  COUNTY: 'item.county_or_region',
  POST_CODE: 'item.postcode',
  DISPLAY_ADDRESS: 'item.display_address',
  DISPLAY_ADDRESS_KEY: 'display_address',
  SWIPER_NAME: 'name',
  YEAR: 'year',
  PUSH_NOTIFICATION_ACCESS_GRANTED: 'granted',
  DATE_FORMAT_SLASH: 'DD/MM/YYYY',
};
export const NOTIFICATION_TYPES = {
  PRIVACY_POLICY: 'privacy_policy',
  USER_FEEDBACK: 'user_feedback',
  PAYMENT_REMINDER: 'payment_reminder',
};
export const NATIVE_EVENTS = {
  WIDTH: 'width',
  HEIGHT: 'height',
  Y_OFFSET: 'y',
};
export const NUMERIC_FACTORS = {
  PERCENT_FACTOR: 100,
  LTV_FRACTION_OFFSET: 5,
};
export const ICON = {
  UP: 'ios-arrow-round-up',
  DOWN: 'ios-arrow-round-down',
};
export const ICON_NAME = {
  LEFT_ICON: 'angle-left',
  RIGHT_ICON: 'angle-right',
};
export const FE_FORM_VALUE_CONSTANTS = {
  MORTGAGE_INPUT: {
    MORTGAGE_BALANCE: 'mortgageAmount',
    MORTGAGE_TERM: 'timePeriod',
    MORTGAGE_PAYMENT: 'monthlyMortgagePayment',
  },
  GET_ADDRESS: {
    ADDRESS_LINE1: 'address_line_1',
    ADDRESS_LINE2: 'address_line_2',
    CITY: 'town_or_city',
    COUNTY: 'county_or_region',
    POST_CODE: 'postcode',
  },
  USER_PROFILE: {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DATE_OF_BIRTH: 'dateOfBirth',
    ADDRESS: 'address',
  },
};
export const STATE_PARAMS = {
  NAV_PARAMS: 'navigation.state.params',
  SELECTED_SEARCH_ADDRESS_INDEX: 'state.params.selectedAddressIndex',
  DETAILED_USER_ADDRESS: 'state.params.detailedAddress',
  TASK_ID: 'state.params.taskId',
  STAGE_ID: 'state.params.stageId',
  IS_FIRST_ROUTE: 'state.params.isFirstRoute',
  IS_ADDRESS_CHANGED: 'navigation.state.params.isAddressChanged',
};
/*
NOTES : This data will be obtained from Backend API
*/
export const TASK_IDS = {
  TASK_ONE: 1,
  TASK_TWO: 2,
  TASK_THREE: 3,
  TASK_FOUR: 4,
  TASK_FIVE: 5,
};
/*
NOTES : This data will be obtained from Backend API
*/
export const STAGE_IDS = {
  STAGE_ONE: 1,
  STAGE_TWO: 2,
  STAGE_THREE: 3,
  STAGE_FOUR: 4,
  STAGE_FIVE: 5,
};
export const STAGE_NAME_INDEX = {
  USER_PROFILE: 1,
};
export const WEB_VIEW_PARAMS = {
  WEB_VIEW: 'state.params.webViewUri',
  IS_POLICY: 'state.params.isPolicy',
  WEB_VIEW_URI_TERMS: 'https://www.sprive.com/terms',
  WEB_VIEW_URI_PRIVACY: 'https://www.sprive.com/privacy',
};
export const APP_REGEX = {
  POST_CODE_UK: /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i,
};
export const SEARCH_ADDRESS = {
  ITEM_INDEX: 'index',
  ITEM_COMPLETE_ADDRESS: 'item.completeAddress',
  COMPLETE_ADDRESS: 'completeAddress',
};
export const PENDING_TASK_IDS = {
  TASKS: {
    USER_PROFILE: 1,
  },
  STAGES: {
    ABOUT_YOU: 1,
    ADDRESS: 2,
  },
};
export const ANIMATION_CONSTANTS = {
  TIMING: {
    NORMAL: 350,
  },
};
export const SECURITY_TYPE = {
  PIN: 'pin',
  FACE: 'face',
  PIN_INDEX: 1,
  FACE_INDEX: 2,
};
export const BIOMETRY_TYPE = {
  FACE_ID: 'Face ID',
};
export const BIOMETRIC_KEYS = {
  NAME: 'name',
  BIOMETRIC: 'biometric',
  ERROR_KEY: {
    NOT_ENROLLED: 'FingerprintScannerNotEnrolled',
    NOT_AVAILABLE: 'FingerprintScannerNotAvailable',
  },
  CTA: {
    USER_FALLBACK: 'UserFallback',
    CANCEL: 'UserCancel',
  },
};
