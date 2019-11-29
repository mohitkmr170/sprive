import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR.COUNTER_BG_COLOR,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGER,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLISH,
    borderRadius: STYLE_CONSTANTS.padding.SMALLER,
  },
  touchableOpacity: {borderBottomColor: COLOR.WHITE, borderBottomWidth: 2},
});
