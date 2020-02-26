import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Input} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/Feather';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Header, ReduxFormField, GeneralStatusBar} from '../../components';
import {chatIcon} from '../../assets';
import {
  alphaNumeric,
  localeString,
  showSnackBar,
  required,
  APP_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  COLOR,
  DB_KEYS,
  STYLE_CONSTANTS,
  APP_REGEX,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  handleSubmit: (values?: {email: string; password: string}) => void;
  reducerResponse: object;
}
interface state {
  postCode: string;
}

export class UnConnectedUserAddress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      postCode: '',
    };
  }
  componentDidMount = () => {};
  handleFormSubmit = () => {};
  handleCompleteLater = () => {
    this.props.navigation.goBack();
  };
  handleAddressSearch = () => {
    const {postCode} = this.state;
    if (postCode) {
      if (APP_REGEX.POST_CODE_UK.test(postCode))
        //As per postCode rules in UK
        //API call to search address based on Post Code
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SEARCH_ADDRESS);
      else
        showSnackBar(
          {},
          localeString(LOCALE_STRING.USER_PROFILE.POST_CODE_NOT_VALID),
        );
    } else
      showSnackBar(
        {},
        localeString(LOCALE_STRING.USER_PROFILE.POST_CODE_REQUIRED),
      );
  };
  handlePostCodeEntry = (postCode: string) => {
    this.setState({postCode});
  };
  render() {
    const {handleSubmit} = this.props;
    const isFormValuesFilled =
      _get(
        this.props.reducerResponse,
        DB_KEYS.USER_ADDRESS.FLAT_NUMBER,
        null,
      ) &&
      _get(
        this.props.reducerResponse,
        DB_KEYS.USER_ADDRESS.STREET_NAME,
        null,
      ) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_ADDRESS.CITY, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_ADDRESS.POST_CODE, null);
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
            contentContainerStyle={styles.fieldContainer}>
            <Text style={styles.aboutYouText}>
              {localeString(LOCALE_STRING.USER_PROFILE.ABOUT_YOU)}
            </Text>
            <Text style={styles.enterResidentialAddress}>
              {localeString(
                LOCALE_STRING.USER_PROFILE.ENTER_RESIDENTIAL_ADDRESS,
              )}
            </Text>
            <Input
              leftIcon={
                <Icon
                  name="search"
                  size={STYLE_CONSTANTS.padding.NORMAL}
                  color={COLOR.VOILET}
                />
              }
              autoCapitalize="characters"
              maxLength={7}
              containerStyle={styles.inputContainerWrapper}
              inputContainerStyle={styles.inputContainer}
              leftIconContainerStyle={styles.leftIconContainer}
              inputStyle={styles.textInput}
              placeholder={localeString(
                LOCALE_STRING.USER_PROFILE.SEARCH_POST_CODE,
              )}
              onChangeText={postCode => this.handlePostCodeEntry(postCode)}
            />
            <TouchableOpacity
              hitSlop={APP_CONSTANTS.HIT_SLOP}
              onPress={() => this.handleAddressSearch()}
              style={styles.findAddressContainer}>
              <Text style={styles.findMyAddressText}>
                {localeString(LOCALE_STRING.USER_PROFILE.FIND_ADDRESS)}
              </Text>
            </TouchableOpacity>
            <Text style={styles.enterManuallyText}>
              {localeString(LOCALE_STRING.USER_PROFILE.ENTER_MANUALLY)}
            </Text>
            <Field
              name="flatNumber"
              label={localeString(LOCALE_STRING.USER_PROFILE.FLAT_NUMBER)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="streetName"
              label={localeString(LOCALE_STRING.USER_PROFILE.STREET_NAME)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="city"
              label={localeString(LOCALE_STRING.USER_PROFILE.CITY)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
              validate={[alphaNumeric, required]}
            />
            <Field
              name="postCode"
              label={localeString(LOCALE_STRING.USER_PROFILE.POST_CODE)}
              fieldLabelStyle={styles.fieldLabelStyle}
              component={ReduxFormField}
              props={{
                maxLength: 7,
                style: styles.formInput,
                autoCapitalize: false,
                returnKeyType: APP_CONSTANTS.KEYBOARD_RETURN_TYPE.GO,
              }}
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
            style={styles.completeLaterContainer}
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
export const UserAddressForm = reduxForm({
  form: APP_CONSTANTS.USER_ADDRESS_FORM,
})(UnConnectedUserAddress);

const mapStateToProps = (state: object) => ({
  reducerResponse: state.form,
});

const bindActions = () => ({});

export const UserAddress = connect(
  mapStateToProps,
  bindActions,
)(UserAddressForm);
