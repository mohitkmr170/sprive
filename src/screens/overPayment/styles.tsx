import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD;

export const styles = StyleSheet.create({
  topContainer: {flex: 1},
  mainContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  innerLeftContainer: {flex: 1},
  cardContainer: {
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGISH,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    borderRadius: STYLE_CONSTANTS.margin.SMALLER,
    backgroundColor: COLOR.OVERPAYMENT_CARD,
    shadowColor: COLOR.SLIGHT_BLUE,
    shadowOffset: {height: 5, width: 0},
    shadowOpacity: 1,
    shadowRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  poundText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: 2 * STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.WHITE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  amountContainer: {
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetailsContainer: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
  leftContainer: {marginRight: STYLE_CONSTANTS.margin.SMALL, flex: 1},
  // rightContainer: {marginLeft: STYLE_CONSTANTS.margin.SMALL},
  overPaymentOfText: {
    color: COLOR.WHITE,
    opacity: 0.7,
    fontSize: STYLE_CONSTANTS.font.SIZE.TINY,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGE,
  },
  textInput: {
    textAlignVertical: 'center',
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    color: COLOR.WHITE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    paddingRight: STYLE_CONSTANTS.padding.LARGEST,
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
    alignItems: 'center',
  },
  button: {flex: 1, justifyContent: 'flex-end'},
  buttonInteriorStyle: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 2 * STYLE_CONSTANTS.padding.LARGEST,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  buttonExteriorStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.margin.NORMAL,
    alignSelf: 'flex-end',
  },
  staticText: {
    //Font size to be added here
    color: COLOR.VOILET,
    opacity: 0.3,
    marginVertical: STYLE_CONSTANTS.margin.LARGEST,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLISH,
  },
  cardMainContainer: {
    borderRadius: STYLE_CONSTANTS.padding.SMALL,
    borderWidth: 0.5,
    borderColor: COLOR.LIGHT_GRAY,
    shadowColor: COLOR.BLACK_SHADOW_COLOR,
    shadowOffset: {height: 3, width: 0},
    shadowOpacity: 10,
    shadowRadius: 10,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGEST,
    paddingTop: STYLE_CONSTANTS.padding.HUGISH,
    paddingBottom: STYLE_CONSTANTS.padding.NORMAL,
  },
  accountDetailsContainer: {flexDirection: 'row'},
  accNumberContainer: {marginRight: STYLE_CONSTANTS.margin.HUGE},
  accNumberText: {
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  accNumber: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  sortCodeText: {
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  sortCode: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  refCodeText: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    color: COLOR.VOILET,
    opacity: 0.5,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
  },
  refCode: {
    marginTop: 2,
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGER,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
  },
  bankImage: {alignSelf: 'flex-end'},
  amountCardContainer: {
    alignItems: 'center',
    paddingVertical: STYLE_CONSTANTS.padding.LARGER,
    paddingHorizontal: STYLE_CONSTANTS.padding.HUGE,
    borderRadius: STYLE_CONSTANTS.padding.SMALL,
    shadowColor: COLOR.SHADOW_COLOR_LATEST,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10, // Reuired for Andorid
    backgroundColor: COLOR.WHITE, // Compulsory to pass in view-having shadow
  },
  amountCardTitleText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGISH,
    color: COLOR.VOILET,
    opacity: 0.5,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  amountCardValue: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGISH,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.SLIDER_COLOR,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
