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
  },
  signInText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    marginTop: STYLE_CONSTANTS.margin.EXTRA_HUMUNGOUS,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  emailInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    marginBottom: STYLE_CONSTANTS.margin.SMALLEST,
    padding: STYLE_CONSTANTS.padding.SMALLEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    width: '95%',
  },
  phoneInputContainer: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST,
    width: '100%',
  },
  forgotPassword: {
    marginRight: STYLE_CONSTANTS.margin.LARGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.BLUE,
  },
  buttonTitleStyle: {
    marginVertical: STYLE_CONSTANTS.margin.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  buttonExtStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: 54,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  switchToSignUpText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
    alignSelf: 'center',
    marginBottom: STYLE_CONSTANTS.margin.HUGER,
  },
  forgotPasswordContainer: {alignSelf: 'flex-end'},
  loader: {marginVertical: 16},
});
