import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginBottom: 4 * verticalScale(STYLE_CONSTANTS.margin.LARGEST),
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
  },
  imageView: {
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.HUGER),
    height: 10 * verticalScale(STYLE_CONSTANTS.margin.HUGISH),
  },
  textContainer: {
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.SMALL),
  },
  pleaseCheckText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.HUGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST),
    color: COLOR.VOILET,
    textAlign: 'center',
  },
  emailSentText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.SMALL),
    color: COLOR.VOILET,
    textAlign: 'center',
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
});
