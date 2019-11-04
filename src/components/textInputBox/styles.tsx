import {StyleSheet} from 'react-native';
import {COLOR} from '../../utils/colors';

export const textInputBoxStyle = StyleSheet.create({
  labelText: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 24,
    color: COLOR.REDUX_TEXTINPUT_TEXT,
  },
  inputBox: {
    height: 40,
    fontSize: 14,
  },
  inputContainer: {
    borderColor: COLOR.REDUX_FORM_INPUT_CONTAINER,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topContainer: {flexDirection: 'row'},
});
