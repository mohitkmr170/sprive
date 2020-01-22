import React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {styles} from './styles';
import {Header, GeneralStatusBar} from '../../components';
import {
  _gaSetCurrentScreen,
  localeString,
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  COLOR,
} from '../../utils';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}
interface state {}

export class PushNotification extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }
  render() {
    return (
      <View style={styles.container}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.GLOBAL.NOTIFICATIONS)}
          rightIconPresent
          onBackPress={() =>
            this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR)
          }
        />
        <View style={styles.mainContainer}>
          <Text>{localeString(LOCALE_STRING.GLOBAL.NOTIFICATIONS)}</Text>
        </View>
      </View>
    );
  }
}
