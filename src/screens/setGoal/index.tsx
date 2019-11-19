import React from 'react';
import {View, Text, ScrollView, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header, LoadingModal} from '../../components';
import Slider from '@react-native-community/slider';
import {localeString} from '../../utils/i18n';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {
  getUserMortgageData,
  setUserGoal,
  getUserGoal,
  updateUserGoal,
} from '../../store/reducers';
import {
  LOCALE_STRING,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {calculateGoal} from '../../../calculatorJS/index';
import {ErcWarning} from './ercWarning';
import {TargetDetails} from './targetDetails';

const SLIDER_START_VALUE = 1;
const SLIDER_STEP = 1;

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  setUserGoal: (payload: object) => void;
  getUserGoal: (payload: object, extraPayload: object) => void;
  updateUserGoal: (payload: object, extraPayload: object) => void;
  getUserMortgageDataResponse: object;
  getUserInfoResponse: object;
  getUserGoalResponse: object;
  updateUserGoalResponse: object;
  setUserGoalResponse: object;
}
interface state {
  mortgageTerm: number;
  monthlyOverPayment: number;
  interestSaving: number;
  loading: boolean;
  ercLimit: number;
  ercLimitCrossed: boolean;
}
export class UnconnectedSetGoal extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      mortgageTerm: 0,
      monthlyOverPayment: 0,
      interestSaving: 0,
      loading: true,
      ercLimit: 0,
      ercLimitCrossed: false,
    };
  }

  componentDidMount = async () => {
    const {
      // getUserMortgageData,
      // getUserInfoResponse,
      // getUserGoal,
      navigation,
    } = this.props;
    this.navFocusListener = navigation.addListener('didFocus', async () => {
      const {
        getUserMortgageData,
        getUserInfoResponse,
        getUserGoal,
        // navigation,
      } = this.props;
      const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
      const qParamsInfo = {
        user_id: userId,
      };
      await getUserMortgageData({}, qParamsInfo);
      const qParams = {
        user_id: userId,
      };
      await getUserGoal({}, qParams);
      const {getUserGoalResponse} = this.props;
      //To update previously set goal
      if (_get(getUserGoalResponse, DB_KEYS.NEW_MORTGAGE_TERM, false)) {
        const {getUserGoalResponse} = this.props;
        const mortgageTerm = _get(
          getUserGoalResponse,
          DB_KEYS.NEW_MORTGAGE_TERM,
          null,
        );
        const monthlyOverPayment = _get(
          getUserGoalResponse,
          DB_KEYS.GOAL_OVERPAYMENT,
          null,
        );
        const totalInterest = _get(
          getUserGoalResponse,
          DB_KEYS.GOAL_INTEREST_SAVED,
          null,
        );
        this.setState({
          mortgageTerm: mortgageTerm,
          monthlyOverPayment: monthlyOverPayment,
          interestSaving: totalInterest,
          loading: false,
        });
      } else {
        //To add new goal with Mortgage data
        this.goalUpdate();
      }
    });
  };

  /**
   * Function to update user Goal values
   * @param newTerm : number : New Mortgage term
   */
  goalUpdate = async (newTerm?: number) => {
    const {getUserMortgageDataResponse} = this.props;
    const {loading} = this.state;
    let currentMortgageAmount = _get(
      getUserMortgageDataResponse,
      DB_KEYS.MORTGAGE_BALANCE,
      null,
    );
    let currentMonthlyMortgageAmount = _get(
      getUserMortgageDataResponse,
      DB_KEYS.MORTGAGE_PAYMENT,
      null,
    );
    let currentMortgageTerm = _get(
      getUserMortgageDataResponse,
      DB_KEYS.MORTGAGE_TERM,
      null,
    );
    let desiredTerm = currentMortgageTerm;
    if (loading) {
      /*
      TODO : Need to add ERC value based desiredTerm & mortgageTerm/2(Max of either)
      */
      desiredTerm = Math.ceil(currentMortgageTerm / 2);
    } else {
      desiredTerm = newTerm;
    }
    //calculating using calculatorJS
    let newGoal = calculateGoal(
      currentMortgageAmount,
      currentMonthlyMortgageAmount,
      currentMortgageTerm,
      desiredTerm,
    );
    //Calculating ERC Limit
    let mortgageErc = (currentMortgageAmount / currentMortgageTerm) * 0.1;
    this.setState({
      mortgageTerm: desiredTerm,
      monthlyOverPayment: newGoal.monthlyOverPayment,
      interestSaving: newGoal.totalSavings,
      loading: false,
      ercLimitCrossed: newGoal.monthlyOverPayment > mortgageErc,
    });
  };

  componentWillUnmount() {
    this.navFocusListener.remove();
  }
  /**
   * Function called upon slider being changed
   * @param newValue : number : updated value of slider
   */
  onSlide = (newTerm: number) => {
    this.goalUpdate(newTerm);
  };

  /**
   * Function to be called on setGoal button press
   */
  handleSetGoal = async () => {
    const {
      setUserGoal,
      getUserInfoResponse,
      getUserMortgageDataResponse,
      getUserGoalResponse,
      updateUserGoal,
      navigation,
    } = this.props;
    //Adding new Goal
    if (
      !(
        getUserGoalResponse.response.data[0] &&
        getUserGoalResponse.response.data[0].new_mortgage_term
      )
    ) {
      const payload = {
        user_id: String(_get(getUserInfoResponse, DB_KEYS.DATA_ID, null)),
        mortgage_id: String(
          _get(getUserMortgageDataResponse, DB_KEYS.DATA_OF_ZERO_ID, null),
        ),
        monthly_overpayment_amount: this.state.monthlyOverPayment,
        old_mortgage_term: _get(
          getUserMortgageDataResponse,
          DB_KEYS.MORTGAGE_TERM,
          null,
        ),
        new_mortgage_term: this.state.mortgageTerm,
        total_interest_saved: this.state.interestSaving,
      };
      await setUserGoal(payload);
      if (!_get(this.props.setUserGoalResponse, 'error', true))
        navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
    } else {
      const body = {
        user_id: String(_get(getUserInfoResponse, DB_KEYS.DATA_ID, null)),
        monthly_overpayment_amount: this.state.monthlyOverPayment,
        new_mortgage_term: this.state.mortgageTerm,
        total_interest_saved: this.state.interestSaving,
      };
      const qParam = {
        id: _get(getUserGoalResponse, DB_KEYS.DATA_OF_ZERO_ID, null),
        user_id: String(_get(getUserInfoResponse, DB_KEYS.DATA_ID, null)),
      };
      await updateUserGoal(body, qParam);
      console.log(
        'UPDATE_GOAL',
        _get(this.props.updateUserGoalResponse, DB_KEYS.IS_FETCHING, ''),
      );
      if (!_get(this.props.updateUserGoalResponse, 'error', true))
        navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN);
    }
  };

  render() {
    const {
      getUserMortgageDataResponse,
      setUserGoalResponse,
      updateUserGoalResponse,
    } = this.props;
    const {
      mortgageTerm,
      monthlyOverPayment,
      interestSaving,
      loading,
      ercLimitCrossed,
    } = this.state;
    return (
      <View style={styles.mainContainer}>
        {loading ? (
          <LoadingModal loadingText="Loading..." />
        ) : (
          <View style={{flex: 1}}>
            <Header />
            <ScrollView contentContainerStyle={styles.middleContainer}>
              <View style={styles.mortgageStatusProgressContainer}>
                <Text style={styles.mortgageTextData}>Set Goal</Text>
                <Text style={styles.progressFractionText}>4/4</Text>
              </View>
              <Text style={styles.mainHeaderText}>
                {localeString(LOCALE_STRING.SET_GOAL_SCREEN.HOW_QUICKLY)}
              </Text>
              <View style={styles.targetTextContainer}>
                <Text style={styles.setTargetText}>
                  {localeString(LOCALE_STRING.SET_GOAL_SCREEN.SET_TARGET)}
                </Text>
                <Text style={styles.currentYearText}>{mortgageTerm}</Text>
              </View>
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLeftText}>{SLIDER_START_VALUE}</Text>
                <Slider
                  style={styles.sliderInternalStyles}
                  minimumValue={SLIDER_START_VALUE}
                  maximumValue={_get(
                    getUserMortgageDataResponse,
                    'response.data[0].mortgage_term',
                    null,
                  )}
                  step={SLIDER_STEP}
                  value={mortgageTerm}
                  onValueChange={newValue => this.onSlide(newValue)}
                  thumbTintColor={COLOR.SLIDER_COLOR}
                  minimumTrackTintColor={COLOR.BLACK}
                  maximumTrackTintColor={COLOR.BLACK}
                />
                <Text style={styles.sliderLeftText}>
                  {_get(
                    getUserMortgageDataResponse,
                    'response.data[0].mortgage_term',
                    null,
                  )}
                </Text>
              </View>
              <TargetDetails
                monthlyOverPayment={monthlyOverPayment}
                interestSaving={interestSaving}
              />
            </ScrollView>
            <Button
              title={localeString(LOCALE_STRING.SET_GOAL_SCREEN.SET_GOAL)}
              titleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
              onPress={() => this.handleSetGoal()}
              loading={
                _get(updateUserGoalResponse, DB_KEYS.IS_FETCHING, false) ||
                _get(setUserGoalResponse, DB_KEYS.IS_FETCHING, false)
              }
            />
          </View>
        )}
        {ercLimitCrossed && (
          <View style={styles.ercLimitContainer}>
            <ErcWarning />
          </View>
        )}
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserMortgageDataResponse: state.getUserMortgageData,
  getUserInfoResponse: state.getUserInfo,
  getUserGoalResponse: state.getUserGoal,
  updateUserGoalResponse: state.updateUserGoal,
  setUserGoalResponse: state.setUserGoal,
});

const bindActions = dispatch => ({
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
  setUserGoal: payload => dispatch(setUserGoal.fetchCall(payload)),
  getUserGoal: (payload, extraPayload) =>
    dispatch(getUserGoal.fetchCall(payload, extraPayload)),
  updateUserGoal: (payload, extraPayload) =>
    dispatch(updateUserGoal.fetchCall(payload, extraPayload)),
});

export const SetGoal = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSetGoal);
