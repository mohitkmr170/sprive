import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
    marginTop: STYLE_CONSTANTS.margin.EXTRA_HUMUNGOUS,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  resetPasswordText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
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
  buttonView: {
    marginBottom: 2 * STYLE_CONSTANTS.margin.HUGER,
  },
  emailInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    marginBottom: STYLE_CONSTANTS.margin.SMALLEST,
    padding: STYLE_CONSTANTS.padding.SMALLEST,
    width: '95%',
  },
  overLay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLOR.TRANSPARENT_BLACK,
  },
});
