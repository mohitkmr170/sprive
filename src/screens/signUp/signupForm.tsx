import React from 'react';
import {View, TextInput, Alert} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header} from '../../components';
import {strings} from '../../utils/i18n';

interface props {
  navigation: any;
}

interface state {}

export class SignUpForm extends React.Component<props, state> {
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
        <Header
          title={strings('signUp.singUpButton')}
          onBackPress={() => this.handleBackPress()}
        />
        <View style={styles.topContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder={strings('global.email')}
          />
          <TextInput
            style={styles.emailInput}
            placeholder={strings('global.password')}
            secureTextEntry
          />
          <TextInput
            style={styles.emailInput}
            placeholder={strings('global.confirmPassword')}
            secureTextEntry
          />
        </View>
        <Button
          title={strings('signUp.singUpButton')}
          onPress={() => Alert.alert('Check!')}
        />
      </View>
    );
  }
}
