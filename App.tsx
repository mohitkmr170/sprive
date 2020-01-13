import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/configStore';
import splashScreen from 'react-native-splash-screen';
import AppNavigator from './src/navigation/appFlow';
import {setNavigator} from './src/navigation/navigationService';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {navigate} from './src/navigation/navigationService';
import {NAVIGATION_SCREEN_NAME} from './src/utils/constants';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
}
interface state {}
class App extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    /*
     ******Reset system font for OnePlus device****
     */
    // const TextRender = Text.render;
    // Text.render = function render(props) {
    //   const oldProps = props;
    //   props = {
    //     ...props,
    //     style: [
    //       Platform.OS === 'android'
    //         ? {fontFamily: 'Roboto', color: '#333333'}
    //         : {},
    //       props.style,
    //     ],
    //   };
    //   try {
    //     return TextRender.apply(this, arguments);
    //   } finally {
    //     props = oldProps;
    //   }
    // };
  }
  componentDidMount() {
    /**
     * Hide native layer splash screen
     */
    splashScreen.hide();
    /**
     * Listener for Firebase Dynamic links
     */
    this.onDynamicLinkUnsubscribe = dynamicLinks().onLink(
      (link: {url: string}) => {
        var url = require('url');
        const parsed = url.parse(link.url, true).query;
        const deepLinkToken = parsed.verification_token;
        console.log(
          'componentDidMount : onDynamicLinkUnsubscribe : LINK ::: =>',
          deepLinkToken,
          parsed,
          link,
        );
        navigate(NAVIGATION_SCREEN_NAME.DEEPLINK_SCREEN, {
          deepLinkToken: deepLinkToken,
        });
      },
    );
  }
  componentWillUnmount() {
    this.onDynamicLinkUnsubscribe();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.appContainer}>
            <View style={styles.mainContainer}>
              <AppNavigator
                ref={(ref: any) => {
                  setNavigator(ref);
                }}
              />
            </View>
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
