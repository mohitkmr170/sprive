import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';
import {STYLE_CONSTANTS} from '../../utils/constants';

export const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLOR.COUNTER_BG_COLOR,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 8,
  },
  touchableOpacity: {borderBottomColor: COLOR.WHITE, borderBottomWidth: 2},
});
