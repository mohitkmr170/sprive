import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {styles} from './styles';
import {
  localeString,
  getNumberWithCommas,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils';

interface props {
  getProjectedDataResponse: object;
}

interface state {}

export class UnconnectedProjectedDataContainer extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    const {getProjectedDataResponse} = this.props;
    const interestSaving = Math.round(
      _get(getProjectedDataResponse, DB_KEYS.PROJECTED_DATA.INTEREST_SAVING, 0),
    );
    const interestSavingWithCommas = getNumberWithCommas(interestSaving);
    const projectedMonths = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.PROJECTED_TIME_MONTHS,
      '',
    );
    const projectedYears = _get(
      getProjectedDataResponse,
      DB_KEYS.PROJECTED_DATA.PROJECTED_TIME_YEARS,
      '',
    );
    return (
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
              {projectedYears ? (
                <Text style={styles.numberOfMonthText}>
                  {projectedYears}{' '}
                  <Text style={styles.monthsText}>
                    {projectedYears === 1
                      ? localeString(LOCALE_STRING.GRAPH_COMPONENT.YEAR)
                      : localeString(LOCALE_STRING.GRAPH_COMPONENT.YEARS)}{' '}
                  </Text>
                </Text>
              ) : null}
              {projectedMonths ? (
                <Text style={styles.numberOfMonthText}>
                  {projectedMonths}{' '}
                  <Text style={styles.monthsText}>
                    {projectedMonths === 1
                      ? localeString(LOCALE_STRING.GRAPH_COMPONENT.MONTH)
                      : localeString(LOCALE_STRING.GRAPH_COMPONENT.MONTHS)}
                  </Text>
                </Text>
              ) : null}
              {!projectedYears && !projectedMonths ? (
                <Text style={[styles.numberOfMonthText, styles.emptyText]}>
                  -
                </Text>
              ) : null}
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
            {interestSavingWithCommas ? (
              <Text style={styles.projectSavingText}>
                £{interestSavingWithCommas}
              </Text>
            ) : (
              <Text style={[styles.projectSavingText, styles.emptyText]}>
                -
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getProjectedDataResponse: state.getProjectedData,
});

const bindActions = () => ({});

export const ProjectedDataContainer = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedProjectedDataContainer);
