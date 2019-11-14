import {StyleSheet} from 'react-native';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  middleContainer: {},
  passStrengthInnerContainer: {
    marginTop: STYLE_CONSTANTS.margin.SMALLER,
  },
  blueImageBackground: {
    paddingLeft: STYLE_CONSTANTS.padding.HUGISH,
    paddingTop: STYLE_CONSTANTS.padding.SMALL,
    paddingBottom: STYLE_CONSTANTS.padding.HUMONGOUS,
    paddingRight: STYLE_CONSTANTS.padding.LARGEST,
  },
  supportIcon: {
    height: STYLE_CONSTANTS.padding.HUMONGOUS,
    width: STYLE_CONSTANTS.padding.HUMONGOUS,
    borderRadius: STYLE_CONSTANTS.padding.LARGEST,
    padding: STYLE_CONSTANTS.padding.SMALLER,
    backgroundColor: COLOR.DARK_VOILET,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  thisMonthText: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
    color: COLOR.WHITE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  overPaymentTargetAmount: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUMONGOUS,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGEST_HUMONGOUS,
    color: COLOR.WHITE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  overPaymentTargetText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    color: COLOR.WHITE,
    opacity: 0.5,
  },
  dueReminderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.WHITE,
    marginTop: STYLE_CONSTANTS.margin.LARGER,
  },
  secondContainer: {
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  statusContainer: {justifyContent: 'space-between', flexDirection: 'row'},
  statusLefttext: {
    color: COLOR.LIGHT_VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  innerFirstText: {color: COLOR.VOILET},
  statusRightText: {color: COLOR.VOILET, opacity: 0.5},
  incomeStatusContainer: {
    borderBottomColor: '#0000001A',
    borderColor: '#fff',
    borderBottomWidth: 5,
    borderWidth: 1,
    borderRadius: 20,
    shadowColor: '#0000001A',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 10,
    shadowRadius: 10,
  },
  incomeInnerContainer: {
    marginTop: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  rowParentContainer: {flexDirection: 'row'},
  incomeInnerContainers: {flex: 1, alignItems: 'center'},
  incomeText: {
    marginLeft: STYLE_CONSTANTS.margin.SMALLER,
    color: COLOR.PARROT_GREEN,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  spentText: {
    marginLeft: STYLE_CONSTANTS.margin.SMALLER,
    color: COLOR.BRICK_RED,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  incomeSpentText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGER,
  },
  availableBalanceText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    opacity: 0.3,
    paddingTop: STYLE_CONSTANTS.padding.HUGE,
    textAlign: 'center',
  },
  availableAmountText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGEST,
    /*
  TODO : lineHeight as per XD is less than fontSize, hence cuts upper text, TBD
  */
    textAlign: 'center',
  },
  buttonTitle: {
    color: COLOR.WHITE,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  button: {
    backgroundColor: COLOR.PRIMARY,
    borderRadius: 40,
    marginBottom: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginTop: STYLE_CONSTANTS.margin.HUGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.SMALLISH,
  },
  myProgressContainer: {
    marginLeft: STYLE_CONSTANTS.margin.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginBottom: STYLE_CONSTANTS.margin.LARGEST,
  },
  myProgressText: {
    color: COLOR.VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
  },
  projectedText: {
    color: COLOR.LIGHT_VOILET,
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
  },
  monthsLeftText: {color: COLOR.VOILET},
});
