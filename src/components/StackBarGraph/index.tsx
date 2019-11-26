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
import {
  APP_CONSTANTS,
  STYLE_CONSTANTS,
  ICON_NAME,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
import {get as _get} from 'lodash';
import {getGraphData, getUserMortgageData} from '../../store/reducers';
import Icons from 'react-native-vector-icons/Feather';
import {localeString} from '../../utils/i18n';
import {COLOR} from '../../utils/colors';
import {graphData} from './helpers';
import {ToolTip} from './toolTip';

const FIXED_PAYMENT = 'Fixed Payment';
const OVER_PAYMENT = 'Overpayment';
const TARGET_MET = 'Target Met';
//Number of data to be shown along x-axis(bar count)
const GRAPH_OFFSET = 6;

const COLORS = [COLOR.DARK_BLUE, COLOR.DARK_YELLOW];
const KEYS = ['emi', 'overPayment'];
interface props {
  getGraphData: (payload: object, extraPayload: object) => void;
  getUserMortgageData: (payload: object, extraPayload: object) => void;
  getGraphDataResponse: object;
  getUserInfoResponse: object;
  getUserMortgageDataResponse: object;
  currentMonthTarget: any;
}

interface state {
  currentScrollIndex: number;
  isLeftButtonActive: boolean;
  isRightButtonActive: boolean;
  showInfoToolTip: boolean;
  monthOfset: number;
  graphData: object;
  currentTarget: object;
  loading: boolean;
  activeGraphIndex: number;
}
const currentMonthIndex = new Date().getMonth();
const currentMonth = APP_CONSTANTS.MONTH_NAMES[currentMonthIndex];
const actualCurrentMonthIndex = currentMonthIndex + 1;

export class UnconnectedStackBarGraph extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentScrollIndex: 0,
      isLeftButtonActive: false,
      isRightButtonActive: true,
      showInfoToolTip: false,
      monthOfset: 4,
      graphData: [],
      currentTarget: {},
      loading: true,
      activeGraphIndex: -1,
    };
  }

  componentDidMount = async () => {
    const {getUserInfoResponse, getUserMortgageData} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      user_id: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const {getUserMortgageDataResponse} = this.props;
    let currentGraphData = graphData;
    for (let i = 0; i < graphData.length; i++) {
      currentGraphData[i].monthly_target = _get(
        getUserMortgageDataResponse,
        DB_KEYS.MORTGAGE_PAYMENT,
        null,
      );
      currentGraphData[i].emi.svg.onPress = () => this.onStackBarPress(i);
    }
    graphData[actualCurrentMonthIndex - GRAPH_OFFSET].emi.value = _get(
      getUserMortgageDataResponse,
      DB_KEYS.MORTGAGE_PAYMENT,
      null,
    );
    if (currentMonth > String(GRAPH_OFFSET))
      this.setState({currentScrollIndex: 1, graphData: currentGraphData});
    let dateRange = this.getDataRange(0);
    this.getNewGraphData(dateRange[0], dateRange[1]);
  };
  /**
   * Function that will return date range (4 months before current and 1 month after current Month)
   */
  getDataRange = (monthFactor: number) => {
    let currentDate = new Date();
    return [
      currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() - this.state.monthOfset + monthFactor + 1) +
        '-' +
        '01',
      currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() -
          this.state.monthOfset +
          monthFactor +
          GRAPH_OFFSET) +
        '-' +
        '30',
    ];
  };

  onStackBarPress = (graphIndex: number) => {
    const {graphData} = this.state;
    let toolTipObj = {
      monthly_mortgage: graphData[graphIndex].emi.value,
      overPayment: graphData[graphIndex].overPayment.value,
      monthlyTarget: graphData[graphIndex].monthly_target,
      svgColor: graphData[graphIndex].emi.svg.fill,
    };
    this.setState({
      showInfoToolTip: true,
      currentTarget: toolTipObj,
      activeGraphIndex: graphIndex,
    });
  };

  async getNewGraphData(fromDate: string, toDate: string) {
    const {getUserInfoResponse, getUserMortgageData, getGraphData} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      user_id: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    let currentGraphData = this.state.graphData;
    const qParam = {
      user_id: userId,
      graph_data: true,
      from_date: fromDate,
      to_date: toDate,
    };
    await getGraphData({}, qParam);
    const {getGraphDataResponse} = this.props;
    const graphDataArray = _get(
      getGraphDataResponse,
      DB_KEYS.RESPONSE_DATA,
      '',
    );
    for (let i = 0; i < graphDataArray.length; i++) {
      let currentGraphIndex = graphDataArray[i].month - GRAPH_OFFSET - 1;
      currentGraphData[currentGraphIndex].emi.value =
        graphDataArray[i].mortgage_amount;
      currentGraphData[currentGraphIndex].emi.svg.fill = COLORS[0];
      currentGraphData[currentGraphIndex].overPayment.value =
        graphDataArray[i].overpayment;
      currentGraphData[currentGraphIndex].overPayment.svg.onPress = () =>
        this.onStackBarPress(currentGraphIndex);
      currentGraphData[currentGraphIndex].status = graphDataArray[i].status;
      currentGraphData[currentGraphIndex].monthly_target =
        graphDataArray[i].monthly_target;
      if (graphDataArray[i].overpayment === graphDataArray[i].monthly_target)
        currentGraphData[currentGraphIndex].overPayment.svg.fill =
          COLOR.SLIDER_COLOR;
      if (graphDataArray[i].month === actualCurrentMonthIndex) {
        currentGraphData[
          currentGraphIndex + 1
        ].monthly_target = this.props.currentMonthTarget;
      }
      if (i === graphDataArray.length - 1)
        this.setState({loading: false, graphData: currentGraphData});
    }
  }

  /**
   * This function is to decrement currentScrollIndex by 1 upon left click
   */

  handleGraphLeftSwipe = () => {
    /*
    TODO : To be changed
    */
    const {getGraphDataResponse} = this.props;
    if (!_get(getGraphDataResponse, DB_KEYS.RESPONSE_DATA, '').length) {
      let dateRange = this.getDataRange(-6);
      this.getNewGraphData(dateRange[0], dateRange[1]);
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
    const {getGraphDataResponse} = this.props;
    if (!_get(getGraphDataResponse, DB_KEYS.RESPONSE_DATA, '').length) {
      let dateRange = this.getDataRange(0);
      this.getNewGraphData(dateRange[0], dateRange[1]);
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
      activeGraphIndex: -1,
    });
  };

  render() {
    let currMonthName = APP_CONSTANTS.MONTH_NAMES.slice(
      this.state.currentScrollIndex * GRAPH_OFFSET,
      GRAPH_OFFSET * (this.state.currentScrollIndex + 1),
    );
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
              {currMonthName.map((item, index) => {
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
                  <Text style={styles.numberOfMonthText}>
                    3{' '}
                    <Text style={styles.monthsText}>
                      {localeString(LOCALE_STRING.GRAPH_COMPONENT.MONTHS)}
                    </Text>
                  </Text>
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
                  <Text style={styles.projectSavingText}>£175</Text>
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
