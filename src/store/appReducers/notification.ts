import {actionTypes} from '../actionTypes';
import {navigate} from '../../navigation/navigationService';
import {NAVIGATION_SCREEN_NAME} from '../../utils';

const initialState = {
  isNotificationReceived: false,
  notificationId: null,
};
export const notification = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_NOTIFICATION_RECEIVED:
      navigate(NAVIGATION_SCREEN_NAME.REPORT_ISSUE, {});
      state.isNotificationReceived = !state.isNotificationReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
