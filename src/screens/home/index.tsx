import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {getUserProfile} from '../../store/reducers';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {StackBarGraph} from '../../components';

interface props {
  getUserProfile: () => void;
  getUserProfileResponse: () => void;
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}

interface state {
  loaded: boolean;
}

class UnconnectedDashBoard extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async UNSAFE_componentWillMount() {
    const {getUserProfile} = this.props;
    try {
      await getUserProfile();
      this.setState({loaded: true});
    } catch (error) {
      console.log(err);
    }
  }

  render() {
    const {getUserProfileResponse} = this.props;
    const {loaded} = this.state;
    //These logs will be shown only in Dev mode
    if (__DEV__)
      console.log(
        'render : api response check : getUserProfileResponse',
        getUserProfileResponse,
      );
    return (
      <View style={styles.mainContainer}>
        <View style={{flex: 1}}>
          <Text>Dashboard data</Text>
          <View style={styles.topContainer}>
            <Text>API Response</Text>
            {loaded && <Text>{get(getUserProfileResponse, 'title', '')}</Text>}
            <View style={{flex: 1, justifyContent: 'center'}}>
              <StackBarGraph />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getUserProfileResponse: state.getUserProfile.response,
});

const bindActions = dispatch => ({
  getUserProfile: () => dispatch(getUserProfile.fetchCall()),
});

export const Dashboard = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedDashBoard);
