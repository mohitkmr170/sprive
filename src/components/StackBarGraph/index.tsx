import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
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
}

// Sample test data used for graph plotting

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
let currentMonth = MONTH_NAMES[new Date().getMonth()];

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
    };
  }

  componentDidMount = async () => {
    const {getUserInfoResponse, getUserMortgageData} = this.props;
    //New logic
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    const qParamsInfo = {
      user_id: userId,
    };
    await getUserMortgageData({}, qParamsInfo);
    const {getUserMortgageDataResponse} = this.props;
    console.log(
      'componentDidMount : getUserMortgageDataResponse =>',
      getUserMortgageDataResponse,
    );
    const {getGraphData} = this.props;
    let dateRange = this.getDataRange(0);
    const qParam = {
      user_id: userId,
      graph_data: true,
      from_date: dateRange[0],
      to_date: dateRange[1],
    };
    console.log('componentDidMount =>', dateRange);
    await getGraphData({}, qParam);
    const {getGraphDataResponse} = this.props;
    console.log(
      'componentDidMount : getGraphDataResponse =>',
      getGraphDataResponse,
    );
    if (!_get(getGraphDataResponse, 'isFetching', true))
      this.setState({loading: false});
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

  onStackBarPress = () => {
    this.setState({showInfoToolTip: true});
  };
  async getNewGraphData(fromDate: string, toDate: string) {
    console.log(
      'getNewGraphData : dateRange : fromDate, toDate =>',
      fromDate,
      toDate,
    );
  }

  //Mock data for graph

  /**
   * This function is to decrement currentScrollIndex by 1 upon left click
   */

  handleGraphLeftSwipe = () => {
    const {getGraphData} = this.props;
    //monthOfset to be decreased by 6
    // if (this.state.currentScrollIndex)
    //new Logic
    // if (_get(getGraphData, 'response.data', '').length) {
    let dateRange = this.getDataRange(-6);
    this.getNewGraphData(dateRange[0], dateRange[1]);
    this.setState({
      currentScrollIndex: this.state.currentScrollIndex - 1,
      isRightButtonActive: !this.state.isRightButtonActive,
      isLeftButtonActive: !this.state.isLeftButtonActive,
    });
    // }
  };

  /**
   * This function is to Increment currentScrollIndex by 1 upon right click
   */

  handleGraphRightSwipe = () => {
    //monthOfset to be increased by 6
    // if (this.state.currentScrollIndex < MONTH_NAMES.length / GRAPH_OFFSET - 1)
    //new Logic
    let dateRange = this.getDataRange(0);
    this.getNewGraphData(dateRange[0], dateRange[1]);
    this.setState({
      currentScrollIndex: this.state.currentScrollIndex + 1,
      isRightButtonActive: !this.state.isRightButtonActive,
      isLeftButtonActive: !this.state.isLeftButtonActive,
    });
  };

  hideBarInfo = () => {
    this.setState({showInfoToolTip: false});
  };

  render() {
    //Calculating current graph and month data to be rendered out of all available data
    //This will be replaced with actual 6 data we get upon API call
    //This will be decide as per same API call with response `month` to string using monthArray
    let currMonthName = MONTH_NAMES.slice(
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
              <ActivityIndicator size="small" />
            ) : (
              <View>
                {this.state.showInfoToolTip && <ToolTip />}
                <StackedBarChart
                  style={styles.barChart}
                  /*
                TODO : Keys and Colors will change as per the payment status, it will then become a single bar graph
                */
                  keys={KEYS}
                  colors={COLORS}
                  data={this.state.graphData}
                  showGrid={false}
                  contentInset={styles.graphInnerSpacing}
                  animate={true}
                  animationDuration="200"
                  spacingInner={0.7}
                  valueAccessor={({item, key}) => item[key].value}
                />
              </View>
            )}
            {/* )} */}
            <View style={styles.monthView}>
              {currMonthName.map((item, index) => {
                return (
                  <Text
                    style={[
                      styles.monthText,
                      {
                        color:
                          this.state.graphData.length &&
                          this.state.graphData[index].status
                            ? COLOR.SLIDER_COLOR
                            : COLOR.STEEL_GRAY,
                        // textDecorationLine:
                        //   currentMonth === item && 'underline',
                      },
                    ]}
                    key={index}>
                    {item}
                  </Text>
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
                  <Text style={styles.projectSavingText}>£ 175</Text>
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
