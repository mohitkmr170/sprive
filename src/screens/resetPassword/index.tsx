import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import {GeneralStatusBar, Header, ReduxFormField} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {APP_CONSTANTS, LOCALE_STRING} from '../../utils/constants';
import {get as _get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  minLength8,
  maxLength16,
  alphaNumeric,
  required,
  noWhiteSpaces,
} from '../../utils/validate';
import {localeString} from '../../utils/i18n';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
}
interface state {
  passwordVisibility: boolean;
}

export class UnconnectedResetPassword extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      passwordVisibility: true,
    };
  }

  handleSubmition = () => {};

  async componentDidMount() {}
  render() {
    const {handleSubmit} = this.props;
    const {passwordVisibility} = this.state;
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
                }}
                // editIcon={true}
                // onFocus={() => this.hideServerError()}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
                // onSubmitEditing={handleSubmit(this.handleLoginPress)}
              />
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
                // onFocus={() => this.hideServerError()}
                validate={[
                  minLength8,
                  maxLength16,
                  alphaNumeric,
                  required,
                  noWhiteSpaces,
                ]}
                // onSubmitEditing={handleSubmit(this.handleLoginPress)}
              />
            </View>
          </View>
          <View>
            <Button
              title={localeString(LOCALE_STRING.RESET_PASSWORD.CONFIRM)}
              titleStyle={styles.buttonTextStyle}
              onPress={handleSubmit(this.handleSubmition)}
              buttonStyle={styles.buttonStyle}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
export const ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  destroyOnUnmount: true,
})(UnconnectedResetPassword);
const mapStateToProps = state => ({});

const bindActions = dispatch => ({});

export const ResetPassword = connect(
  mapStateToProps,
  bindActions,
)(ResetPasswordForm);
