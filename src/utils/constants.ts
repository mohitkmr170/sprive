import {Dimensions} from 'react-native';

/**
 * App Constants
 */

export const appConstants = {
  HIT_SLOP: {left: 10, right: 10, top: 10, bottom: 10},
  GRAPH_HEIGHT: 200,
  LOGIN_FORM: 'logIn',
  SIGNUP_FORM: 'signup',
};

export const styleConstants = {
  device: {
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    WINDOW_HEIGHT: Dimensions.get('window').height,
    WINDOW_WIDTH: Dimensions.get('window').width,
    DEVICE_TYPE_ANDROID: 'Android',
    DEVICE_TYPE_IOS: 'IOS',
  },
  padding: {
    LARGE: 24,
    NORMAL: 16,
    SMALL: 12,
  },
};

export const navigationScreen = {
  AUTH_STACK: 'Auth',
  APP_STACK: 'App',
  LOGIN_SCREEN: 'LoginScreen',
  SIGNUP_SCREEN: 'SignUpScreen',
  DASHBOARD_SCREEN: 'DashboardScreen',
};
