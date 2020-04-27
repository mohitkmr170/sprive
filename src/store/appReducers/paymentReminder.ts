import {actionTypes} from '../actionTypes';
import {navigate} from '../../navigation/navigationService';
import {NAVIGATION_SCREEN_NAME} from '../../utils';

const initialState = {
  isPaymentReminderReceived: false,
};
export const paymentReminder = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_PAYMENT_REMINDER_RECEIVED:
      /*
      NOTES : navigation needs to be changed as per response data field
      */
      navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {});
      state.isPaymentReminderReceived = !state.isPaymentReminderReceived;
      return {
        ...state,
      };

    default:
      return state;
  }
};
