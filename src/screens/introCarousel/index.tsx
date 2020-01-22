import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {
  localeString,
  STYLE_CONSTANTS,
  LOCALE_STRING,
  NAVIGATION_SCREEN_NAME,
  DB_KEYS,
} from '../../utils';
import {get as _get} from 'lodash';
import {firstCarousel, secondCarousel, thirdCarousel} from '../../assets';
import {verticalScale} from 'react-native-size-matters/extend';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
  };
}
interface state {
  entries: object;
  activeSlide: number;
}

const CAROUSEL_AUTO_SCROLL_INTERVAL = 3000;

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
  INACTIVE_DOT_OPACITY = 0.5,
  INACTIVE_DOT_SCALE = 0.6,
  CAROUSEL_IMAGE_PERCENT = 459;

export class IntroCarousel extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      entries: SAMPLE_DATA_CAROUSEL,
      activeSlide: INITIAL_ACTIVE_INDEX,
    };
  }
  componentDidMount() {
    StatusBar.setHidden(false, 'fade');
  }
  pagination = () => {
    const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.PaginationContainerStyle}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={INACTIVE_DOT_OPACITY}
        inactiveDotScale={INACTIVE_DOT_SCALE}
      />
    );
  };
  renderItem = (item: object) => {
    return (
      <View style={{flex: 1}}>
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
          <View style={{flex: 1}}>
            <Carousel
              data={this.state.entries}
              renderItem={this.renderItem}
              sliderWidth={STYLE_CONSTANTS.device.SCREEN_WIDTH}
              itemWidth={STYLE_CONSTANTS.device.SCREEN_WIDTH}
              onSnapToItem={index => this.setState({activeSlide: index})}
              autoplay={true}
              loop={true}
              autoplayInterval={CAROUSEL_AUTO_SCROLL_INTERVAL}
            />
          </View>
          <View style={styles.paginationContainer}>{this.pagination()}</View>
        </View>
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
    );
  }
}
