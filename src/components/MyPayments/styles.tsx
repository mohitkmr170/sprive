import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {justifyContent: 'space-evenly'},
  myPaymentsText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
    marginBottom: STYLE_CONSTANTS.margin.LARGEST,
    paddingHorizontal: STYLE_CONSTANTS.padding.BELOW_NORMAL,
  },
});
