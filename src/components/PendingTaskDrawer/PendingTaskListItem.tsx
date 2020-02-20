import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {get as _get} from 'lodash';
import {COLOR, STYLE_CONSTANTS} from '../../utils';
import {styles} from './styles';

interface props {
  item: object;
}
interface state {}

export class PendingTaskListItem extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  getFromattedPercentText = () => {
    let currentProgressPercentage =
      _get(this.props.item, 'completePercetage', 0) * 100 + '%';
    return currentProgressPercentage;
  };
  render() {
    return (
      <TouchableOpacity
        style={[
          styles.pendingListItemContainer,
          {
            backgroundColor: _get(
              this.props.item,
              'defaultColorCode',
              COLOR.LIGHTER_GRAY,
            ),
          },
        ]}>
        <View style={styles.pendingListItemMainContainer}>
          <View>
            <Text style={styles.taskName}>
              {_get(this.props.item, 'pendingTaskName', '')}
            </Text>
            <Text style={styles.taskCompletionTime}>
              {_get(this.props.item, 'timeToComplete', '')}
            </Text>
          </View>
          <Progress.Circle
            size={STYLE_CONSTANTS.margin.HUGE}
            progress={_get(this.props.item, 'completePercetage', 0)}
            color={_get(
              this.props.item,
              'defaultColorCode',
              COLOR.LIGHTER_GRAY,
            )}
            unfilledColor={COLOR.LIGHTER_GRAY}
            borderWidth={0}
            showsText
            formatText={() => this.getFromattedPercentText()}
            textStyle={styles.progressText}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
