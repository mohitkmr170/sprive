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
  DB_KEYS,
  PAYLOAD_KEYS,
  STATE_PARAMS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {updateUserProfile} from '../../store/reducers';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  updateUserProfile: (payload: object, qParams: object) => void;
  updateUserProfileResponse: object;
  getUserInfoResponse: object;
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
                //API call to set User PIN
                this.props.navigation.navigate(
                  NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                );
              },
            },
            {
              text: localeString(LOCALE_STRING.GLOBAL.YES),
              onPress: async () => {
                const payload = {
                  [PAYLOAD_KEYS.TWO_FACTOR_AUTH.IS_FACE_ID_ENABLED]: 1,
                };
                await updateUserProfile(payload, {
                  id: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
                });
                const {updateUserProfileResponse} = this.props;
                if (!_get(updateUserProfileResponse, DB_KEYS.ERROR, true)) {
                  //API call to set user PIN
                  this.props.navigation.navigate(
                    NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
                  );
                }
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
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  updateUserProfileResponse: state.updateUserProfile,
});

const bindActions = dispatch => ({
  updateUserProfile: (payload, extraPayload) =>
    dispatch(updateUserProfile.fetchCall(payload, extraPayload)),
});

export const VerifySecurityPin = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedVerifySecurityPin);
