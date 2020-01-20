import React from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import {iEmail, iEye, iPasswordLock, iLock} from '../../assets';
import Icon from 'react-native-vector-icons/Feather';
import {textInputBoxStyle} from './styles';
import {APP_CONSTANTS} from '../../utils/constants';

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
  value: string;
  secureTextEntry: boolean;
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
      value,
      secureTextEntry,
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
          <View style={textInputBoxStyle.textInputContainer}>
            <TextInput style={textInputBoxStyle.inputBox} {...this.props} />
          </View>
          {editIcon && (
            <TouchableOpacity
              onPress={onIconPress}
              disabled={!(onIconPress && value)}
              hitSlop={APP_CONSTANTS.HIT_SLOP}>
              {parameterText ? (
                <Text style={textInputBoxStyle.parameterText}>
                  {parameterText}
                </Text>
              ) : (
                <View style={textInputBoxStyle.iconContainer}>
                  {password ? (
                    !value ? (
                      <Image
                        source={iLock}
                        style={textInputBoxStyle.inputTypeIcon}
                      />
                    ) : (
                      <Icon
                        name={secureTextEntry ? 'eye-off' : 'eye'}
                        size={14}
                        style={textInputBoxStyle.inputTypeIcon}
                      />
                    )
                  ) : (
                    <Image
                      source={iEmail}
                      style={textInputBoxStyle.inputTypeIcon}
                    />
                  )}
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
