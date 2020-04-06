import React, {useState} from 'react';
import {View, Keyboard, Alert} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles} from './styles';
import {COLOR, APP_CONSTANTS} from '../../utils';

interface CodeInputProps {
  getCompleteCode: (params?: string) => void;
}

export const CodeInput = (codeInputProps: CodeInputProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({
    value,
    cellCount: APP_CONSTANTS.PIN_CELL_COUNT,
  });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
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
