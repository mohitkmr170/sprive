import React from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import LinearGradient from 'react-native-linear-gradient';
import {Svg, Circle, Line} from 'react-native-svg';
import {getOutstandingMortgageBalance} from '../../store/reducers';
import {styles} from './styles';
import {chatIcon, homeOwnership, iPadLocks} from '../../assets';
import {GeneralStatusBar, Header} from '../../components';
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
}
interface state {}

export class UnconnectedHomeOwnerShip extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  componentDidMount = async () => {
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
    /*
    NOTES : To be Integrated with actual API(Mocked for now)
    */
    const {getOutstandingMortgageBalance, getUserInfoResponse} = this.props;
    const qParam = {
      [PAYLOAD_KEYS.USER_ID]: _get(getUserInfoResponse, DB_KEYS.USER_ID, null),
    };
    await getOutstandingMortgageBalance({}, qParam);
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
    const {
      getUserInfoResponse,
      getUserMortgageDataResponse,
      getOutstandingMortgageBalanceResponse,
    } = this.props;
    const currentLtv = _get(getUserMortgageDataResponse, DB_KEYS.LTV, 0);
    /*
    NOTES : data[0] to be changed later
    */
    const houseOwned = 100 - (currentLtv ? currentLtv : 0);
    const homeValuation = _get(
      getUserMortgageDataResponse,
      DB_KEYS.HOME_VALUATION,
      0,
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
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.HOME_OWNERSHIP.HOME_OWNERSHIP)}
          rightIconPresent
          iconName={chatIcon}
          iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
          navigation={this.props.navigation}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.nonHeaderContainer}>
          <ScrollView contentContainerStyle={styles.scrollableMainContainer}>
            <View style={styles.innerMainContainer}>
              <View style={styles.startPointDot} />
              <AnimatedCircularProgress
                size={
                  STYLE_CONSTANTS.device.SCREEN_WIDTH -
                  2 * STYLE_CONSTANTS.margin.HUMONGOUS
                }
                width={STYLE_CONSTANTS.margin.LARGISH} //Width of stroke
                fill={houseOwned} //Progress percent to be filled
                tintColor={COLOR.CARIBBEAN_GREEN}
                backgroundWidth={STYLE_CONSTANTS.margin.SMALLEST / 2}
                rotation={0} //Starting point of progress
                dashedBackground={{width: 10, gap: 12}}
                backgroundColor={COLOR.CARIBBEAN_GREEN_ONE_THIRD}
                renderCap={({center}) => (
                  <Circle
                    cx={center.x}
                    cy={center.y}
                    r={STYLE_CONSTANTS.margin.SMALL}
                    fill={COLOR.CARIBBEAN_GREEN}
                  />
                )}
                lineCap="butt">
                {() => <Image source={homeOwnership} />}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.ownedPercentageContainer} />
              <Svg height="80" width="80" style={styles.svgLineStyle}>
                <Line
                  /*
                  NOTES : Plotting values
                  */
                  x1="0"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke={COLOR.VOILET_ONE_THIRD}
                  strokeDasharray="8, 8"
                  strokeWidth="2"
                />
              </Svg>
              <Text
                style={[
                  styles.percentageText,
                  {paddingLeft: STYLE_CONSTANTS.padding.SMALL},
                ]}>
                {houseOwned}%
              </Text>
              <Svg height="80" width="80">
                <Line
                  /*
                  NOTES : Plotting values
                  */
                  x1="16"
                  y1="40"
                  x2="80"
                  y2="40"
                  stroke={COLOR.VOILET_ONE_THIRD}
                  strokeDasharray="8, 8"
                  strokeWidth="2"
                />
              </Svg>
              <Text style={styles.dateText}>
                {/* This is Mock data, to be changed later */}
                Jun 27’
              </Text>
            </View>
            <Text style={styles.myHouseText}>
              {localeString(LOCALE_STRING.HOME_OWNERSHIP.OF_MY_HOUSE)}
            </Text>
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
                {localeString(LOCALE_STRING.HOME_OWNERSHIP.UNLOCK_PERCENTAGE, {
                  percent: currentLtv - (currentLtv % 5), //To check previous factor of 5
                })}
              </Text>
            </View>
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
          {!Object.keys(_get(getUserInfoResponse, DB_KEYS.ADDRESS_RESPONSE, {}))
            .length && (
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
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getPendingTaskResponse: state.getPendingTask,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getOutstandingMortgageBalanceResponse: state.getOutstandingMortgageBalance,
});

const bindActions = dispatch => ({
  getOutstandingMortgageBalance: (payload, extraPayload) =>
    dispatch(getOutstandingMortgageBalance.fetchCall(payload, extraPayload)),
});
export const HomeOwnerShip = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedHomeOwnerShip);
