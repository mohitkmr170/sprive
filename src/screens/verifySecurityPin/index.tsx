import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Platform,
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
  BIOMETRIC_KEYS,
  BIOMETRY_TYPE,
  APP_CONSTANTS,
  STYLE_CONSTANTS,
} from '../../utils';
import {
  updateUserProfile,
  getUserInfo,
  setUserAuthPin,
} from '../../store/reducers';
import {get as _get} from 'lodash';
import FingerprintScanner from 'react-native-fingerprint-scanner';

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
  handlePopupDismissed: () => void;
}
interface state {
  verifyCodeValue: string;
  loading: boolean;
}

export class UnconnectedVerifySecurityPin extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      verifyCodeValue: '',
      loading: false,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  setFaceId = async () => {
    const payload = {
      [PAYLOAD_KEYS.TWO_FACTOR_AUTH.IS_FACE_ID_ENABLED]: true,
    };
    await this.props.updateUserProfile(payload, {
      id: _get(this.props.getUserInfoResponse, DB_KEYS.DATA_ID, null),
    });
  };

  handleCode = (code: string) => {
    const prevCode = _get(this.props, STATE_PARAMS.NAV_PARAMS, null)
      ? _get(this.props, STATE_PARAMS.NAV_PARAMS, null).code
      : '';
    if (code.length === APP_CONSTANTS.PIN_CELL_COUNT) {
      if (prevCode === code) {
        this.setState({verifyCodeValue: code}, () => {});
        if (Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_IOS) {
          FingerprintScanner.isSensorAvailable()
            .then(biometrictype => {
              console.log('biometric support', biometrictype);
              if (biometrictype !== BIOMETRY_TYPE.FACE_ID) {
                console.log(
                  'handleCode : biometric type Face ID not enrolled',
                  biometrictype,
                );
                this.setSecurePin(code);
              } else {
                console.log('biometric type Face ID enrolled', biometrictype);
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
                        this.setFaceId();
                        this.setSecurePin(code);
                      },
                    },
                  ],
                );
              }
            })
            .catch(error => {
              const biometricError = JSON.parse(JSON.stringify(error));
              console.log(
                'handleCode : biometrictype not supported ::',
                biometricError,
              );
              let faceIdEnrolmentFlag =
                _get(biometricError, BIOMETRIC_KEYS.NAME, '') ===
                  BIOMETRIC_KEYS.ERROR_KEY.NOT_ENROLLED &&
                _get(biometricError, BIOMETRIC_KEYS.BIOMETRIC, '') ===
                  BIOMETRY_TYPE.FACE_ID;
              if (faceIdEnrolmentFlag) {
                Alert.alert(
                  '',
                  localeString(LOCALE_STRING.SECURE_LOGIN.FACE_ID_NOT_ENROLLED),
                  [
                    {
                      text: localeString(LOCALE_STRING.GLOBAL.OKAY),
                      onPress: () => this.setSecurePin(code),
                    },
                  ],
                );
              }
            });
        } else this.setSecurePin(code);
      } else {
        showSnackBar(
          {},
          localeString(LOCALE_STRING.SECURE_LOGIN.PIN_NOT_MATCHED),
        );
      }
    }
  };

  setSecurePin = async (pin: string) => {
    this.setState({loading: true});
    const {setUserAuthPin, getUserInfoResponse} = this.props;
    const payload = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
      [PAYLOAD_KEYS.TWO_FACTOR_AUTH.PIN]: pin,
      [PAYLOAD_KEYS.EMAIL]: _get(
        getUserInfoResponse,
        DB_KEYS.CURRENT_USER_EMAIL,
        null,
      ),
    };
    await setUserAuthPin(payload);
    const {setUserAuthPinResponse} = this.props;
    // const payloadUpdateProfile = {
    //   [PAYLOAD_KEYS.TWO_FACTOR_AUTH.IS_PIN_ENABLED]: true,
    // };
    // await this.props.updateUserProfile(payloadUpdateProfile, {
    //   id: _get(this.props.getUserInfoResponse, DB_KEYS.DATA_ID, null),
    // });
    await this.props.getUserInfo(); //To get updated user-data on dashboard
    if (!_get(setUserAuthPinResponse, DB_KEYS.ERROR, true)) {
      Keyboard.dismiss();
      // this.setState({loading: false});
      showSnackBar({}, localeString(LOCALE_STRING.SECURE_LOGIN.PIN_SUCCESS));
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
    }
  };

  render() {
    const {getUserInfoResponse, setUserAuthPin} = this.props;
    const {loading} = this.state;
    const prevCode = _get(this.props, STATE_PARAMS.NAV_PARAMS, null)
      ? _get(this.props, STATE_PARAMS.NAV_PARAMS, null).code
      : '';
    if (loading) {
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
                <CodeInput
                  getCompleteCode={this.handleCode}
                  prevCode={prevCode}
                />
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
