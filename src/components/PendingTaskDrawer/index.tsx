import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import GestureRecognizer from 'react-native-swipe-gestures';
import * as Progress from 'react-native-progress';
import {
  localeString,
  COLOR,
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {PendingTaskListItem} from './PendingTaskListItem';
import {styles} from './styles';

interface props {
  navigation: object;
}
interface state {
  pendingTaskProgress: number;
  isModalVisible: boolean;
}

const GESTURE_CONFIGS = {
  VEOLCITY_THRESHOLD: 0.3,
  DIRECTIONAL_OFFSET_THRESHOLD: 80,
};

/**
 * Sample pending task list data
 */

const pendingTasks = [
  {
    pendingTaskName: 'Complete your profile',
    timeToComplete: '5 mins',
    defaultColorCode: '#FF7474',
    completePercetage: 0.25,
    targetScreen: NAVIGATION_SCREEN_NAME.USER_PROFILE,
  },
  {
    pendingTaskName: 'Maximise your savings',
    timeToComplete: '10 mins',
    defaultColorCode: '#FF7474',
    completePercetage: 0.25,
    targetScreen: '',
  },
  {
    pendingTaskName: 'Early repayment tracking',
    timeToComplete: '10 mins',
    defaultColorCode: '#FFB400',
    completePercetage: 0.5,
    targetScreen: '',
  },
];

export class PendingTaskDrawer extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      pendingTaskProgress: 0,
      isModalVisible: false,
    };
  }
  componentDidMount() {
    this.setState({pendingTaskProgress: 0.5});
  }
  onSwipeUp = () => {
    this.setState({isModalVisible: true});
  };
  onSwipeDown = () => {
    this.setState({isModalVisible: false});
  };
  getFromattedPercentText = () => {
    let currentProgressPercentage = this.state.pendingTaskProgress * 100 + '%';
    return currentProgressPercentage;
  };
  render() {
    const {navigation} = this.props;
    const config = {
      velocityThreshold: GESTURE_CONFIGS.VEOLCITY_THRESHOLD,
      directionalOffsetThreshold: GESTURE_CONFIGS.DIRECTIONAL_OFFSET_THRESHOLD,
    };
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
                progress={0.5} //Percentage
                color={COLOR.LIGHT_TEXT_GREEN}
                unfilledColor={COLOR.LIGHT_TEXT_GREEN_MILD_OPACITY}
                borderWidth={0}
                showsText
                formatText={() => this.getFromattedPercentText()}
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
                      {percent: 50},
                    )}
                  </Text>
                </View>
                <Progress.Bar
                  progress={0.5}
                  color={COLOR.LIGHT_TEXT_GREEN}
                  height={STYLE_CONSTANTS.margin.SMALLER}
                  width={null}
                  unfilledColor={COLOR.LIGHT_TEXT_GREEN_LEAST_OPACITY}
                  borderWidth={0}
                />
              </View>
              <View style={styles.pendingTaskCard}>
                {pendingTasks &&
                  pendingTasks.map(item => {
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
    );
  }
}
