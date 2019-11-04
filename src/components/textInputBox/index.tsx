import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {textInputBoxStyle} from './styles';

interface props {
  label: string;
  customContainerStyle: {
    borderColor?: string;
  };
  onIconPress: () => void;
  editIcon: boolean;
  currencyIcon: boolean;
}
interface state {}

export class TextInputBox extends React.Component<props, state> {
  render() {
    const {
      label,
      customContainerStyle,
      editIcon,
      onIconPress,
      currencyIcon,
    } = this.props;

    return (
      <View>
        {label && <Text style={[textInputBoxStyle.labelText]}>{label}</Text>}
        <View style={[textInputBoxStyle.inputContainer, customContainerStyle]}>
          <View style={textInputBoxStyle.topContainer}>
            {currencyIcon && (
              <Text style={{marginRight: 8, marginTop: 12, fontSize: 18}}>
                £
              </Text>
            )}
            <TextInput
              style={[textInputBoxStyle.inputBox, {flex: 1}]}
              {...this.props}
            />
          </View>
          {editIcon && (
            <TouchableOpacity
              // style={!active ? buttonStyle.passwordButton : buttonStyle.otpButtonContainer}
              onPress={onIconPress || null}>
              <Text style={{marginTop: 12}}>Icon</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
