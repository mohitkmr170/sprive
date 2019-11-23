import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

STYLE_CONSTANTS.font.LINEHEIGHT.HUGE;

export const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  scrollContainer: {flex: 1, marginHorizontal: STYLE_CONSTANTS.margin.LARGEST},
  flatListContainer: {flex: 1, marginTop: STYLE_CONSTANTS.margin.SMALLISH},
  searchTextInput: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: '#09245E',
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    paddingLeft: STYLE_CONSTANTS.padding.NORMAL,
    borderRadius: 6,
    borderColor: '#0000004D',
    borderWidth: 0.5,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  loadingContainer: {
    position: 'relative',
    paddingVertical: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  monthYearText: {
    color: '#22319B',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    marginTop: 24,
  },
  cardContainer: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.5,
    paddingBottom: STYLE_CONSTANTS.padding.BELOW_NORMAL,
  },
  cardMainContainer: {
    marginTop: STYLE_CONSTANTS.margin.SMALLISH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: '#09245E',
    opacity: 0.5,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  refIdText: {
    color: '#09245E',
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  idText: {
    color: '#09245E',
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  rightContainer: {justifyContent: 'center', alignItems: 'flex-end'},
  paymentTypeContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALLISH,
    paddingVertical: 2,
    borderRadius: 14,
  },
  paymentTypeText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  amountText: {
    paddingTop: STYLE_CONSTANTS.padding.ABOVE_SMALLEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
