import {actionTypes} from '../actionTypes';

const initialState = {
  isNotificationReceived: false,
};
export const notification = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_NOTIFICATION_RECEIVED:
      state.isNotificationReceived = !state.isNotificationReceived;
      return {
        ...state,
      };

    default:
      return state;
  }
};
