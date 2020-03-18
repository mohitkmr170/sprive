import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  nonHeaderContainer: {flex: 1},
  scrollableMainContainer: {paddingVertical: STYLE_CONSTANTS.padding.LARGEST},
  innerMainContainer: {marginHorizontal: STYLE_CONSTANTS.margin.HUMONGOUS},
  startPointDot: {
    position: 'absolute',
    top: -STYLE_CONSTANTS.margin.SMALLEST,
    alignSelf: 'center',
    borderColor: COLOR.CARIBBEAN_GREEN,
    height: STYLE_CONSTANTS.margin.LARGER,
    width: STYLE_CONSTANTS.margin.LARGER,
    borderWidth: 1,
    backgroundColor: COLOR.CARIBBEAN_GREEN,
    borderRadius: STYLE_CONSTANTS.margin.SMALL,
  },
  bottomContainer: {
    marginTop: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginHorizontal: STYLE_CONSTANTS.margin.HUMONGOUS,
    flexDirection: 'row',
    alignItems: 'center',
  },
  centerImage: {
    height: 10 * STYLE_CONSTANTS.margin.LARGE,
    width: 10 * STYLE_CONSTANTS.margin.LARGE,
  },
  svgLineStyle: {marginLeft: STYLE_CONSTANTS.margin.SMALL},
  ownedPercentageContainer: {
    borderColor: COLOR.WIAKAWA_GRAY,
    borderWidth: 2,
    height: STYLE_CONSTANTS.margin.SMALL,
    width: STYLE_CONSTANTS.margin.SMALL,
    borderRadius: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
    backgroundColor: COLOR.HAWKES_BLUE,
  },
  percentageText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.CARIBBEAN_GREEN,
    marginLeft: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
  },
  dateText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  myHouseText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    textAlign: 'center',
  },
  loadToValueContainer: {
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLISH,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.NORMAL,
    borderRadius: 8,
    /*
    NOTES : Best way to add shadow
    */
    shadowColor: COLOR.SHADOW_COLOR_LATEST,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // Reuired for Andorid
    backgroundColor: COLOR.WHITE, // Compulsory to pass in view-having shadow
  },
  loanToValueText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  progressBarContainer: {flexDirection: 'row'},
  progressBarInnerContainer: {flex: 1, justifyContent: 'center'},
  ltvPercentageText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.DARK_YELLOW,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginLeft: STYLE_CONSTANTS.margin.SMALLER,
  },
  unlockCheaperDealsText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  amountContainer: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.LARGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.NORMAL,
    borderRadius: 8,
    flexDirection: 'row',
    /*
    NOTES : Best way to add shadow
    */
    shadowColor: COLOR.SHADOW_COLOR_LATEST,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10, // Reuired for Andorid
    backgroundColor: COLOR.WHITE, // Compulsory to pass in view-having shadow
  },
  amountOwnerContainer: {flex: 1, alignItems: 'center'},
  amountOwnedText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  amountText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  estimatedValueContainer: {
    flex: 1,
    borderLeftColor: COLOR.LIGHT_BORDER_MARGIN,
    borderLeftWidth: 1,
    alignItems: 'center',
  },
  blockedInnerContainer: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blockedViewContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  completeYourProfileText: {
    color: COLOR.PRIMARY,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
