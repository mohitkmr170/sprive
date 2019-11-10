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
<<<<<<< Updated upstream
import {NAVIGATION_SCREEN_NAME} from '../../utils/constants';

/*
TODO : All locale string constants can be moved to contants(utils)
*/
=======
import {
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
import {getNumberWithCommas} from '../../utils/helperFunctions';
>>>>>>> Stashed changes
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
      _get(getCumulativeInterestResponse, DB_KEYS.TOTAL_INTEREST, 0),
    );
    return (
      <View style={styles.mainContainer}>
        <Header onBackPress={() => this.handlebackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.topContainer}>
          <View style={styles.mortgageStatusProgressContainer}>
            <Text style={styles.mortgageTextData}>
              {localeString('mortgageForm.mortgageData')}
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
                {localeString('saveInterest.cardText')}
              </Text>
              {/* Need to be modified, for now it's contant */}
              <Text style={styles.cardInterestText}>
                £ {cumulativeInterest}
              </Text>
            </View>
          </ImageBackground>
          <Text style={styles.saveMoneyText}>
            {localeString('saveInterest.saveMoney')}
          </Text>
          <View style={{marginTop: 16}}>
            <Text style={styles.firstContainerHeaderText}>
              {localeString('saveInterest.firstHeader')}
            </Text>
            <View style={styles.listItemsContainer}>
              <View style={styles.bulletContainer}>
                <Bullets />
              </View>
              <Text style={styles.firstContainerListItemText}>
                {localeString('saveInterest.firstListItem')}
              </Text>
            </View>
          </View>
          <View style={styles.secondContainer}>
            <Text style={styles.secondContainerHeaderText}>
              {localeString('saveInterest.secondHeader')}
            </Text>
            <View style={styles.listItemsContainer}>
              <View style={styles.bulletContainer}>
                <Bullets />
              </View>
              <Text style={styles.secondContainerListItemText}>
                {localeString('saveInterest.secondListOne')}
              </Text>
            </View>
            <View style={styles.bulletListItemContainer}>
              <View style={styles.bulletView}>
                <Bullets />
              </View>
              <Text style={styles.secondContainerListItemText}>
                {localeString('saveInterest.secondListTwo')}
              </Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
        <Button
          title={localeString('saveInterest.buttonText')}
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
