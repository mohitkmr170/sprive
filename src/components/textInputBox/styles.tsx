import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

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
    height: 40,
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
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    marginRight: STYLE_CONSTANTS.margin.SMALLISH,
  },
  parameterText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    color: COLOR.DARK_BLUE,
    opacity: 0.3,
    fontStyle: 'italic',
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    textAlignVertical: 'center',
    flex: 1,
  },
});
