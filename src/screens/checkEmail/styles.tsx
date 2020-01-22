import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  imageView: {
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    height: 10 * STYLE_CONSTANTS.margin.HUGISH,
  },
  textContainer: {
    marginHorizontal: STYLE_CONSTANTS.margin.SMALL,
  },
  pleaseCheckText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    textAlign: 'center',
  },
  emailSentText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    color: COLOR.VOILET,
    textAlign: 'center',
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: 2 * STYLE_CONSTANTS.margin.LARGEST,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  buttonTextStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    paddingVertical: STYLE_CONSTANTS.margin.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  resendTouchContainer: {
    marginBottom: 2 * STYLE_CONSTANTS.margin.LARGE,
    alignItems: 'center',
  },
  resentText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    opacity: 0.5,
    color: COLOR.VOILET,
  },
});
