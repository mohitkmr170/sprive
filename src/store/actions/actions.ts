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

export const notification = () => {
  return {
    type: actionTypes.IS_NOTIFICATION_RECEIVED,
  };
};
