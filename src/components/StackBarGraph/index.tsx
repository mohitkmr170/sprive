import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {StackedBarChart} from 'react-native-svg-charts';
import {styles} from './styles';
import {GraphDetails} from './graphDetails';
import {connect} from 'react-redux';
import Moment from 'moment';
import {
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  ICON_NAME,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {
  getGraphData,
  getUserMortgageData,
  getProjectedData,
} from '../../store/reducers';
import Icons from 'react-native-vector-icons/Feather';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';
import {graphData} from './helpers';
import {ToolTip} from './toolTip';
import {PAYLOAD_KEYS} from '../../utils/payloadKeys';

const FIXED_PAYMENT = 'Fixed Payment';
const OVER_PAYMENT = 'Overpayment';
const TARGET_MET = 'Target Met';
const ACTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
};
const OVERPAYMENT = 'overpayment';
//Number of data to be shown along x-axis(bar count)
const GRAPH_OFFSET = 6;

const COLORS = [COLOR.DARK_BLUE, COLOR.DARK_YELLOW];
const KEYS = ['monthlyMortgage', 'overPayment'];
interface props {
  getGraphData: (payload: object, extraPayload: object) => void;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  getGraphDataResponse: object;
  getUserInfoResponse: object;
  getUserMortgageDataResponse: object;
  currentMonthTarget: any;
  getProjectedData: (payload: object, extraPayload: object) => void;
  getProjectedDataResponse: object;
}

interface state {
  currentScrollIndex: number;
  isLeftButtonActive: boolean;
  isRightButtonActive: boolean;
  showInfoToolTip: boolean;
  monthOfset: number;
  graphData: object;
  month: object;
  currentTarget: object;
  loading: boolean;
  activeGraphIndex: number;
}
const currentMonthIndex = new Date().getMonth();
const currentMonth = APP_CONSTANTS.MONTH_NAMES[currentMonthIndex];
const actualCurrentMonthIndex = currentMonthIndex + 1;
let dateRange = {
  firstDate: '',
  lastDate: '',
};

export class UnconnectedStackBarGraph extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScrollIndex: 0,
      isLeftButtonActive: false,
      isRightButtonActive: true,
      showInfoToolTip: true,
      monthOfset: 4,
      graphData: [],
      month: [],
      currentTarget: {},
      loading: true,
      activeGraphIndex:
        currentMonthIndex > 6
          ? currentMonthIndex - GRAPH_OFFSET
          : currentMonthIndex,
    };
  }

  componentDidMount = async () => {
    const {getUserInfoResponse, getUserMortgageData} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    let currentGraphData = [];
    currentGraphData = graphData;
    /*
    TODO : Loop to be removed, after merging
    */
    for (let i = 0; i < graphData.length; i++) {
      currentGraphData[i].monthlyMortgage.svg.onPress = () =>
        this.onStackBarPress(i);
      if (currentGraphData.length - 1 === i) {
        this.setState(
          {
            currentScrollIndex: 1,
            graphData: currentGraphData,
          },
          () => {
            this.getDataRange();
            this.getNewGraphData();
          },
        );
      }
    }
  };
  /**
   * Function that will return date range (4 months before current and 1 month after current Month)
   */
  getDataRange = (action?: string) => {
    let currentDate = Moment(new Date());
    let firstDate = '';
    let lastDate = '';
    if (action === 'right') {
      firstDate = Moment(dateRange.lastDate)
        .add(1, 'month')
        .startOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
      lastDate = Moment(firstDate)
        .add(5, 'months')
        .endOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
    } else if (action === 'left') {
      lastDate = Moment(dateRange.firstDate)
        .subtract(1, 'month')
        .endOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
      firstDate = Moment(lastDate)
        .subtract(5, 'months')
        .startOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
    } else {
      firstDate = Moment(currentDate)
        .subtract(4, 'months')
        .startOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
      lastDate = Moment(currentDate)
        .add(1, 'month')
        .endOf('month')
        .format(APP_CONSTANTS.DATE_FORMAT);
    }
    dateRange.firstDate = firstDate;
    dateRange.lastDate = lastDate;
  };

  onStackBarPress = (graphIndex: number) => {
    const {graphData} = this.state;
    let toolTipObj = {
      monthly_mortgage: graphData[graphIndex].monthlyMortgage.value,
      overPayment: graphData[graphIndex].overPayment.value,
      monthlyTarget: graphData[graphIndex].mortgage_amount,
      svgColor: graphData[graphIndex].monthlyMortgage.svg.fill,
    };
    this.setState({
      showInfoToolTip: true,
      currentTarget: toolTipObj,
      activeGraphIndex: graphIndex,
    });
  };

  getNewGraphData = async () => {
    const {getUserInfoResponse, getUserMortgageData, getGraphData} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      [PAYLOAD_KEYS.USER_ID]: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    let currentGraphData: any = this.state.graphData;
    let currentMonthArray: any = [];
    const qParam = {
      [PAYLOAD_KEYS.USER_ID]: userId,
      [PAYLOAD_KEYS.GRAPH.GRAPH_DATA]: true,
      [PAYLOAD_KEYS.GRAPH.FROM_DATE]: new Date(
        dateRange.firstDate,
      ).toISOString(),
      [PAYLOAD_KEYS.GRAPH.TO_DATE]: new Date(dateRange.lastDate).toISOString(),
    };
    await getGraphData({}, qParam);
    const {getGraphDataResponse, getUserMortgageDataResponse} = this.props;
    const graphDataArray = _get(
      getGraphDataResponse,
      DB_KEYS.RESPONSE_DATA,
      '',
    );
    Object.keys(graphDataArray).map((itemYear, indexYear) => {
      let currentKey = itemYear;
      let currentgraphDataArray = graphDataArray[currentKey];
      Object.keys(currentgraphDataArray).map((item, index) => {
        currentMonthArray.push(APP_CONSTANTS.MONTH_NAMES[Number(item) - 1]);
        currentGraphData[index].monthlyMortgage.value =
          currentgraphDataArray[item].mortgage_amount;
        currentGraphData[index].monthlyMortgage.svg.fill = COLORS[0];
        currentGraphData[index].overPayment.value = Number(
          currentgraphDataArray[item].overpayment,
        );
        currentGraphData[index].overPayment.svg.onPress = () =>
          this.onStackBarPress(index);
        currentGraphData[index].monthlyMortgage.svg.onPress = () =>
          this.onStackBarPress(index);
        currentGraphData[index].status = currentgraphDataArray[item].status;
        currentGraphData[index].mortgage_amount =
          currentgraphDataArray[item].mortgage_amount;
        if (
          currentgraphDataArray[item].overpayment ===
          currentgraphDataArray[item].monthly_target
        )
          currentGraphData[index].overPayment.svg.fill = COLOR.SLIDER_COLOR;
        if (index === Object.keys(currentgraphDataArray).length - 1) {
          if (currentgraphDataArray[item].month === actualCurrentMonthIndex + 1)
            currentGraphData[index].monthlyMortgage.svg.fill = COLOR.STEEL_GRAY;
          currentGraphData[index].monthlyMortgage.value = _get(
            getUserMortgageDataResponse,
            DB_KEYS.MORTGAGE_PAYMENT,
            null,
          );
          this.onStackBarPress(this.state.activeGraphIndex);
          this.setState({
            loading: false,
            graphData: currentGraphData,
            month: currentMonthArray,
          });
        }
      });
    });
  };

  /**
   * This function is to decrement currentScrollIndex by 1 upon left click
   */

  handleGraphLeftSwipe = () => {
    /*
    TODO : To be changed
    */
    this.getDataRange(ACTIONS.LEFT);
    this.getNewGraphData();
    const {getGraphDataResponse} = this.props;
    if (
      _get(getGraphDataResponse, DB_KEYS.RESPONSE_DATA, {}).hasOwnProperty(
        OVERPAYMENT,
      )
    ) {
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex - 1,
        isRightButtonActive: !this.state.isRightButtonActive,
        isLeftButtonActive: !this.state.isLeftButtonActive,
      });
    }
  };

  /**
   * This function is to Increment currentScrollIndex by 1 upon right click
   */

  handleGraphRightSwipe = () => {
    /*
    TODO : To be changed
    */
    this.getDataRange(ACTIONS.RIGHT);
    this.getNewGraphData();
    const {getGraphDataResponse} = this.props;
    if (
      _get(getGraphDataResponse, DB_KEYS.RESPONSE_DATA, {}).hasOwnProperty(
        OVERPAYMENT,
      )
    ) {
      this.setState({
        currentScrollIndex: this.state.currentScrollIndex + 1,
        isRightButtonActive: !this.state.isRightButtonActive,
        isLeftButtonActive: !this.state.isLeftButtonActive,
      });
    }
  };

  hideBarInfo = () => {
    this.setState({
      showInfoToolTip: false,
      activeGraphIndex: -1, //To disable toolTip
    });
  };

  render() {
    const {getProjectedDataResponse} = this.props;
    return (
      <TouchableWithoutFeedback
        style={styles.mainTopContainer}
        onPress={() => this.hideBarInfo()}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            disabled={this.state.isLeftButtonActive}
            onPress={() => this.handleGraphLeftSwipe()}
            style={styles.leftSwipeButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Icons
              name={ICON_NAME.LEFT_ICON}
              size={STYLE_CONSTANTS.margin.LARGER}
              color={
                this.state.isLeftButtonActive ? COLOR.LIGHT_GRAY : COLOR.BLACK
              }
            />
          </TouchableOpacity>
          <View style={styles.mainStackbarContainer}>
            {this.state.loading ? (
              <ActivityIndicator size={APP_CONSTANTS.LOADER_SIZE.SMALL} />
            ) : (
              <View>
                {this.state.showInfoToolTip && (
                  <ToolTip info={this.state.currentTarget} />
                )}
                <StackedBarChart
                  style={styles.barChart}
                  keys={KEYS}
                  colors={COLORS}
                  data={this.state.graphData}
                  showGrid={false}
                  contentInset={styles.graphInnerSpacing}
                  animate={true}
                  animationDuration={200}
                  spacingInner={0.7}
                  valueAccessor={({item, key}) => item[key].value}
                />
              </View>
            )}
            <View style={styles.monthView}>
              {this.state.month.map((item, index) => {
                return (
                  <View
                    style={{
                      borderBottomColor: COLOR.VOILET,
                      borderBottomWidth:
                        this.state.activeGraphIndex === index ? 1 : 0,
                    }}>
                    <Text
                      style={[
                        styles.monthText,
                        {
                          color:
                            this.state.activeGraphIndex === index
                              ? COLOR.VOILET
                              : COLOR.STEEL_GRAY,
                          fontWeight:
                            this.state.activeGraphIndex === index
                              ? STYLE_CONSTANTS.font.WEIGHT.BOLD
                              : STYLE_CONSTANTS.font.WEIGHT.NORMAL,
                        },
                      ]}
                      key={index}>
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
            <View style={styles.graphDetails}>
              <GraphDetails title={FIXED_PAYMENT} color={COLOR.DARK_BLUE} />
              <GraphDetails title={OVER_PAYMENT} color={COLOR.DARK_YELLOW} />
              <GraphDetails title={TARGET_MET} color={COLOR.SLIDER_COLOR} />
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.bottomLeftContainer}>
                <View>
                  <Text style={styles.projectedTimeText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.PROJECTED_TIME)}
                  </Text>
                  <Text style={styles.projectedTimeText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.SAVING)}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.numberOfMonthText}>
                      {_get(
                        getProjectedDataResponse,
                        DB_KEYS.PROJECTED_DATA.PROJECTED_TIME_YEARS,
                        '',
                      )}{' '}
                      <Text style={styles.monthsText}>
                        {localeString(LOCALE_STRING.GRAPH_COMPONENT.YEARS)}{' '}
                      </Text>
                    </Text>
                    <Text style={styles.numberOfMonthText}>
                      {_get(
                        getProjectedDataResponse,
                        DB_KEYS.PROJECTED_DATA.PROJECTED_TIME_MONTHS,
                        '',
                      )}{' '}
                      <Text style={styles.monthsText}>
                        {localeString(LOCALE_STRING.GRAPH_COMPONENT.MONTHS)}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.bottomRightContainer}>
                <View>
                  <Text style={styles.projectedInterestText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.PROJECTED_INT)}
                  </Text>
                  <Text style={styles.savingText}>
                    {localeString(LOCALE_STRING.GRAPH_COMPONENT.SAVING)}
                  </Text>
                  <Text style={styles.projectSavingText}>
                    £{' '}
                    {Math.round(
                      _get(
                        getProjectedDataResponse,
                        DB_KEYS.PROJECTED_DATA.INTEREST_SAVING,
                        0,
                      ),
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            disabled={this.state.isRightButtonActive}
            onPress={() => this.handleGraphRightSwipe()}
            style={styles.rightButton}
            hitSlop={APP_CONSTANTS.HIT_SLOP}>
            <Icons
              name={ICON_NAME.RIGHT_ICON}
              size={STYLE_CONSTANTS.margin.LARGER}
              color={
                this.state.isRightButtonActive ? COLOR.LIGHT_GRAY : COLOR.BLACK
              }
            />
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getGraphDataResponse: state.getGraphData,
  getUserMortgageDataResponse: state.getUserMortgageData,
  getProjectedDataResponse: state.getProjectedData,
});

const bindActions = dispatch => ({
  getGraphData: (payload, extraPayload) =>
    dispatch(getGraphData.fetchCall(payload, extraPayload)),
  getUserMortgageData: (payload, extraPayload) =>
    dispatch(getUserMortgageData.fetchCall(payload, extraPayload)),
});

export const StackBarGraph = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedStackBarGraph);
