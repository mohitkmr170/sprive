import React from 'react';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {reset} from '../../navigation/navigationService';
import {
  taskHandler,
  updateUserProfile,
  getPendingTask,
} from '../../store/reducers';
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
  FE_FORM_VALUE_CONSTANTS,
  mapFormValues,
  STATE_PARAMS,
  PENDING_TASK_IDS,
  PAYLOAD_KEYS,
  COLOR,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  reducerResponse: object;
  handleSubmit: (values?: {email: string; password: string}) => void;
  taskHandler: (payload: object) => void;
  taskHandlerResponse: object;
  getUserInfoResponse: object;
  getPendingTaskResponse: object;
  updateUserProfile: (payload: object, qParams: object) => void;
  updateUserProfileResponse: object;
  getPendingTask: (payload: object, extraPayload: object) => void;
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
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }
  componentDidMount = () => {
    let taskAndStage = _get(this.props.navigation, 'state.params', {});
    console.log(
      'componentDidMount : this.props : navigation_params =>',
      taskAndStage,
    );
  };
  handleStageSubmission = async (formValues: object) => {
    console.log('handleStageSubmission : formValues :::', formValues);
    const {
      taskHandler,
      getUserInfoResponse,
      updateUserProfile,
      navigation,
    } = this.props;
    const taskAndStage =
      _get(navigation, STATE_PARAMS.TASK_ID, null) &&
      _get(navigation, STATE_PARAMS.STAGE_ID, null);
    if (!taskAndStage) {
      const updatePayload = {
        [PAYLOAD_KEYS.PENDING_TASK.FIRST_NAME]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.USER_PROFILE.FIRST_NAME,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.LAST_NAME]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.USER_PROFILE.LAST_NAME,
          '',
        ),
        [PAYLOAD_KEYS.PENDING_TASK.DOB]: _get(
          formValues,
          FE_FORM_VALUE_CONSTANTS.USER_PROFILE.DATE_OF_BIRTH,
          '',
        ),
      };
      await updateUserProfile(updatePayload, {
        id: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      });
    } else {
      const payload = {
        [PAYLOAD_KEYS.PENDING_TASK.USER_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.DATA_ID,
          null,
        ),
        [PAYLOAD_KEYS.PENDING_TASK.TASK_ID]:
          PENDING_TASK_IDS.TASKS.USER_PROFILE,
        [PAYLOAD_KEYS.PENDING_TASK.STAGE_ID]: PENDING_TASK_IDS.STAGES.ABOUT_YOU,
        [PAYLOAD_KEYS.PENDING_TASK.DATA]: {
          [PAYLOAD_KEYS.PENDING_TASK.FIRST_NAME]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.USER_PROFILE.FIRST_NAME,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.LAST_NAME]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.USER_PROFILE.LAST_NAME,
            '',
          ),
          [PAYLOAD_KEYS.PENDING_TASK.DOB]: _get(
            formValues,
            FE_FORM_VALUE_CONSTANTS.USER_PROFILE.DATE_OF_BIRTH,
            '',
          ),
        },
      };
      await taskHandler(payload);
    }
    const {taskHandlerResponse, updateUserProfileResponse} = this.props;
    console.log('TASK SUBMISSION : TASK-1 : STAGE-1 :', taskHandlerResponse);
    if (
      !(
        _get(taskHandlerResponse, DB_KEYS.ERROR, false) ||
        _get(updateUserProfileResponse, DB_KEYS.ERROR, false)
      )
    ) {
      let taskAndStageId = {
        taskId: PENDING_TASK_IDS.TASKS.USER_PROFILE, //Represents task_id for task_name === `user_profile`
        stageId: PENDING_TASK_IDS.STAGES.ADDRESS, //Represents stage_id for stage_name === `Address`
      };
      this.props.navigation.navigate(
        NAVIGATION_SCREEN_NAME.USER_ADDRESS,
        _get(this.props.navigation, STATE_PARAMS.TASK_ID, null) &&
          _get(this.props.navigation, STATE_PARAMS.STAGE_ID, null)
          ? taskAndStageId
          : {},
      );
    }
  };
  handleFormSubmit = (values: object) => {
    if (values) {
      // this.mapPrefilledAddress();
      this.handleStageSubmission(values);
    }
  };
  handleCompleteLater = () => {
    _get(this.props.navigation, STATE_PARAMS.IS_FIRST_ROUTE, false)
      ? this.props.navigation.goBack()
      : reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
          isUserDataChanged: true,
        });
  };
  handleDateOfBirthEntry = (val: any, prevVal: any) => {
    // Prevent non-digit characters being entered
    if (val && isNaN(parseInt(val[val.length - 1], 10))) {
      return val.slice(0, -1);
    }
    // When user is deleting, this prevents immediate re-addition of '/' when it's deleted
    if (prevVal && prevVal.length >= val.length) {
      return val;
    }
    //To append / after deletion and then addition
    if (
      (val.length === 6 && prevVal.length === 5) ||
      (val.length === 3 && prevVal.length === 2)
    ) {
      return (prevVal += `/${val[val.length - 1]}`);
    }
    // Add / at appropriate sections of the input
    if (val.length === 2 || val.length === 5) {
      return (val += '/');
    }
    // Prevent characters being entered after Dob is full
    if (val.length >= 10) {
      return val.slice(0, 10);
    }
    return val;
  };
  /*
  NOTES : Not required as of now, kept for future reference
  */
  /*
  mapPrefilledAddress = () => {
    const {reducerResponse} = this.props;
    if (
      _get(
        reducerResponse,
        `${APP_CONSTANTS.USER_PROFILE_FORM}.values.address`,
        null,
      )
    ) {
      const detailedAddress = _get(
        this.props.navigation,
        STATE_PARAMS.DETAILED_USER_ADDRESS,
        null,
      );
      if (detailedAddress) {
        mapFormValues(
          APP_CONSTANTS.USER_ADDRESS_FORM,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.FLAT_NUMBER,
          detailedAddress.house_number,
        );
        mapFormValues(
          APP_CONSTANTS.USER_ADDRESS_FORM,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.STREET_NAME,
          detailedAddress.street_name,
        );
        mapFormValues(
          APP_CONSTANTS.USER_ADDRESS_FORM,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY,
          detailedAddress.city,
        );
        mapFormValues(
          APP_CONSTANTS.USER_ADDRESS_FORM,
          FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE,
          detailedAddress.post_code,
        );
      }
    } else return;
  };
  */
  hanldeBackPress = async () => {
    const {getUserInfoResponse, getPendingTask} = this.props;
    const pendingTask_qParam = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
    };
    await getPendingTask({}, pendingTask_qParam);
    this.props.navigation.goBack();
  };
  render() {
    const {
      handleSubmit,
      taskHandlerResponse,
      updateUserProfileResponse,
    } = this.props;
    const isFormValuesFilled =
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.FIRST_NAME, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.LAST_NAME, null) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.DOB, null);
    const isAddressEditable =
      _get(
        this.props.reducerResponse,
        DB_KEYS.USER_PROFILE.FIRST_NAME,
        false,
      ) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.LAST_NAME, false) &&
      _get(this.props.reducerResponse, DB_KEYS.USER_PROFILE.DOB, false) &&
      true;
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
          onBackPress={() => this.hanldeBackPress()}
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
          </KeyboardAwareScrollView>
          <Button
            title={localeString(LOCALE_STRING.USER_PROFILE.NEXT)}
            titleStyle={styles.buttonTextStyle}
            onPress={handleSubmit(this.handleFormSubmit)}
            buttonStyle={styles.buttonStyle}
            disabled={!isFormValuesFilled}
            loading={
              _get(taskHandlerResponse, DB_KEYS.IS_FETCHING, false) ||
              _get(updateUserProfileResponse, DB_KEYS.IS_FETCHING, false)
            }
          />
          {_get(this.props.navigation, STATE_PARAMS.TASK_ID, null) &&
            _get(this.props.navigation, STATE_PARAMS.STAGE_ID, null) && (
              <TouchableOpacity
                style={styles.completeLaterView}
                hitSlop={APP_CONSTANTS.HIT_SLOP}
                onPress={() => this.handleCompleteLater()}>
                <Text style={styles.completeLaterText}>
                  {localeString(LOCALE_STRING.USER_PROFILE.COMPLETE_LATER)}
                </Text>
              </TouchableOpacity>
            )}
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
  taskHandlerResponse: state.taskHandler,
  getUserInfoResponse: state.getUserInfo,
  getPendingTaskResponse: state.getPendingTask,
  updateUserProfileResponse: state.updateUserProfile,
});

const bindActions = dispatch => ({
  taskHandler: (payload, extraPayload) =>
    dispatch(taskHandler.fetchCall(payload, extraPayload)),
  updateUserProfile: (payload, extraPayload) =>
    dispatch(updateUserProfile.fetchCall(payload, extraPayload)),
  getPendingTask: (payload, extraPayload) =>
    dispatch(getPendingTask.fetchCall(payload, extraPayload)),
});

export const UserProfile = connect(
  mapStateToProps,
  bindActions,
)(UserProfileForm);
