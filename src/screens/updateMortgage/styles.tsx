import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: STYLE_CONSTANTS.margin.LARGEST,
  },
  progressFractionText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.BLUE,
    opacity: 0.5,
    marginLeft: STYLE_CONSTANTS.margin.SMALLISH,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
  mainHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGEST,
  },
  mainSubHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.NORMAL,
    marginTop: STYLE_CONSTANTS.margin.SMALLER,
    flexWrap: 'wrap',
    color: COLOR.VOILET,
    opacity: 0.7,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGISH,
  },
  buttonInteriorStyle: {
    backgroundColor: COLOR.PRIMARY,
    marginHorizontal:
      STYLE_CONSTANTS.margin.HUGISH - STYLE_CONSTANTS.margin.SMALL,
    borderRadius: STYLE_CONSTANTS.margin.HUMONGOUS,
    marginBottom: STYLE_CONSTANTS.margin.HUGISH,
    marginTop: STYLE_CONSTANTS.margin.SMALL,
  },
  buttonExteriorStyle: {
    fontSize: STYLE_CONSTANTS.font.SIZE.LARGE,
    lineHeight: STYLE_CONSTANTS.font.LINEHEIGHT.HUGE,
    paddingVertical: STYLE_CONSTANTS.margin.NORMAL,
  },
  mortgageFormComponent: {flex: 1, marginTop: STYLE_CONSTANTS.margin.HUGISH},
  mortgageStatusProgressContainer: {
    marginTop: STYLE_CONSTANTS.margin.NORMAL,
    flexDirection: 'row',
  },
  mortgageTextData: {
    fontSize: STYLE_CONSTANTS.font.SIZE.SMALL,
    color: COLOR.BLUE,
    fontWeight: STYLE_CONSTANTS.font.WEIGHT.SEMI_BOLD,
  },
});
