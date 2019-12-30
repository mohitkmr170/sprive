import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {COLOR} from '../../utils/colors';

/*
TODO : Styles to be changed as per the latest XD, hence proper constants are not used here!
*/

export const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    marginBottom: STYLE_CONSTANTS.margin.LARGEST,
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
    marginBottom: STYLE_CONSTANTS.margin.SMALLER,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
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
    backgroundColor: COLOR.PRIMARY,
  },
  PaginationContainerStyle: {alignSelf: 'flex-start'},
  carouselTextContainer: {
    marginHorizontal: STYLE_CONSTANTS.margin.LARGER,
    marginVertical: STYLE_CONSTANTS.margin.SMALL,
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
