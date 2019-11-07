import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {Header} from '../../components';
import {styles} from './styles';
import {Bullets} from './bullets';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {getCumulativeInterest} from '../../store/reducers';
import {get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {InterestMask} from '../../assets';

const LOCALE_STRING_MORTGAGE_DATA = 'mortgageForm.mortgageData';

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
    /*
    TODO : Need to navigate to signUp Screen
    */
  };

  render() {
    const {getCumulativeInterestResponse} = this.props;
    let cumulativeInterest = Math.ceil(
      get(getCumulativeInterestResponse, 'data.totalInterest', 0),
    );
    return (
      <View style={styles.mainContainer}>
        <Header onBackPress={() => this.handlebackPress()} />
        <KeyboardAwareScrollView contentContainerStyle={styles.topContainer}>
          <View style={styles.mortgageStatusProgressContainer}>
            <Text style={styles.mortgageTextData}>
              {localeString(LOCALE_STRING_MORTGAGE_DATA)}
            </Text>
            {/* Need to be modified, for now it's contant */}
            <Text style={styles.progressFractionText}>1/4</Text>
          </View>
          <ImageBackground
            source={InterestMask}
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
            <View style={{marginTop: 16, flexDirection: 'row'}}>
              <View style={{marginRight: 12, marginTop: 4}}>
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
  getCumulativeInterestResponse: state.getCumulativeInterest.response,
});

const bindActions = () => ({});

export const SaveInterest = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSaveInterest);
