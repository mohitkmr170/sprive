import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  headerText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    marginTop: STYLE_CONSTANTS.margin.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  infoText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  codeInputContainer: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
});
