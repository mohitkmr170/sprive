import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StatusBar} from 'react-native';
import {Input} from 'react-native-elements';
import {chatIcon} from '../../assets';
import {change} from 'redux-form';
import {get as _get} from 'lodash';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import {Header, GeneralStatusBar} from '../../components';
import {
  mapFormValues,
  COLOR,
  NAVIGATION_SCREEN_NAME,
  localeString,
  LOCALE_STRING,
  STYLE_CONSTANTS,
  APP_CONSTANTS,
  LOCAL_KEYS,
  FE_FORM_VALUE_CONSTANTS,
  DB_KEYS,
  SEARCH_ADDRESS,
} from '../../utils';
import {styles} from './styles';
import {store} from '../../store/configStore';

interface props {
  navigation: {
    navigate: (routeName: string, params?: object) => void;
    goBack: () => void;
  };
  getAddressResponse: object;
}
interface state {
  searchText: string;
  addressData: any;
}

export class UnconnectedSearchAddress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      searchText: '',
      addressData: _get(
        this.props.getAddressResponse,
        DB_KEYS.RESPONSE_DATA,
        [],
      ),
    };
    StatusBar.setBackgroundColor(COLOR.WHITE, true);
  }
  componentDidMount = () => {};
  hanldeAddressSelection = (selectedAddress: object) => {
    mapFormValues(
      APP_CONSTANTS.USER_ADDRESS_FORM,
      FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE1,
      _get(selectedAddress, LOCAL_KEYS.ADDRESS_LINE1, ''),
    );
    mapFormValues(
      APP_CONSTANTS.USER_ADDRESS_FORM,
      FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.ADDRESS_LINE2,
      _get(selectedAddress, LOCAL_KEYS.ADDRESS_LINE2, ''),
    );
    mapFormValues(
      APP_CONSTANTS.USER_ADDRESS_FORM,
      FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.CITY,
      _get(selectedAddress, LOCAL_KEYS.CITY, ''),
    );
    mapFormValues(
      APP_CONSTANTS.USER_ADDRESS_FORM,
      FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.COUNTY,
      _get(selectedAddress, LOCAL_KEYS.COUNTY, ''),
    );
    mapFormValues(
      APP_CONSTANTS.USER_ADDRESS_FORM,
      FE_FORM_VALUE_CONSTANTS.GET_ADDRESS.POST_CODE,
      _get(selectedAddress, LOCAL_KEYS.POST_CODE, ''),
    );
    this.props.navigation.navigate(NAVIGATION_SCREEN_NAME.USER_ADDRESS, {
      selectedAddressIndex: _get(
        selectedAddress,
        SEARCH_ADDRESS.ITEM_INDEX,
        null,
      ),
    });
  };
  /*
  NOTES : DB_KEYS not updated, will be done after API Integration
  */
  renderAddressList = (item: object) => {
    return (
      <TouchableOpacity
        onPress={() => this.hanldeAddressSelection(item)}
        style={[
          styles.listContainer,
          {
            borderTopColor:
              _get(item, SEARCH_ADDRESS.ITEM_INDEX, null) && COLOR.LIGHTER_GRAY,
            borderTopWidth: _get(item, SEARCH_ADDRESS.ITEM_INDEX, null) && 1,
          },
        ]}>
        <Text style={styles.addressText}>
          {_get(item, LOCAL_KEYS.DISPLAY_ADDRESS, '')}
        </Text>
      </TouchableOpacity>
    );
  };
  handleAddressSearch = (inputText: string) => {
    const completeAddressList = _get(
      this.props.getAddressResponse,
      DB_KEYS.RESPONSE_DATA,
      [],
    );
    if (inputText) {
      let addressDataResult = completeAddressList.filter(
        item =>
          _get(item, LOCAL_KEYS.DISPLAY_ADDRESS_KEY, '')
            .toLowerCase()
            .search(inputText.toLowerCase()) >= 0,
      );
      this.setState({addressData: addressDataResult});
    } else {
      this.setState({
        addressData: completeAddressList,
      });
    }
  };

  render() {
    const {searchText, addressData} = this.state;
    return (
      <View style={styles.mainContainer}>
        <GeneralStatusBar />
        <Header
          leftIconPresent
          title={localeString(LOCALE_STRING.USER_PROFILE.USER_PROFILE)}
          rightIconPresent
          iconName={chatIcon}
          iconPath={NAVIGATION_SCREEN_NAME.REPORT_ISSUE}
          navigation={this.props.navigation}
          onBackPress={() => this.props.navigation.goBack()}
        />
        <View style={styles.mainView}>
          <Input
            leftIcon={
              <Icon
                name="search"
                size={STYLE_CONSTANTS.padding.NORMAL}
                color={COLOR.VOILET}
              />
            }
            containerStyle={styles.containerStyle}
            inputContainerStyle={styles.inputContainerStyle}
            leftIconContainerStyle={styles.leftIconContainer}
            inputStyle={styles.inputStyle}
            placeholder={localeString(LOCALE_STRING.USER_PROFILE.SEARCH_FLAT)}
            placeholderTextColor={COLOR.VOILET}
            onChangeText={inputText => this.handleAddressSearch(inputText)}
          />
          <View style={styles.flatListContainer}>
            {addressData.length ? (
              <FlatList
                data={addressData}
                extraData={this.props}
                showsVerticalScrollIndicator={false}
                keyExtractor={index => index.toString()}
                renderItem={item => this.renderAddressList(item)}
              />
            ) : (
              <Text style={styles.noAddressFoundText}>
                {localeString(LOCALE_STRING.USER_PROFILE.NO_ADDRESS_FOUND)}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state: object) => ({
  getAddressResponse: state.getAddress,
});

const bindActions = () => ({});

export const SearchAddress = connect(
  mapStateToProps,
  bindActions,
)(UnconnectedSearchAddress);
