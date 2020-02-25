import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {GeneralStatusBar, Header} from '../../components';
import {get as _get} from 'lodash';
import {styles} from './styles';
import {WEB_VIEW_PARAMS} from '../../utils';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
}
interface state {
  webViewUri: string;
}

export class GenericWebView extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      webViewUri: _get(
        this.props.navigation,
        WEB_VIEW_PARAMS.WEB_VIEW,
        undefined,
      ),
    };
  }
  componentDidMount() {
    if (!this.state.webViewUri) this.props.navigation.goBack();
  }
  render() {
    const {navigation} = this.props;
    const {webViewUri} = this.state;
    return (
      <View style={styles.rootContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => navigation.goBack()} />
        <WebView
          source={{uri: webViewUri}}
          javaScriptEnabled={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
}
