import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.3,
  },
  sideText: {alignSelf: 'center'},
  middleContainer: {
    fontSize: 24,
  },
});
