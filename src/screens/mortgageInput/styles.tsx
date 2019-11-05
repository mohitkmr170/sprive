import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

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
    fontWeight: '500',
  },
  mainHeaderText: {
    fontSize: STYLE_CONSTANTS.font.SIZE.HUGE,
    marginTop: STYLE_CONSTANTS.margin.LARGEST,
    flexWrap: 'wrap',
    color: COLOR.VOILET,
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
    borderRadius: STYLE_CONSTANTS.padding.HUGE,
    backgroundColor: COLOR.PRIMARY,
    paddingVertical: STYLE_CONSTANTS.padding.NORMAL,
  },
  buttonExteriorStyle: {
    marginVertical: STYLE_CONSTANTS.margin.HUGISH,
    marginHorizontal: STYLE_CONSTANTS.margin.HUGISH,
  },
  mortgageFormComponent: {flex: 1, marginTop: STYLE_CONSTANTS.margin.HUGE},
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
