import {actionTypes} from '../actionTypes';

const initialState = {};

export const clearFormData = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.CLEAR_FORM_DATA:
      return {
        ...state,
      };

    default:
      return state;
  }
};
