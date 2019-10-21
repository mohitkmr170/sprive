import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emailInput: {
    fontSize: 24,
    borderBottomColor: COLOR.black,
    borderBottomWidth: 1,
    width: '80%',
    marginTop: 16,
    padding: 4,
  },
});
