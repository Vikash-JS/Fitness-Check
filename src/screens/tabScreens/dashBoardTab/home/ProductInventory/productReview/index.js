import React from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  Image,
  View,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {Path, Svg} from 'react-native-svg';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import {FlatList} from 'react-native';
import {Rating} from 'react-native-stock-star-rating';

const item = {
  name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
  rating: 4.6,
  ratingCount: 121331,
  price: 1166,
  mrp: 1500,
  discount: `30%`,
  uri: 'https://picsum.photos/id/128/200/300',
};
const data = [
  {
    id: 1,
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 3.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    id: 2,
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    id: 3,
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    id: 4,
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    id: 5,
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
];

export default function ProductReview(props) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, phoneNumber] = React.useState('');
  const [index, setIndex] = React.useState(0);
  const renderCard = (item) => {
    console.log('item: ', item);
    return (
      <View style={styles.cardReview}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.profileImage} source={{uri: item?.item?.uri}} />
            <View style={{marginLeft: 5}}>
              <Text
                style={[
                  styles.productName,
                  {lineHeight: 18, fontFamily: Fonts.gilroy_SemiBold},
                ]}>
                {'Rashmika Tiwari'}
              </Text>
              <View style={{marginLeft: 8, flexDirection: 'row'}}>
                <Rating stars={item?.item?.rating} maxStars={5} size={15} />
                <Text style={[styles.textMRP, {color: Colors.black,marginLeft:5}]}>{item?.item?.rating}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.textMRP,
                {fontFamily: Fonts.gilroy_SemiBold, fontSize: 14},
              ]}>
              4w
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.textMRP,
            {
              fontFamily: Fonts.gilroy_Medium,
              lineHeight: 16,
              fontSize: 15,
              marginTop: 10,
              color: Colors.black,
            },
          ]}>
          {
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
          }
        </Text>
      </View>
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
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 4,
              }}>
              <View style={styles.ratingView}>
                <Text style={styles.rating}>{item?.rating}</Text>
                <Image
                  style={styles.starImage}
                  source={imagesFile.StarRating}
                />
              </View>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: Fonts.gilroy_Medium,
                  fontSize: 12,
                  marginTop: 10,
                  color: Colors.redGrey,
                  paddingHorizontal: 10,
                }}>
                {`${item.ratingCount} Ratings & ${item.ratingCount} Reviews`}
              </Text>
            </View>
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

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          ListHeaderComponent={<HeaderComponent />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 100}}
          keyExtractor={item => item.id}
          renderItem={renderCard}
        />
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
