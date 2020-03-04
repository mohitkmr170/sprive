import {StyleSheet, Platform} from 'react-native';
import {STYLE_CONSTANTS, COLOR, APP_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: COLOR.SMOKE_WHITE,
    flex: 1,
    shadowColor: COLOR.DARK_GRAY,
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
    borderTopRightRadius: STYLE_CONSTANTS.margin.SMALL,
    borderTopLeftRadius: STYLE_CONSTANTS.margin.SMALL,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLISH,
  },
  innerHorizontalView: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  completeYourProfileText: {
    alignSelf: 'center',
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  innerControllerContainer: {
    position: 'absolute',
    top: -STYLE_CONSTANTS.margin.SMALL,
    width: STYLE_CONSTANTS.device.MAX_WIDTH,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    alignItems: 'center',
  },
  innerControllerView: {
    width: STYLE_CONSTANTS.margin.HUMONGOUS,
    height: STYLE_CONSTANTS.margin.SMALLEST,
    borderRadius: 2,
    backgroundColor: COLOR.WHITE,
  },
  progressText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.TINY,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  modalContainer: {
    justifyContent: 'flex-end',
    marginHorizontal: 0,
    marginVertical: 0,
    position: 'absolute',
    bottom:
      Platform.OS === 'android'
        ? 2 * STYLE_CONSTANTS.margin.HUGE
        : 3 * STYLE_CONSTANTS.margin.HUGE,
  },
  pendingTaskContainer: {
    backgroundColor: COLOR.WHITE,
    borderTopRightRadius: STYLE_CONSTANTS.margin.SMALL,
    borderTopLeftRadius: STYLE_CONSTANTS.margin.SMALL,
    padding: STYLE_CONSTANTS.padding.LARGEST,
  },
  yourPendingTaskText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  completionDescText: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.OVERPAYMENT_CARD,
    opacity: 0.5,
  },
  pendingTaskNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: STYLE_CONSTANTS.margin.SMALLER,
  },
  progressContainer: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
  innerProgressText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  percentCompleteText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
  },
  pendingTaskCard: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
  pendingListItemContainer: {
    marginTop: STYLE_CONSTANTS.padding.BELOW_NORMAL,
    borderRadius: STYLE_CONSTANTS.margin.SMALL,
  },
  pendingListItemMainContainer: {
    backgroundColor: '#F4F4F4',
    marginLeft: STYLE_CONSTANTS.margin.SMALL,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGEST,
    paddingVertical: STYLE_CONSTANTS.padding.LARGE,
    borderTopRightRadius: STYLE_CONSTANTS.margin.SMALL,
    borderBottomRightRadius: STYLE_CONSTANTS.margin.SMALL,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  taskName: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  taskCompletionTime: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.VOILET,
    opacity: 0.5,
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
  },
});
