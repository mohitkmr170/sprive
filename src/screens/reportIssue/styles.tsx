import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 28,
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
    marginHorizontal: 30,
  },
});
