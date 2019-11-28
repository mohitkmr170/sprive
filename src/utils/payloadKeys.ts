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
  },
};
