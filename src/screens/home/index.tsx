import React from 'react';
import {View, Text, Alert} from 'react-native';
import {styles} from './styles';
import {getUserProfile} from '../../store/reducers';
import {connect} from 'react-redux';
import {get} from 'lodash';
import {StackBarGraph} from '../../components';
import SwipeButton from 'rn-swipe-button';

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
  paynowStatus: boolean;
}

class UnconnectedDashBoard extends React.Component<props, state> {
  constructor(props: any) {
    super(props);
    this.state = {
      loaded: false,
      paynowStatus: false,
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

  // Funtion called swiping the button to right
  onPaynowRequest = () => {
    this.setState({paynowStatus: true});
    Alert.alert('Submitted Successfully!');
  };

  render() {
    const {getUserProfileResponse} = this.props;
    const {loaded, paynowStatus} = this.state;
    //These logs will be shown only in Dev mode
    if (__DEV__)
      console.log(
        'render : api response check : getUserProfileResponse =>',
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
              <SwipeButton
                disabled={paynowStatus}
                height={45}
                width="100%"
                title="Make an Overpayment"
                titleColor="#fff"
                // For adding Image of arrow inside the thumbIcon
                //thumbIconImageSource={thumbIcon}
                //You can also set your own icon for the button (Optional)
                onSwipeSuccess={() => this.onPaynowRequest()}
                //After the completion of swipe (Optional)
                railFillBackgroundColor="transparent"
                railFillBorderColor="#F32E64"
                thumbIconBackgroundColor="#fff"
                thumbIconBorderColor="#fff"
                railBackgroundColor="#F32E64"
                railBorderColor="#F32E64"
                disabledRailBackgroundColor="#F32E64"
                disabledThumbIconBorderColor="#fff"
                disabledThumbIconBackgroundColor="#fff"
              />
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
