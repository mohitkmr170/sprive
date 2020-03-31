import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Header, GeneralStatusBar, CodeInput} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  COLOR,
  localeString,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
}
interface state {
  value: string;
}

export class UnconnectedCreateSecurityPin extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      value: '',
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  handleCode = (code: string) => {
    if (code.length === 5) {
      this.setState({value: code}, () => {
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.VERIFY_PIN, {
          code: code,
        });
      });
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback
        style={styles.mainContainer}
        onPress={() => Keyboard.dismiss()}>
        <View style={styles.mainContainer}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.centerContainer}>
            <Text style={styles.headerText}>
              {localeString(LOCALE_STRING.SECURE_LOGIN.CREATE_HEADER)}
            </Text>
            <Text style={styles.infoText}>
              {localeString(LOCALE_STRING.SECURE_LOGIN.CREATE_INFO)}
            </Text>
            <View style={styles.codeInputContainer}>
              <CodeInput getCompleteCode={this.handleCode} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const mapStateToProps = state => ({});

const bindActions = dispatch => ({});

export const CreateSecurityPin = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedCreateSecurityPin);
