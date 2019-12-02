import React from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import {Button} from 'react-native-elements';
import {Header, GeneralStatusBar} from '../../components';
import {styles} from './styles';
import {Bullets} from './bullets';
import {connect} from 'react-redux';
import {localeString} from '../../utils/i18n';
import {get as _get} from 'lodash';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {interestBanner} from '../../assets';
import {
  NAVIGATION_SCREEN_NAME,
  LOCALE_STRING,
  DB_KEYS,
} from '../../utils/constants';
import {getNumberWithCommas} from '../../utils/helperFunctions';
import {_gaSetCurrentScreen} from '../../utils/googleAnalytics';

const LIST_ITEM = [
  {
    HEADER: localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.FIRST_HEADER),
    SUB_LIST_ITEMS: [
      localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.FIRST_ITEM),
    ],
  },
  {
    HEADER: localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_HEADER),
    SUB_LIST_ITEMS: [
      localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_LIST_ONE),
      localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SECOND_LIST_TWO),
    ],
  },
];

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

  componentDidMount = async () => {
    //Send user event to GA.
    _gaSetCurrentScreen('SaveInterestScreen');
  };

  handlebackPress = () => {
    this.props.navigation.goBack();
  };

  handleSaveWithSprive = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.SIGNUP_SCREEN);
  };

  returnItem = (item: object) => {
    return (
      <View style={{marginTop: 16}}>
        <Text style={styles.firstContainerHeaderText}>{item.HEADER}</Text>
        {item.SUB_LIST_ITEMS.length &&
          item.SUB_LIST_ITEMS.map((subItem: string) => {
            return (
              <View style={styles.listItemsContainer}>
                <View style={styles.bulletContainer}>
                  <Bullets />
                </View>
                <Text style={styles.firstContainerListItemText}>{subItem}</Text>
              </View>
            );
          })}
      </View>
    );
  };

  render() {
    const {getCumulativeInterestResponse} = this.props;
    let cumulativeInterest = Math.ceil(
      _get(getCumulativeInterestResponse, DB_KEYS.TOTAL_INTEREST, 0),
    );
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header leftIconPresent onBackPress={() => this.handlebackPress()} />
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.topContainer}>
          {/* <View style={styles.mortgageStatusProgressContainer}>
            <Text style={styles.mortgageTextData}>
              {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_INTEREST)}
            </Text> */}
          {/* Need to be modified, for now progress number is contant */}
          {/* <Text style={styles.progressFractionText}>1/4</Text>
          </View> */}
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
                £{getNumberWithCommas(String(cumulativeInterest))}
              </Text>
            </View>
          </ImageBackground>
          <Text style={styles.saveMoneyText}>
            {localeString(LOCALE_STRING.SHOW_INTEREST_SCREEN.SAVE_MONEY)}
          </Text>
          <FlatList
            data={LIST_ITEM}
            extraData={this.props}
            keyExtractor={index => index.toString()}
            renderItem={({item, index}) => this.returnItem(item)}
          />
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
