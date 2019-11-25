import React from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import AppNavigator from './src/navigation/appFlow';
interface props {}
interface state {}
class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.appContainer}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView
              style={styles.mainContainer}
              forceInset={{bottom: 'never'}}>
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
