import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.TRANSPARENT_BLACK,
  },
  innerMainContainer: {
    flex: 1,
    paddingVertical: STYLE_CONSTANTS.margin.LARGEST,
    borderBottomLeftRadius: STYLE_CONSTANTS.padding.SMALL,
    borderTopLeftRadius: STYLE_CONSTANTS.padding.SMALL,
    backgroundColor: COLOR.WHITE,
  },
  centerContainer: {flex: 1},
  profileContainer: {
    paddingVertical:
      STYLE_CONSTANTS.padding.HUGE + STYLE_CONSTANTS.padding.NORMAL,
    paddingRight: 2 * STYLE_CONSTANTS.padding.HUGE,
    paddingLeft:
      STYLE_CONSTANTS.padding.HUGE + STYLE_CONSTANTS.padding.SMALLEST,
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
  },
  userNameText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  userLocationText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
  },
  sideBarDataListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    paddingLeft:
      STYLE_CONSTANTS.padding.HUGE + STYLE_CONSTANTS.padding.SMALLEST,
    paddingRight: STYLE_CONSTANTS.padding.HUGE,
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  iconTextContainer: {flexDirection: 'row'},
  titleText: {
    paddingLeft: STYLE_CONSTANTS.padding.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.BLACK,
    opacity: 0.7,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  logOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    borderTopColor: COLOR.BLACK_OPACITY_TEN,
    borderTopWidth: 1,
    paddingLeft:
      STYLE_CONSTANTS.padding.HUGE + STYLE_CONSTANTS.padding.SMALLEST,
    paddingRight: STYLE_CONSTANTS.padding.HUGE,
  },
  logOutTouch: {flexDirection: 'row', flex: 1},
  logOutText: {
    color: COLOR.BLACK,
    opacity: 0.3,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    paddingLeft: STYLE_CONSTANTS.padding.SMALL,
  },
});
