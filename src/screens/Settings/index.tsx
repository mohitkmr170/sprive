import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import {Header, GeneralStatusBar} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {iUpdate} from '../../assets';
import {
  COLOR,
  DB_KEYS,
  localeString,
  LOCALE_STRING,
  SECURITY_TYPE,
  PAYLOAD_KEYS,
  NAVIGATION_SCREEN_NAME,
  BIOMETRY_TYPE,
  STYLE_CONSTANTS,
} from '../../utils';
import {getUserInfo, updateUserProfile} from '../../store/reducers';
import {get as _get} from 'lodash';
import FingerprintScanner from 'react-native-fingerprint-scanner';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  getPendingTaskResponse: object;
  getUserInfoResponse: object;
  updateUserProfile: (payload: object, qParams: object) => void;
  updateUserProfileResponse: object;
  getUserInfo: () => void;
}
interface state {
  isFaceIdSupported: boolean;
  isSecureLoginEnabled: boolean;
  isFaceIdEnabled: boolean;
}

export class UnconnectedSettings extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isFaceIdSupported: false,
      isSecureLoginEnabled:
        _get(this.props.getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, false) &&
        true,
      isFaceIdEnabled:
        _get(
          this.props.getUserInfoResponse,
          DB_KEYS.IS_FACE_ID_ENABLED,
          false,
        ) && true,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  componentDidMount() {
    if (Platform.OS === STYLE_CONSTANTS.device.DEVICE_TYPE_IOS) {
      FingerprintScanner.isSensorAvailable()
        .then(biometrictype => {
          console.log('biometric support', biometrictype);
          if (biometrictype === BIOMETRY_TYPE.FACE_ID) {
            console.log('biometric type Face ID enrolled', biometrictype);
            this.setState({isFaceIdSupported: true});
          }
        })
        .catch(error => {
          console.log('biometrictype not supported ::', error);
          this.setState({isFaceIdSupported: false});
        });
    } else {
      this.setState({isFaceIdSupported: false});
    }
  }

  SETTINGS_DATA = [
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.UPDATE_PASSWORD),
      icon: iUpdate,
      action: () =>
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.UPDATE_PASSWORD),
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.SECURE_LOGIN),
      type: SECURITY_TYPE.PIN,
      action: () => this.hanldeSecureLoginToggle(),
      isToggleEnabled: false,
    },
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.FACE_ID),
      type: SECURITY_TYPE.FACE,
      action: () => this.handleFaceIdToggle(),
      isToggleEnabled: false,
    },
  ];

  hanldeSecureLoginToggle = async () => {
    const {getUserInfoResponse} = this.props;
    if (_get(getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, null)) {
      const payload = {
        [PAYLOAD_KEYS.TWO_FACTOR_AUTH.IS_PIN_ENABLED]: false,
      };
      await this.props.updateUserProfile(payload, {
        id: _get(this.props.getUserInfoResponse, DB_KEYS.DATA_ID, null),
      });
      await this.props.getUserInfo();
      const {getUserInfoResponse} = this.props;
      this.setState({
        isSecureLoginEnabled: false,
      });
      if (
        !_get(getUserInfoResponse, DB_KEYS.IS_PIN_ENABLED, false) &&
        _get(getUserInfoResponse, DB_KEYS.IS_FACE_ID_ENABLED, false)
      ) {
        this.handleFaceIdToggle();
      }
    } else this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.CREATE_PIN);
  };

  handleFaceIdToggle = async () => {
    const payload = {
      [PAYLOAD_KEYS.TWO_FACTOR_AUTH.IS_FACE_ID_ENABLED]: !this.state
        .isFaceIdEnabled,
    };
    await this.props.updateUserProfile(payload, {
      id: _get(this.props.getUserInfoResponse, DB_KEYS.DATA_ID, null),
    });
    await this.props.getUserInfo();
    const {getUserInfoResponse} = this.props;
    this.setState({
      isFaceIdEnabled:
        _get(getUserInfoResponse, DB_KEYS.IS_FACE_ID_ENABLED, false) && true,
    });
  };

  render() {
    const {getUserInfoResponse} = this.props;
    const isPinEnabledFlag = _get(
      getUserInfoResponse,
      DB_KEYS.IS_PIN_ENABLED,
      false,
    );
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            title={localeString(LOCALE_STRING.SIDE_BAR.USER_PROFILE)}
            rightIconPresent
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.centerContainer}>
            <View style={styles.topViewContainer}>
              <Text style={styles.titleText}>
                {localeString(LOCALE_STRING.SIDE_BAR.PROFILE_SUB_LIST)}
              </Text>
            </View>
            <View style={styles.listContainer}>
              {this.SETTINGS_DATA.map((item, index) => {
                return item.type === SECURITY_TYPE.FACE &&
                  !this.state.isFaceIdSupported ? null : (
                  <TouchableOpacity
                    style={[
                      styles.listItemContainer,
                      {
                        opacity:
                          item.isDisabled ||
                          (item.type === SECURITY_TYPE.FACE &&
                            !isPinEnabledFlag)
                            ? 0.4
                            : 1,
                      },
                    ]}
                    onPress={item.action}
                    disabled={
                      item.type === SECURITY_TYPE.FACE
                        ? !isPinEnabledFlag
                        : item.isDisabled
                    }>
                    <Text style={styles.listItemText}>{item.title}</Text>
                    {_get(item, DB_KEYS.IS_TOGGLE_ENABLED, false) ||
                      (!_get(item, DB_KEYS.IS_TOGGLE_ENABLED, true) && (
                        <Switch
                          style={styles.switchContainer}
                          trackColor={{
                            false: COLOR.TOGGLE_DISABLED_GRAY,
                            true: COLOR.TOGGLE_ENABLED_GREEN,
                          }}
                          onValueChange={() => {
                            if (index === SECURITY_TYPE.PIN_INDEX)
                              this.hanldeSecureLoginToggle();
                            if (index === SECURITY_TYPE.FACE_INDEX)
                              this.handleFaceIdToggle();
                          }}
                          disabled={
                            item.type === SECURITY_TYPE.FACE
                              ? !isPinEnabledFlag
                              : item.isDisabled
                          }
                          thumbColor={COLOR.WHITE}
                          value={
                            index === SECURITY_TYPE.PIN_INDEX
                              ? this.state.isSecureLoginEnabled
                              : index === SECURITY_TYPE.FACE_INDEX
                              ? this.state.isFaceIdEnabled
                              : null
                          }
                        />
                      ))}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getPendingTaskResponse: state.getPendingTask,
});

const bindActions = dispatch => ({
  updateUserProfile: (payload, extraPayload) =>
    dispatch(updateUserProfile.fetchCall(payload, extraPayload)),
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
});

export const Settings = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSettings);
