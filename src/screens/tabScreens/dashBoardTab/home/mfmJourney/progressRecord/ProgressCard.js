import React from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import DropShadow from "react-native-drop-shadow";

export const ProgressCard = (props)=>{
    return(
        <DropShadow style={styles.shadowStyle}>
        <View style={{backgroundColor:Colors.white,flexDirection:'row',paddingVertical:16,paddingLeft:14,paddingRight:20,borderRadius:12}}>
            <View>
                <Text style={styles.semibold_13_black}>{props.name}</Text>
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Text>{props.value}</Text>
            </View>
            <View>
                <Image source={imagesFile.ic_rightArrow} />
            </View>
        </View>
        </DropShadow>
    )
}

export const Heading = (props)=>{
    return(
        <View >
            <Text style={styles.bold_14_black}>{props.Heading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bold_14_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    semibold_13_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.black
    },
    shadowStyle:{  
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
    },
})

