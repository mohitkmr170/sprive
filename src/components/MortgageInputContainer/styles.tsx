import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  mortgageInputInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    width: '75%',
  },
  topContainer: {flex: 1},
  infoText: {
    flexWrap: 'wrap',
    color: COLOR.DARK_BLUE,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
});
