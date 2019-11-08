import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const textInputBoxStyle = StyleSheet.create({
  labelText: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.REDUX_TEXTINPUT_TEXT,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
    opacity: 0.3,
    marginLeft: STYLE_CONSTANTS.margin.SMALLEST,
  },
  inputBox: {
    height: 40,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
  },
  inputContainer: {
    borderColor: COLOR.REDUX_FORM_INPUT_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: STYLE_CONSTANTS.padding.SMALL,
  },
  topContainer: {flexDirection: 'row'},
  currencyIcon: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    alignSelf: 'center',
    marginRight: STYLE_CONSTANTS.margin.SMALLEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  inputTypeIcon: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    marginRight: STYLE_CONSTANTS.margin.SMALLISH,
  },
  parameterText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    color: COLOR.DARK_BLUE,
    opacity: 0.3,
    alignSelf: 'center',
    fontStyle: 'italic',
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
