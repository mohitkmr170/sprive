import {Dimensions} from 'react-native';

/**
 * App Constants
 */

export const appConstants = {
  SCREEN_HEIGHT: Dimensions.get('screen').height,
  SCREEN_WIDTH: Dimensions.get('screen').width,
  WINDOW_HEIGHT: Dimensions.get('window').height,
  WINDOW_WIDTH: Dimensions.get('window').width,
  HIT_SLOP: {left: 10, right: 10, top: 10, bottom: 10},
  GRAPH_HEIGHT: 200,
  LOGIN_FORM: 'logIn',
  SIGNUP_FORM: 'signup',
};
