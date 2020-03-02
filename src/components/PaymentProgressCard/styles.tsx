import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS, COLOR} from '../../utils';

/*
TODO : Styles to be changed as per the latest XD, hence proper constants are not used here!
*/

export const styles = StyleSheet.create({
  paginationContainer: {
    position: 'absolute',
    bottom: 2 * STYLE_CONSTANTS.padding.LARGEST,
  },
  dotStyle: {
    width: STYLE_CONSTANTS.margin.SMALLER,
    height: STYLE_CONSTANTS.margin.SMALLER,
    borderRadius: STYLE_CONSTANTS.border.BORDER_RADIUS.TINY,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLER,
    backgroundColor: COLOR.PRIMARY,
  },
  inactiveDotStyle: {
    width: STYLE_CONSTANTS.margin.SMALLER,
    height: STYLE_CONSTANTS.margin.SMALLER,
    borderRadius: STYLE_CONSTANTS.border.BORDER_RADIUS.TINY,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLER,
    backgroundColor: COLOR.LESS_OPACITY_PRIMARY,
  },
  PaginationContainerStyle: {
    justifyContent: 'center',
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    marginBottom: -STYLE_CONSTANTS.margin.LARGER,
  },
  swiperCardContainer: {
    backgroundColor: COLOR.WHITE,
    paddingVertical: STYLE_CONSTANTS.padding.HUGISH,
    borderRadius: 12,
    height:
      10 * STYLE_CONSTANTS.margin.HUMONGOUS - STYLE_CONSTANTS.margin.LARGEST,
  },
  swiperContainer: {
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
    shadowColor: COLOR.LIGHTER_GRAY,
    shadowOffset: {height: 0, width: 3},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
});
