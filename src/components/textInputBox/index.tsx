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
  parameterText: string;
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
      parameterText,
    } = this.props;

    return (
      <View>
        {label && <Text style={[textInputBoxStyle.labelText]}>{label}</Text>}
        <View style={[textInputBoxStyle.inputContainer, customContainerStyle]}>
          <View style={textInputBoxStyle.topContainer}>
            {currencyIcon && (
              /*
              TODO : Intended to change Text to Icon, when it's provided
              */
              <Text style={textInputBoxStyle.currencyIcon}>£</Text>
            )}
            <TextInput
              style={[
                textInputBoxStyle.inputBox,
                {flex: 1, alignSelf: 'center'},
              ]}
              {...this.props}
            />
          </View>
          {editIcon && (
            <TouchableOpacity onPress={onIconPress || null}>
              {parameterText ? (
                <Text style={textInputBoxStyle.parameterText}>
                  {parameterText}
                </Text>
              ) : null //Icon to be added here as per use case
              }
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
