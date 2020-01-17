import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';
import {verticalScale, moderateScale} from 'react-native-size-matters/extend';

/*
TODO : Styles to be changed as per the latest XD, hence proper constants are not used here!
*/

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginBottom: verticalScale(STYLE_CONSTANTS.margin.SMALL),
  },
  mainContainer: {flex: 1},
  buttonTitle: {
    color: COLOR.WHITE,
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGE),
    paddingVertical: verticalScale(STYLE_CONSTANTS.padding.NORMAL),
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: verticalScale(STYLE_CONSTANTS.margin.HUMONGOUS),
    marginBottom: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 2 * verticalScale(STYLE_CONSTANTS.padding.LARGEST),
  },
  dotStyle: {
    width: verticalScale(STYLE_CONSTANTS.margin.SMALLISH),
    height: verticalScale(STYLE_CONSTANTS.margin.SMALLISH),
    borderRadius: verticalScale(STYLE_CONSTANTS.border.BORDER_RADIUS.TINY),
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.SMALLER),
    backgroundColor: COLOR.PRIMARY,
  },
  inactiveDotStyle: {
    width: verticalScale(STYLE_CONSTANTS.margin.SMALLISH),
    height: verticalScale(STYLE_CONSTANTS.margin.SMALLISH),
    borderRadius: verticalScale(STYLE_CONSTANTS.border.BORDER_RADIUS.TINY),
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.SMALLER),
    backgroundColor: COLOR.PRIMARY,
  },
  PaginationContainerStyle: {
    alignSelf: 'flex-start',
    marginTop: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
  },
  carouselTextContainer: {
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
  },
  titleText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.HUGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST),
    color: COLOR.VOILET,
  },
  subTitleText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.VOILET,
    opacity: 0.5,
    marginTop: verticalScale(STYLE_CONSTANTS.margin.SMALLER),
  },
  alreadyRegistered: {
    paddingBottom: verticalScale(STYLE_CONSTANTS.padding.SMALL),
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGE),
    color: COLOR.VOILET,
    opacity: 0.5,
    textAlign: 'center',
  },
  innerLoginText: {
    fontWeight: 'bold',
  },
});
