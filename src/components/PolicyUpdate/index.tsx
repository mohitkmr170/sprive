import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  localeString,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  WEB_VIEW_PARAMS,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
  };
  policyUpdate: () => void;
}
interface state {}

export class PolicyUpdate extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleTermsAndCondition = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.GENERIC_WEB_VIEW, {
      webViewUri: WEB_VIEW_PARAMS.WEB_VIEW_URI,
      isPolicy: true,
    });
  };
  render() {
    return (
      <View style={styles.policyUpdateContainer}>
        <View style={styles.policyUpdateInnerContainer}>
          <Text style={styles.hiThereText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.HI_THERE)}
          </Text>
          <Text style={styles.recentText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.RECENTLY)} {'\n'}{' '}
            <Text
              style={styles.termsAndConditionText}
              onPress={() => this.handleTermsAndCondition()}>
              {localeString(LOCALE_STRING.POLICY_UPDATE.TANDC)}
            </Text>{' '}
            {localeString(LOCALE_STRING.POLICY_UPDATE.TAKE_A_LOOK)}
          </Text>
          <Text style={styles.allUsersText}>
            {localeString(LOCALE_STRING.POLICY_UPDATE.ALL_USERS)}
          </Text>
          <TouchableOpacity onPress={() => this.props.policyUpdate()}>
            <Text style={styles.okayText}>
              {localeString(LOCALE_STRING.POLICY_UPDATE.OKAY)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
