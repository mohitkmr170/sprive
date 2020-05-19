import {actionTypes} from '../actionTypes';

const initialState = {
  isPolicyUpdateReceived: false,
  notificationId: null,
};
export const policyUpdate = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_POLICY_UPDATE_RECEIVED:
      state.isPolicyUpdateReceived = !state.isPolicyUpdateReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
