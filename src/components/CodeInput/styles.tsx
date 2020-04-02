import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

export const styles = StyleSheet.create({
  root: {
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    paddingHorizontal: 2 * STYLE_CONSTANTS.padding.LARGEST,
  },
  codeFiledRoot: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
  cell: {
    width: STYLE_CONSTANTS.margin.HUGER,
    height: STYLE_CONSTANTS.margin.HUGER,
    borderRadius: STYLE_CONSTANTS.margin.HUGER / 2,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    borderWidth: 2,
    borderColor: COLOR.CODE_INPUT_BG_COLOR,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  focusCell: {
    borderColor: COLOR.BLACK,
  },
  innerContainer: {
    height: STYLE_CONSTANTS.margin.NORMAL,
    width: STYLE_CONSTANTS.margin.NORMAL,
    borderRadius: STYLE_CONSTANTS.margin.NORMAL / 2,
  },
  externalContainer: {
    width: STYLE_CONSTANTS.margin.HUGER,
    height: STYLE_CONSTANTS.margin.HUGER,
    borderRadius: STYLE_CONSTANTS.margin.HUGER / 2,
    backgroundColor: COLOR.BEIGE_GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
