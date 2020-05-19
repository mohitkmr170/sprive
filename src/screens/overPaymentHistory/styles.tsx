import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

STYLE_CONSTANTS.font.LINEHEIGHT.HUGE;

export const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  scrollContainer: {flex: 1, marginHorizontal: STYLE_CONSTANTS.margin.LARGEST},
  flatListContainer: {flex: 1, marginTop: STYLE_CONSTANTS.margin.SMALLISH},
  searchTextInput: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    paddingLeft: STYLE_CONSTANTS.padding.NORMAL,
    borderRadius: 6,
    borderColor: COLOR.REDUX_FORM_INPUT_CONTAINER,
    borderWidth: 0.5,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  logoContainer: {flexDirection: 'row'},
  lenderPaymentText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    paddingLeft: STYLE_CONSTANTS.padding.SMALL,
    alignSelf: 'center',
  },
  loadingContainer: {
    position: 'relative',
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
    marginTop: STYLE_CONSTANTS.margin.SMALLISH,
    marginBottom: STYLE_CONSTANTS.margin.SMALLISH,
  },
  monthYearText: {
    color: COLOR.DARK_BLUE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
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
    color: COLOR.VOILET,
    opacity: 0.5,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  refIdText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  idText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALLEST,
  },
  rightContainer: {justifyContent: 'center', alignItems: 'flex-end'},
  paymentTypeContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.SMALLISH,
    paddingVertical: 2,
    borderRadius: STYLE_CONSTANTS.padding.BELOW_NORMAL,
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
