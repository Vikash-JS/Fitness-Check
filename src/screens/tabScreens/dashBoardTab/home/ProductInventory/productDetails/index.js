import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  Animated,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {styles} from './styles';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {Path, Svg} from 'react-native-svg';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import Carousel from 'react-native-reanimated-carousel';
import {FlatList} from 'react-native-gesture-handler';
import imagesFile from '../../../../../../../assets/imagesFile';
import {ScrollView} from 'react-native';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {Product_Details} from '../../../../../../apiManager/productInventory';
import Loader from '../../../../../commonComponents/Loader';

const data = [
  {
    name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
    rating: 4.6,
    ratingCount: 121331,
    price: 1166,
    mrp: 1500,
    discount: `30%`,
    uri: [
      'https://picsum.photos/id/128/1000/1000',
      'https://picsum.photos/id/125/1000/1000',
      'https://picsum.photos/id/122/1000/1000',
      'https://picsum.photos/id/120/1000/1000',
      'https://picsum.photos/id/128/1000/1000',
      'https://picsum.photos/id/125/1000/1000',
      'https://picsum.photos/id/122/1000/1000',
      'https://picsum.photos/id/120/1000/1000',
    ],
  },
];

export default function ProductDetails(props) {
  const [indexImage, setIndex] = React.useState(0);
  const [productDetails, setDetails] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    let id = props?.route?.params?.proId;
    setLoading(true);
    Product_Details(id)
      .then(response => {
        console.log('response?.data?.product: ', response?.data?.product);
        if (response?.status == 200) {
          setDetails(response?.data?.product);
          setLoading(false);
        } else {
          setDetails([]);
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const renderItem = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{margin: 5}}
          onPress={() => {
            setIndex(index);
          }}>
          <View
            style={{
              borderWidth: index == indexImage ? 2.5 : 1,
              borderColor:
                index == indexImage ? Colors.lightBlue : Colors.white,
              borderRadius: 5,
              width: 70,
              height: 70,
            }}>
            <Image
              style={{flex: 1, borderRadius: 2.5, margin: 2}}
              resizeMode="contain"
              source={{uri: item?.path}}
            />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
    
      {loading ?
      <View style={styles.container}>
      <Loader/>
      </View>
       : 
      <>
        <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}  >
          <AppHeader
            onGraphCall={() => navigation?.navigate('BMRHistory')}
            Heading={'Shop'}
            icon={<SvgComponent />}
            onPress={() => props?.navigation?.goBack()}
          />
          <Carousel
            style={{alignSelf: 'center'}}
            loop
            width={375}
            height={350}
            data={productDetails?.image}
            pagingEnabled
            onScrollEnd={index => setIndex(index)}
            mode="parallax"
            defaultIndex={indexImage}
            renderItem={({index, animationValue}) => (
              <View>
                <Image
                  style={styles.productImage}
                  resizeMode="cover"
                  source={{uri: productDetails?.image[index]?.path}}
                />
              </View>
            )}
          />
          <View style={{marginLeft: 5}}>
            <FlatList
              data={productDetails?.image}
              renderItem={renderItem}
              showsHorizontalScrollIndicator={false}
              style={{marginTop: 10, marginLeft: 5}}
              horizontal
            />

            <Text style={styles.productName}>
              {
                productDetails?.name?.toUpperCase()
              }
            </Text>
            <Text style={styles.subName}>
              {
                productDetails?.description
              }
            </Text>

            {/* <View style={styles.detailParent}> */}
              {/* <View style={styles.ratingView}>
                <Text style={styles.rating}>{4.2}</Text>
                <Image
                  style={styles.starImage}
                  source={imagesFile.StarRating}
                />
              </View> */}
              <Text numberOfLines={2} style={[styles.ratingReview,{marginTop:10}]}>
                {productDetails?.category}
              </Text>
            {/* </View> */}
            <Text
              style={[styles.productName, {fontSize: 25, paddingBottom: 10}]}>
              {`₹${productDetails?.sellingPrice}`}
            </Text>
            <SingleButton
              isFromProductInventory={true}
              name={'Enquire Now'}
              onPress={() => props?.navigation.navigate('productEnquiry')}
            />
      
          </View>
          <View style={{paddingBottom:100}}></View>
        </ScrollView>

      </SafeAreaView>
      </>
      
      
      }

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
