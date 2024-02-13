import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';

const SingleButton = (props) => {
    return (
        <TouchableOpacity style={props?.isFromProductInventory?[styles.mainContainer,{marginHorizontal:10}]:styles.mainContainer}
            onPress={props.onPress}
        >
            <Text style={styles.semiBold_14_white}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default SingleButton;

const styles = StyleSheet.create({
    mainContainer:{
        
        backgroundColor: Colors.blue,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        borderRadius: 5 
    },
    semiBold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    }
})