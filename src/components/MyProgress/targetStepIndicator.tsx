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
    let startYear = new Date().getFullYear();
    let targetYear =
      mortgageCreatedYear +
      _get(
        getProjectedDataResponse,
        DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_YEARS,
        null,
      );
    let projectedYear =
      mortgageCreatedYear +
      _get(getUserGoalResponse, DB_KEYS.NEW_MORTGAGE_TERM, null);
    let endYear = mortgageCreatedYear + mortgageTerm;
    const steps = endYear - startYear;
    const stepFactor =
      (STYLE_CONSTANTS.device.SCREEN_WIDTH - 4 * STYLE_CONSTANTS.margin.LARGE) /
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
    let projectedMonth =
      APP_CONSTANTS.MONTH_NAMES[
        Moment(_get(getUserGoalResponse, DB_KEYS.UPDATE_AT, null)).month()
      ];
    let targetMonth =
      APP_CONSTANTS.MONTH_NAMES[
        _get(
          getProjectedDataResponse,
          DB_KEYS.PROJECTED_DATA.ESTIMATED_TIME_MONTHS,
          null,
        )
      ];
    return (
      <View style={styles.mainContainerStepIndicator}>
        <View style={styles.circularView} />
        <View style={styles.startPointContainer}>
          <Text style={styles.startDate}>
            {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TODAY)}
          </Text>
        </View>
        <View style={styles.trackStyle}>
          {targetYear !== projectedYear && endYear !== projectedYear && (
            <View
              style={[
                styles.targetContainer,
                {left: this.state.targetYearPosition},
              ]}>
              <Image
                source={iPointer}
                style={styles.pointerStyle}
                resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.CONTAIN}
              />
              <View style={styles.targetInnerContainer}>
                <Text style={styles.targetText}>
                  {localeString(LOCALE_STRING.MY_PROGRESS_AND_PAYMENTS.TARGET)}
                </Text>
                <Text style={styles.targetDateStyle}>
                  {targetMonth + ' ' + this.state.targetYear}
                </Text>
              </View>
            </View>
          )}
          {endYear !== projectedYear && (
            <View
              style={[
                styles.projectedContainer,
                {left: this.state.projectedYearPosition},
              ]}>
              <View style={styles.projectedInnerContainer}>
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
            <Text
              style={[
                styles.targetDateStyle,
                styles.onTrackText,
                {
                  left:
                    this.state.projectedYearPosition -
                    STYLE_CONSTANTS.margin.NORMAL,
                },
              ]}>
              On track
            </Text>
          )}
        </View>
        {endYear !== projectedYear ? (
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
