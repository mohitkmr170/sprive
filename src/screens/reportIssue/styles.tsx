import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginVertical: STYLE_CONSTANTS.margin.HUGISH,
  },
  buttonTitle: {
    color: COLOR.WHITE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginBottom: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  titleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  dropDownContainer: {
    backgroundColor: COLOR.ALICE_BLUE,
    marginTop: STYLE_CONSTANTS.margin.HUGE,
  },
  dropDownItemText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  descriptionTitle: {
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  internalStyle: {
    borderBottomColor: 'transparent',
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  descriptionTextFaded: {
    color: COLOR.VOILET,
    fontStyle: 'italic',
    fontWeight: 'normal',
  },
  descriptionInput: {
    backgroundColor: COLOR.ALICE_BLUE,
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALLISH,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.SMALLISH,
    height: STYLE_CONSTANTS.device.WINDOW_HEIGHT / 5,
  },
  descriptionWarning: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.SMALLISH,
    color: COLOR.PARTIAL_BLACK,
  },
});
