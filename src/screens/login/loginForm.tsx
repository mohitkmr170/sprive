import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {styles} from './styles';
import {Button} from 'react-native-elements';
import {Header} from '../../components';
import {strings} from '../../utils/i18n';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}
interface state {}

export class LoginForm extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  async UNSAFE_componentWillMount() {}

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.mainContainer}>
        <Header title={strings('login.loginButton')} onBackPress={() => {}} />
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
        </View>
        <Button
          title={strings('login.loginButton')}
          onPress={() => navigation.navigate('SignUpScreen')}
        />
      </View>
    );
  }
}
