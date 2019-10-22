import {aType} from '../actionTypes';

export const addUserDetails = userDetails => {
  console.log('asudgjasd', userDetails);
  return {
    type: aType.ADD_USER_DETAILS,
    payload: userDetails,
  };
};
