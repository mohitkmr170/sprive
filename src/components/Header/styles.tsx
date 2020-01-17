import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALL,
    paddingVertical: STYLE_CONSTANTS.padding.SMALL,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.5,
  },
  emptyLeftContainer: {paddingVertical: 20},
  sideText: {alignSelf: 'center'},
  middleContainer: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    color: COLOR.DARK_BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  touchable: {paddingVertical: STYLE_CONSTANTS.padding.SMALL},
});
