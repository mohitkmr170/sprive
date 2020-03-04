/**
 * Payload Keys for all API payloads
 */

/*
 TODO : Need to be added throughOut the app in a separate branch
 */

export const PAYLOAD_KEYS: any = {
  USER_ID: 'user_id',
  ID: 'id',
  OVERPAYMENT: {
    OVERPAYMENT_AMOUNT: 'amount',
    PAGE: 'page',
    YEAR: 'year',
  },
  LOGIN: {
    STRATEGY: 'strategy',
    EMAIL: 'email',
    PASSWORD: 'password',
  },
  SIGNUP: {
    EMAIL: 'email',
    PASSWORD: 'password',
    VERIFICATION_TOKEN: 'verification_token',
  },
  MORTGAGE_INPUT: {
    MORTGAGE_ID: 'mortgage_id',
    MORTGAGE_BALANCE: 'mortgage_balance',
    MORTGAGE_TERM: 'mortgage_term',
    MORTGAGE_PAYMENT: 'mortgage_payment',
    OLD_MORTGAGE_TERM: 'old_mortgage_term',
    NEW_MORTGAGE_TERM: 'new_mortgage_term',
    MONTHLY_OVERPAYMENT_AMOUNT: 'monthly_overpayment_amount',
  },
  INTEREST: {
    TOTAL_INTEREST_SAVED: 'total_interest_saved',
  },
  GRAPH: {
    GRAPH_DATA: 'graph_data',
    FROM_DATE: 'from_date',
    TO_DATE: 'to_date',
    CURRENT_DATE: 'current_date',
  },
  ISSUE: {
    CATEGORY_ID: 'category_id',
    DESCRIPTION: 'description',
  },
  RESET_PASSWORD: {
    PASSWORD_RESET_KEY: 'password_reset_key',
    NEW_PASSWORD: 'new_password',
  },
  UPDATE_PASSWORD: {
    CURRENT_PASSWORD: 'current_password',
    NEW_PASSWORD: 'new_password',
  },
  PENDING_TASK: {
    USER_ID: 'user_id',
    TASK_ID: 'task_id',
    STAGE_ID: 'stage_id',
    DATA: 'data',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    DOB: 'dob',
    HOUSE_NUMBER: 'house_number',
    STREET_NAME: 'street_name',
    CITY: 'city',
    POST_CODE: 'post_code',
  },
};
