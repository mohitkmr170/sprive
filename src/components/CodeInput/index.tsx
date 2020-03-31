import React, {useState} from 'react';
import {View, Keyboard, Alert} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {styles} from './styles';
import {COLOR} from '../../utils';

const CELL_COUNT = 5;

interface CodeInputProps {
  getCompleteCode: (params?: string) => void;
}

export const CodeInput = (codeInputProps: CodeInputProps) => {
  console.log('asdkjabskdasd', codeInputProps);
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
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
        cellCount={CELL_COUNT}
        onEndEditing={() => codeInputProps.getCompleteCode(value)}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        returnKeyType="done"
        onSubmitEditing={() => Keyboard.dismiss()}
        secureTextEntry={true}
        autoFocus={true}
        renderCell={({index, symbol, isFocused}) => {
          console.log(
            'render : index, symbol, isFocused --> ',
            index,
            symbol,
            isFocused,
            value,
          );
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
