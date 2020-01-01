import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLOR.TRANSPARENT_BLACK,
  },
  innerMainContainer: {
    flex: 1,
    paddingVertical: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    borderBottomLeftRadius: verticalScale(STYLE_CONSTANTS.padding.SMALL),
    borderTopLeftRadius: verticalScale(STYLE_CONSTANTS.padding.SMALL),
    backgroundColor: COLOR.WHITE,
  },
  centerContainer: {flex: 1},
  profileContainer: {
    paddingVertical:
      verticalScale(STYLE_CONSTANTS.padding.HUGE) +
      verticalScale(STYLE_CONSTANTS.padding.NORMAL),
    paddingRight: 2 * verticalScale(STYLE_CONSTANTS.padding.HUGE),
    paddingLeft:
      verticalScale(STYLE_CONSTANTS.padding.HUGE) +
      verticalScale(STYLE_CONSTANTS.padding.SMALLEST),
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
  },
  userNameText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.HUGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGE),
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  userLocationText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.SMALL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH),
    color: COLOR.VOILET,
  },
  sideBarDataListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(STYLE_CONSTANTS.padding.LARGEST),
    paddingLeft: verticalScale(STYLE_CONSTANTS.padding.HUGE),
    paddingRight: verticalScale(STYLE_CONSTANTS.padding.HUGE),
    borderBottomColor: COLOR.BLACK_OPACITY_TEN,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
  },
  iconTextContainer: {flexDirection: 'row'},
  titleText: {
    paddingLeft: verticalScale(STYLE_CONSTANTS.padding.SMALL),
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH),
    color: COLOR.BLACK,
    opacity: 0.7,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  logOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(STYLE_CONSTANTS.padding.LARGEST),
    borderTopColor: COLOR.BLACK_OPACITY_TEN,
    borderTopWidth: 1,
    paddingLeft: verticalScale(STYLE_CONSTANTS.padding.HUGE),
    paddingRight: verticalScale(STYLE_CONSTANTS.padding.HUGE),
  },
  logOutTouch: {flexDirection: 'row', flex: 1},
  logOutText: {
    color: COLOR.BLACK,
    opacity: 0.3,
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH),
    paddingLeft: verticalScale(STYLE_CONSTANTS.padding.SMALL),
  },
});
