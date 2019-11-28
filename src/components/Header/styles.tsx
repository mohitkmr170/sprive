import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: STYLE_CONSTANTS.padding.SMALL,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.5,
  },
  sideText: {alignSelf: 'center'},
  middleContainer: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    color: COLOR.DARK_BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
