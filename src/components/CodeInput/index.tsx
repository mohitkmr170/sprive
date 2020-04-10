import React, {useState, useEffect} from 'react';
import {View, Keyboard, Alert} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles} from './styles';
import {get as _get} from 'lodash';
import {COLOR, APP_CONSTANTS, DB_KEYS} from '../../utils';

interface CodeInputProps {
  getCompleteCode: (params?: string) => void;
  verifyUserPinResponse: object;
}

export const CodeInput = (codeInputProps: CodeInputProps) => {
  const {verifyUserPinResponse} = codeInputProps;
  const clearCodeInput = () => {
    setValue('');
  };
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({
    value,
    cellCount: APP_CONSTANTS.PIN_CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  useEffect(() => {
    if (_get(verifyUserPinResponse, DB_KEYS.ERROR, false)) {
      clearCodeInput();
    }
  }, [_get(verifyUserPinResponse, DB_KEYS.ERROR, '')]);
  return (
    <View style={styles.root}>
      <CodeField
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={APP_CONSTANTS.PIN_CELL_COUNT}
        onEndEditing={() => codeInputProps.getCompleteCode(value)}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
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
