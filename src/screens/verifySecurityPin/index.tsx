import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import {
  Header,
  GeneralStatusBar,
  CodeInput,
  LoadingModal,
} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {
  localeString,
  showSnackBar,
  COLOR,
  DB_KEYS,
  PAYLOAD_KEYS,
  STATE_PARAMS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {
  updateUserProfile,
  getUserInfo,
  setUserAuthPin,
} from '../../store/reducers';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  updateUserProfile: (payload: object, qParams: object) => void;
  updateUserProfileResponse: object;
  getUserInfoResponse: object;
  getUserInfo: () => void;
  setUserAuthPin: (payload: object) => void;
  setUserAuthPinResponse: object;
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
    const {updateUserProfile, getUserInfoResponse} = this.props;
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
                this.setSecurePin(code);
              },
            },
            {
              text: localeString(LOCALE_STRING.GLOBAL.YES),
              onPress: async () => {
                await this.props.getUserInfo();
                this.setSecurePin(code);
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

  setSecurePin = async (pin: string) => {
    const {setUserAuthPin, getUserInfoResponse} = this.props;
    const payload = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
      [PAYLOAD_KEYS.TWO_FACTOR_AUTH.PIN]: pin,
    };
    await setUserAuthPin(payload);
    const {setUserAuthPinResponse} = this.props;
    if (!_get(setUserAuthPinResponse, DB_KEYS.ERROR, true)) {
      showSnackBar(
        {},
        _get(setUserAuthPinResponse, DB_KEYS.RESPONSE_MESSAGE, ''),
      );
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
    }
  };

  render() {
    const {getUserInfoResponse, setUserAuthPin} = this.props;
    if (
      _get(getUserInfoResponse, DB_KEYS.IS_FETCHING, false) ||
      _get(setUserAuthPin, DB_KEYS.IS_FETCHING, false)
    ) {
      return <LoadingModal loadingText="Loading..." />;
    } else
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
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  updateUserProfileResponse: state.updateUserProfile,
  setUserAuthPinResponse: state.setUserAuthPin,
});

const bindActions = dispatch => ({
  updateUserProfile: (payload, extraPayload) =>
    dispatch(updateUserProfile.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  setUserAuthPin: payload => dispatch(setUserAuthPin.fetchCall(payload)),
});

export const VerifySecurityPin = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedVerifySecurityPin);
