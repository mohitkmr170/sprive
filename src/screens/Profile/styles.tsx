import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

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
  },
  listItemText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.PRIMARY,
  },
});
