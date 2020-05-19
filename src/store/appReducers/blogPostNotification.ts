import {actionTypes} from '../actionTypes';

const initialState = {
  isBlogNotificationReceived: false,
  notificationId: null,
};
export const blogPostNotification = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_BLOG_POST_NOTIFICATION_RECEIVED:
      state.isBlogNotificationReceived = !state.isBlogNotificationReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
