import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    flex: 1,
    justifyContent: 'space-around',
  },
  myProgressText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
  },
  blockedViewContainer: {
    position: 'absolute',
    top: 2 * STYLE_CONSTANTS.margin.HUMONGOUS,
    left: 0,
    right: 0,
    bottom: -STYLE_CONSTANTS.margin.HUGISH,
    zIndex: 1,
  },
  blockedInnerContainer: {
    flex: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeYourProfileText: {
    color: COLOR.PRIMARY,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  currentLtvText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginBottom: STYLE_CONSTANTS.margin.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  progressBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLER,
  },
  percentageText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    color: COLOR.VOILET,
    opacity: 0.7,
  },
  unlockbetterDealsText: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  tabSelectionButtonContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR.GHOST_WHITE,
    height: STYLE_CONSTANTS.margin.HUGER,
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    borderRadius: 8,
    padding: STYLE_CONSTANTS.padding.SMALLEST / 2,
  },
  buttonContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  selectorButtonText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  mainContainerStepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: STYLE_CONSTANTS.margin.EXTRA_HUMUNGOUS,
  },
  trackStyle: {
    flex: 1,
    height: 2,
    backgroundColor: COLOR.TRACK_BLUE,
  },
  circularView: {
    height: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    width: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    borderRadius: STYLE_CONSTANTS.padding.BELOW_NORMAL / 2,
    borderColor: COLOR.OVERPAYMENT_CARD,
    borderWidth: 2,
  },
  startPointContainer: {
    position: 'absolute',
    top: STYLE_CONSTANTS.margin.NORMAL,
    left: 0,
  },
  endPointContainer: {
    position: 'absolute',
    top: STYLE_CONSTANTS.margin.NORMAL,
    right: 0,
  },
  startDate: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  targetContainer: {position: 'absolute', top: -STYLE_CONSTANTS.margin.SMALLER},
  projectedContainer: {
    position: 'absolute',
    bottom: -STYLE_CONSTANTS.margin.SMALLER,
  },
  targetText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    textAlign: 'center',
  },
  targetInnerContainer: {
    right: STYLE_CONSTANTS.margin.HUMONGOUS,
    top: STYLE_CONSTANTS.margin.SMALLER,
  },
  projectedInnerContainer: {
    right: STYLE_CONSTANTS.margin.LARGEST,
    bottom: STYLE_CONSTANTS.margin.SMALLER,
  },
  commonPointTextContainer: {
    position: 'absolute',
    bottom: STYLE_CONSTANTS.margin.NORMAL,
  },
  onTrackText: {
    textAlign: 'center',
    position: 'absolute',
    top: STYLE_CONSTANTS.margin.NORMAL,
  },
  commonPointIconContainer: {
    position: 'absolute',
    bottom: -STYLE_CONSTANTS.margin.SMALLER,
    height: STYLE_CONSTANTS.margin.LARGEST,
    width: STYLE_CONSTANTS.margin.LARGEST,
    backgroundColor: COLOR.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetTooltip: {
    position: 'absolute',
    top: STYLE_CONSTANTS.margin.LARGEST,
    left: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
    flexDirection: 'row',
    height: STYLE_CONSTANTS.margin.HUGER,
    width: STYLE_CONSTANTS.margin.SMALLEST / 2,
    backgroundColor: COLOR.SLIGHT_BLUE_WHITEL,
  },
  targetTooltipAdd: {
    backgroundColor: COLOR.SLIGHT_BLUE_WHITEL,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALL,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST,
    borderRadius: 8,
  },
  onTrackTrackLine: {
    position: 'absolute',
    top: STYLE_CONSTANTS.margin.SMALLER,
    flexDirection: 'row',
    height: STYLE_CONSTANTS.margin.HUGER,
    width: STYLE_CONSTANTS.margin.SMALLEST / 2,
    backgroundColor: COLOR.SLIGHT_BLUE_WHITEL,
  },
  onTrackView: {
    backgroundColor: COLOR.SLIGHT_BLUE_WHITEL,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGISH,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLER,
    borderRadius: 8,
  },
  targetDateStyle: {
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.LIGHT_TEXT_GREEN,
    textAlign: 'center',
  },
  pointerStyle: {backgroundColor: COLOR.WHITE},
  toolTipTopContainer: {
    position: 'absolute',
    bottom: STYLE_CONSTANTS.margin.HUGISH,
    zIndex: 2,
    shadowColor: COLOR.LIGHTER_GRAY,
    shadowOffset: {height: 10, width: 10},
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: COLOR.WHITE,
    borderRadius: 6,
    paddingHorizontal: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toolTipText: {
    padding: STYLE_CONSTANTS.padding.SMALLEST,
    color: COLOR.LIGHT_TEXT_GREEN,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  toolTipBottomContainer: {
    position: 'absolute',
    bottom: STYLE_CONSTANTS.margin.LARGEST,
    zIndex: 999,
    transform: [{rotate: '180deg'}],
    width: 0,
    height: 0,
    borderLeftWidth: STYLE_CONSTANTS.margin.SMALLER,
    borderRightWidth: STYLE_CONSTANTS.margin.SMALLER,
    borderBottomWidth: STYLE_CONSTANTS.margin.SMALLER,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: COLOR.WHITE,
    shadowColor: COLOR.LIGHTER_GRAY,
    shadowOffset: {height: 10, width: 10},
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 10,
  },
});
