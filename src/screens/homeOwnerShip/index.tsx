import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {GeneralStatusBar, Header} from '../../components';
import {localeString, LOCALE_STRING} from '../../utils';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
}
interface state {}

export class HomeOwnerShip extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent={true}
          onBackPress={() => this.handleBackPress()}
          rightIconPresent
          title={localeString(LOCALE_STRING.HOME_OWNERSHIP.HOME_OWNERSHIP)}
        />
      </View>
    );
  }
}
