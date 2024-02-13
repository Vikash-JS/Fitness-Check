import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
const { height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
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
  });
  