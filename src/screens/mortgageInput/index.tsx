import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import {Header, MortgageInputContainer} from '../../components';
import {localeString} from '../../utils/i18n';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const LOCALE_STRING_MORTGAGE_DATA = 'mortgageForm.mortgageData';
const LOCALE_STRING_WORKOUT = 'mortgageForm.letUsWorkOut';
const LOCALE_STRING_TAKE_YOUR_BEST = 'mortgageForm.takeYourBest';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
}

interface state {}

export class MortgageInput extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }
  handleBackPress = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  render() {
    return (
      <View style={styles.screenContainer}>
        <Header onBackPress={() => this.handleBackPress()} />
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
          <Text style={{fontSize: 12, color: '#0027FF', marginTop: 8}}>
            {localeString(LOCALE_STRING_MORTGAGE_DATA)}
          </Text>
          <Text
            style={{
              fontSize: 24,
              marginTop: 8,
              flexWrap: 'wrap',
              color: '#09245E',
            }}>
            {localeString(LOCALE_STRING_WORKOUT)}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 8,
              flexWrap: 'wrap',
              color: '#09245E',
            }}>
            {localeString(LOCALE_STRING_TAKE_YOUR_BEST)}
          </Text>
          <View style={{flex: 1}}>
            <MortgageInputContainer />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
