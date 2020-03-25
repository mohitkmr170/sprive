import React from 'react';
import {View} from 'react-native';
import {WebView} from 'react-native-webview';
import {connect} from 'react-redux';
import {GeneralStatusBar, Header} from '../../components';
import {get as _get} from 'lodash';
import {policyUpdate} from '../../store/actions/actions';
import {styles} from './styles';
import {WEB_VIEW_PARAMS, NAVIGATION_SCREEN_NAME} from '../../utils';

interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  policyUpdate: () => void;
}
interface state {
  webViewUri: string;
}

export class UnconnectedGenericWebView extends React.Component<props, state> {
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
    console.log(
      'componentDidMount : this.state.webViewUri : =>',
      this.state.webViewUri,
    );
    if (!this.state.webViewUri) this.props.navigation.goBack();
  }
  handleBackPress = () => {
    const {navigation, policyUpdate} = this.props;
    if (_get(navigation, WEB_VIEW_PARAMS.IS_POLICY, false)) {
      policyUpdate();
      navigation.navigate(NAVIGATION_SCREEN_NAME.TAB_NAVIGATOR);
    } else navigation.goBack();
  };
  render() {
    const {navigation} = this.props;
    const {webViewUri} = this.state;
    return (
      <View style={styles.rootContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handleBackPress()} />
        <WebView
          source={{uri: webViewUri}}
          javaScriptEnabled={true}
          startInLoadingState={true}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const bindActions = dispatch => ({
  policyUpdate: () => dispatch(policyUpdate()),
});

export const GenericWebView = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedGenericWebView);
