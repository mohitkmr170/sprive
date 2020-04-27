import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  centerContainer: {flex: 1, margin: STYLE_CONSTANTS.margin.LARGEST},
  clearAllContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALLER,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLEST,
    borderRadius: 14,
    alignSelf: 'flex-end',
    backgroundColor: COLOR.CLEAR_ALL_COLOR,
  },
  dismissAllText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  notificationContainer: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    borderRadius: 12,
  },
  notificationListParentContaier: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    flex: 1,
  },
  middleContainer: {
    flexDirection: 'row',
    backgroundColor: '#F4F4F4',
    marginLeft: STYLE_CONSTANTS.margin.SMALL,
    borderTopRightRadius: 12,
    borderBottomEndRadius: 12,
    paddingLeft: STYLE_CONSTANTS.padding.LARGEST,
  },
  textContainer: {flex: 1, paddingVertical: STYLE_CONSTANTS.padding.NORMAL},
  titleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    color: COLOR.VOILET,
  },
  typeText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    opacity: 0.5,
    color: COLOR.VOILET,
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
  },
  clearIconContainer: {
    paddingLeft: STYLE_CONSTANTS.padding.SMALLER,
    justifyContent: 'center',
    paddingRight: STYLE_CONSTANTS.padding.NORMAL,
  },
  emptyNotificationText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    textAlign: 'center',
    color: COLOR.VOILET,
  },
});
