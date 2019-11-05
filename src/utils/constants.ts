import {Dimensions, StyleSheet} from 'react-native';

/**
 * App Constants
 */

export const APP_CONSTANTS = {
  HIT_SLOP: {left: 10, right: 10, top: 10, bottom: 10},
  GRAPH_HEIGHT: 200,
  LOGIN_FORM: 'logIn',
  SIGNUP_FORM: 'signup',
  MORTGAGE_INPUT_FORM: 'MortgageInput',
};

export const STYLE_CONSTANTS = {
  device: {
    SCREEN_HEIGHT: Dimensions.get('screen').height,
    SCREEN_WIDTH: Dimensions.get('screen').width,
    WINDOW_HEIGHT: Dimensions.get('window').height,
    WINDOW_WIDTH: Dimensions.get('window').width,
    DEVICE_TYPE_ANDROID: 'Android',
    DEVICE_TYPE_IOS: 'IOS',
  },
  margin: {
    HUGE: 36,
    HUGISH: 28,
    LARGER: 24,
    LARGE: 22,
    LARGEST: 20,
    LARGISH: 18,
    NORMAL: 16,
    SMALL: 12,
    SMALLISH: 10,
    SMALLER: 8,
    SMALLEST: 4,
  },
  padding: {
    HUGE: 32,
    HUGISH: 28,
    LARGER: 24,
    LARGE: 22,
    LARGEST: 20,
    LARGISH: 18,
    NORMAL: 16,
    SMALL: 12,
    SMALLISH: 10,
    SMALLER: 8,
    SMALLEST: 4,
  },
  font: {
    SIZE: {
      HUMONGOUS: 48,
      HUGER: 28,
      HUGE: 24,
      HUGISH: 22,
      LARGEST: 20,
      LARGER: 18,
      LARGE: 16,
      LARGISH: 15,
      NORMAL: 14,
      SMALL: 12,
      SMALLER: 11,
      TINY: 10,
    },
    LINEHEIGHT: {
      HUMONGOUS: 48,
      HUGEST: 36,
      HUGER: 28,
      HUGE: 24,
      HUGISH: 22,
      LARGER: 20,
      LARGE: 16,
      NORMAL: 14,
      SMALL: 12,
      SMALLER: 11,
    },
    WEIGHT: {
      NORMAL: 'normal',
      SEMI_BOLD: '500',
      BOLD: 'bold',
    },
  },
  border: {
    WIDTH: {
      LIGHTER: StyleSheet.hairlineWidth, // lighter:0.125,
      LIGHT: StyleSheet.hairlineWidth, // light:0.25,
      NORMAL: StyleSheet.hairlineWidth * 2, // normal:0.5,
      HEAVY: 1, // heavy:1.0,
      HEAVIER: 2, // heavier:1.5,
      HEAVIEST: 3, // heaviest:3,
    },
  },
};

export const NAVIGATION_SCREEN_NAME = {
  AUTH_STACK: 'Auth',
  APP_STACK: 'App',
  LOGIN_SCREEN: 'LoginScreen',
  SIGNUP_SCREEN: 'SignUpScreen',
  DASHBOARD_SCREEN: 'DashboardScreen',
  MORTGAGE_INPUT_SCREEN: 'MortgageInputScreen',
};
