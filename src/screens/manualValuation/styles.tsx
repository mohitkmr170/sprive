import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centerContainer: {flex: 1, margin: STYLE_CONSTANTS.margin.LARGEST},
  fieldContainer: {flex: 1},
  questionText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  valuationGuessText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.7,
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
    marginBottom: STYLE_CONSTANTS.margin.HUGE,
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLISH,
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
  formInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    color: COLOR.VOILET,
    paddingVertical: STYLE_CONSTANTS.padding.SMALL,
    marginLeft: STYLE_CONSTANTS.margin.SMALLEST,
  },
});
