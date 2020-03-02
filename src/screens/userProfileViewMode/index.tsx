import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {chatIcon, iEdit} from '../../assets';
import {get as _get} from 'lodash';
import {
  alphaNumeric,
  required,
  alphaBets,
  dobValidation,
  localeString,
  APP_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  reducerResponse: object;
}
interface state {}

export class UnConnectedUserProfileViewMode extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleOnFocus() {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_ADDRESS);
  }
  handleDonePressed = () => {
    this.props.navigation.goBack();
  };
  handleEditPress = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_PROFILE);
  };
  render() {
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
            <View style={styles.editModeView}>
              <Text style={styles.aboutYouText}>
                {localeString(LOCALE_STRING.USER_PROFILE.ABOUT_YOU)}
              </Text>
              <TouchableOpacity
                onPress={() => this.handleEditPress()}
                style={styles.editModeTouch}>
                <Image
                  source={iEdit}
                  height={STYLE_CONSTANTS.margin.SMALL}
                  width={STYLE_CONSTANTS.margin.SMALL}
                  resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
                />
                <Text style={styles.editText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.EDIT)}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.fieldContainer}>
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
                  editable: false,
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
                  editable: false,
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
                  keyboardType: 'number-pad',
                  style: styles.formInput,
                  autoCapitalize: false,
                  autoCorrect: false,
                  returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
                  editable: false,
                }}
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
                  multiline: true,
                  editable: false,
                }}
                validate={[alphaNumeric, required]}
              />
            </View>
          </KeyboardAwareScrollView>
          <Button
            title={localeString(LOCALE_STRING.USER_PROFILE.DONE)}
            titleStyle={styles.buttonTextStyle}
            onPress={() => this.handleDonePressed()}
            buttonStyle={styles.buttonStyle}
          />
        </View>
      </View>
    );
  }
}
/*
NOTES : InitialValues of forms to be handled
*/
export const UserProfileViewModeForm = reduxForm({
  form: APP_CONSTANTS.USER_PROFILE_FORM_VIEW_MODE,
})(UnConnectedUserProfileViewMode);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const UserProfileViewMode = connect(
  mapStateToProps,
  bindActions,
)(UserProfileViewModeForm);
