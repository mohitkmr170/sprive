import React, {useState, useEffect, useRef} from 'react';
import {View, Keyboard, Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles} from './styles';
import {get as _get} from 'lodash';
import {
  localeString,
  LOCALE_STRING,
  COLOR,
  APP_CONSTANTS,
  DB_KEYS,
  showSnackBar,
} from '../../utils';

const CODE_LENGTH = 5,
  KEYBOARD_REFOCUS_TIME = 1000;

interface CodeInputProps {
  getCompleteCode: (params?: string) => void;
  verifyUserPinResponse: object;
  prevCode: string;
}

export const CodeInput = (codeInputProps: CodeInputProps) => {
  if (Platform.OS === 'ios') {
    KeyboardManager.setEnableAutoToolbar(false);
  }
  const refTextInput = useRef(null);
  const {verifyUserPinResponse, prevCode} = codeInputProps;
  const clearCodeInput = () => {
    setValue('');
  };
  const [value, setValue] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const ref = useBlurOnFulfill({
    value,
    cellCount: APP_CONSTANTS.PIN_CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const handleSubmit = (input: any) => {
    setValue(input);
    if (input.length === CODE_LENGTH) {
      codeInputProps.getCompleteCode(input);
      setIsSubmitted(true);
      Keyboard.dismiss();
    }
  };
  useEffect(() => {
    if (
      prevCode &&
      prevCode.length === CODE_LENGTH &&
      value.length === CODE_LENGTH
    ) {
      if (prevCode !== value && isSubmitted) {
        clearCodeInput();
        setIsSubmitted(false);
        showSnackBar(
          {},
          localeString(LOCALE_STRING.SECURE_LOGIN.PIN_NOT_MATCHED),
        );
        setTimeout(() => {
          refTextInput.current.focus();
        }, KEYBOARD_REFOCUS_TIME);
      }
    }
  }, [isSubmitted]);
  useEffect(() => {
    if (_get(verifyUserPinResponse, DB_KEYS.ERROR, false)) {
      clearCodeInput();
      setTimeout(() => {
        refTextInput.current.focus();
      }, KEYBOARD_REFOCUS_TIME);
    }
  }, [_get(verifyUserPinResponse, DB_KEYS.ERROR, '')]);
  return (
    <View style={styles.root}>
      <CodeField
        ref={refTextInput}
        {...props}
        value={value}
        onChangeText={input => handleSubmit(input)}
        cellCount={APP_CONSTANTS.PIN_CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        secureTextEntry={true}
        autoFocus={true}
        renderCell={({index, symbol, isFocused}) => {
          return (
            <View style={styles.externalContainer}>
              <View
                style={[
                  styles.innerContainer,
                  {
                    backgroundColor: symbol.length
                      ? COLOR.CARIBBEAN_GREEN
                      : COLOR.GRAYISH,
                  },
                ]}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
