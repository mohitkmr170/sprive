import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header, GeneralStatusBar} from '../../components';
import {Dropdown} from 'react-native-material-dropdown';
import {chatIcon} from '../../assets';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {getIssueCategories, setIssue} from '../../store/reducers';
import {
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
  LOCALE_STRING,
} from '../../utils/constants';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

const BUG_CATEGORY = [];
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
}
interface state {
  issue: string;
  description: string;
}

export class UnconnectedReportIssue extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      issue: '',
      description: '',
    };
  }
  componentDidMount = async () => {
    const {getIssueCategories} = this.props;
    await getIssueCategories();
    const {getIssueCategoriesResponse} = this.props;
    if (!_get(getIssueCategoriesResponse, DB_KEYS.ERROR, true)) {
      const issues = _get(
        getIssueCategoriesResponse,
        DB_KEYS.RESPONSE_DATA,
        null,
      );
      issues &&
        issues.map((item: object, index: number) => {
          BUG_CATEGORY.push({
            label: _get(issues[index], 'name', ''),
            value: _get(issues[index], 'id', ''),
          });
        });
    }
  };
  /**
   * Function called on Submit
   */
  handleSubmit = async () => {
    const {setIssue, getUserInfoResponse} = this.props;
    const payload = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.ISSUE.CATEGORY_ID]: this.state.issue,
      [PAYLOAD_KEYS.ISSUE.DESCRIPTION]: this.state.description,
    };
    await setIssue(payload);
    const {setIssueResponse} = this.props;
    /*
    TODO : Navigation service to be used here!
    */
    if (!_get(setIssueResponse, DB_KEYS.ERROR, true))
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
  };
  render() {
    return (
      <View style={styles.container}>
        <GeneralStatusBar />
        <Header
          title={localeString(LOCALE_STRING.REPORT_ISSUE.REPORT_AN_ISSUE)}
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>
            {localeString(LOCALE_STRING.REPORT_ISSUE.HAVE_AN_ISSUE)}
          </Text>
          <Dropdown
            data={BUG_CATEGORY}
            label={localeString(LOCALE_STRING.REPORT_ISSUE.BUG_CATEGORY)}
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
            style={styles.descriptionInput}
            placeholder={localeString(LOCALE_STRING.REPORT_ISSUE.PLACEHOLDER)}
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
        />
      </View>
    );
  }
}

const mapStateToProps = (state: object) => ({
  getIssueCategoriesResponse: state.getIssueCategories,
  setIssueResponse: state.setIssue,
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  getIssueCategories: () => dispatch(getIssueCategories.fetchCall()),
  setIssue: payload => dispatch(setIssue.fetchCall(payload)),
});

export const ReportIssue = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedReportIssue);
