import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flexGrow: 1,
  },
  emailInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    width: '95%',
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
    padding: STYLE_CONSTANTS.padding.SMALLEST,
  },
  topTextContainer: {
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
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
    borderRadius: 40,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  buttonTextStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    paddingVertical: STYLE_CONSTANTS.margin.NORMAL,
  },
  loader: {marginVertical: 24},
});
