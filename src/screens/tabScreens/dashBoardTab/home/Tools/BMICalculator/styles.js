import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';

export const styles = StyleSheet.create({
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    medium_10_black:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black
    },
    medium_10_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black,
        opacity:0.4
    }
})