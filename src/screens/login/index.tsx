import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LoginForm} from './loginForm';

interface props {
  navigation: Object;
}
interface state {}

export class Login extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <LoginForm navigation={navigation} />
      </KeyboardAwareScrollView>
    );
  }
}
