import {actionTypes} from '../actionTypes';

const initialState = {
  userDetails: {
    userName: '',
    userPassword: '',
  },
};

export const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          userName: action.payload.userName,
          userPassword: action.payload.userPassword,
        },
      };
    default:
      return state;
  }
};
