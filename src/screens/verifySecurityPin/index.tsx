import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {Header, GeneralStatusBar, CodeInput} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  localeString,
  showSnackBar,
  COLOR,
  STATE_PARAMS,
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
  verifyCodeValue: string;
}

export class UnconnectedVerifySecurityPin extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      verifyCodeValue: '',
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  handleCode = (code: string) => {
    const prevCode = _get(this.props, STATE_PARAMS.NAV_PARAMS, null)
      ? _get(this.props, STATE_PARAMS.NAV_PARAMS, null).code
      : '';
    if (code.length === 5) {
      if (prevCode === code) {
        this.setState({verifyCodeValue: code}, () => {});
        Alert.alert(
          '',
          localeString(
            LOCALE_STRING.SECURE_LOGIN.DO_YOU_WANT_TO_ENABLE_FACE_ID,
          ),
          [
            {
              text: localeString(LOCALE_STRING.GLOBAL.NO),
              onPress: () => {
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                );
              },
            },
            {
              text: localeString(LOCALE_STRING.GLOBAL.YES),
              onPress: () => {
                //Enable faceID - API call to set faceId flag to true
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                );
              },
            },
          ],
        );
      } else {
        showSnackBar(
          {},
          localeString(LOCALE_STRING.SECURE_LOGIN.PIN_NOT_MATCHED),
        );
      }
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
              {localeString(LOCALE_STRING.SECURE_LOGIN.VERIFY_HEADER)}
            </Text>
            <Text style={styles.infoText}>
              {localeString(LOCALE_STRING.SECURE_LOGIN.VERIFY_INFO)}
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

export const VerifySecurityPin = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedVerifySecurityPin);
