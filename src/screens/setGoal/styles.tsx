import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {
    flex: 1,
  },
  mortgageStatusProgressContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    flexDirection: 'row',
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  buttonTitleStyle: {
    color: COLOR.WHITE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  progressFractionText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.VOILET,
    opacity: 0.5,
    marginLeft: STYLE_CONSTANTS.margin.SMALLISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: 40,
  },
  mortgageTextData: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.DARK_GRAY,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  mainHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  setTargetText: {
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  targetTextContainer: {
    flexDirection: 'row',
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLISH,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
  },
  currentYearText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginLeft: STYLE_CONSTANTS.margin.SMALL,
  },
  sliderContainer: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGISH,
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
  },
  sliderLeftText: {
    alignSelf: 'center',
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  sliderInternalStyles: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALL,
  },
  detailText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
    color: COLOR.VOILET,
    opacity: 0.5,
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  basedOnText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    textAlign: 'center',
    marginTop: STYLE_CONSTANTS.margin.SLIGHT_HUMUNGOUS,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  bottomContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    borderWidth: 1,
    borderRadius: STYLE_CONSTANTS.margin.SMALL,
    borderColor: COLOR.SHADOW_BORDER,
    shadowColor: COLOR.SHADOW_COLOR,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bottonContainerInner: {flexDirection: 'row'},
  leftContainer: {
    alignItems: 'center',
    borderRightColor: COLOR.LIGHT_BORDER,
    borderRightWidth: 1,
    flex: 1,
  },
  leftText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.NORMAL,
    color: COLOR.LIGHT_BORDER,
  },
  leftDetails: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.LIGHT_TEXT_GREEN,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  rightContainer: {alignItems: 'center', flex: 1},
});
