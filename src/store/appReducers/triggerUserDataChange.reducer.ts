import {actionTypes} from '../actionTypes';

const initialState = {
  userDataChanged: false
};

export const userDataChangeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.USER_DATA_CHANGED:
      return {
        ...state,
        userDataChanged: action.payload
      };
    default:
      return state;
  }
};
