import React from 'react';
import {View, Text, TextInput, Platform, StatusBar} from 'react-native';
import {styles} from './styles';
import {LoginForm} from './loginForm';
import {_gaSetCurrentScreen, COLOR, NAVIGATION_SCREEN_NAME} from '../../utils';
import KeyboardManager from 'react-native-keyboard-manager';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
  };
}
interface state {}

export class Login extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
    //For custom Done button
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnableAutoToolbar(false);
    }
    try {
      //Send user event to GA.
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
    } catch (error) {}
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <LoginForm navigation={navigation} />
      </View>
    );
  }
}
