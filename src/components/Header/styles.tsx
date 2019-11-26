import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: COLOR.GRAY,
    borderBottomWidth: 0.5,
  },
  sideText: {alignSelf: 'center'},
  middleContainer: {
    fontSize: 18,
    color: '#22319B',
    fontWeight: '500',
  },
});
