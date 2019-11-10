import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  Platform,
  Alert,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import AppNavigator from './src/navigation/appFlow';
import {resetAuthToken} from './src/utils/helperFuntions';

const ALREADY_LAUNCHED = 'alreadyLaunched';
interface props {}
class App extends React.Component {
  constructor(props: props) {
    super(props);
    /*
    TODO : Function call inside constructor to delete token on first launch ?
    */
    AsyncStorage.getItem(ALREADY_LAUNCHED).then(async value => {
      if (value == null) {
        AsyncStorage.setItem(ALREADY_LAUNCHED, 'firstLaunch');
        resetAuthToken();
      }
    });
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.appContainer}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.mainContainer}>
              <AppNavigator />
            </SafeAreaView>
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
  },
});

export default App;
