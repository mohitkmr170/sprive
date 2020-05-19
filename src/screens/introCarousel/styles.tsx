import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

/*
TODO : Styles to be changed as per the latest XD, hence proper constants are not used here!
*/

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginBottom: STYLE_CONSTANTS.margin.SMALL,
  },
  mainContainer: {flex: 1},
  buttonTitle: {
    color: COLOR.WHITE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginBottom: STYLE_CONSTANTS.margin.NORMAL,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 2 * STYLE_CONSTANTS.padding.LARGEST,
  },
  comingSoonText: {
    color: COLOR.BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.BOLD,
  },
  dotStyle: {
    width: STYLE_CONSTANTS.margin.SMALLISH,
    height: STYLE_CONSTANTS.margin.SMALLISH,
    borderRadius: STYLE_CONSTANTS.border.BORDER_RADIUS.TINY,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLER,
    backgroundColor: COLOR.PRIMARY,
  },
  inactiveDotStyle: {
    width: STYLE_CONSTANTS.margin.SMALLISH,
    height: STYLE_CONSTANTS.margin.SMALLISH,
    borderRadius: STYLE_CONSTANTS.border.BORDER_RADIUS.TINY,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLER,
    backgroundColor: COLOR.LESS_OPACITY_PRIMARY,
  },
  PaginationContainerStyle: {
    justifyContent: 'flex-start',
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  carouselTextContainer: {
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  titleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.VOILET,
  },
  subTitleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    marginTop: STYLE_CONSTANTS.margin.SMALLER,
  },
  alreadyRegistered: {
    paddingBottom: STYLE_CONSTANTS.padding.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.VOILET,
    opacity: 0.5,
    textAlign: 'center',
  },
  innerLoginText: {
    fontWeight: 'bold',
  },
});
