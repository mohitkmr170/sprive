import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {iEmail, iLock} from '../../assets';
import {textInputBoxStyle} from './styles';
import {STYLE_CONSTANTS} from '../../utils/constants';

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
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput style={textInputBoxStyle.inputBox} {...this.props} />
          </View>
          {editIcon && (
            <TouchableOpacity onPress={onIconPress || null}>
              {parameterText ? (
                <Text style={textInputBoxStyle.parameterText}>
                  {parameterText}
                </Text>
              ) : (
                <Image
                  source={label === 'Password' ? iLock : iEmail}
                  height={14}
                  width={14}
                  style={textInputBoxStyle.inputTypeIcon}
                />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
