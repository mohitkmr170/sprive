import React from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Modal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import * as Animatable from 'react-native-animatable';
import GestureRecognizer from 'react-native-swipe-gestures';
import {get as _get} from 'lodash';
import {connect} from 'react-redux';
import {
  localeString,
  COLOR,
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCALE_STRING,
  DB_KEYS,
  NUMERIC_FACTORS,
  ANIMATION_CONSTANTS,
} from '../../utils';
import {PendingTaskListItem} from './PendingTaskListItem';
import {styles} from './styles';

interface props {
  navigation: object;
  getPendingTaskResponse: object;
}
interface state {
  isModalVisible: boolean;
}

const GESTURE_CONFIGS = {
  VEOLCITY_THRESHOLD: 0.3,
  DIRECTIONAL_OFFSET_THRESHOLD: 80,
};

export class UnconnectedPendingTaskDrawer extends React.Component<
  props,
  state
> {
  constructor(props: props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }

  componentDidMount() {}

  /**
   * Function to handle swipe_up Gesture
   */
  onSwipeUp = () => {
    this.setState({isModalVisible: true});
  };

  /**
   * Function to handle swipe_down Gesture
   */
  onSwipeDown = () => {
    this.setState({isModalVisible: false});
  };

  /**
   * Function to get formatted percentage to be displayed
   */
  getFromattedPercentText = (completionPercentage: number) => {
    return completionPercentage + '%';
  };

  render() {
    const {navigation, getPendingTaskResponse} = this.props;

    const config = {
      velocityThreshold: GESTURE_CONFIGS.VEOLCITY_THRESHOLD,
      directionalOffsetThreshold: GESTURE_CONFIGS.DIRECTIONAL_OFFSET_THRESHOLD,
    };
    const overallCompletionPercentage = _get(
      getPendingTaskResponse,
      DB_KEYS.PENDING_TASK.OVERALL_PROGRESS_PERCENTAGE,
      0,
    );
    const taskList = _get(
      getPendingTaskResponse,
      DB_KEYS.PENDING_TASK.TASKS,
      [],
    );
    return (
      <Animatable.View
        animation="slideInUp"
        style={styles.floatingButtonContainer}>
        <GestureRecognizer
          style={styles.floatingButtonContainer}
          onSwipeUp={this.onSwipeUp}
          onSwipeDown={this.onSwipeDown}
          hitSlop={APP_CONSTANTS.HIT_SLOP}
          config={config}>
          <View style={styles.floatingButtonContainer}>
            <TouchableOpacity onPress={() => this.onSwipeUp()}>
              <View style={styles.innerHorizontalView}>
                <Text style={styles.completeYourProfileText}>
                  {localeString(
                    LOCALE_STRING.PENDING_TASK.COMPLETE_YOUR_PROFILE,
                  )}
                </Text>
                <Progress.Circle
                  size={STYLE_CONSTANTS.margin.HUGE}
                  progress={
                    overallCompletionPercentage / NUMERIC_FACTORS.PERCENT_FACTOR
                  }
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
              animationInTiming={ANIMATION_CONSTANTS.TIMING.NORMAL}
              animationOut="slideOutDown"
              animationOutTiming={ANIMATION_CONSTANTS.TIMING.NORMAL}
              swipeDirection="up"
              deviceHeight={STYLE_CONSTANTS.device.SCREEN_HEIGHT / 1.2} //For layover
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
                    progress={
                      overallCompletionPercentage /
                      NUMERIC_FACTORS.PERCENT_FACTOR
                    }
                    color={COLOR.LIGHT_TEXT_GREEN}
                    height={STYLE_CONSTANTS.margin.SMALLER}
                    width={null}
                    unfilledColor={COLOR.LIGHT_TEXT_GREEN_LEAST_OPACITY}
                    borderWidth={0}
                  />
                </View>
                <View style={styles.pendingTaskCard}>
                  {taskList.length &&
                    taskList.map(item => {
                      return (
                        <PendingTaskListItem
                          item={item}
                          navigation={navigation}
                          onSwipeDown={this.onSwipeDown}
                        />
                      );
                    })}
                </View>
              </View>
            </Modal>
          </View>
        </GestureRecognizer>
      </Animatable.View>
    );
  }
}
const mapStateToProps = state => ({
  getPendingTaskResponse: state.getPendingTask,
});

const bindActions = dispatch => ({});

export const PendingTaskDrawer = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedPendingTaskDrawer);
