import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
const EmptyComponent = (props) => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.textStyle}>{props.Heading}</Text>
    </View>
  )
}

export default EmptyComponent;

const styles = StyleSheet.create({
  viewStyle: {
    alignSelf: 'center',
    width: '100%',
    height: 300,
    justifyContent: 'center'
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 20,
    color: Colors.inputGrey,
    paddingVertical: 50
  }
})