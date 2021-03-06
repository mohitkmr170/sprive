import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const textInputBoxStyle = StyleSheet.create({
  labelText: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
    opacity: 0.5,
    marginLeft: STYLE_CONSTANTS.margin.SMALLEST,
  },
  inputBox: {
    height: STYLE_CONSTANTS.margin.HUMONGOUS,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  inputContainer: {
    borderColor: COLOR.REDUX_FORM_INPUT_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  topContainer: {flexDirection: 'row', justifyContent: 'center'},
  currencyIcon: {
    paddingTop: 1,
    textAlign: 'center',
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    alignSelf: 'center',
    marginRight: STYLE_CONSTANTS.margin.SMALLEST,
    color: COLOR.DOLLAR_COLOR,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  inputTypeIcon: {
    marginRight: STYLE_CONSTANTS.margin.SMALLISH,
  },
  iconContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  rightIconContainer: {
    justifyContent: 'center',
  },
  textInputContainer: {flex: 1, justifyContent: 'center'},
  parameterText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    color: COLOR.DARK_BLUE,
    opacity: 0.3,
    fontStyle: 'italic',
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
