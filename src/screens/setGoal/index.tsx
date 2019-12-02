import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {Header, LoadingModal, GeneralStatusBar} from '../../components';
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
  APP_CONSTANTS,
} from '../../utils/constants';
import {COLOR} from '../../utils/colors';
import {calculateGoal} from '../../utils/calculator-scripts';
import {ErcWarning} from './ercWarning';
import {TargetDetails} from './targetDetails';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

const SLIDER_START_VALUE = 1;
const SLIDER_STEP = 1;
const ERC_FACTOR = 0.1;
interface NavigationParams {
  isUserDataChanged: boolean;
}

interface props {
  navigation: {
    navigate: (routeName: string, params?: NavigationParams) => void;
    state: {params?: {isUserDataChanged: boolean}};
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

  setToInitialState = () => {
    this.setState({
      mortgageTerm: 0,
      monthlyOverPayment: 0,
      interestSaving: 0,
      loading: true,
      ercLimit: 0,
      ercLimitCrossed: false,
    });
  };

  componentDidMount = async () => {
    // console.log('SetGoal:: componentDidMount:: REACHED');
    this.handleInitialMount();
    this.navFocusListener = this.props.navigation.addListener(
      APP_CONSTANTS.LISTENER.DID_FOCUS,
      async () => {
        // console.log('SetGoal:: componentDidMount:: DID_FOCUS:: REACHED');
        this.setToInitialState();
        this.handleInitialMount();
      },
    );
  };

  handleInitialMount = async () => {
    const {getUserMortgageData, getUserInfoResponse, getUserGoal} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const qParams = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserGoal({}, qParams);
    const {getUserGoalResponse, getUserMortgageDataResponse} = this.props;
    //To update previously set goal
    if (_get(getUserGoalResponse, DB_KEYS.NEW_MORTGAGE_TERM, false)) {
      // UPDATE MODE

      const currentMortgageAmount = _get(
        getUserMortgageDataResponse,
        DB_KEYS.MORTGAGE_BALANCE,
        null,
      );

      const oldMortgageTerm = _get(
        getUserMortgageDataResponse,
        DB_KEYS.MORTGAGE_TERM,
        null,
      );

      const currentMonthlyMortgageAmount = _get(
        getUserMortgageDataResponse,
        DB_KEYS.MORTGAGE_PAYMENT,
        null,
      );

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

      let mortgageErc = (currentMortgageAmount / oldMortgageTerm) * ERC_FACTOR;
      let desiredTerm: Number;
      let newGoal;
      // const desiredTerm = !monthlyOverPayment && mortgageTerm===APP_CONSTANTS.MIN_GOAL_VALUE ? Math.ceil(oldMortgageTerm / 2) : mortgageTerm;

      //INTERNAL GOAL RESET CASE
      if (
        !monthlyOverPayment &&
        mortgageTerm === APP_CONSTANTS.MIN_GOAL_VALUE
      ) {
        desiredTerm = Math.ceil(oldMortgageTerm / 2);
        newGoal = calculateGoal(
          currentMortgageAmount,
          currentMonthlyMortgageAmount,
          oldMortgageTerm,
          desiredTerm,
        );
        this.setState(
          {
            mortgageTerm: desiredTerm,
            monthlyOverPayment: newGoal.monthlyOverPayment,
            interestSaving: newGoal.totalSavings,
            loading: false,
            ercLimitCrossed: newGoal.monthlyOverPayment > mortgageErc,
          } /*, ()=>{
            console.log('SetGoal:: handleInitialMount:: INTERNAL GOAL RESET CASE:: CHECK:: STATE -->', {...this.state});
            console.log('SetGoal:: handleInitialMount:: INTERNAL GOAL RESET CASE:: CHECK:: mortgageErc -->', mortgageErc);
        }*/,
        );
      } else {
        //NORMAL UPDATE CASE
        desiredTerm = mortgageTerm;
        this.setState(
          {
            mortgageTerm: desiredTerm,
            monthlyOverPayment: monthlyOverPayment,
            interestSaving: totalInterest,
            loading: false,
            ercLimitCrossed: monthlyOverPayment > mortgageErc,
          } /*, ()=>{
            console.log('SetGoal:: handleInitialMount:: NORMAL UPDATE CASE:: CHECK:: STATE -->', {...this.state});
            console.log('SetGoal:: handleInitialMount:: NORMAL UPDATE CASE:: CHECK:: mortgageErc -->', mortgageErc);
        }*/,
        );
      }

      // console.log('****************** INITIAL CHECK *****************');
      // console.log('SetGoal:: handleInitialMount:: CHECK:: currentMortgageAmount -->', currentMortgageAmount);
      // console.log('SetGoal:: handleInitialMount:: CHECK:: oldMortgageTerm -->', oldMortgageTerm);
      // console.log('SetGoal:: handleInitialMount:: CHECK:: ERC_FACTOR -->', ERC_FACTOR);
      // console.log('SetGoal:: handleInitialMount:: CHECK:: desiredTerm -->', desiredTerm);
      // console.log('******************************************');
    } else {
      //To add new goal with Mortgage data
      // ADD MODE
      this.goalUpdate();
    }
  };

  /**
   * Function to update user Goal values
   * @param newTerm : number : New Mortgage term
   */
  goalUpdate = async (newTerm?: number) => {
    // console.log('goalUpdate:: newTerm -->', newTerm)
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
    desiredTerm = newTerm ? newTerm : Math.ceil(currentMortgageTerm / 2);
    // console.log('goalUpdate:: desiredTerm -->', desiredTerm)
    // }
    //calculating using calculatorJS
    let newGoal = calculateGoal(
      currentMortgageAmount,
      currentMonthlyMortgageAmount,
      currentMortgageTerm,
      desiredTerm,
    );
    //Calculating ERC Limit
    let mortgageErc =
      (currentMortgageAmount / currentMortgageTerm) * ERC_FACTOR;

    // console.log('****************** UPDATE CHECK *****************');
    // console.log('SetGoal:: handleInitialMount:: CHECK:: currentMortgageAmount -->', currentMortgageAmount);
    // console.log('SetGoal:: handleInitialMount:: CHECK:: currentMortgageTerm -->', currentMortgageTerm);
    // console.log('SetGoal:: handleInitialMount:: CHECK:: ERC_FACTOR -->', ERC_FACTOR);
    // console.log('SetGoal:: handleInitialMount:: CHECK:: mortgageErc -->', mortgageErc);
    // console.log('******************************************');

    // console.log('SetGoal:: goalUpdate:: CHECK:: mortgageErc -->', mortgageErc);
    // console.log('SetGoal:: goalUpdate:: CHECK:: STATE  B4-->', {...this.state});
    this.setState(
      {
        mortgageTerm: desiredTerm,
        monthlyOverPayment: newGoal.monthlyOverPayment,
        interestSaving: newGoal.totalSavings,
        loading: false,
        ercLimitCrossed: newGoal.monthlyOverPayment > mortgageErc,
      } /*, ()=>{
      console.log('SetGoal:: goalUpdate:: CHECK:: STATE AFTER -->', {...this.state});
    }*/,
    );
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
    if (
      !(
        getUserGoalResponse.response.data[0] &&
        getUserGoalResponse.response.data[0].new_mortgage_term
      )
    ) {
      const payload = {
        [PAYLOAD_KEYS.USER_ID]: String(
          _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
        ),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MORTGAGE_ID]: String(
          _get(getUserMortgageDataResponse, DB_KEYS.DATA_OF_ZERO_ID, null),
        ),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MONTHLY_OVERPAYMENT_AMOUNT]: this.state
          .monthlyOverPayment,
        [PAYLOAD_KEYS.MORTGAGE_INPUT.OLD_MORTGAGE_TERM]: _get(
          getUserMortgageDataResponse,
          DB_KEYS.MORTGAGE_TERM,
          null,
        ),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.NEW_MORTGAGE_TERM]: this.state
          .mortgageTerm,
        [PAYLOAD_KEYS.INTEREST.TOTAL_INTEREST_SAVED]: this.state.interestSaving,
      };
      await setUserGoal(payload);
      if (!_get(this.props.setUserGoalResponse, DB_KEYS.ERROR, true))
        navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN, {
          isUserDataChanged: true,
        });
    } else {
      const body = {
        [PAYLOAD_KEYS.USER_ID]: String(
          _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
        ),
        [PAYLOAD_KEYS.MORTGAGE_INPUT.MONTHLY_OVERPAYMENT_AMOUNT]: this.state
          .monthlyOverPayment,
        [PAYLOAD_KEYS.MORTGAGE_INPUT.NEW_MORTGAGE_TERM]: this.state
          .mortgageTerm,
        [PAYLOAD_KEYS.INTEREST.TOTAL_INTEREST_SAVED]: this.state.interestSaving,
      };
      const qParam = {
        [PAYLOAD_KEYS.ID]: _get(
          getUserGoalResponse,
          DB_KEYS.DATA_OF_ZERO_ID,
          null,
        ),
        [PAYLOAD_KEYS.USER_ID]: String(
          _get(getUserInfoResponse, DB_KEYS.DATA_ID, null),
        ),
      };
      await updateUserGoal(body, qParam);
      if (!_get(this.props.updateUserGoalResponse, DB_KEYS.ERROR, true))
        navigation.navigate(NAVIGATION_SCREEN_NAME.DASHBOARD_SCREEN, {
          isUserDataChanged: true,
        });
    }
  };

  render() {
    const {
      getUserMortgageDataResponse,
      setUserGoalResponse,
      updateUserGoalResponse,
      getUserGoalResponse,
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
            <GeneralStatusBar />
            <Header
              leftIconPresent={false}
              rightIconPresent
              title={localeString(LOCALE_STRING.SET_GOAL_SCREEN.TITLE)}
            />
            <ScrollView contentContainerStyle={styles.middleContainer}>
              {/* <View style={styles.mortgageStatusProgressContainer}>
                <Text style={styles.mortgageTextData}>Set Goal</Text>
                <Text style={styles.progressFractionText}>4/4</Text>
              </View> */}
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
                    DB_KEYS.MORTGAGE_TERM,
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
                    DB_KEYS.MORTGAGE_TERM,
                    null,
                  )}
                </Text>
              </View>
              <TargetDetails
                monthlyOverPayment={monthlyOverPayment}
                interestSaving={interestSaving}
              />
              <Button
                title={localeString(LOCALE_STRING.SET_GOAL_SCREEN.SET_GOAL)}
                titleStyle={styles.buttonTitleStyle}
                buttonStyle={styles.buttonStyle}
                onPress={() => this.handleSetGoal()}
                disabled={
                  this.state.mortgageTerm ===
                  _get(getUserGoalResponse, DB_KEYS.NEW_MORTGAGE_TERM, null)
                }
                loading={
                  _get(updateUserGoalResponse, DB_KEYS.IS_FETCHING, false) ||
                  _get(setUserGoalResponse, DB_KEYS.IS_FETCHING, false)
                }
              />
            </ScrollView>
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
