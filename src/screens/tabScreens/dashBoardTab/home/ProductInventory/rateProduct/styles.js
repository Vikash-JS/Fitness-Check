import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
const { height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    input: {
      borderWidth:1,
      flexDirection:'row',
      marginTop:12,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:7,
      borderColor:Colors.inputGrey,
      paddingHorizontal:20,
      height: 150,
      textAlignVertical:'top',
  },
    surface: {
      height: height * 0.1,
      marginTop: 15,
      padding: 8,
      backgroundColor:"#F0F0F0",
      marginHorizontal: 10,
      borderRadius: 8,
      flexDirection: "row",
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
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
      marginTop: 5,
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
    },
    productImage: {
      flex: 0.32,
      height: 100,
      backgroundColor: '#F4F4F4',
      borderRadius: 10,
    },
    productName: {
      fontFamily: Fonts.gilroy_Medium,
      fontSize: 15,
      marginLeft: 10,
      textAlign: 'left',
      letterSpacing: 0.5,
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