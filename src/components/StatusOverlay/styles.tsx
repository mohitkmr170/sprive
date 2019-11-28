import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from 'src/utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGISH,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: COLOR.LIGHT_OPACITY_BLACK,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    backgroundColor: COLOR.WHITE,
    paddingVertical: STYLE_CONSTANTS.padding.HUGE,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGER,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: STYLE_CONSTANTS.padding.SMALL,
  },
  innerTitle: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    paddingTop: STYLE_CONSTANTS.padding.HUMONGOUS,
  },
  innerText: {
    textAlign: 'center',
    paddingTop: STYLE_CONSTANTS.padding.SMALLISH,
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    opacity: 0.5,
  },
  okPressButton: {
    color: COLOR.PRIMARY,
    paddingTop: STYLE_CONSTANTS.padding.HUGE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
