import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Fonts, Colors } from '../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const AppHeader = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={imagesFile.ic_back} />
      </TouchableOpacity>
      <View style={{ flex: 1 }}></View>
      <View>
        <Text style={[styles.bold_18_black, {}]}>{props.Heading}</Text>
      </View>
      <View style={{ flex: 1 }}></View>

      {props.image ? (
        <TouchableOpacity onPress={props.onGraphCall}>
          <Image style={{ width: 25, height: 25 }} source={props.image} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 34 }}></View>
      )}
      {props?.icon ? (
        <TouchableOpacity onPress={props.onGraphCall}>
          <View style={{ marginLeft: -15 }}>{props?.icon}</View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default AppHeader;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  bold_18_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 18,
    color: Colors.black,
  },
});
