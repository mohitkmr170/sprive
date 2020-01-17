import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {iEmail, iEye} from '../../assets';
import {textInputBoxStyle} from './styles';
import {APP_CONSTANTS} from '../../utils';

interface props {
  label: string;
  customContainerStyle: {
    borderColor?: string;
  };
  onIconPress: () => void;
  editIcon: boolean;
  currencyIcon: boolean;
  parameterText: string;
  password: boolean;
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
      password,
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
            <TouchableOpacity
              onPress={onIconPress}
              disabled={!onIconPress}
              hitSlop={APP_CONSTANTS.HIT_SLOP}>
              {parameterText ? (
                <Text style={textInputBoxStyle.parameterText}>
                  {parameterText}
                </Text>
              ) : (
                <Image
                  source={password ? iEye : iEmail}
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
