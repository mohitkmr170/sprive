import {StyleSheet} from 'react-native';
import {COLOR, STYLE_CONSTANTS} from '../../utils';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR.COUNTER_BG_COLOR,
    paddingHorizontal: STYLE_CONSTANTS.padding.LARGER,
    paddingVertical: STYLE_CONSTANTS.padding.SMALLISH,
    borderRadius: STYLE_CONSTANTS.padding.SMALLER,
  },
  touchableOpacity: {borderBottomColor: COLOR.WHITE, borderBottomWidth: 2},
});
