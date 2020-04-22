import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import {Header, GeneralStatusBar, LoadingModal} from '../../components';
import {cross} from '../../assets';
import {styles} from './styles';
import {connect} from 'react-redux';
import {paymentReminder} from '../../../src/store/actions/actions';
import {COLOR, localeString, LOCALE_STRING} from '../../utils';
import {get as _get} from 'lodash';

/*
NOTES : This is dummy data for UI design, to be removed after BE integration
*/
const NOTIFICATION_LIST = [
  {
    title: 'Save £21.42 towards your mortgage for you',
    type: 'Reminder',
    color: '#17C1A4',
  },
  {
    title: '10 steps to financial independence',
    type: 'Sprive Academy',
    color: '#FFB436',
    url: 'https://www.sprive.com/terms/',
  },
  {
    title: 'Unable to process your payment, please try again',
    type: 'Error',
    color: '#FE7475',
  },
];

interface props {
  navigation: {
    navigate: (routeName: string, navigationParam?: object) => void;
    goBack: () => void;
  };
  getUserInfoResponse: object;
  paymentReminder: () => void;
}
interface state {
  notificationList: any;
  loading: boolean;
}

export class UnconnectedNotifications extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      notificationList: [],
      loading: true,
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({notificationList: NOTIFICATION_LIST, loading: false});
    }, 1000);
  };

  handleClearAll = () => {
    this.setState({
      notificationList: [],
    });
  };

  handleClear = (index: number) => {
    let currentNotificationList = this.state.notificationList;
    currentNotificationList.splice(index, 1);
    this.setState({notificationList: currentNotificationList});
  };

  handleNotification = async item => {
    if (item.item.url) {
      Linking.openURL(item.item.url);
    } else {
      await this.props.paymentReminder();
    }
  };

  renderNotifications = (item: object) => {
    return (
      <TouchableOpacity
        onPress={() => this.handleNotification(item)}
        style={[
          {backgroundColor: item.item.color},
          styles.notificationContainer,
        ]}>
        <View style={styles.middleContainer}>
          <View style={styles.textContainer}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={styles.titleText}>
              {item.item.title}
            </Text>
            <Text style={styles.typeText}>{item.item.type}</Text>
          </View>
          <TouchableOpacity
            style={styles.clearIconContainer}
            onPress={() => this.handleClear(item.index)}>
            <Image source={cross} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {notificationList, loading} = this.state;
    if (loading) return <LoadingModal loadingText="Loading..." />;
    else
      return (
        <View style={styles.mainContainer}>
          <View style={styles.mainContainer}>
            <GeneralStatusBar />
            <Header
              leftIconPresent
              title={localeString(LOCALE_STRING.NOTIFICATION.NOTIFICATION)}
              rightIconPresent
              onBackPress={() => this.props.navigation.goBack()}
            />
            {notificationList.length ? (
              <View style={styles.centerContainer}>
                <TouchableOpacity
                  style={styles.clearAllContainer}
                  onPress={() => this.handleClearAll()}>
                  <Text style={styles.dismissAllText}>
                    {localeString(LOCALE_STRING.NOTIFICATION.DISMISS_ALL)}
                  </Text>
                </TouchableOpacity>
                <View style={styles.notificationListParentContaier}>
                  {notificationList && (
                    <FlatList
                      data={notificationList}
                      extraData={this.props}
                      showsVerticalScrollIndicator={false}
                      keyExtractor={index => index.toString()}
                      renderItem={item => this.renderNotifications(item)}
                    />
                  )}
                </View>
              </View>
            ) : (
              <View style={styles.centerContainer}>
                <Text style={styles.emptyNotificationText}>
                  {localeString(LOCALE_STRING.NOTIFICATION.NO_NOTIFICATION)}
                </Text>
              </View>
            )}
          </View>
        </View>
      );
  }
}

const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
});

const bindActions = dispatch => ({
  paymentReminder: () => dispatch(paymentReminder()),
});

export const Notifications = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedNotifications);
