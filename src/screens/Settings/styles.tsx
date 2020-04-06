import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

const SWITCH_BUTTON_SCALE_FACTOR = 0.9;

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centerContainer: {flex: 1},
  topViewContainer: {
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
    padding: STYLE_CONSTANTS.padding.HUGISH,
  },
  titleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  listContainer: {flex: 1},
  listItemContainer: {
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGISH,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  switchContainer: {
    position: 'absolute',
    right: STYLE_CONSTANTS.margin.HUGISH,
    transform: [
      {scaleX: SWITCH_BUTTON_SCALE_FACTOR},
      {scaleY: SWITCH_BUTTON_SCALE_FACTOR},
    ],
  },
  listItemText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.PRIMARY,
  },
});
