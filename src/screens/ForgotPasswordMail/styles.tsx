import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.EXTRA_HUMUNGOUS),
  },
  forgotPassText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.HUGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST),
    textAlign: 'left',
    color: COLOR.VOILET,
  },
  pleaseCheckText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGER),
    paddingTop: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    color: COLOR.HALF_VOILET,
  },
  currEmailText: {
    color: COLOR.VOILET,
    fontStyle: 'italic',
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
    borderRadius: 2 * verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    marginBottom: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
  },
  buttonTextStyle: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    paddingVertical: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  resendTouchContainer: {
    marginBottom: 2 * verticalScale(STYLE_CONSTANTS.margin.LARGE),
    alignItems: 'center',
  },
  resentText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGE),
    opacity: 0.5,
    color: COLOR.VOILET,
  },
});
