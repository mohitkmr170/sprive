import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  mainView: {
    flex: 1,
    marginVertical: STYLE_CONSTANTS.margin.HUGISH,
  },
  formInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    paddingVertical: STYLE_CONSTANTS.padding.SMALL,
    marginLeft: STYLE_CONSTANTS.margin.SMALLEST,
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  buttonTextStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    paddingVertical: STYLE_CONSTANTS.margin.NORMAL,
  },
  fieldLabelStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    opacity: 0.5,
    marginLeft: STYLE_CONSTANTS.margin.SMALLEST,
  },
  fieldContainer: {
    flexGrow: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  aboutYouText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginBottom: STYLE_CONSTANTS.margin.SMALLEST,
  },
  enterResidentialAddress: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.7,
  },
  inputContainer: {
    borderBottomColor: COLOR.LIGHT_BORDER_LEAST_OPACITY,
    borderBottomWidth: 1,
  },
  leftIconContainer: {
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST,
  },
  textInput: {
    marginLeft: STYLE_CONSTANTS.margin.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  findAddressContainer: {
    alignItems: 'center',
    marginHorizontal: STYLE_CONSTANTS.margin.SLIGHT_HUMUNGOUS,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLER,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  findMyAddressText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.PRIMARY,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  enterManuallyText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  completeLaterContainer: {alignItems: 'center'},
  completeLaterText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  inputContainerWrapper: {
    backgroundColor: COLOR.MILD_BACKGROUND_BLACK,
    borderRadius: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
  },
});
