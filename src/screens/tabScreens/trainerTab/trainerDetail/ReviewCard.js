import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../utils/Constants';
import {Rating} from 'react-native-stock-star-rating';
import DropShadow from 'react-native-drop-shadow';

const ReviewCard = props => {
  return (
    <DropShadow style={styles.shadowStyle}>
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            style={{height: 35, width: 35, borderRadius: 17}}
            source={{uri: props.item.clientId.profilePicture.url}}
          />
        </View>
        <View style={{marginLeft: 10}}>
          <View>
            <Text style={styles.bold_14_black}>{props.item.clientId.fullName}</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <Rating stars={props.item.rating} maxStars={5} size={20} />
          </View>
        </View>
        <View style={{flex: 1}}></View>
        {/* <View>
          <Text>4w</Text>
        </View> */}
      </View>
      <View>
        <View style={{marginTop: 12}}>
          <Text style={styles.semibold_12_black}>{props.item.review}</Text>
        </View>
      </View>
    </View>
    </DropShadow>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  mainContainer: {
    // borderWidth: 1,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 18,
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },
  medium_10_black: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 10,
    color: Colors.black,
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    flex: 1,
  },
  bold_14_black:{
    fontFamily:Fonts.gilroy_Bold,
    fontSize:14,
    color:Colors.black
  },
  semibold_12_black:{
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.black
  }
});
