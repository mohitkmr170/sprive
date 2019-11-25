import React from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {Header, GeneralStatusBar} from '../../components';
import {styles} from './styles';
import {
  LOCALE_STRING,
  DB_KEYS,
  NAVIGATION_SCREEN_NAME,
} from '../../utils/constants';
import {localeString} from '../../utils/i18n';
import {chatIcon} from '../../assets';
import {connect} from 'react-redux';
import {get as _get} from 'lodash';
import {getOverpaymentHistory, getUserGoal} from '../../store/reducers';
import {Dropdown} from 'react-native-material-dropdown';
import Moment from 'moment';
import {reset} from '../../navigation/navigationService';
import {APP_CONSTANTS} from '../../utils/constants';
import {PaymentHistoryList} from './paymentHistoryList';
interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
  getOverpaymentHistory: (payload: object, extraPayload: object) => void;
  getUserGoal: (payload: object, extraPayload: object) => void;
  getOverpaymentHistoryResponse: object;
  getUserInfoResponse: object;
  getUserGoalResponse: object;
}
interface state {
  data: any;
  page: number;
  loading: boolean;
  loadingMore: boolean;
  refreshing: boolean;
  error: any;
  year: number;
}

const CURRENT_YEAR = new Date().getFullYear();
let yearRange: any = [];

class UnconnectedOverpaymentHistory extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      year: CURRENT_YEAR,
      loading: true,
      loadingMore: false,
      refreshing: false,
      error: null,
    };
  }
  componentDidMount = async () => {
    const {getUserGoalResponse} = this.props;
    let createdYear = Moment(
      _get(getUserGoalResponse, DB_KEYS.CREATED_AT, null),
    )
      .toDate()
      .getFullYear();
    for (let i = createdYear; i <= CURRENT_YEAR; i++)
      yearRange.push({value: i});
    this.fetchAllHistory();
  };
  fetchAllHistory = async () => {
    const {page, year} = this.state;
    const {getUserInfoResponse} = this.props;
    const userId = _get(getUserInfoResponse, DB_KEYS.DATA_ID, null);
    if (userId) {
      const qParam = {
        user_id: userId,
        page: page,
        year: year,
      };
      const {getOverpaymentHistory} = this.props;
      await getOverpaymentHistory({}, qParam);
      const {getOverpaymentHistoryResponse} = this.props;
      if (!_get(getOverpaymentHistoryResponse, DB_KEYS.ERROR, false)) {
        if (
          _get(getOverpaymentHistoryResponse, `response.data.${year}`, null)
        ) {
          let prevData = this.state.data;
          this.setState({
            loading: false,
            loadingMore: false,
            refreshing: false,
            data:
              page === 1
                ? _get(
                    getOverpaymentHistoryResponse,
                    `response.data.${year}`,
                    null,
                  )
                : {
                    ...prevData,
                    ..._get(
                      getOverpaymentHistoryResponse,
                      `response.data.${year}`,
                      null,
                    ),
                  },
          });
        } else {
          this.setState({
            loading: false,
            loadingMore: false,
            refreshing: false,
          });
        }
      }
    }
  };
  handleLoadMore = () => {
    this.setState(
      (prevState, nextProps) => ({
        page: prevState.page + 1,
        loadingMore: true,
      }),
      () => {
        this.fetchAllHistory();
      },
    );
  };
  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.fetchAllHistory();
      },
    );
  };

  handleYearChange = (newYear: number) => {
    this.setState(
      {
        year: newYear,
        page: 1,
      },
      () => {
        this.fetchAllHistory();
      },
    );
  };
  renderFooter = () => {
    if (!this.state.loadingMore) return null;
    else
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
  };
  render() {
    const {navigation, getOverpaymentHistoryResponse} = this.props;
    const {year, data} = this.state;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          title={localeString(
            LOCALE_STRING.OVER_PAYMENT_HISTORY.OVER_PAYMENT_HISTORY,
          )}
          rightIconPresent
          iconName={chatIcon}
          onBackPress={() => reset(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR)}
        />
        <View style={styles.scrollContainer}>
          <Dropdown
            data={yearRange}
            label={localeString(LOCALE_STRING.OVER_PAYMENT_HISTORY.YEAR)}
            value={year}
            onChangeText={newYear => this.handleYearChange(newYear)}
          />
          <View
            style={[styles.flatListContainer, {height: '100%', width: '100%'}]}>
            {data && (
              <FlatList
                data={Object.keys(data)}
                extraData={this.props}
                showsVerticalScrollIndicator={false}
                keyExtractor={index => index.toString()}
                renderItem={(key: string) => {
                  let monthData = data[key.item];
                  return (
                    <View>
                      <Text style={styles.monthYearText}>
                        {APP_CONSTANTS.MONTH_NAMES[key.item - 1] + ' ' + year}
                      </Text>

                      {monthData.map((item: object, index: number) => {
                        return <PaymentHistoryList item={item} />;
                      })}
                    </View>
                  );
                }}
                onEndReached={() => {
                  !this.state.loadingMore &&
                    (_get(
                      getOverpaymentHistoryResponse,
                      DB_KEYS.META_TOTAL,
                      0,
                    ) >=
                      _get(
                        getOverpaymentHistoryResponse,
                        DB_KEYS.META_SKIP,
                        0,
                      ) &&
                      this.handleLoadMore());
                }}
                onEndReachedThreshold={0.5}
                initialNumToRender={10} //Initially it will load only 10 data/render
                ListFooterComponent={() => this.renderFooter()}
                onRefresh={() => this.handleRefresh()} //Pull to refresh
                refreshing={this.state.refreshing} //Pull to refresh status
              />
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  getUserInfoResponse: state.getUserInfo,
  getOverpaymentHistoryResponse: state.getOverpaymentHistory,
  getUserGoalResponse: state.getUserGoal,
});

const bindActions = dispatch => ({
  getOverpaymentHistory: (payload, extraPayload) =>
    dispatch(getOverpaymentHistory.fetchCall(payload, extraPayload)),
  getUserGoal: (payload, extraPayload) =>
    dispatch(getUserGoal.fetchCall(payload, extraPayload)),
});

export const OverpaymentHistory = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedOverpaymentHistory);
