import React from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {Header, GeneralStatusBar} from '../../components';
import {styles} from './styles';
import {connect} from 'react-redux';
import {iAvatar, iUpdate} from '../../assets';
import {
  COLOR,
  DB_KEYS,
  localeString,
  showSnackBar,
  TASK_IDS,
  APP_CONSTANTS,
  STAGE_IDS,
  LOCALE_STRING,
  STAGE_NAME_INDEX,
  NAVIGATION_SCREEN_NAME,
} from '../../utils';
import {get as _get} from 'lodash';

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  getPendingTaskResponse: object;
  getUserInfoResponse: object;
}
interface state {}

export class UnconnectedProfile extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  handleStageNavigation = (routeName: string, taskAndStageId: object) => {
    this.props.navigation.navigate(routeName, taskAndStageId);
  };

  getTargetNavigation = (item: object) => {
    const taskStageList: [] = _get(
      item,
      DB_KEYS.PENDING_TASK.TASK_STAGES,
      [],
    )[0]; //Taking the first pending taks
    let taskAndStageId = {
      taskId: _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null),
      stageId: _get(taskStageList, DB_KEYS.PENDING_TASK.ID, null),
    };
    if (
      taskStageList &&
      _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) === TASK_IDS.TASK_ONE
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

  PROFILE_DATA = [
    {
      title: localeString(LOCALE_STRING.SIDE_BAR.PERSONAL_DETAILS),
      icon: iAvatar,
      action: () => {
        const {getPendingTaskResponse} = this.props;
        let found = _get(
          getPendingTaskResponse,
          DB_KEYS.PENDING_TASK.TASKS,
          [],
        ).find(
          (item: object) =>
            _get(item, DB_KEYS.PENDING_TASK.TASK_ID, null) ===
            STAGE_NAME_INDEX.USER_PROFILE,
        );
        _get(
          getPendingTaskResponse,
          DB_KEYS.PENDING_TASK.IS_PENDING_TASK,
          false,
        ) && found
          ? this.getTargetNavigation(found)
          : this.props.navigation.navigate(
              NAVIGATION_SCREEN_NAME.USER_PROFILE_VIEW_MODE,
            );
      },
      isDisabled: false,
    },
    {
      title: localeString(LOCALE_STRING.UPDATE_MORTGAGE.MORTGAGE_INFO),
      icon: iUpdate,
      action: () => {
        this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.UPDATE_MORTGAGE);
      },
      isDisabled: false,
    },
  ];

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <GeneralStatusBar />
          <Header
            leftIconPresent
            title={localeString(LOCALE_STRING.SIDE_BAR.USER_PROFILE)}
            rightIconPresent
            onBackPress={() => this.props.navigation.goBack()}
          />
          <View style={styles.centerContainer}>
            <View style={styles.topViewContainer}>
              <Text style={styles.titleText}>
                {localeString(LOCALE_STRING.SIDE_BAR.PROFILE_SUB_LIST)}
              </Text>
            </View>
            <View style={styles.listContainer}>
              {this.PROFILE_DATA.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={styles.listItemContainer}
                    onPress={item.action}>
                    <Text style={styles.listItemText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getPendingTaskResponse: state.getPendingTask,
});

const bindActions = dispatch => ({});

export const Profile = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedProfile);
