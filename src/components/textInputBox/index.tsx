import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

interface props {
  labelStyle: Object;
  inputStyle: Object;
  editIcon: boolean;
  onIconPress: () => void;
  label: string;
  iconName: string;
  customContainerStyle: Object;
}
interface state {}

export class TextInputBox extends React.Component<props, state> {
  render() {
    const {
      labelStyle,
      inputStyle,
      editIcon,
      onIconPress,
      label,
      iconName,
      customContainerStyle,
    } = this.props;

    return (
      <View>
        <Text style={[textInputBoxStyle.labelText, labelStyle]}>{label}</Text>
        <View style={[textInputBoxStyle.inputContainer, customContainerStyle]}>
          <TextInput
            style={[textInputBoxStyle.inputBox, inputStyle, {flex: 1}]}
            {...this.props}
          />
          {editIcon && (
            <TouchableOpacity
              // style={!active ? buttonStyle.passwordButton : buttonStyle.otpButtonContainer}
              onPress={onIconPress || null}>
              {/* <SvgUri source={iconName || iEdit} /> */}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const textInputBoxStyle = StyleSheet.create({
  labelText: {
    marginTop: 12,
    fontSize: 12,
    lineHeight: 24,
    color: '#666666',
  },
  inputBox: {
    height: 40,
    fontSize: 14,
  },
  inputContainer: {
    borderColor: '#eef2f7',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
