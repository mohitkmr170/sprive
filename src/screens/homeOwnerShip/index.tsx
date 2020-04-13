import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {Button} from 'react-native-elements';
import {reset} from '../../navigation/navigationService';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {
  getOutstandingMortgageBalance,
  getUserMortgageData,
} from '../../store/reducers';
import {styles} from './styles';
import {chatIcon, iPadLocks} from '../../assets';
import Moment from 'moment';
import {
  GeneralStatusBar,
  Header,
  AnimatedCircularProgressBar,
  LoadingModal,
} from '../../components';
import {
  getNumberWithCommas,
  localeString,
  showSnackBar,
  APP_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  STYLE_CONSTANTS,
  COLOR,
  DB_KEYS,
  STAGE_NAME_INDEX,
  TASK_IDS,
  STAGE_IDS,
  PAYLOAD_KEYS,
  NUMERIC_FACTORS,
  STATE_PARAMS,
} from '../../utils';

const BLOCK_GRADIENT = [COLOR.WHITE, COLOR.PRIMARY_THIRD_PART];
interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  getUserInfoResponse: object;
  getPendingTaskResponse: object;
  getUserMortgageDataResponse: object;
  getOutstandingMortgageBalance: (
    payload: object,
    extraPayload: object,
  ) => void;
  getOutstandingMortgageBalanceResponse: object;
  getProjectedDataResponse: object;
  taskHandlerResponse: object;
  updateUserProfileResponse: object;
  updateUserAddressResponse: object;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
}
interface state {
  loading: boolean;
}

export class UnconnectedHomeOwnerShip extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  componentDidMount = async () => {
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
    /*
    NOTES : To be Integrated with actual API(Mocked for now)
    */
    const {
      getOutstandingMortgageBalance,
      getUserInfoResponse,
      getUserMortgageData,
    } = this.props;
    const qParam = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
    };
    await getOutstandingMortgageBalance({}, qParam);
    if (_get(this.props, STATE_PARAMS.NAV_PARAMS, null)) {
      const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
      const qParamsInfo = {
        [PAYLOAD_KEYS.USER_ID]: userId,
      };
      await getUserMortgageData({}, qParamsInfo);
    }
    this.setState({loading: false});
  };

  handleDonePressed = () => {
    const {
      taskHandlerResponse,
      updateUserProfileResponse,
      updateUserAddressResponse,
    } = this.props;
    reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR, {
      isUserDataChanged:
        _get(taskHandlerResponse, DB_KEYS.RESPONSE, null) ||
        _get(updateUserProfileResponse, DB_KEYS.RESPONSE, null) ||
        _get(updateUserAddressResponse, DB_KEYS.RESPONSE, null)
          ? true
          : false,
    });
  };

  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  handleStageNavigation = (routeName: string, taskAndStageId: object) => {
    this.props.navigation.navigate(routeName, taskAndStageId);
  };
  getTargetNavigation = (item: object) => {
    const taskStageObj: [] = _get(
      item,
      DB_KEYS.PENDING_TASK.TASK_STAGES,
      [],
    )[0]; //Taking the first pending taks
    let taskAndStageId = {
      taskId: _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null),
      stageId: _get(taskStageObj, DB_KEYS.PENDING_TASK.ID, null),
    };
    if (
      taskStageObj &&
      _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) === TASK_IDS.TASK_ONE
    ) {
      switch (_get(taskAndStageId, DB_KEYS.PENDING_TASK.STAGE_ID, null)) {
        case STAGE_IDS.STAGE_ONE:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_PROFILE,
            taskAndStageId,
          );
          break;
        case STAGE_IDS.STAGE_TWO:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_ADDRESS,
            taskAndStageId,
          );
          break;
        default:
          showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
      }
    } else showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
  };
  hanldeCompleteYourProfileClick = () => {
    /*
    TODO : Need to check where to route based on stage-completion of `user-profile` task
    */
    const {getPendingTaskResponse} = this.props;
    let found = _get(
      getPendingTaskResponse,
      DB_KEYS.PENDING_TASK.TASKS,
      [],
    ).find(
      (item: object) =>
        _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) ===
        STAGE_NAME_INDEX.USER_PROFILE,
    );
    _get(getPendingTaskResponse, DB_KEYS.PENDING_TASK.IS_PENDING_TASK, false) &&
    found
      ? this.getTargetNavigation(found)
      : null;
  };

  render() {
    const isLastRouteProfile = _get(this.props, STATE_PARAMS.NAV_PARAMS, null)
      ? true
      : false;
    const {
      getUserInfoResponse,
      getUserMortgageDataResponse,
      getOutstandingMortgageBalanceResponse,
      getProjectedDataResponse,
    } = this.props;
    const currentLtv = Math.round(
      _get(getUserMortgageDataResponse, DB_KEYS.LTV, 0),
    );
    /*
    NOTES : data[0] to be changed later
    */
    const houseOwned =
      NUMERIC_FACTORS.PERCENT_FACTOR - (currentLtv ? currentLtv : 0);
    const homeValuation = Math.round(
      _get(getUserMortgageDataResponse, DB_KEYS.HOME_VALUATION, 0),
    );
    /*
    NOTES : getOutstandingMortgageBalanceResponse API needs to be verified once deployed in Geeky-Dev
    */
    const amountOwned = homeValuation
      ? homeValuation -
        Math.round(
          _get(
            getOutstandingMortgageBalanceResponse,
            DB_KEYS.OUTSTANDING_MORTGAGE_BALANCE,
            0,
          ),
        )
      : 0;
    let mortgageCreatedYear = Moment(
      _get(getUserMortgageDataResponse, DB_KEYS.CREATED_AT, null),
    ).year();
    const targetMonth =
      APP_CONSTANTS.MONTH_NAMES[
        _get(
          getProjectedDataResponse,
          DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_MONTHS,
          null,
        ) - 1
      ];
    let targetYear =
      mortgageCreatedYear +
      _get(
        getProjectedDataResponse,
        DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_YEARS,
        null,
      );
    targetYear = targetYear % NUMERIC_FACTORS.PERCENT_FACTOR;
    if (this.state.loading) {
      return <LoadingModal loadingText="Loading..." />;
    } else
      return (
        <View style={styles.mainContainer}>
          <GeneralStatusBar />
          <Header
            leftIconPresent={isLastRouteProfile ? false : true}
            title={
              isLastRouteProfile
                ? localeString(LOCALE_STRING.HOME_OWNERSHIP.MY_HOME)
                : localeString(LOCALE_STRING.HOME_OWNERSHIP.HOME_OWNERSHIP)
            }
            rightIconPresent
            iconName={chatIcon}
            iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
            navigation={this.props.navigation}
            onBackPress={() => this.handleBackPress()}
          />
          <View style={styles.nonHeaderContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollableMainContainer}
              showsVerticalScrollIndicator={false}>
              <AnimatedCircularProgressBar
                houseOwned={houseOwned}
                getUserMortgageDataResponse={getUserMortgageDataResponse}
                targetMonth={targetMonth}
                targetYear={targetYear}
              />
              {isLastRouteProfile ? null : (
                <View style={styles.loadToValueContainer}>
                  <Text style={styles.loanToValueText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.LOAN_TO_VALUE)}
                  </Text>
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarInnerContainer}>
                      <Progress.Bar
                        progress={currentLtv / 100}
                        color={COLOR.DARK_YELLOW}
                        height={STYLE_CONSTANTS.margin.SMALLISH}
                        width={null}
                        unfilledColor={COLOR.LIGHTEST_YELLOW}
                        borderWidth={0}
                      />
                    </View>
                    <Text style={styles.ltvPercentageText}>{currentLtv}%</Text>
                  </View>
                  <Text style={styles.unlockCheaperDealsText}>
                    {localeString(
                      LOCALE_STRING.HOME_OWNERSHIP.UNLOCK_PERCENTAGE,
                      {
                        percent: currentLtv - (currentLtv % 5), //To check previous factor of 5
                      },
                    )}
                  </Text>
                </View>
              )}
              <View style={styles.amountContainer}>
                <View style={styles.amountOwnerContainer}>
                  <Text style={styles.amountOwnedText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.AMOUNT_OWNED)}
                  </Text>
                  <Text style={styles.amountText}>
                    £{getNumberWithCommas(amountOwned)}
                  </Text>
                </View>
                <View style={styles.estimatedValueContainer}>
                  <Text style={styles.amountOwnedText}>
                    {localeString(LOCALE_STRING.HOME_OWNERSHIP.ESTIMATED_VALUE)}
                  </Text>
                  <Text style={styles.amountText}>
                    £{getNumberWithCommas(homeValuation)}
                  </Text>
                </View>
              </View>
            </ScrollView>
            {!Object.keys(
              _get(getUserInfoResponse, DB_KEYS.ADDRESS_RESPONSE, {}),
            ).length && (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.hanldeCompleteYourProfileClick()}
                style={styles.blockedViewContainer}>
                <LinearGradient
                  colors={BLOCK_GRADIENT}
                  style={styles.blockedInnerContainer}>
                  <Image source={iPadLocks} style={{opacity: 1}} />
                  <Text style={styles.completeYourProfileText}>
                    {localeString(
                      LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS
                        .COMPLETE_YOUR_PROFILE,
                    )}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            {isLastRouteProfile ? (
              <Button
                title={localeString(LOCALE_STRING.GLOBAL.OKAY)}
                titleStyle={styles.buttonTextStyle}
                onPress={() => this.handleDonePressed()}
                buttonStyle={styles.buttonStyle}
              />
            ) : null}
          </View>
        </View>
      );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getPendingTaskResponse: state.getPendingTask,
  getProjectedDataResponse: state.getProjectedData,
  getUserMortgageDataResponse: state.getUserMortgageData,
  taskHandlerResponse: state.taskHandler,
  updateUserProfileResponse: state.updateUserProfile,
  updateUserAddressResponse: state.updateUserAddress,
  getOutstandingMortgageBalanceResponse: state.getOutstandingMortgageBalance,
});

const bindActions = dispatch => ({
  getOutstandingMortgageBalance: (payload, extraPayload) =>
    dispatch(getOutstandingMortgageBalance.fetchCall(payload, extraPayload)),
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
});
export const HomeOwnerShip = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedHomeOwnerShip);
