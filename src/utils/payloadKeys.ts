/**
 * Payload Keys for all API payloads
 */

/*
 TODO : Need to be added throughOut the app in a separate branch
 */

export const PAYLOAD_KEYS: any = {
  USER_ID: 'user_id',
  OVERPAYMENT: {
    OVERPAYMENT_AMOUNT: 'amount',
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
  },
};
