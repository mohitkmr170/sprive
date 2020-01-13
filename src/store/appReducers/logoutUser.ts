import {LOGOUT_USER} from '../actions/actions';

const initialState = {
  userDetails: {
    userName: '',
    userPassword: '',
  },
};

export const logoutUser = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGOUT_USER:
      return {
        ...state,
      };

    default:
      return state;
  }
};
