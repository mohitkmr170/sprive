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
  editModeView: {flexDirection: 'row', justifyContent: 'space-between'},
  editModeTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginLeft: STYLE_CONSTANTS.margin.SMALL,
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
  completeLaterView: {
    alignItems: 'center',
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  formScrollableView: {
    flexGrow: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  aboutYouText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
  },
  completeLaterText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
});
