import {StyleSheet, Platform} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';
import {getStatusBarHeight} from 'react-native-status-bar-height';

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
  trackStyle: {height: STYLE_CONSTANTS.margin.SMALLEST / 2},
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    marginVertical: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: STYLE_CONSTANTS.margin.HUMONGOUS,
  },
  ercInnerContainer: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    opacity: 0.5,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
    flexWrap: 'wrap',
    paddingRight: STYLE_CONSTANTS.padding.LARGEST,
  },
  ercLimitContainer: {
    position: 'absolute',
    top:
      Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_IOS
        ? getStatusBarHeight() + STYLE_CONSTANTS.margin.NORMAL
        : STYLE_CONSTANTS.margin.NORMAL,
    left: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    right: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    zIndex: 1,
  },
  ercContainer: {
    flexDirection: 'row',
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    backgroundColor: COLOR.WHITE,
    borderRadius: STYLE_CONSTANTS.padding.SMALL,
    shadowColor: COLOR.BLACK,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
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
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
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
    marginTop: STYLE_CONSTANTS.margin.HUGER,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  bottomContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    borderRadius: STYLE_CONSTANTS.margin.SMALL,
    shadowColor: COLOR.SHADOW_COLOR_LATEST,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5, // Required for Andorid
    backgroundColor: COLOR.WHITE, // Compulsory to pass in view-having shadow
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
    color: COLOR.VOILET,
    opacity: 0.4,
  },
  leftDetails: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.LIGHT_TEXT_GREEN,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  rightContainer: {alignItems: 'center', flex: 1},
});
