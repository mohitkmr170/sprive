import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import {chatIcon} from '../../assets';
import {get as _get} from 'lodash';
import Icon from 'react-native-vector-icons/Feather';
import {Header, GeneralStatusBar} from '../../components';
import {
  COLOR,
  NAVIGATION_SCREEN_NAME,
  localeString,
  LOCALE_STRING,
  STYLE_CONSTANTS,
} from '../../utils';
import {styles} from './styles';

interface props {
  navigation: {
    navigate: (routeName: string) => void;
    goBack: () => void;
  };
}
interface state {
  searchText: string;
  addressData: any;
}

const sampleAddressData = [
  {
    houserNumber: 'Flat A',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat A, 10 Downing Street, London N22 ABC',
  },
  {
    houserNumber: 'Flat B',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat B, 10 Downing Street, London N22 ABC',
  },
  {
    houserNumber: 'Flat C',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat C, 10 Downing Street, London N22 ABC',
  },
  {
    houserNumber: 'Flat D',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat D, 10 Downing Street, London N22 ABC',
  },
  {
    houserNumber: 'Flat E',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat E, 10 Downing Street, London N22 ABC',
  },
  {
    houserNumber: 'Flat F',
    street: '10 Downing Street',
    city: 'London',
    postCode: 'N22 ABC',
    completeAddress: 'Flat F, 10 Downing Street, London N22 ABC',
  },
];

export class SearchAddress extends React.Component<props, state> {
  constructor(props: props) {
    super(props);
    this.state = {
      searchText: '',
      addressData: sampleAddressData,
    };
  }
  componentDidMount = () => {};
  hanldeAddressSelection = (index: any) => {
    console.log('hanldeAddressSelection : selected Index :::', index);
    this.props.navigation.goBack();
  };
  /*
  NOTES : BD_KEYS not updated, will be done after API Integration
  */
  renderAddressList = (item: object) => {
    console.log('Addresses :::', item);
    return (
      <TouchableOpacity
        onPress={() => this.hanldeAddressSelection(_get(item, 'index', null))}
        style={[
          styles.listContainer,
          {
            borderTopColor: _get(item, 'index', null) && COLOR.LIGHTER_GRAY,
            borderTopWidth: _get(item, 'index', null) && 1,
          },
        ]}>
        <Text style={styles.addressText}>
          {_get(item, 'item.completeAddress', '')}
        </Text>
      </TouchableOpacity>
    );
  };
  handleAddressSearch = (inputText: string) => {
    let addressDataResult: any = [];
    if (inputText) {
      sampleAddressData.map((item: object, index: number) => {
        if (
          _get(item, 'completeAddress', '')
            .toLowerCase()
            .search(inputText.toLowerCase()) >= 0
        ) {
          addressDataResult.push(item);
        }
        if (index === sampleAddressData.length - 1) {
          this.setState({addressData: addressDataResult});
        }
      });
    } else {
      this.setState({addressData: sampleAddressData});
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
