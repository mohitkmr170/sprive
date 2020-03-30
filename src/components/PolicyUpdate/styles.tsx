import {StyleSheet, Platform} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export const styles = StyleSheet.create({
  policyUpdateContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 1,
    backgroundColor: COLOR.LIGHT_OPACITY_BLACK,
    paddingTop:
      Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_ANDROID
        ? 0
        : getStatusBarHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  policyUpdateInnerContainer: {
    backgroundColor: COLOR.WHITE,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    paddingTop: 2 * STYLE_CONSTANTS.margin.HUMONGOUS,
    paddingBottom: STYLE_CONSTANTS.padding.HUGISH,
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGISH,
  },
  hiThereText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  recentText: {
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.HUE_BLUE,
    textAlign: 'center',
  },
  termsAndConditionText: {
    color: COLOR.BLUE,
    textDecorationLine: 'underline',
  },
  allUsersText: {
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.HUE_BLUE,
    textAlign: 'center',
  },
  okayText: {
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.PRIMARY,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
