import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flexGrow: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  mortgageStatusProgressContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    flexDirection: 'row',
  },
  mortgageTextData: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  progressFractionText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.BLUE,
    opacity: 0.5,
    marginLeft: STYLE_CONSTANTS.margin.SMALLISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  imageBackgoundStyle: {height: '60%', width: '100%', marginTop: 4},
  imageStyle: {borderRadius: 8},
  cardContainer: {
    paddingRight: STYLE_CONSTANTS.padding.LARGER,
    paddingLeft: STYLE_CONSTANTS.padding.NORMAL,
    paddingVertical: STYLE_CONSTANTS.padding.LARGEST,
  },
  cardText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
  },
  cardInterestText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGEST_HUMONGOUS,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.LARGEST_HUMONGOUS,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  saveMoneyText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    opacity: 0.7,
  },
  firstContainerHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  listItemsContainer: {
    marginTop: STYLE_CONSTANTS.margin.SMALL,
    flexDirection: 'row',
  },
  bulletContainer: {marginRight: STYLE_CONSTANTS.margin.SMALL, marginTop: 4},
  firstContainerListItemText: {
    flex: 1,
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    opacity: 0.7,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  secondContainer: {marginTop: STYLE_CONSTANTS.margin.LARGEST},
  secondContainerHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    flexWrap: 'wrap',
  },
  secondContainerListItemText: {
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    opacity: 0.7,
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  buttonTitleStyle: {
    color: COLOR.WHITE,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  buttonStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    borderRadius: 40,
  },
  bulletView: {
    marginRight: STYLE_CONSTANTS.margin.SMALL,
    marginTop: STYLE_CONSTANTS.margin.SMALLEST,
  },
  bulletListItemContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    flexDirection: 'row',
  },
});
