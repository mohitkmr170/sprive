import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import {get as _get} from 'lodash';
import {
  getPendingTaskColorCode,
  COLOR,
  STYLE_CONSTANTS,
  NAVIGATION_SCREEN_NAME,
  showSnackBar,
  APP_CONSTANTS,
  STAGE_IDS,
  TASK_IDS,
  DB_KEYS,
  NUMERIC_FACTORS,
  localeString,
  LOCALE_STRING,
} from '../../utils';
import {styles} from './styles';

const SWIPE_DOWN_ANIMATION_DELAY = 200;
interface props {
  item: object;
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  onSwipeDown: () => void;
}
interface state {}

export class PendingTaskListItem extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount : pendingTaskResponse =>', this.props.item);
  }

  /**
   * Function to get formatted percentage to be displayed
   */
  getFromattedPercentText = () => {
    let currentProgressPercentage =
      _get(this.props.item, DB_KEYS.PENDING_TASK.COMPLETION_PERCENTAGE, 0) +
      '%';
    return currentProgressPercentage;
  };

  /**
   * Decision function to set target_navigation
   * @param routeName : string : Target screen for navigation
   * @param taskAndStageId : object : Object with task_id & stage_id as navigation_params
   */
  handleStageNavigation = (routeName: string, taskAndStageId: object) => {
    setTimeout(
      () => this.props.navigation.navigate(routeName, taskAndStageId),
      SWIPE_DOWN_ANIMATION_DELAY,
    );
  };

  /**
   * Function to select particular stage based on stage_id
   * @param taskAndStageId : object : Object with task_id & stage_id as navigation_params
   */
  handleStageSelection = (taskAndStageId: object) => {
    this.handleStageNavigation(
      NAVIGATION_SCREEN_NAME.USER_PROFILE,
      taskAndStageId,
    );
  };

  /**
   * Function to select particular task based on task_id
   * @param taskAndStageId : object : Object with task_id & stage_id as navigation_params
   */
  handleTaskSelection = (taskAndStageId: object) => {
    switch (_get(taskAndStageId, DB_KEYS.PENDING_TASK.STAGE_ID, null)) {
      case STAGE_IDS.STAGE_ONE:
        this.handleStageSelection(taskAndStageId);
        break;
      case STAGE_IDS.STAGE_TWO:
        this.handleStageSelection(taskAndStageId);
        break;
      default:
        //Default case for Stage related errors
        showSnackBar({}, localeString(LOCALE_STRING.PENDING_TASK.STAGE_ISSUE));
    }
  };

  /**
   * Root function for navigation decision based on Task and Stage
   */
  getTargetNavigation = () => {
    const {item} = this.props;
    const taskStageObj = _get(item, DB_KEYS.PENDING_TASK.TASK_STAGES, [])[0]; //Taking the first stage of this pending taks
    let taskAndStageId = {
      taskId: _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null),
      stageId: _get(taskStageObj, DB_KEYS.PENDING_TASK.ID, null), //This is Stage ID(as it is Fetched as `id` from API)
    };
    if (Object.keys(taskStageObj).length) {
      switch (_get(taskAndStageId, 'taskId', null)) {
        case TASK_IDS.TASK_ONE:
          this.handleTaskSelection(taskAndStageId);
          break;
        default:
          //Default case for Task related errors
          showSnackBar({}, localeString(LOCALE_STRING.PENDING_TASK.TASK_ISSUE));
      }
    }
  };

  render() {
    const {item} = this.props;
    const pendingTaskCompletionPercentage = _get(
      item,
      DB_KEYS.PENDING_TASK.COMPLETION_PERCENTAGE,
      0,
    );
    return (
      <TouchableOpacity
        style={[
          styles.pendingListItemContainer,
          {
            backgroundColor: getPendingTaskColorCode(
              pendingTaskCompletionPercentage,
            ),
          },
        ]}
        onPress={() => this.getTargetNavigation()}
        onPressIn={this.props.onSwipeDown}>
        <View style={styles.pendingListItemMainContainer}>
          <View>
            <Text style={styles.taskName}>
              {_get(item, [DB_KEYS.PENDING_TASK.TASK_NAME], '')}
            </Text>
            <Text style={styles.taskCompletionTime}>
              {_get(item, DB_KEYS.PENDING_TASK.TIME_TO_COMPLETE, '')}
            </Text>
          </View>
          <Progress.Circle
            size={STYLE_CONSTANTS.margin.HUGE}
            progress={
              _get(item, DB_KEYS.PENDING_TASK.COMPLETION_PERCENTAGE, 0) /
              NUMERIC_FACTORS.PERCENT_FACTOR
            }
            color={getPendingTaskColorCode(pendingTaskCompletionPercentage)}
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
