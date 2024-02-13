import React from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {Path, Svg} from 'react-native-svg';
import {Colors, Fonts} from '../../../../../../utils/Constants';

const item = {
  name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
  rating: 4.6,
  ratingCount: 121331,
  price: 1166,
  mrp: 1500,
  discount: `30%`,
  uri: 'https://picsum.photos/id/128/200/300',
};

export default function ProductInvoice(props) {
  
  const UnderlineComponent = props => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            console.log('yessss');
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 12,
              marginTop: 15,
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: Fonts.gilroy_Medium,
                fontSize: 14,
                color: Colors.black,
                paddingHorizontal: 10,
              }}>
              {props?.text}
            </Text>
            {props?.icon}
          </View>
          <View
            style={{
              height: 2,
              width: '95%',
              alignSelf: 'center',
              backgroundColor: Colors.tainerGrey,
              marginTop: 15,
            }}></View>
        </TouchableOpacity>
      </>
    );
  };

  const HeaderComponent = () => {
    return (
      <>
        <AppHeader
          onGraphCall={() => navigation?.navigate('BMRHistory')}
          Heading={'Reviews'}
          icon={<SvgComponent />}
          onPress={() => props?.navigation?.goBack()}
        />
        <View style={styles.cardView}>
          <Image style={styles.productImage} source={{uri: item?.uri}} />
          <View style={{flex: 0.65, marginTop: 5}}>
            <Text style={[styles.productName, {lineHeight: 18}]}>
              {item?.name}
            </Text>

            <Text
              numberOfLines={2}
              style={{
                fontFamily: Fonts.gilroy_Medium,
                fontSize: 12,
                marginTop: 10,
                color: Colors.redGrey,
                paddingHorizontal: 10,
              }}>
              {`Delivered 21 June 2023`}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 2,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors.tainerGrey,
            marginTop: 15,
          }}></View>
      </>
    );
  };

  const BoldHeading = props => {
    return (
      <>
        <Text
          style={[
            styles.productName,
            {fontSize: 16, fontFamily: Fonts.gilroy_Bold, marginTop: 10},
          ]}>
          {props?.detail}
        </Text>
      </>
    );
  };

  const MiddleComponent = () => {
    return (
      <>
        <UnderlineComponent text={'Enquire Again'} icon={<RightArrow />} />
        <UnderlineComponent text={'Rate the product'} icon={<RightArrow />} />
        <UnderlineComponent text={'Download Invoice'} icon={<DownloadIcon />} />
        <BoldHeading detail={'View Order Details'} />
        <KeyValue keys={'Order date'} value={'June 16, 2023'} />
        <KeyValue keys={'Order#'} value={'34578934678903'} />
        <KeyValue keys={'Order Quantity'} value={'10 Products'} />
        <KeyValue keys={'Order Total'} value={'₹17,775.0'} />
        <BoldHeading detail={'Shipment Details'} />
        <KeyValue
          keys={'Delivery Estimate:'}
          value={'Wednesday June 20, 2023'}
        />
        <View
          style={{
            height: 2,
            width: '95%',
            alignSelf: 'center',
            backgroundColor: Colors.tainerGrey,
            marginTop: 15,
          }}></View>
        <UnderlineComponent text={'Track Shipment'} icon={<RightArrow />} />
        <BoldHeading detail={'Payment Information'} />
        <KeyValue keys={'Payment Mode'} value={'UPI'} />
        <View style={{marginTop: 15, paddingBottom: 125}}>
          <BoldHeading detail={'Order Summary'} />
          <KeyValue keys={'Items:'} value={'₹17,775.0'} />
          <KeyValue keys={'Shipment changes:'} value={'₹20.0'} />
          <KeyValue keys={'Tax:'} value={'₹275.0'} />
          <KeyValue keys={'Discount:'} value={'₹275.0'} />
          <KeyValue isBold={true} keys={'Order Total'} value={'₹17,795.0'} />
        </View>
      </>
    );
  };

  const KeyValue = props => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Text
          style={{
            fontFamily: Fonts.gilroy_Medium,
            fontSize: 14,
            color: props?.isBold ? Colors.black : Colors.redGrey,
            paddingHorizontal: 10,
          }}>
          {props?.keys}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.gilroy_Medium,
            fontSize: 14,
            color: Colors.black,
            paddingHorizontal: 10,
          }}>
          {props?.value}
        </Text>
      </View>
    );
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <HeaderComponent />
          <MiddleComponent />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 512 512">
    <Path d="M38.1 206.6C16.5 212.4 0 233.7 0 256c0 17.7 11.3 36.6 26.9 44.9 20 10.6 44.1 7.1 59.9-8.7C97.2 281.8 102 270.3 102 256c0-14.3-4.8-25.8-15.2-36.2C74.3 207.3 55 202 38.1 206.6zM243.3 206.5c-17.9 4.8-32.1 19.3-36.8 37.2-6.9 26.6 10 54.7 37.2 61.8 26.6 6.9 54.7-10 61.8-37.2 6.9-26.6-10-54.7-37.2-61.8-7.1-1.9-18.1-1.8-25 0zM448.5 206.4c-17.1 4.3-32.6 19.5-37 36.3-4.6 17.8.5 36.3 13.7 49.5 24.4 24.4 65.7 17.5 81-13.4 7.8-15.7 7.8-29.9 0-45.6-10.4-21.1-34.9-32.5-57.7-26.8z" />
  </Svg>
);

const RightArrow = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    viewBox="0 0 32 32">
    <Path d="M7.3 1.6c-.4 1.1 1.5 3.6 5.8 8l6.3 6.4-6.3 6.4c-4.3 4.4-6.2 6.9-5.8 8 .4.9 1.2 1.6 1.9 1.6C11 32 25 17.8 25 16 25 14.2 11 0 9.2 0c-.7 0-1.5.7-1.9 1.6z" />
  </Svg>
);

const DownloadIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={11}
    height={11}
    viewBox="0 0 32 32">
    <Path d="M14.7.6c-.4.4-.7 4.3-.7 8.7v8l-2.4-2.2C9.2 12.8 7 13 7 15.4c0 1.7 7.3 8.6 9.1 8.6 2.4 0 9.3-7.6 8.6-9.4-.8-2.2-2-2-4.3.5-1.9 2.1-1.9 2.1-2.4-6.2-.5-7.5-1.5-10.1-3.3-8.3zM.5 29.1C-1 31.5 2.2 32 16.6 31.8c12.5-.3 14.9-.5 14.9-1.8s-2.5-1.5-15.2-1.8C6 28 .9 28.3.5 29.1z" />
  </Svg>
);
