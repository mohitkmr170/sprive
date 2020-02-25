import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Progress from 'react-native-progress';
import {get as _get} from 'lodash';
import {
  localeString,
  COLOR,
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
} from '../../utils';
import {PendingTaskListItem} from './PendingTaskListItem';
import {styles} from './styles';

interface props {
  navigation: object;
}
interface state {
  isModalVisible: boolean;
}

const GESTURE_CONFIGS = {
  VEOLCITY_THRESHOLD: 0.3,
  DIRECTIONAL_OFFSET_THRESHOLD: 80,
};

/**
 * Sample pending task list data
 */

const pendingTaskResponse = {
  isFetching: false,
  response: {
    status: true,
    message: '',
    data: {
      overall_progress_percentage: 12,
      tasks: [
        {
          id: 3,
          task_id: 1,
          task_name: 'User profile',
          status: false,
          completion_percentage: 10,
          time_to_complete: '5 Min',
          task_stages: [
            {
              id: 1,
              name: 'About you',
            },
            {
              id: 2,
              name: 'Address',
            },
          ],
        },
      ],
    },
    meta: {
      total: 1,
      limit: 10,
      skip: 0,
    },
  },
  error: false,
};

export class PendingTaskDrawer extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  componentDidMount() {}
  onSwipeUp = () => {
    this.setState({isModalVisible: true});
  };
  onSwipeDown = () => {
    this.setState({isModalVisible: false});
  };
  getFromattedPercentText = (completionPercentage: number) => {
    return completionPercentage + '%';
  };
  render() {
    const {navigation} = this.props;
    const config = {
      velocityThreshold: GESTURE_CONFIGS.VEOLCITY_THRESHOLD,
      directionalOffsetThreshold: GESTURE_CONFIGS.DIRECTIONAL_OFFSET_THRESHOLD,
    };
    const overallCompletionPercentage = _get(
      pendingTaskResponse,
      DB_KEYS.PENDING_TASK.OVERALL_PROGRESS_PERCENTAGE,
      0,
    );
    return (
      <GestureRecognizer
        onSwipeUp={this.onSwipeUp}
        onSwipeDown={this.onSwipeDown}
        hitSlop={APP_CONSTANTS.HIT_SLOP}
        config={config}>
        <View style={styles.floatingButtonContainer}>
          <TouchableOpacity onPress={() => this.onSwipeUp()}>
            <View style={styles.innerHorizontalView}>
              <Text style={styles.completeYourProfileText}>
                {localeString(LOCALE_STRING.PENDING_TASK.COMPLETE_YOUR_PROFILE)}
              </Text>
              <Progress.Circle
                size={STYLE_CONSTANTS.margin.HUGE}
                progress={overallCompletionPercentage / 100} //Percentage
                color={COLOR.LIGHT_TEXT_GREEN}
                unfilledColor={COLOR.LIGHT_TEXT_GREEN_MILD_OPACITY}
                borderWidth={0}
                showsText
                formatText={() =>
                  this.getFromattedPercentText(overallCompletionPercentage)
                }
                textStyle={styles.progressText}
              />
            </View>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isModalVisible}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            swipeDirection="up"
            deviceHeight={
              STYLE_CONSTANTS.device.SCREEN_HEIGHT -
              STYLE_CONSTANTS.margin.HUGISH * 3
            }
            onBackdropPress={() => this.onSwipeDown()}
            style={styles.modalContainer}>
            <View style={styles.pendingTaskContainer}>
              <View style={styles.innerControllerContainer}>
                <View style={styles.innerControllerView} />
              </View>
              <Text style={styles.yourPendingTaskText}>
                {localeString(LOCALE_STRING.PENDING_TASK.YOUR_PENDING_TASK)}
              </Text>
              <Text style={styles.completionDescText}>
                {localeString(
                  LOCALE_STRING.PENDING_TASK.COMPLETION_DESCRIPTION,
                )}
              </Text>
              <View style={styles.progressContainer}>
                <View style={styles.pendingTaskNameContainer}>
                  <Text style={styles.innerProgressText}>
                    {localeString(LOCALE_STRING.PENDING_TASK.PROGRESS)}
                  </Text>
                  <Text style={styles.percentCompleteText}>
                    {localeString(
                      LOCALE_STRING.PENDING_TASK.PERCENTAGE_COMPLETE,
                      {
                        percent: overallCompletionPercentage,
                      },
                    )}
                  </Text>
                </View>
                <Progress.Bar
                  progress={overallCompletionPercentage / 100}
                  color={COLOR.LIGHT_TEXT_GREEN}
                  height={STYLE_CONSTANTS.margin.SMALLER}
                  width={null}
                  unfilledColor={COLOR.LIGHT_TEXT_GREEN_LEAST_OPACITY}
                  borderWidth={0}
                />
              </View>
              <View style={styles.pendingTaskCard}>
                {_get(pendingTaskResponse, DB_KEYS.PENDING_TASK.TASKS, [])
                  .length &&
                  _get(pendingTaskResponse, DB_KEYS.PENDING_TASK.TASKS, []).map(
                    item => {
                      return (
                        <PendingTaskListItem
                          item={item}
                          navigation={navigation}
                          onSwipeDown={this.onSwipeDown}
                        />
                      );
                    },
                  )}
              </View>
            </View>
          </Modal>
        </View>
      </GestureRecognizer>
    );
  }
}
