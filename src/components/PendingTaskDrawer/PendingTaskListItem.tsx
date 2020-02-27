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
  getFromattedPercentText = () => {
    let currentProgressPercentage =
      _get(this.props.item, DB_KEYS.PENDING_TASK.COMPLETION_PERCENTAGE, 0) +
      '%';
    return currentProgressPercentage;
  };
  handleStageNavigation = (routeName: string, taskAndStageId: object) => {
    setTimeout(
      () => this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_PROFILE),
      SWIPE_DOWN_ANIMATION_DELAY,
    );
  };
  getTargetNavigation = () => {
    const taskStageList: [] = _get(
      this.props.item,
      DB_KEYS.PENDING_TASK.TASK_STAGES,
      [],
    )[0];
    let taskAndStageId = {
      taskId: _get(this.props.item, DB_KEYS.PENDING_TASK.TASK_ID, null),
      stageId: _get(taskStageList, DB_KEYS.PENDING_TASK.ID, null),
    };
    if (
      taskStageList &&
      _get(this.props.item, DB_KEYS.PENDING_TASK.TASK_ID, null) ===
        TASK_IDS.TASK_ONE
    ) {
      switch (_get(taskAndStageId, DB_KEYS.PENDING_TASK.STAGE_ID, null)) {
        case STAGE_IDS.STAGE_ONE:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_PROFILE,
            taskAndStageId,
          );
          break;
        case STAGE_IDS.STAGE_TWO:
          this.handleStageNavigation(
            NAVIGATION_SCREEN_NAME.USER_ADDRESS,
            taskAndStageId,
          );
          break;
        default:
          showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
      }
    } else showSnackBar({}, APP_CONSTANTS.GENERAL_ERROR);
  };
  render() {
    const pendingTaskCompletionPercentage = _get(
      this.props.item,
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
              {_get(this.props.item, DB_KEYS.PENDING_TASK.TASK_NAME, '')}
            </Text>
            <Text style={styles.taskCompletionTime}>
              {_get(this.props.item, DB_KEYS.PENDING_TASK.TIME_TO_COMPLETE, '')}
            </Text>
          </View>
          <Progress.Circle
            size={STYLE_CONSTANTS.margin.HUGE}
            progress={
              _get(
                this.props.item,
                DB_KEYS.PENDING_TASK.COMPLETION_PERCENTAGE,
                0,
              ) / 100
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
