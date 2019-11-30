import {actionTypes} from '../actionTypes';

export const triggerUserDataChangeEvent = (userDataChanged: boolean) => {
  console.log('triggerUserDataChangeEvent : checking payload, userDataChanged =>', userDataChanged);
  return {
    type: actionTypes.USER_DATA_CHANGED,
    payload: userDataChanged,
  };
};
