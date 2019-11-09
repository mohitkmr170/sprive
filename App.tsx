import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  AsyncStorage,
} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import AppNavigator from './src/navigation/appFlow';
import {resetAuthToken} from './src/utils/helperFunctions';

interface props {}
class App extends React.Component {
  constructor(props: props) {
    super(props);
    /*
    TODO : Function call inside constructor to delete token on first launch ?
    */
    AsyncStorage.getItem('alreadyLaunched').then(async value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'firstLaunch');
        await resetAuthToken();
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
