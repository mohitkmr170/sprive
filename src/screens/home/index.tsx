import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {getUserProfile} from '../../store/reducers';
import {connect} from 'react-redux';
import {get} from 'lodash';

interface props {
  getUserProfile: () => void;
  getUserProfileResponse: () => void;
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
    await getUserProfile();
    this.setState({loaded: true});
  }
  render() {
    const {getUserProfileResponse} = this.props;
    const {loaded} = this.state;
    console.log('askjhdvasd', getUserProfileResponse);
    return (
      <View style={styles.mainContainer}>
        <Text>Dashboard data</Text>
        <View style={styles.topContainer}>
          <Text>API Response</Text>
          {loaded && <Text>{get(getUserProfileResponse, 'title', '')}</Text>}
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
