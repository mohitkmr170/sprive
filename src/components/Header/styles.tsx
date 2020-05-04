import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALL,
    paddingVertical: STYLE_CONSTANTS.padding.SMALL,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.5,
  },
  middleTextContainer: {flex: 1, alignItems: 'center'},
  emptyLeftContainer: {
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    width: STYLE_CONSTANTS.margin.HUMONGOUS,
    height: STYLE_CONSTANTS.margin.HUMONGOUS,
  },
  sideText: {alignSelf: 'center'},
  middleContainer: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    color: COLOR.DARK_BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  touchable: {
    paddingVertical: STYLE_CONSTANTS.padding.SMALL,
  },
});
