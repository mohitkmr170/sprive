import React from 'react';
import {View, Text, Image} from 'react-native';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Moment from 'moment';
import {
  localeString,
  STYLE_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  COLOR,
  APP_CONSTANTS,
} from '../../utils';
import {styles} from './styles';
import {iPointer} from '../../assets';

const MAX_LIMIT_FACTOR = 0.8;
const MIN_LIMIT_FACTOR = 0.2;
const WIDTH_STYLE_FACTOR = 5;

interface props {
  getUserMortgageDataResponse: object;
  getProjectedDataResponse: object;
  getUserGoalResponse: object;
}

interface state {
  targetYearPosition: number;
  projectedYearPosition: number;
  endYear: number;
  targetYear: number;
  projectedYear: number;
}

export class UnconnectedTargetStepIndicator extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      targetYearPosition: 0,
      projectedYearPosition: 0,
      endYear: 0,
      targetYear: 0,
      projectedYear: 0,
    };
  }

  componentDidMount() {
    const {
      getUserMortgageDataResponse,
      getProjectedDataResponse,
      getUserGoalResponse,
    } = this.props;
    let mortgageCreatedYear = Moment(
      _get(getUserMortgageDataResponse, DB_KEYS.CREATED_AT, null),
    ).year();
    let mortgageTerm = _get(
      getUserMortgageDataResponse,
      DB_KEYS.MORTGAGE_TERM,
      null,
    );
    console.log(
      'componentDidMount : mortgageCreatedYear, mortgageTerm => ',
      mortgageCreatedYear,
      mortgageTerm,
    );
    // This represents the Initial point of time-line representation
    let startYear = new Date().getFullYear();
    /*
    NOTES : It's the current time left to be mortgage free, if user pays more than expected, projected < target else projected > target, fetched from getProjectedData
    */
    let targetYear =
      mortgageCreatedYear +
      _get(getUserGoalResponse, DB_KEYS.NEW_MORTGAGE_TERM, null);
    /*
    NOTES : It's the latest year set by the user after setting goal(which is between today and mortgage_term), is fetched from getUserGoal API
    */
    let projectedYear =
      mortgageCreatedYear +
      _get(
        getProjectedDataResponse,
        DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_YEARS,
        null,
      );
    let endYear = mortgageCreatedYear + mortgageTerm;
    const steps = endYear - startYear;
    const stepFactor =
      (STYLE_CONSTANTS.device.SCREEN_WIDTH -
        WIDTH_STYLE_FACTOR * STYLE_CONSTANTS.margin.LARGE) /
      steps;
    const targetYearPosition = stepFactor * (targetYear - startYear);
    const projectedYearPosition = stepFactor * (projectedYear - startYear);
    this.setState({
      targetYearPosition: targetYearPosition,
      projectedYearPosition: projectedYearPosition,
      endYear: endYear,
      targetYear: targetYear,
      projectedYear: projectedYear,
    });
  }
  render() {
    const {targetYear, projectedYear, endYear} = this.state;
    const {getUserGoalResponse, getProjectedDataResponse} = this.props;
    /*
    NOTES : BE-Month renges from [1-12], hence (-1) from all BE month response
    */
    let projectedMonth =
      APP_CONSTANTS.MONTH_NAMES[
        Moment(_get(getUserGoalResponse, DB_KEYS.UPDATE_AT, null)).month() - 1
      ];
    let targetMonth =
      APP_CONSTANTS.MONTH_NAMES[
        _get(
          getProjectedDataResponse,
          DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_MONTHS,
          null,
        ) - 1
      ];
    const isTargetPositionLeft =
      (this.state.targetYearPosition - STYLE_CONSTANTS.padding.BELOW_NORMAL) /
        (STYLE_CONSTANTS.device.SCREEN_WIDTH -
          WIDTH_STYLE_FACTOR * STYLE_CONSTANTS.margin.LARGE) <
      MIN_LIMIT_FACTOR;
    const isTargetPositionRight =
      (this.state.targetYearPosition - STYLE_CONSTANTS.padding.BELOW_NORMAL) /
        (STYLE_CONSTANTS.device.SCREEN_WIDTH -
          WIDTH_STYLE_FACTOR * STYLE_CONSTANTS.margin.LARGE) >
      MAX_LIMIT_FACTOR;
    const isProjectedPositionLeft =
      this.state.projectedYearPosition /
        (STYLE_CONSTANTS.device.SCREEN_WIDTH -
          WIDTH_STYLE_FACTOR * STYLE_CONSTANTS.margin.LARGE) <
      MIN_LIMIT_FACTOR;
    const isProjectedPositionRight =
      this.state.projectedYearPosition /
        (STYLE_CONSTANTS.device.SCREEN_WIDTH -
          WIDTH_STYLE_FACTOR * STYLE_CONSTANTS.margin.LARGE) >
      MAX_LIMIT_FACTOR;
    return (
      <View style={styles.mainContainerStepIndicator}>
        <View style={styles.circularView} />
        <View style={styles.startPointContainer}>
          <Text style={styles.startDate}>
            {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TODAY)}
          </Text>
        </View>
        <View style={styles.trackStyle}>
          {/* Target */}
          {targetYear !== projectedYear && endYear !== targetYear && (
            <View
              style={[
                styles.targetContainer,
                {
                  left: this.state.targetYearPosition,
                },
              ]}>
              <Image
                source={iPointer}
                style={styles.pointerStyle}
                resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
              />
              <View style={styles.targetTooltip} />
              <View
                style={{
                  flexWrap: isTargetPositionLeft ? 'wrap' : 'nowrap',
                  right: isTargetPositionRight
                    ? STYLE_CONSTANTS.margin.LARGEST
                    : 0,
                }}>
                <View
                  style={[
                    styles.targetInnerContainer,
                    styles.targetTooltipAdd,
                  ]}>
                  <Text style={styles.targetText}>
                    {localeString(
                      LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TARGET,
                    )}
                  </Text>
                  <Text style={styles.targetDateStyle}>
                    {targetMonth + ' ' + this.state.targetYear}
                  </Text>
                </View>
              </View>
            </View>
          )}
          {/* Projected */}
          {endYear !== projectedYear && (
            <View
              style={[
                styles.projectedContainer,
                {
                  left: this.state.projectedYearPosition,
                  flexWrap: isProjectedPositionLeft ? 'wrap' : 'nowrap',
                },
              ]}>
              <View
                style={[
                  styles.projectedInnerContainer,
                  {
                    right: isProjectedPositionRight
                      ? STYLE_CONSTANTS.margin.HUMONGOUS
                      : STYLE_CONSTANTS.margin.LARGEST,
                  },
                ]}>
                <Text style={styles.targetText}>
                  {localeString(
                    LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.PROJECTED,
                  )}
                </Text>
                <Text style={styles.targetDateStyle}>
                  {projectedMonth + ' ' + this.state.projectedYear}
                </Text>
              </View>
              <Image
                source={iPointer}
                resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
                style={[{transform: [{rotate: '180deg'}]}, styles.pointerStyle]}
              />
            </View>
          )}
          {targetYear === projectedYear ||
            (endYear === projectedYear && (
              <View
                style={[
                  styles.commonPointTextContainer,
                  {
                    left:
                      this.state.projectedYearPosition -
                      (endYear !== projectedYear
                        ? STYLE_CONSTANTS.margin.NORMAL
                        : STYLE_CONSTANTS.margin.HUMONGOUS),
                  },
                ]}>
                <Text style={styles.targetText}>
                  {localeString(
                    LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.PROJECTED,
                  )}
                </Text>
                <Text
                  style={[
                    styles.targetDateStyle,
                    {textAlign: endYear !== projectedYear ? 'center' : 'right'},
                  ]}>
                  {projectedMonth + ' ' + this.state.projectedYear}
                </Text>
              </View>
            ))}
          {targetYear === projectedYear && (
            <View
              style={[
                {left: this.state.projectedYearPosition},
                styles.commonPointIconContainer,
              ]}>
              <Icon
                name="check-circle"
                size={STYLE_CONSTANTS.margin.LARGEST}
                color={COLOR.CARIBBEAN_GREEN}
              />
            </View>
          )}
          {targetYear === projectedYear && (
            <View>
              <View
                style={[
                  {
                    left:
                      this.state.projectedYearPosition +
                      STYLE_CONSTANTS.margin.SMALLER,
                  },
                  styles.onTrackTrackLine,
                ]}
              />
              <Text
                style={[
                  styles.targetDateStyle,
                  styles.onTrackText,
                  {
                    left:
                      this.state.projectedYearPosition -
                      STYLE_CONSTANTS.margin.HUMONGOUS,
                  },
                  styles.onTrackView,
                ]}>
                On track
              </Text>
            </View>
          )}
        </View>
        {endYear !== targetYear ? (
          <View style={styles.circularView} />
        ) : (
          <Icon
            name="check-circle"
            size={STYLE_CONSTANTS.margin.LARGEST}
            color={COLOR.CARIBBEAN_GREEN}
          />
        )}
        <View style={styles.endPointContainer}>
          <Text style={styles.startDate}>{this.state.endYear}</Text>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state: any) => ({
  getUserMortgageDataResponse: state.getUserMortgageData,
  getProjectedDataResponse: state.getProjectedData,
  getUserGoalResponse: state.getUserGoal,
});
const bindActions = (dispatch: any) => ({});

export const TargetStepIndicator = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedTargetStepIndicator);
