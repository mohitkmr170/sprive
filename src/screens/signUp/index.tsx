import React from 'react';
import {View, Platform, StatusBar} from 'react-native';
import {styles} from './styles';
import {SignUpForm} from './signupForm';
import {_gaSetCurrentScreen, COLOR, NAVIGATION_SCREEN_NAME} from '../../utils';
import KeyboardManager from 'react-native-keyboard-manager';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
  };
}

interface state {}

export class SignUp extends React.Component<props, state> {
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
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
    } catch (error) {}
  };
  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <SignUpForm navigation={navigation} />
      </View>
    );
  }
}
