import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    borderTopColor: COLOR.RED,
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  errorTextStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    textAlign: 'right',
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
    color: COLOR.RED,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.NORMAL,
  },
});
