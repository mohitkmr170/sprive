import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  mortgageInputInput: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    fontFamily: STYLE_CONSTANTS.font.FONT_FAMILY.OPENSANS_REGULAR,
    color: COLOR.VOILET,
  },
  topContainer: {flex: 1},
  infoText: {
    flexWrap: 'wrap',
    color: COLOR.DARK_BLUE,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
});
