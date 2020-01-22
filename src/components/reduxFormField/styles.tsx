import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS} from '../../utils';

export const Styles = StyleSheet.create({
  containerStyle: {
    marginBottom: STYLE_CONSTANTS.margin.SMALLEST,
  },
  labelStyle: {
    marginTop:
      STYLE_CONSTANTS.margin.SMALLISH - STYLE_CONSTANTS.margin.SMALLEST,
  },
  fieldError: {
    alignItems: 'flex-end',
    maxHeight: STYLE_CONSTANTS.margin.HUGISH,
    minHeight: STYLE_CONSTANTS.padding.BELOW_NORMAL,
  },
  errorText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    color: 'red',
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.NORMAL,
  },
});
