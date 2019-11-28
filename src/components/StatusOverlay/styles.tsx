import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

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
    color: COLOR.SLIDER_COLOR,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGEST,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    paddingTop: STYLE_CONSTANTS.padding.HUGE,
    textAlign: 'center',
  },
  mainMessage: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    paddingTop: STYLE_CONSTANTS.padding.LARGEST,
    textAlign: 'center',
  },
  firstText: {
    color: COLOR.PRIMARY,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    textAlign: 'center',
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  secondText: {
    color: COLOR.VOILET,
    opacity: 0.3,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    textAlign: 'center',
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  infoTitle: {
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALLISH,
    textAlign: 'center',
  },
});
