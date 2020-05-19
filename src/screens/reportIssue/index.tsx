import React from 'react';
import {View, Text, TextInput, Platform, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header, GeneralStatusBar, LoadingModal} from '../../components';
import {Dropdown} from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import KeyboardManager from 'react-native-keyboard-manager';
import Moment from 'moment';
import {
  getIssueCategories,
  setIssue,
  dismissSingleNotification,
  getAllNotifications,
} from '../../store/reducers';
import {notification} from '../../store/actions/actions';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  _gaSetCurrentScreen,
  showSnackBar,
  localeString,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  LOCALE_STRING,
  PAYLOAD_KEYS,
  COLOR,
  NOTIFICATION_CONSTANTS,
} from '../../utils';

// const BUG_CATEGORY = [];
const DESCRIPTION_MAX_LIMIT = 250;

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getIssueCategories: () => void;
  getIssueCategoriesResponse: object;
  setIssue: (payload: object) => void;
  setIssueResponse: object;
  getUserInfoResponse: object;
  notification: () => void;
  notificationResponse: object;
  getAllNotifications: (payload: object, extraPayload: object) => void;
  dismissSingleNotification: (payload: object, qParams: object) => void;
  dismissSingleNotificationResponse: object;
}
interface state {
  issue: string;
  description: string;
  BUG_CATEGORY: Array;
  loading: boolean;
}

export class UnconnectedReportIssue extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      issue: '',
      description: '',
      BUG_CATEGORY: [],
      loading: true,
    };
    if (Platform.OS === 'ios') {
      KeyboardManager.setEnableAutoToolbar(true);
      KeyboardManager.setToolbarDoneBarButtonItemText('Done');
    }
  }
  componentDidMount = async () => {
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
    const {getIssueCategories} = this.props;
    await getIssueCategories();
    const {getIssueCategoriesResponse} = this.props;
    if (!_get(getIssueCategoriesResponse, DB_KEYS.ERROR, true)) {
      const issues = _get(
        getIssueCategoriesResponse,
        DB_KEYS.RESPONSE_DATA,
        null,
      );
      let bug_categories = [];
      issues &&
        issues.map((item: object, index: number) => {
          bug_categories.push({
            label: _get(issues[index], 'name', ''),
            value: _get(issues[index], 'id', ''),
          });
        });
      this.setState({
        BUG_CATEGORY: bug_categories,
        issue:
          bug_categories &&
          bug_categories[0] &&
          bug_categories[0][DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_VALUE_KEY]
            ? bug_categories[0][DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_VALUE_KEY]
            : DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_BUG_VALUE,
        loading: false,
      });
    } else this.setState({loading: false});
    try {
      //Send user event to GA.
      _gaSetCurrentScreen(NAVIGATION_SCREEN_NAME.REPORT_ISSUE);
    } catch (error) {}
  };

  handleNotificationAction = async () => {
    const {
      dismissSingleNotification,
      getUserInfoResponse,
      notificationResponse,
    } = this.props;
    const payload = {
      [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
        getUserInfoResponse,
        DB_KEYS.PUSH_NOTIFICATION,
        null,
      ),
      dismissed: true,
    };
    const qParam = _get(
      notificationResponse,
      NOTIFICATION_CONSTANTS.NOTIFCATION_STORE_ID,
      null,
    )
      ? {
          [PAYLOAD_KEYS.ID]: _get(
            notificationResponse,
            NOTIFICATION_CONSTANTS.NOTIFCATION_STORE_ID,
            null,
          ),
        }
      : {
          [PAYLOAD_KEYS.NOTIFICATION.PUSH_NOTIFICATION_ID]: _get(
            getUserInfoResponse,
            DB_KEYS.PUSH_NOTIFICATION,
            null,
          ),
          [PAYLOAD_KEYS.NOTIFICATION.ONESIGNAL_MESSAGE_ID]: _get(
            notificationResponse,
            NOTIFICATION_CONSTANTS.ONESIGNAL_MESSAGE_ID,
            null,
          ),
        };
    await dismissSingleNotification(payload, qParam);
    const {dismissSingleNotificationResponse, getAllNotifications} = this.props;
    if (!_get(dismissSingleNotificationResponse, DB_KEYS.ERROR, true)) {
      const qParam = {
        [PAYLOAD_KEYS.PUSH_NOTIFICATION_ID]: _get(
          getUserInfoResponse,
          DB_KEYS.PUSH_NOTIFICATION,
          null,
        ),
        [PAYLOAD_KEYS.NOTIFICATION.LIMIT]: 0,
      };
      await getAllNotifications({}, qParam);
      this.setState({loading: false});
    }
  };
  /**
   * Function called on Submit
   */
  handleSubmit = async () => {
    const {
      setIssue,
      getUserInfoResponse,
      notificationResponse,
      notification,
    } = this.props;
    this.handleNotificationAction();
    const isUserFeedbackNotificationReceived = _get(
      notificationResponse,
      DB_KEYS.IS_NOTIFICATION_RECEIVED,
      false,
    );
    const payload = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.ISSUE.CATEGORY_ID]: this.state.issue,
      [PAYLOAD_KEYS.ISSUE.DESCRIPTION]: this.state.description,
    };
    console.log('ReportIssue::  handleSubmit :: payload -->', payload);
    await setIssue(payload);
    const {setIssueResponse} = this.props;
    /*
    TODO : Navigation service to be used here!
    */
    if (!_get(setIssueResponse, DB_KEYS.ERROR, true)) {
      showSnackBar({}, localeString(LOCALE_STRING.REPORT_ISSUE.BUG_REPORTED));
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
      /*
      NOTES : Commented for now, might be required further
      */
      // if (isUserFeedbackNotificationReceived) {
      //   notification();
      // }
      // this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
    }
  };
  handleBackPress = () => {
    const {notificationResponse, notification} = this.props;
    const isUserFeedbackNotificationReceived = _get(
      notificationResponse,
      DB_KEYS.IS_NOTIFICATION_RECEIVED,
      false,
    );
    if (isUserFeedbackNotificationReceived) {
      notification();
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
    } else this.props.navigation.goBack();
  };
  render() {
    const {BUG_CATEGORY} = this.state;
    const {notificationResponse, notification, setIssueResponse} = this.props;
    const isUserFeedbackNotificationReceived = _get(
      notificationResponse,
      DB_KEYS.IS_NOTIFICATION_RECEIVED,
      false,
    );
    if (this.state.loading) return <LoadingModal loadingText="Loading..." />;
    else
      return (
        <View style={styles.container}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            title={
              isUserFeedbackNotificationReceived
                ? localeString(LOCALE_STRING.REPORT_ISSUE.LOVE_TO_HEAR)
                : localeString(LOCALE_STRING.REPORT_ISSUE.REPORT_AN_ISSUE)
            }
            rightIconPresent
            onBackPress={() => this.handleBackPress()}
          />
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mainContainer}>
              <Text style={styles.titleText}>
                {localeString(LOCALE_STRING.REPORT_ISSUE.HAVE_AN_ISSUE)}
              </Text>
              <Dropdown
                data={BUG_CATEGORY}
                label={localeString(LOCALE_STRING.REPORT_ISSUE.BUG_CATEGORY)}
                value={
                  BUG_CATEGORY &&
                  BUG_CATEGORY[0] &&
                  BUG_CATEGORY[0][DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_VALUE_KEY]
                    ? BUG_CATEGORY[
                        DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_BUG_VALUE
                      ][DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_VALUE_KEY]
                    : DB_KEYS.REPORT_ISSUE.ISSUE_CATEGORY_BUG_VALUE
                }
                animationDuration={0}
                rippleDuration={0}
                labelFontSize={14}
                baseColor={COLOR.VOILET}
                containerStyle={styles.dropDownContainer}
                itemTextStyle={styles.dropDownItemText}
                inputContainerStyle={styles.internalStyle}
                onChangeText={selectedValue =>
                  this.setState({issue: selectedValue})
                }
              />
              <Text style={styles.descriptionTitle}>
                {localeString(LOCALE_STRING.REPORT_ISSUE.ISSUE)}{' '}
                <Text style={styles.descriptionTextFaded}>
                  {localeString(LOCALE_STRING.REPORT_ISSUE.CHARACTERS_LIMIT)}
                </Text>
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={10}
                textAlignVertical="top"
                style={styles.descriptionInput}
                value={this.state.description}
                placeholder={localeString(
                  LOCALE_STRING.REPORT_ISSUE.PLACEHOLDER,
                )}
                placeholderTextColor={COLOR.PLACEHOLDER}
                maxLength={DESCRIPTION_MAX_LIMIT}
                onChangeText={text => this.setState({description: text})}
              />
              <Text style={styles.descriptionWarning}>
                {DESCRIPTION_MAX_LIMIT - this.state.description.length}{' '}
                {localeString(LOCALE_STRING.REPORT_ISSUE.CHAR_LEFT)}
              </Text>
            </View>
            <Button
              title={localeString(LOCALE_STRING.REPORT_ISSUE.REPORT_ISSUE)}
              titleStyle={styles.buttonTitle}
              disabled={!(this.state.description && this.state.issue)}
              buttonStyle={styles.button}
              onPress={() => this.handleSubmit()}
              loading={_get(setIssueResponse, DB_KEYS.IS_FETCHING, false)}
            />
          </KeyboardAwareScrollView>
        </View>
      );
  }
}

const mapStateToProps = (state: object) => ({
  getIssueCategoriesResponse: state.getIssueCategories,
  setIssueResponse: state.setIssue,
  getUserInfoResponse: state.getUserInfo,
  notificationResponse: state.notification,
  dismissSingleNotificationResponse: state.dismissSingleNotification,
});

const bindActions = dispatch => ({
  getIssueCategories: () => dispatch(getIssueCategories.fetchCall()),
  setIssue: payload => dispatch(setIssue.fetchCall(payload)),
  notification: () => dispatch(notification()),
  dismissSingleNotification: (payload, extraPayload) =>
    dispatch(dismissSingleNotification.fetchCall(payload, extraPayload)),
  getAllNotifications: (payload, extraPayload) =>
    dispatch(getAllNotifications.fetchCall(payload, extraPayload)),
});

export const ReportIssue = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedReportIssue);
