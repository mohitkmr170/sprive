import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {
  Header,
  MortgageInputContainer,
  GeneralStatusBar,
} from '../../components';
import {localeString} from '../../utils/i18n';
import {DB_KEYS, NAVIGATION_SCREEN_NAME} from '../../utils/constants';
import {Button} from 'react-native-elements';
import {reduxForm, isDirty} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateUserMortgage} from '../../store/reducers';
import {connect} from 'react-redux';
import {resetToTabNavigator} from '../../navigation/navigationService';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  FE_FORM_VALUE_CONSTANTS,
} from '../../utils/constants';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys.ts';
import {get as _get} from 'lodash';
import {COLOR} from '../../utils/colors';
import {NavigationActions, StackActions} from 'react-navigation';
import {triggerUserDataChangeEvent} from '../../store/actions/user-date-change-action.ts';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
  handleSubmit: (firstParam: (values: object) => void) => void;
  getUserMortgageDataResponse: object;
  updateUserMortgage: (payload: object, extraPayload: object) => void;
  triggerUserDataChange: (value: boolean) => void;
  updateUserMortgageResponse: object;
  getUserInfoResponse: object;
  isDirty: boolean;
}

interface state {
  enableButton: boolean;
}

export class UnconnectedUpdateMortgage extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      enableButton: false,
    };
    // this.handlePayNowVisibility = this.handlePayNowVisibility.bind(this);
  }
  componentDidMount = () => {
    const {getUserMortgageDataResponse} = this.props;
    if (_get(getUserMortgageDataResponse, DB_KEYS.RESPONSE, null))
      this.setState({enableButton: true});
  };
  // Back Icon Pressed
  handleBackPress = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
  };
  // Funtion to toggle the visibility of the submit buttons
  handlePayNowVisibility = () => {
    this.setState({enableButton: false});
  };

  getValue_withoutCommas_ViaLodash = (parent, key) =>
    Number(_get(parent, key, '').replace(/,/g, ''));

  /**
   *
   * @param values : object : object with all form values
   */
  handleUpdateMortgage = async (values: object) => {
    const {
      updateUserMortgage,
      getUserInfoResponse,
      getUserMortgageDataResponse,
    } = this.props;
    const payload = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      [PAYLOAD_KEYS.MORTGAGE_INPUT
        .MORTGAGE_BALANCE]: this.getValue_withoutCommas_ViaLodash(
        values,
        FE_FORM_VALUE_CONSTANTS.MORTGAGE_INPUT.MORTGAGE_BALANCE,
      ),
      [PAYLOAD_KEYS.MORTGAGE_INPUT
        .MORTGAGE_TERM]: this.getValue_withoutCommas_ViaLodash(
        values,
        FE_FORM_VALUE_CONSTANTS.MORTGAGE_INPUT.MORTGAGE_TERM,
      ),
      [PAYLOAD_KEYS.MORTGAGE_INPUT
        .MORTGAGE_PAYMENT]: this.getValue_withoutCommas_ViaLodash(
        values,
        FE_FORM_VALUE_CONSTANTS.MORTGAGE_INPUT.MORTGAGE_PAYMENT,
      ),
    };
    console.log(
      'UnconnectedUpdateMortgage:: handleUpdateMortgage:: payload -->',
      payload,
    );
    await updateUserMortgage(payload, {
      id: _get(getUserMortgageDataResponse, DB_KEYS.DATA_OF_ZERO_ID, null),
    });
    const {updateUserMortgageResponse} = this.props;
    console.log(
      'UnconnectedUpdateMortgage:: handleUpdateMortgage:: NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR -->',
      NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR,
    );
    if (!_get(updateUserMortgageResponse, DB_KEYS.ERROR, true)) {
      this.props.triggerUserDataChange(true);
      resetToTabNavigator(NAVIGATION_SCREEN_NAME.SET_GOAL_SCREEN);
    }
  };

  render() {
    const {handleSubmit, updateUserMortgageResponse} = this.props;
    return (
      <View style={styles.screenContainer}>
        <GeneralStatusBar backgroundColor={COLOR.WHITE} />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.UPDATE_MORTGAGE.UPDATE_MORTGAGE)}
          rightIconPresent
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            {/*<View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(
                  LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
                )}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View>*/}
            <Text
              style={[
                styles.mainHeaderText,
                {marginTop: STYLE_CONSTANTS.margin.LARGEST},
              ]}>
              {localeString(LOCALE_STRING.UPDATE_MORTGAGE.UPDATE_MORTGAGE)}
            </Text>
            <Text style={styles.mainHeaderText}>
              {localeString(LOCALE_STRING.UPDATE_MORTGAGE.INFO)}
            </Text>
            <View style={styles.mortgageFormComponent}>
              <MortgageInputContainer />
            </View>
            <Button
              title={localeString(LOCALE_STRING.UPDATE_MORTGAGE.UPDATE)}
              onPress={handleSubmit(this.handleUpdateMortgage)}
              titleStyle={styles.buttonExteriorStyle}
              buttonStyle={styles.buttonInteriorStyle}
              disabled={!this.props.isDirty}
              loading={_get(
                updateUserMortgageResponse,
                DB_KEYS.IS_FETCHING,
                false,
              )}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    );
  }
}
export const MortgageUpdateForm = reduxForm({
  form: APP_CONSTANTS.MORTGAGE_INPUT_FORM,
})(UnconnectedUpdateMortgage);

const mapStateToProps = state => ({
  isDirty: isDirty(APP_CONSTANTS.MORTGAGE_INPUT_FORM)(state),
  updateUserMortgageResponse: state.updateUserMortgage,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getUserInfoResponse: state.getUserInfo,
  initialValues: {
    mortgageAmount: `${_get(
      state.getUserMortgageData,
      DB_KEYS.MORTGAGE_BALANCE,
      '',
    )}`,
    timePeriod: `${_get(state.getUserMortgageData, DB_KEYS.MORTGAGE_TERM, '')}`,
    monthlyMortgagePayment: `${_get(
      state.getUserMortgageData,
      DB_KEYS.MORTGAGE_PAYMENT,
      '',
    )}`,
  },
});

const bindActions = dispatch => ({
  updateUserMortgage: (payload, extraPayload) =>
    dispatch(updateUserMortgage.fetchCall(payload, extraPayload)),
  triggerUserDataChange: value => dispatch(triggerUserDataChangeEvent(value)),
});

export const UpdateMortgage = connect(
  mapStateToProps,
  bindActions,
)(MortgageUpdateForm);
