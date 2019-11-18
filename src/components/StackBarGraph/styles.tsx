import {StyleSheet} from 'react-native';
import {APP_CONSTANTS, STYLE_CONSTANTS} from '../../utils/constants';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainTopContainer: {marginBottom: STYLE_CONSTANTS.margin.LARGER},
  mainContainer: {flexDirection: 'row'},
  barChart: {
    height: APP_CONSTANTS.GRAPH_HEIGHT,
    borderBottomColor: COLOR.LIGHTER_GRAY,
    borderBottomWidth: 1,
  },
  monthView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: STYLE_CONSTANTS.padding.SMALLISH,
  },
  monthDetails: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: STYLE_CONSTANTS.padding.LARGISH,
    width: '50%',
  },
  monthDetailsText: {
    color: COLOR.DARKER_GRAY,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
  },
  monthHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    color: COLOR.BLACKISH_GRAY,
    fontStyle: 'italic',
    paddingBottom: STYLE_CONSTANTS.padding.SMALLEST,
  },
  graphInnerSpacing: {
    top: 80,
    left: STYLE_CONSTANTS.padding.LARGE,
    right: STYLE_CONSTANTS.padding.LARGE,
  },
  overlayView: {
    position: 'absolute',
    bottom: 0,
    flex: 1,
    width: '100%',
    borderTopColor: COLOR.DARKER_GRAY,
    borderTopWidth: 0.3,
    zIndex: 1,
  },
  leftSwipeButton: {
    alignSelf: 'center',
  },
  mainStackbarContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLEST,
  },
  monthText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  graphDetails: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: STYLE_CONSTANTS.margin.LARGER,
  },
  bottomContainer: {
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    flexDirection: 'row',
    marginBottom: 12,
  },
  bottomLeftContainer: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLOR.BORDER_BLACK,
  },
  projectedTimeText: {
    color: COLOR.VOILET,
    opacity: 0.4,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  numberOfMonthText: {
    color: COLOR.SLIDER_COLOR,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
  },
  monthsText: {fontSize: STYLE_CONSTANTS.font.SIZE.LARGE},
  bottomRightContainer: {
    flex: 1,
    alignItems: 'center',
  },
  projectedInterestText: {
    color: COLOR.VOILET,
    opacity: 0.4,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  savingText: {
    color: COLOR.VOILET,
    opacity: 0.4,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  projectSavingText: {
    color: COLOR.SLIDER_COLOR,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
  },
  rightButton: {alignSelf: 'center'},
});
