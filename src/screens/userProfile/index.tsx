import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {chatIcon} from '../../assets';
import {get as _get} from 'lodash';
import {
  alphaNumeric,
  required,
  alphaBets,
  dobValidation,
  localeString,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  LOCALE_STRING,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  reducerResponse: object;
  handleSubmit: (values?: {email: string; password: string}) => void;
}
interface state {
  dateOfBirth: string;
}

export class UnConnectedUserProfile extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      dateOfBirth: '',
    };
  }
  componentDidMount = () => {};
  handleFormSubmit = () => {};
  handleCompleteLater = () => {
    this.props.navigation.goBack();
  };
  handleDateOfBirthEntry = (val: any, prevVal: any) => {
    // Prevent non-digit characters being entered
    if (isNaN(parseInt(val[val.length - 1], 10))) {
      return val.slice(0, -1);
    }
    // When user is deleting, this prevents immediate re-addition of '/' when it's deleted
    if (prevVal && prevVal.length >= val.length) {
      return val;
    }
    // Add / at appropriate sections of the input
    if (val.length === 2 || val.length === 5) {
      val += '/';
    }
    // Prevent characters being entered after Dob is full
    if (val.length >= 10) {
      return val.slice(0, 10);
    }
    return val;
  };
  handleOnFocus() {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_ADDRESS);
  }
  render() {
    const {handleSubmit} = this.props;
    const isFormValuesFilled =
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.FIRST_NAME, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.LAST_NAME, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.DOB, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.ADDRESS, null);
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.USER_PROFILE.USER_PROFILE)}
          rightIconPresent
          iconName={chatIcon}
          iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
          navigation={this.props.navigation}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.mainView}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formScrollableView}>
            <Text style={styles.aboutYouText}>
              {localeString(LOCALE_STRING.USER_PROFILE.ABOUT_YOU)}
            </Text>
            <Field
              name="firstName"
              label={localeString(LOCALE_STRING.USER_PROFILE.FIRST_NAME)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                autoCorrect: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaBets, required]}
            />
            <Field
              name="lastName"
              label={localeString(LOCALE_STRING.USER_PROFILE.LAST_NAME)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                autoCorrect: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaBets, required]}
            />
            <Field
              name="dateOfBirth"
              label={localeString(LOCALE_STRING.USER_PROFILE.DOB)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                maxLength: 10, //DOB
                placeholder: localeString(
                  LOCALE_STRING.USER_PROFILE.DOB_PLACEHOLDER,
                ),
                keyboardType: 'number-pad',
                style: styles.formInput,
                autoCapitalize: false,
                autoCorrect: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              normalize={this.handleDateOfBirthEntry}
              validate={[required, dobValidation]}
            />
            <Field
              name="address"
              label={localeString(LOCALE_STRING.USER_PROFILE.ADDRESS)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                autoCorrect: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              onFocus={() => this.handleOnFocus()}
              validate={[alphaNumeric, required]}
            />
          </KeyboardAwareScrollView>
          <Button
            title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
            titleStyle={styles.buttonTextStyle}
            onPress={handleSubmit(this.handleFormSubmit)}
            buttonStyle={styles.buttonStyle}
            disabled={!isFormValuesFilled}
          />
          <TouchableOpacity
            style={styles.completeLaterView}
            hitSlop={APP_CONSTANTS.HIT_SLOP}
            onPress={() => this.handleCompleteLater()}>
            <Text style={styles.completeLaterText}>
              {localeString(LOCALE_STRING.USER_PROFILE.COMPLETE_LATER)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export const UserProfileForm = reduxForm({
  form: APP_CONSTANTS.USER_PROFILE_FORM,
})(UnConnectedUserProfile);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const UserProfile = connect(
  mapStateToProps,
  bindActions,
)(UserProfileForm);
