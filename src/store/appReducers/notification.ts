import {actionTypes} from '../actionTypes';
import {get as _get} from 'lodash';
import {LOCAL_KEYS} from '../../utils';

const initialState = {
  isNotificationReceived: false,
  notificationId: null,
  onesignal_message_id: null,
};
export const notification = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_NOTIFICATION_RECEIVED:
      state.isNotificationReceived = !state.isNotificationReceived;
      state.notificationId = _get(action.payload, LOCAL_KEYS.ID, null);
      state.onesignal_message_id = _get(
        action.payload,
        LOCAL_KEYS.ONESIGNAL_MESSAGE_ID,
        null,
      );
      return {
        ...state,
      };

    default:
      return state;
  }
};
