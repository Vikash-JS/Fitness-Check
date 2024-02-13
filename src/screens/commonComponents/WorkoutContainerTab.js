import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';

const WorkoutContainerTab = props => {
  
  return (
    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
      <TouchableOpacity
        style={{ height: 20, marginLeft: 18, flexDirection: 'row' }}
        onPress={() => props.onPressTab(0)}>
        <View style={props?.index == 0 ? styles.blueBorder : styles.hideBorder}>
          <Text
            style={
              props.index == 0
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.FTab_FWord}
          </Text>
        </View>
        <View>
          <Text
            style={
              props.index == 0
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.FTab_SWord}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 20, marginLeft: 19, flexDirection: 'row' }}
        onPress={() => props.onPressTab(1)}>
        <View style={props.index == 1 ? styles.blueBorder : styles.hideBorder}>
          <Text
            style={
              props.index == 1
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.STab_FWord}
          </Text>
        </View>
        <View>
          <Text
            style={
              props.index == 1
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.STab_SWord}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 20, marginLeft: 19,marginRight:20, flexDirection: 'row' }}
        onPress={() => props.onPressTab(2)}>
        <View style={props.index == 2 ? styles.blueBorder : styles.hideBorder}>
          <Text
            style={
              props.index == 2
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.TTab_FWord}
          </Text>
        </View>
        <View>
          <Text
            style={
              props.index == 2
                ? styles.semiBold_17_black
                : styles.semiBold_17_opacity
            }>
            {props.TTab_SWord}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutContainerTab;

const styles = StyleSheet.create({
  semiBold_17_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 17,
    color: Colors.black,
  },
  semiBold_17_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 17,
    color: Colors.black,
    opacity: 0.4,
  },
  blueBorder: {
    borderBottomWidth: 1,
    borderColor: Colors.blue,
  },
  hideBorder: {
    borderBottomWidth: 0,
    // borderColor: Colors.blue
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14.5,
  },
  inputSubView: {
    borderColor: Colors.inputGrey,
    borderWidth: 1,
    width: '80%',
    height: 40,
    marginLeft: 18,
    borderRadius: 10,
    justifyContent: 'center',
  },
});
