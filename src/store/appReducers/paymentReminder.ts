import {actionTypes} from '../actionTypes';

const initialState = {
  isPaymentReminderReceived: false,
  notificationId: null,
};
export const paymentReminder = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_PAYMENT_REMINDER_RECEIVED:
      state.isPaymentReminderReceived = !state.isPaymentReminderReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
