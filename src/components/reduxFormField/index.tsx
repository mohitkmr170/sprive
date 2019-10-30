import React from 'react';
import {Text, View} from 'react-native';
import {TextInputBox} from '../textInputBox';
import {Styles} from './styles';

interface props {
  input: {
    name: string;
  };
  meta: {
    touched: boolean;
    error: string;
  };
}

interface state {}

export class ReduxFormField extends React.Component<props, state> {
  render() {
    //First level destucturing of object, use case of meta to be discussed
    const {
      input,
      meta: {touched, error},
    } = this.props;
    const CUSTOM_CONTAINER_STYLE = touched && error ? {borderColor: 'red'} : {};

    return (
      <View>
        <TextInputBox
          {...this.props}
          //This is to be discussed and cleared
          {...input}
          //This is the custom style provied + style added in case of any error
          customContainerStyle={[Styles.containerStyle, CUSTOM_CONTAINER_STYLE]}
          labelStyle={Styles.labelStyle}
        />
        <View style={Styles.fieldError}>
          {touched && error ? (
            <Text style={Styles.errorText}>{`*${error}`}</Text>
          ) : null}
        </View>
      </View>
    );
  }
}
