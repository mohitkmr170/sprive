import {actionTypes} from '../actionTypes';
import {navigate} from '../../navigation/navigationService';
import {NAVIGATION_SCREEN_NAME} from '../../utils';

const initialState = {
  isPolicyUpdateReceived: false,
  notificationId: null,
};
export const policyUpdate = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.IS_POLICY_UPDATE_RECEIVED:
      navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {});
      state.isPolicyUpdateReceived = !state.isPolicyUpdateReceived;
      state.notificationId = action.payload;
      return {
        ...state,
      };

    default:
      return state;
  }
};
