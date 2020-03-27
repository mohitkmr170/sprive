/*
NOTES : This is kept here temporarily, will be modified later
*/

export const APP_KEYS = {
  APP_NAME: 'Sprive',
};
export const LOCAL_KEYS = {
  HOUSE_NUMBER: 'item.house_number',
  STREET_NAME: 'item.street_name',
  CITY: 'item.city',
  POST_CODE: 'item.post_code',
  DISPLAY_ADDRESS: 'item.display_address',
  DISPLAY_ADDRESS_KEY: 'display_address',
  SWIPER_NAME: 'name',
  PUSH_NOTIFICATION_ACCESS_GRANTED: 'granted',
};
export const NOTIFICATION_TYPES = {
  PRIVACY_POLICY: 'privacy_policy',
  USER_FEEDBACK: 'user_feedback',
  PAYMENT_REMINDER: 'payment_reminder',
};
export const NATIVE_EVENTS = {
  WIDTH: 'width',
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
  LEFT_ICON: 'chevrons-left',
  RIGHT_ICON: 'chevrons-right',
};
export const FE_FORM_VALUE_CONSTANTS = {
  MORTGAGE_INPUT: {
    MORTGAGE_BALANCE: 'mortgageAmount',
    MORTGAGE_TERM: 'timePeriod',
    MORTGAGE_PAYMENT: 'monthlyMortgagePayment',
  },
  GET_ADDRESS: {
    FLAT_NUMBER: 'flatNumber',
    STREET_NAME: 'streetName',
    CITY: 'city',
    POST_CODE: 'postCode',
  },
  USER_PROFILE: {
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    DATE_OF_BIRTH: 'dateOfBirth',
    ADDRESS: 'address',
  },
};
export const STATE_PARAMS = {
  SELECTED_SEARCH_ADDRESS_INDEX: 'state.params.selectedAddressIndex',
  DETAILED_USER_ADDRESS: 'state.params.detailedAddress',
  TASK_ID: 'state.params.taskId',
  STAGE_ID: 'state.params.stageId',
  IS_FIRST_ROUTE: 'state.params.isFirstRoute',
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
  WEB_VIEW_URI:
    'https://drive.google.com/open?id=1245ani10Xj25jnGUyUYtaU5idZ2Je9LZ',
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
