import {actionTypes} from '../actionTypes';

const initialState = {
  isNotificationReceived: false,
  notificationId: null,
};
export const notification = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_NOTIFICATION_RECEIVED:
      state.isNotificationReceived = !state.isNotificationReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
