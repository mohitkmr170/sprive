import {actionTypes} from '../actionTypes';
export const LOGOUT_USER = 'LOGOUT_USER';

export const addUserDetails = (userDetails: {
  userName: string;
  userPassword: string;
}) => {
  console.log('addUserDetails : checking payload, userDetails =>', userDetails);
  return {
    type: actionTypes.ADD_USER_DETAILS,
    payload: userDetails,
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const notification = (notification_id?: object) => {
  return {
    type: actionTypes.IS_NOTIFICATION_RECEIVED,
    payload: notification_id,
  };
};

export const clearFormData = () => {
  return {
    type: actionTypes.CLEAR_FORM_DATA,
  };
};

export const policyUpdate = (notification_id?: object) => {
  return {
    type: actionTypes.IS_POLICY_UPDATE_RECEIVED,
    payload: notification_id,
  };
};

export const paymentReminder = (notification_id?: object) => {
  return {
    type: actionTypes.IS_PAYMENT_REMINDER_RECEIVED,
    payload: notification_id,
  };
};
export const blogPostNotification = (notification_id?: object) => {
  return {
    type: actionTypes.IS_BLOG_POST_NOTIFICATION_RECEIVED,
    payload: notification_id,
  };
};
