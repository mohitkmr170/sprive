import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, MortgageInputContainer} from '../../components';
import {localeString} from '../../utils/i18n';
import {DB_KEYS, NAVIGATION_SCREEN_NAME} from '../../utils/constants';
import {Button} from 'react-native-elements';
import {reduxForm} from 'redux-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {updateUserMortgage} from '../../store/reducers';
import {connect} from 'react-redux';
import {
  APP_CONSTANTS,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils/constants';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
  handleSubmit: (firstParam: (values: object) => void) => void;
  getUserMortgageDataResponse: object;
  updateUserMortgage: (payload: object, extraPayload: object) => void;
  updateUserMortgageResponse: object;
  getUserInfoResponse: object;
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
    this.handlePayNowVisibility = this.handlePayNowVisibility.bind(this);
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
  handlePayNowVisibility() {
    this.setState({enableButton: false});
  }
  /**
   *
   * @param values : object : object with all form values
   */
  handlePayNowPress = async (values: object) => {
    const {
      updateUserMortgage,
      getUserInfoResponse,
      getUserMortgageDataResponse,
    } = this.props;
    const payload = {
      user_id: _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
      mortgage_balance: _get(values, 'mortgageAmount', '').replace(/,/g, ''),
      mortgage_term: _get(values, 'timePeriod', '').replace(/,/g, ''),
      mortgage_payment: _get(values, 'monthlyMortgagePayment', '').replace(
        /,/g,
        '',
      ),
    };
    await updateUserMortgage(payload, {
      id: _get(getUserMortgageDataResponse, DB_KEYS.DATA_OF_ZERO_ID, null),
    });
    const {updateUserMortgageResponse} = this.props;
    if (!_get(updateUserMortgageResponse, DB_KEYS.ERROR, true))
      this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
  };
  render() {
    const {handleSubmit, updateUserMortgageResponse} = this.props;
    return (
      <View style={styles.screenContainer}>
        <Header onBackPress={() => this.handleBackPress()} />
        <View style={styles.mainContainer}>
          <KeyboardAwareScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.mortgageStatusProgressContainer}>
              <Text style={styles.mortgageTextData}>
                {localeString(
                  LOCALE_STRING.MORTGAGE_INPUT_DATA.LOCALE_STRING_MORTGAGE_DATA,
                )}
              </Text>
              <Text style={styles.progressFractionText}>1/4</Text>
            </View>
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
              onPress={handleSubmit(this.handlePayNowPress)}
              titleStyle={styles.buttonExteriorStyle}
              buttonStyle={styles.buttonInteriorStyle}
              disabled={!this.state.enableButton}
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
});

export const UpdateMortgage = connect(
  mapStateToProps,
  bindActions,
)(MortgageUpdateForm);
