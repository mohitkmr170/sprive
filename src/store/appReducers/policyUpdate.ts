import {actionTypes} from '../actionTypes';

const initialState = {
  isPolicyUpdateReceived: false,
};
export const policyUpdate = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_POLICY_UPDATE_RECEIVED:
      state.isPolicyUpdateReceived = !state.isPolicyUpdateReceived;
      return {
        ...state,
      };

    default:
      return state;
  }
};
