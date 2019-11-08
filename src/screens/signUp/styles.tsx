import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flexGrow: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  emailInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    width: '95%',
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
    padding: STYLE_CONSTANTS.padding.SMALLEST,
  },
  middleContainer: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
  },
  switchToSignUpText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
    alignSelf: 'center',
    marginBottom: STYLE_CONSTANTS.margin.HUGER,
  },
  registrationText: {
    marginRight: STYLE_CONSTANTS.margin.SMALLISH,
    color: COLOR.BLUE,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.SMALL,
  },
  progressStatusText: {
    color: COLOR.BLUE,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.SMALL,
    opacity: 0.5,
  },
  accountSetupText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
  },
  passStrengthContainer: {
    flexDirection: 'row',
    marginRight: STYLE_CONSTANTS.margin.LARGEST,
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
  bottomText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  decoratedText: {color: COLOR.BLUE, textDecorationLine: 'underline'},
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: 48,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  buttonTextStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginVertical: STYLE_CONSTANTS.margin.NORMAL,
  },
});
