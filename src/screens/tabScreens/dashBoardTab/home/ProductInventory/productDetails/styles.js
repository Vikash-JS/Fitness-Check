import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
const {height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'white',
  },

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
    width: '100%',
    alignSelf: 'center',
    height: 375,
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
  },
  productName: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 15,
    textAlign: 'left',
    marginTop: 10,
    fontSize: 18,
    paddingHorizontal: 10,
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
  bonusPoints: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 15,
    textAlign: 'center',
    color: Colors.redGrey,
    paddingBottom: 100,
  },
  ratingReview: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 4,
    textAlign: 'left',
    color: Colors.redGrey,
  },
  subName: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10,
    textAlign: 'left',
    color: Colors.redGrey,
  },
  detailParent:
  {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  }
});
