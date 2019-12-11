import React from 'react';
import {View, Platform} from 'react-native';
import {styles} from './styles';
import {SignUpForm} from './signupForm';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';
import {NAVIGATION_SCREEN_NAME} from '../../utils/constants';
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
