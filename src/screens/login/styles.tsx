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
    margin: 12,
  },
  emailInput: {
    fontSize: 24,
    width: '80%',
    marginTop: 4,
    padding: 4,
  },
  phoneInputContainer: {
    fontSize: 18,
    paddingVertical: 4,
    width: '70%',
  },
});
