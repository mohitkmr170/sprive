import {actionTypes} from '../actionTypes';

export const addUserDetails = (userDetails: {
  userName: string;
  userPassword: string;
}) => {
  console.log('addUserDetails : checking payload, userDetails', userDetails);
  return {
    type: actionTypes.ADD_USER_DETAILS,
    payload: userDetails,
  };
};
