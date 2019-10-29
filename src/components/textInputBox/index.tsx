import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {textInputBoxStyle} from './styles';

interface props {
  label: string;
  customContainerStyle: {
    borderColor?: string;
  };
}
interface state {}

export class TextInputBox extends React.Component<props, state> {
  render() {
    const {label, customContainerStyle} = this.props;

    return (
      <View>
        {label && <Text style={[textInputBoxStyle.labelText]}>{label}</Text>}
        <View style={[textInputBoxStyle.inputContainer, customContainerStyle]}>
          <TextInput
            style={[textInputBoxStyle.inputBox, {flex: 1}]}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}
