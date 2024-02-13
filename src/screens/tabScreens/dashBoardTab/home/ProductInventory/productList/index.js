import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import WorkoutContainerTab from '../../../../../commonComponents/WorkoutContainerTab';
import {
  ConstForProductInventory,
  myNutritionsConstants,
} from '../../myAssignments/nutritions/nutritionConstants';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import FilterSearchBar from '../../../../../commonComponents/FilterSearchBar';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {Path, Svg} from 'react-native-svg';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Get_Products} from '../../../../../../apiManager/productInventory';

const {height} = Dimensions.get('screen');

const ProductHistory = [
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    delivered: 'Delivered 21 June 2023',
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    delivered: 'Delivered 21 June 2023',

    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    delivered: 'Delivered 21 June 2023',
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
    delivered: 'Delivered 21 June 2023',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    delivered: 'Delivered 21 June 2023',

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    delivered: 'Delivered 21 June 2023',

    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: 'https://picsum.photos/id/128/200/300',
  },
];

export default function ProductList(props) {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [index, setIndex] = React.useState(props?.route?.params?.index);
  const [value, setValue] = React.useState('');
  const [productList, setProducts] = React.useState([]);

  useEffect(() => {
    Get_Products(value)
      .then(response => {
        console.log('what a response', response?.data?.products);
        setProducts(response?.data?.products);
      })
      .catch(err => console.log(err));
  }, [value]);

  const renderProductListItems = ({item, index}) => {
    const inputRange = [
      -1,
      0,
      (height * 0.1 + 15) * index,
      (height * 0.1 + 15) * (index + 40),
    ];
    const scale = 1;
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });
    const Offset = scrollY.interpolate({
      inputRange,
      outputRange: [0, 0, 0, 400],
    });

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            props?.navigation?.navigate('ProductDetails', {proId: item?._id});
          }}>
   
          <View style={styless.cardView}>
            <Image
              resizeMode="contain"
              style={styless.productImage}
              source={{
                uri:
                  item?.image?.length > 0
                    ? item?.image[0]?.path
                    : 'https://imgtr.ee/image/3GyTj',
              }}
            />
            <View style={{flex: 0.75, marginTop: 15}}>
              <Text style={styless.productName}>
                {item?.name.toUpperCase()}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.gilroy_Medium,
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 4,
                  textAlign: 'left',
                  color: Colors.redGrey,
                }}>
                {item?.category}
              </Text>
              {/* <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              marginTop: 4,
            }}>
            <View style={styless.ratingView}>
              <Text style={styless.rating}>{item?.rating}</Text>
              <Image
                style={styless.starImage}
                source={imagesFile.StarRating}
              />
            </View>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: Fonts.gilroy_Medium,
                fontSize: 14,
                marginLeft: 10,
                marginTop: 4,
                textAlign: 'left',
                color: Colors.redGrey,
              }}>
              {`${item.ratingCount} Ratings & ${item.ratingCount} Reviews`}
            </Text>
          </View> */}
              <View style={{flexDirection: 'row'}}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: Fonts.gilroy_Bold,
                    fontSize: 20,
                    marginLeft: 10,
                    marginTop: 2,
                    textAlign: 'left',
                    color: Colors.black,
                  }}>
                  {`₹${item?.sellingPrice}`}
                </Text>
                {/* <Text style={styless.textMRP}>
                  {'M.R.P. '}
                  <Text
                    numberOfLines={2}
                    style={[
                      styless.textMRP,
                      {
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                      },
                    ]}>
                    {item?.purchasePrice}
                  </Text>
                  <Text numberOfLines={2} style={styless.textMRP}>
                    {` (${item?.discount} off)`}
                  </Text>
                </Text> */}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderHistory = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props?.navigation?.navigate('ProductDetails')}>
        <View style={styless.cardView}>
          <Image style={styless.productImage} source={{uri: item?.uri}} />
          <View style={{flex: 0.75, marginTop: 15}}>
            <Text style={styless.productName}>{item?.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 4,
              }}>
              <Text
                numberOfLines={2}
                style={{
                  fontFamily: Fonts.gilroy_Medium,
                  fontSize: 14,
                  marginLeft: 10,
                  marginTop: 4,
                  textAlign: 'left',
                  color: Colors.redGrey,
                }}>
                {`${item.delivered}`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <AppHeader
          onGraphCall={() => navigation?.navigate('BMRHistory')}
          Heading={'Shop'}
          icon={<SvgComponent />}
          onPress={() => props?.navigation?.goBack()}
        />
        <View style={{top: 0}}>
          <ScrollView
            style={{paddingBottom: 10, top: 0}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <WorkoutContainerTab
              FTab_FWord={ConstForProductInventory.F}
              FTab_SWord={ConstForProductInventory.FIND_PRODUCT}
              STab_FWord={ConstForProductInventory.O}
              STab_SWord={ConstForProductInventory.ORDER_HISTORY}
              style={{paddingBottom: 25}}
              index={index}
              onPressTab={index => {
                setIndex(index);
              }}
            />
          </ScrollView>
          <FilterSearchBar
            isFilterBarHide={true}
            from={'pl'}
            index={index}
            value={value}
            onChangeText={text => {
              setValue(text);
            }}
          />
        </View>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: true},
          )}
          contentContainerStyle={{paddingBottom: 100}}
          data={index == 0 ?productList:[]}
          keyExtractor={item => item.key}
          renderItem={index == 0 ? renderProductListItems : renderHistory}
        />
      </SafeAreaView>
    </>
  );
}

const styless = StyleSheet.create({
  starImage: {
    borderRadius: 10,
    height: 12,
    width: 12,
    marginLeft: 4,
    alignSelf: 'center',
  },
  rating: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.white,
  },
  ratingView: {
    width: 45,
    height: 22,
    borderRadius: 5,
    backgroundColor: Colors.green,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  cardView: {
    borderRadius: 10,
    height: 100,
    width: '95%',
    alignSelf: 'center',
    marginTop: 15,
    flexDirection: 'row',
    flex: 1,
  },
  productImage: {
    flex: 0.25,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
  },
  productName: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 15,
    marginLeft: 10,
    textAlign: 'left',
    lineHeight: 16,
  },
  textMRP: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2,
    textAlign: 'left',
    color: Colors.redGrey,
    alignSelf: 'center',
  },
});

const SvgComponent = () => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 512 512">
    <Path d="M38.1 206.6C16.5 212.4 0 233.7 0 256c0 17.7 11.3 36.6 26.9 44.9 20 10.6 44.1 7.1 59.9-8.7C97.2 281.8 102 270.3 102 256c0-14.3-4.8-25.8-15.2-36.2C74.3 207.3 55 202 38.1 206.6zM243.3 206.5c-17.9 4.8-32.1 19.3-36.8 37.2-6.9 26.6 10 54.7 37.2 61.8 26.6 6.9 54.7-10 61.8-37.2 6.9-26.6-10-54.7-37.2-61.8-7.1-1.9-18.1-1.8-25 0zM448.5 206.4c-17.1 4.3-32.6 19.5-37 36.3-4.6 17.8.5 36.3 13.7 49.5 24.4 24.4 65.7 17.5 81-13.4 7.8-15.7 7.8-29.9 0-45.6-10.4-21.1-34.9-32.5-57.7-26.8z" />
  </Svg>
);
