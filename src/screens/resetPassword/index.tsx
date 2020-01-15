import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {
  GeneralStatusBar,
  Header,
  ReduxFormField,
  StatusOverlay,
} from '../../components';
import {iFail} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as Progress from 'react-native-progress';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {get as _get} from 'lodash';
import {
  resetPassword,
  getUserInfo,
  reducerResponse,
} from '../../store/reducers';
import {reset} from '../../navigation/navigationService';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  minLength8,
  maxLength16,
  alphaNumeric,
  required,
  noWhiteSpaces,
  emailMatching,
} from '../../utils/validate';
import {localeString} from '../../utils/i18n';
import {
  showSnackBar,
  getAuthToken,
  checkPassMessagePercentage,
  getPasswordStrength,
} from '../../utils/helperFunctions';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  resetPassword: (payload: object) => void;
  resetPasswordResponse: object;
  getUserInfo: () => void;
  getUserInfoResponse: object;
  reducerResponse: object;
}
interface state {
  passwordVisibility: boolean;
  passStrengthMessage: string;
  passwordResetDeeplinkKeyIssue: boolean;
}

export class UnconnectedResetPassword extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passwordVisibility: true,
      passStrengthMessage: '',
      passwordResetDeeplinkKeyIssue: false,
    };
  }

  /**
   * Funtion to get the strength of password
   * @param password : string : password to get strength
   */
  handlePassword(password: string) {
    getPasswordStrength(password)
      .then(res => {
        console.log('handlePassword : res =>', res);
        this.setState({passStrengthMessage: res});
      })
      .catch(err => showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR));
  }

  handleSubmition = async (values: object) => {
    if (
      _get(values, DB_KEYS.RESET_PASSWORD.PASSWORD, '') ===
      _get(values, DB_KEYS.RESET_PASSWORD.CONFIRM_PASSWORD, '')
    ) {
      const passwordResetKey = _get(
        this.props.navigation,
        DB_KEYS.NAVIGATION_PARAMS,
        null,
      ).deepLinkToken;
      const {resetPassword} = this.props;
      const payload = {
        [PAYLOAD_KEYS.RESET_PASSWORD.PASSWORD_RESET_KEY]: passwordResetKey,
        [PAYLOAD_KEYS.RESET_PASSWORD.NEW_PASSWORD]: _get(
          values,
          DB_KEYS.RESET_PASSWORD.PASSWORD,
          '',
        ),
      };
      await resetPassword(payload);
      const {resetPasswordResponse} = this.props;
      if (!_get(resetPasswordResponse, DB_KEYS.ERROR, true)) {
        showSnackBar(
          {},
          _get(resetPasswordResponse, DB_KEYS.RESPONSE_MESSAGE, ''),
        );
        reset(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
      } else {
        this.setState({passwordResetDeeplinkKeyIssue: true});
      }
    } else
      showSnackBar(
        {},
        localeString(LOCALE_STRING.RESET_PASSWORD.PASSWORD_NOT_MATCHED),
      );
  };

  async componentDidMount() {
    getAuthToken()
      .then(async res => {
        if (res && res !== APP_CONSTANTS.FALSE_TOKEN) {
          const {getUserInfo} = this.props;
          await getUserInfo();
          const {getUserInfoResponse} = this.props;
          if (!_get(getUserInfoResponse, DB_KEYS.ERROR, false)) {
            showSnackBar(
              {},
              localeString(LOCALE_STRING.RESET_PASSWORD.RESET_FROM_APP),
            );
            this.props.navigation.navigate(
              NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
            );
          }
        }
      })
      .catch(err => {});
  }
  render() {
    const {handleSubmit, resetPasswordResponse} = this.props;
    const {passwordVisibility} = this.state;
    let passMessagePercentage = checkPassMessagePercentage(
      this.state.passStrengthMessage,
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          onBackPress={() => this.props.navigation.goBack()}
        />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.middleContainer}>
            <Text style={styles.resetPasswordText}>
              {localeString(LOCALE_STRING.RESET_PASSWORD.RESET_PASSWORD)}
            </Text>
            <View style={{flex: 1}}>
              <Field
                name={localeString(LOCALE_STRING.RESET_PASSWORD.PASSWORD)}
                label={localeString(LOCALE_STRING.RESET_PASSWORD.NEW_PASSWORD)}
                password={true}
                editIcon={true}
                onIconPress={() =>
                  this.setState({passwordVisibility: !passwordVisibility})
                }
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  secureTextEntry: passwordVisibility,
                  autoCapitalize: false,
                  placeholder: localeString(
                    LOCALE_STRING.RESET_PASSWORD.PLACEHOLDER_PASSWORD,
                  ),
                  onChangeText: (password: string) =>
                    this.handlePassword(password),
                }}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
              />
              {_get(
                this.props.reducerResponse,
                DB_KEYS.RESET_PASSWORD_FORM,
                false,
              ) && (
                <View style={styles.passStrengthContainer}>
                  <View style={styles.passStrengthInnerContainer}>
                    <Progress.Bar
                      progress={passMessagePercentage}
                      color={COLOR.LIGHT_GREEN}
                      height={STYLE_CONSTANTS.margin.SMALLER}
                      width={null}
                      unfilledColor={COLOR.LIGHT_GRAY}
                      borderWidth={0}
                    />
                  </View>
                  <Text style={styles.passStrengthText}>
                    {this.state.passStrengthMessage}
                  </Text>
                </View>
              )}
              <Field
                name={localeString(
                  LOCALE_STRING.RESET_PASSWORD.CONFIRM_PASSWORD,
                )}
                label={localeString(
                  LOCALE_STRING.RESET_PASSWORD.RETYPE_PASSWORD,
                )}
                password={true}
                editIcon={true}
                onIconPress={() =>
                  this.setState({passwordVisibility: !passwordVisibility})
                }
                component={ReduxFormField}
                props={{
                  maxLength: 16,
                  style: styles.emailInput,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  secureTextEntry: passwordVisibility,
                  autoCapitalize: false,
                  placeholder: localeString(
                    LOCALE_STRING.RESET_PASSWORD.PLACEHOLDER_PASSWORD,
                  ),
                }}
                editIcon={true}
                validate={[emailMatching]}
                onSubmitEditing={handleSubmit(this.handleSubmition)}
              />
            </View>
          </View>
          <View>
            <Button
              title={localeString(LOCALE_STRING.RESET_PASSWORD.CONFIRM)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleSubmition)}
              buttonStyle={styles.buttonStyle}
              loading={_get(resetPasswordResponse, DB_KEYS.IS_FETCHING, false)}
            />
          </View>
        </KeyboardAwareScrollView>
        {this.state.passwordResetDeeplinkKeyIssue && (
          <StatusOverlay
            icon={iFail}
            firstButtonText={localeString(
              LOCALE_STRING.EMAIL_VERIFICATION.OKAY,
            )}
            handleFirstButton={() => {
              this.setState({passwordResetDeeplinkKeyIssue: false});
              reset(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
            }}
            mainMessage={localeString(
              LOCALE_STRING.RESET_PASSWORD.PASSWORD_RESET_FAILED,
            )}
            infoTitle={_get(
              resetPasswordResponse,
              DB_KEYS.VERIFICATION_ERROR_MESSAGE,
              APP_CONSTANTS.GENERAL_ERROR,
            )}
          />
        )}
      </View>
    );
  }
}
export const ResetPasswordForm = reduxForm({
  form: DB_KEYS.FORM.RESET_PASSWORD,
  destroyOnUnmount: true,
})(UnconnectedResetPassword);
const mapStateToProps = state => ({
  reducerResponse: state.form,
  resetPasswordResponse: state.resetPassword,
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo.fetchCall()),
  resetPassword: payload => dispatch(resetPassword.fetchCall(payload)),
});

export const ResetPassword = connect(
  mapStateToProps,
  bindActions,
)(ResetPasswordForm);
