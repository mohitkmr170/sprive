import React from 'react';
import {View, Text, Image, StatusBar, Alert} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import {
  showSnackBar,
  localeString,
  STYLE_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
} from '../../utils';
import {get as _get} from 'lodash';
import {firstCarousel, secondCarousel, thirdCarousel} from '../../assets';
import {verticalScale} from 'react-native-size-matters/extend';
import Swiper from 'react-native-swiper';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
}
interface state {
  entries: object;
  activeSlide: number;
  isTouchActive: boolean;
}

const CAROUSEL_AUTO_SCROLL_INTERVAL = 3;

const SAMPLE_DATA_CAROUSEL = [
    {
      image: firstCarousel,
      title: localeString(LOCALE_STRING.SIGNUP_FORM.FIRST_TITLE),
      subTitle: localeString(LOCALE_STRING.SIGNUP_FORM.FIRST_SUB_TITLE),
    },
    {
      image: secondCarousel,
      title: localeString(LOCALE_STRING.SIGNUP_FORM.SECOND_TITLE),
      subTitle: localeString(LOCALE_STRING.SIGNUP_FORM.SECOND_SUB_TITLE),
    },
    {
      image: thirdCarousel,
      title: localeString(LOCALE_STRING.SIGNUP_FORM.THIRD_TITLE),
      subTitle: localeString(LOCALE_STRING.SIGNUP_FORM.THIRD_SUB_TITLE),
    },
  ],
  INITIAL_ACTIVE_INDEX = 0,
  CAROUSEL_IMAGE_PERCENT = 459;

export class IntroCarousel extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      entries: SAMPLE_DATA_CAROUSEL,
      activeSlide: INITIAL_ACTIVE_INDEX,
      isTouchActive: false,
    };
  }
  componentDidMount() {
    StatusBar.setHidden(false, 'fade');
  }
  renderItem = (item: object, index: number) => {
    return (
      <View style={{flex: 1}} key={index}>
        <Image
          source={_get(item, DB_KEYS.INTRO_CAROUSEL.IMAGE, '')}
          resizeMethod={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.AUTO}
          resizeMode={STYLE_CONSTANTS.IMAGE_RESIZE_CONFIG.STRETCH}
          style={{
            height: verticalScale(CAROUSEL_IMAGE_PERCENT),
            width: STYLE_CONSTANTS.device.MAX_WIDTH,
          }}
        />
        <View style={styles.carouselTextContainer}>
          <Text style={styles.titleText}>
            {_get(item, DB_KEYS.INTRO_CAROUSEL.TITLE, '')}
          </Text>
          <Text style={styles.subTitleText}>
            {_get(item, DB_KEYS.INTRO_CAROUSEL.SUB_TITLE, '')}
          </Text>
        </View>
      </View>
    );
  };
  handleSignUpForFree = () => {
    showSnackBar({}, localeString(LOCALE_STRING.LOGIN_SCREEN.THANKS_FOR_LOGIN));
    this.props.navigation.navigate(
      NAVIGATION_SCREEN_NAME.MORTGAGE_INPUT_SCREEN,
    );
  };
  handleSignInPress = () => {
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.LOGIN_SCREEN);
  };
  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.mainContainer}>
          <Swiper
            showsButtons={false}
            index={0}
            loop={true}
            autoplay={!this.state.isTouchActive}
            autoplayDirection={true}
            pagingEnabled
            horizontal
            onTouchStart={() => this.setState({isTouchActive: true})}
            onTouchEnd={() => this.setState({isTouchActive: false})}
            onMomentumScrollEnd={() => {
              if (this.state.isTouchActive) {
                this.setState({isTouchActive: false});
              }
            }}
            autoplayTimeout={CAROUSEL_AUTO_SCROLL_INTERVAL}
            paginationStyle={styles.PaginationContainerStyle}
            dotStyle={styles.inactiveDotStyle}
            key={SAMPLE_DATA_CAROUSEL.length}
            activeDotStyle={styles.dotStyle}>
            {SAMPLE_DATA_CAROUSEL.map((item, index) =>
              this.renderItem(item, index),
            )}
          </Swiper>
        </View>
        <View>
          <Button
            title={localeString(LOCALE_STRING.SIGNUP_FORM.SIGNUP_FREE)}
            titleStyle={styles.buttonTitle}
            buttonStyle={styles.button}
            onPress={() => this.handleSignUpForFree()}
          />
          <Text style={styles.alreadyRegistered}>
            {localeString(LOCALE_STRING.SIGNUP_FORM.ALREADY_REGISTERED)}
            <Text
              onPress={() => this.handleSignInPress()}
              style={styles.innerLoginText}>
              {localeString(LOCALE_STRING.LOGIN_SCREEN.LOGIN_SIGNIN)}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}
