import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    marginTop: verticalScale(STYLE_CONSTANTS.margin.EXTRA_HUMUNGOUS),
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
  },
  resetPasswordText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.HUGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST),
    textAlign: 'left',
    color: COLOR.VOILET,
  },
  passStrengthContainer: {
    flexDirection: 'row',
    marginRight: STYLE_CONSTANTS.margin.LARGEST,
    paddingBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  passStrengthInnerContainer: {
    flex: 1,
    marginRight: STYLE_CONSTANTS.margin.SMALL,
    alignSelf: 'center',
  },
  passStrengthText: {
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
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
  buttonView: {
    marginBottom: 2 * verticalScale(STYLE_CONSTANTS.margin.HUGER),
  },
  emailInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    marginBottom: STYLE_CONSTANTS.margin.SMALLEST,
    padding: STYLE_CONSTANTS.padding.SMALLEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    width: '95%',
  },
});
