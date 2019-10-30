import React from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from '../sideBar/styles';
import {NAVIGATION_SCREEN_NAME} from '../../utils/constants';

const SIDEBAR_DATA = [
  {
    title: 'Login Screen',
    screen: NAVIGATION_SCREEN_NAME.LOGIN_SCREEN,
  },
  {
    title: 'SignUp Screen',
    screen: NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN,
  },
];

interface props {
  navigation: {
    navigate: Function;
  };
}

interface state {}

export class SideBar extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <ScrollView contentContainerStyle={styles.mainContainer}>
        {SIDEBAR_DATA.map((item, index) => {
          return (
            <Text
              key={index}
              onPress={() => this.props.navigation.navigate(item.screen)}>
              {item.title}
            </Text>
          );
        })}
      </ScrollView>
    );
  }
}
