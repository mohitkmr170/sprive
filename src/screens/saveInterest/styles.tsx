import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';
import {verticalScale} from 'react-native-size-matters/extend';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flexGrow: 1,
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
  },
  mortgageStatusProgressContainer: {
    marginTop: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
    flexDirection: 'row',
  },
  mortgageTextData: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.SMALL),
    color: COLOR.BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  progressFractionText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.SMALL),
    color: COLOR.BLUE,
    opacity: 0.5,
    marginLeft: verticalScale(STYLE_CONSTANTS.margin.SMALLISH),
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  imageBackgoundStyle: {
    height: verticalScale(10 * STYLE_CONSTANTS.margin.HUGE),
    width: '100%',
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
  },
  imageStyle: {borderRadius: STYLE_CONSTANTS.border.BORDER_RADIUS.SMALLER},
  cardContainer: {
    paddingRight: verticalScale(STYLE_CONSTANTS.padding.LARGER),
    paddingLeft: verticalScale(STYLE_CONSTANTS.padding.NORMAL),
    paddingVertical: verticalScale(STYLE_CONSTANTS.padding.LARGEST),
  },
  cardText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
  },
  cardInterestText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGEST_HUMONGOUS),
    lineHeight: verticalScale(
      STYLE_CONSTANTS.font.LINEHEIGHT.LARGEST_HUMONGOUS,
    ),
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: verticalScale(STYLE_CONSTANTS.margin.SMALL),
  },
  saveMoneyText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.VOILET,
    marginTop: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
    opacity: 0.7,
  },
  firstContainerHeaderText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  listItemsContainer: {
    marginTop: verticalScale(STYLE_CONSTANTS.margin.SMALL),
    flexDirection: 'row',
  },
  bulletContainer: {
    marginRight: verticalScale(STYLE_CONSTANTS.margin.SMALL),
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
  },
  firstContainerListItemText: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    opacity: 0.7,
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
  },
  secondContainer: {marginTop: verticalScale(STYLE_CONSTANTS.margin.LARGEST)},
  secondContainerHeaderText: {
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    flexWrap: 'wrap',
  },
  secondContainerListItemText: {
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    opacity: 0.7,
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.NORMAL),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH),
  },
  buttonTitleStyle: {
    color: COLOR.WHITE,
    paddingVertical: verticalScale(STYLE_CONSTANTS.padding.NORMAL),
    fontSize: verticalScale(STYLE_CONSTANTS.font.SIZE.LARGE),
    lineHeight: verticalScale(STYLE_CONSTANTS.font.LINEHEIGHT.HUGE),
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
    marginBottom: verticalScale(STYLE_CONSTANTS.margin.HUGISH),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.LARGEST),
    borderRadius: 40,
  },
  bulletView: {
    marginRight: verticalScale(STYLE_CONSTANTS.margin.SMALL),
    marginTop: verticalScale(STYLE_CONSTANTS.margin.SMALLEST),
  },
  bulletListItemContainer: {
    marginTop: verticalScale(STYLE_CONSTANTS.margin.NORMAL),
    flexDirection: 'row',
  },
});
