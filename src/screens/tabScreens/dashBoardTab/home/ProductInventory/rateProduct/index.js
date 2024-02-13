import React from 'react';
import {
  SafeAreaView,
  Text,
  Animated,
  Image,
  TextInput,
  View,
} from 'react-native';
import {styles} from './styles';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {Path, Svg} from 'react-native-svg';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import InputLabel from '../../../../../commonComponents/InputLabel';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {RatingInput} from 'react-native-stock-star-rating';
import { Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const item = {
  name: `HealihKart HK Vitals ACY 750 mg Effervescent, 60 fables), Watermelon`,
  rating: 4.6,
  ratingCount: 121331,
  price: 1166,
  mrp: 1500,
  discount: `30%`,
  uri: 'https://picsum.photos/id/128/200/300',
};

export default function RateProduct(props) {
  const [name, setName] = React.useState('');
  const [review, setReview] = React.useState('');
  const [rating,setRating] = React.useState('');
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
        <AppHeader
          onGraphCall={() => navigation?.navigate('BMRHistory')}
          Heading={'Rate this product'}
          icon={<SvgComponent />}
          onPress={() => props?.navigation?.goBack()}
        />
        <View style={styles.cardView}>
          <Image style={styles.productImage} source={{uri: item?.uri}} />
          <View style={{flex: 0.65, marginTop: 5, justifyContent: 'center'}}>
            <Text style={[styles.productName, {lineHeight: 22}]}>
              {item?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 10,
                marginTop: 4,
              }}></View>
          </View>
        </View>
        <View
          style={{
            height: 2,
            width: '95%',
            backgroundColor: Colors.tainerGrey,
            marginTop: 15,
          }}></View>
        <Text style={[styles.productName, {fontSize: 20, marginTop: 25}]}>
          {`How would you rate it?`}
        </Text>
        <View style={{paddingHorizontal: 10,marginTop:10}}>
        <RatingInput
        
          rating={rating}
          setRating={rating =>setRating(rating)}
          size={30}
          stars={0}
          maxStars={5}
          bordered={true}
        />
        </View>
        <View style={{paddingHorizontal: 10,marginTop:-10}}>
          <InputLabel
            value={name}
            keyboardType={'default'}
            onChangeText={newText => setName(newText)}
            placeholder={'Title your review'}
          />
          <TextInput
            style={styles.input}
            onChangeText={newText => setReview(newText)}
            value={review}
            placeholderTextColor={Colors.palceHolder_grey}
            fontFamily={Fonts.gilroy_SemiBold}
            fontSize={12}

            numberOfLines={10}
            multiline={true}
            returnKeyType={'done'}
            
            onSubmitEditing={()=>{Keyboard.dismiss()}}
            blurOnSubmit={true}

            placeholder="Write your review"
         

          />
        </View>

        <View style={{marginTop: 25}}>
          <SingleButton
            isFromProductInventory={true}
            name={'Submit'}
            // onPress={() => props?.navigation.navigate('productReview')}
            onPress={() => props?.navigation.navigate('productInvoice')}
          />
        </View>
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
