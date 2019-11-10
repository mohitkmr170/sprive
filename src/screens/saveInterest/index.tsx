import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {Header} from '../../components';
import {styles} from './styles';
import {Bullets} from './bullets';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {get as _get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {interestBanner} from '../../assets';
import {NAVIGATION_SCREEN_NAME, LOCALE_STRING} from '../../utils/constants';
import {getNumberWithCommas} from '../../utils/helperFunctions';
interface props {
  navigation: {
    navigate: (routeName: String) => void;
    goBack: () => void;
  };
  getCumulativeInterestResponse: object;
}

interface state {}

class UnconnectedSaveInterest extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {};
  }

  handlebackPress = () => {
    this.props.navigation.goBack();
  };

  handleSaveWithSprive = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
  };

  render() {
    const {getCumulativeInterestResponse} = this.props;
    let cumulativeInterest = Math.ceil(
      _get(getCumulativeInterestResponse, 'response.data.totalInterest', 0),
    );
    return (
      <View style={styles.mainContainer}>
        <Header onBackPress={() => this.handlebackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.topContainer}>
          <View style={styles.mortgageStatusProgressContainer}>
            <Text style={styles.mortgageTextData}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_INTEREST)}
            </Text>
            {/* Need to be modified, for now progress number is contant */}
            <Text style={styles.progressFractionText}>1/4</Text>
          </View>
          <ImageBackground
            source={interestBanner}
            style={styles.imageBackgoundStyle}
            imageStyle={styles.imageStyle}>
            <View style={styles.cardContainer}>
              <Text style={styles.cardText}>
                {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.CARD_TEXT)}
              </Text>
              {/* Need to be modified, for now it's contant */}
              <Text style={styles.cardInterestText}>
                £ {getNumberWithCommas(String(cumulativeInterest))}
              </Text>
            </View>
          </ImageBackground>
          <Text style={styles.saveMoneyText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_MONEY)}
          </Text>
          <View style={{marginTop: 16}}>
            <Text style={styles.firstContainerHeaderText}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.FIRST_HEADER)}
            </Text>
            <View style={styles.listItemsContainer}>
              <View style={styles.bulletContainer}>
                <Bullets />
              </View>
              <Text style={styles.firstContainerListItemText}>
                {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.FIRST_ITEM)}
              </Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.secondContainerHeaderText}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_HEADER)}
            </Text>
            <View style={styles.listItemsContainer}>
              <View style={styles.bulletContainer}>
                <Bullets />
              </View>
              <Text style={styles.secondContainerListItemText}>
                {localeString(
                  LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_LIST_ONE,
                )}
              </Text>
            </View>
            <View style={styles.bulletListItemContainer}>
              <View style={styles.bulletView}>
                <Bullets />
              </View>
              <Text style={styles.secondContainerListItemText}>
                {localeString(
                  LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_LIST_TWO,
                )}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Button
          title={localeString(
            LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_BUTTON_TEXT,
          )}
          titleStyle={styles.buttonTitleStyle}
          buttonStyle={styles.buttonStyle}
          onPress={() => this.handleSaveWithSprive()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  getCumulativeInterestResponse: state.getCumulativeInterest,
});

const bindActions = () => ({});

export const SaveInterest = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSaveInterest);
