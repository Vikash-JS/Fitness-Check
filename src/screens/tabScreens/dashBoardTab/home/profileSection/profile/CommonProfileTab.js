import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import DropShadow from "react-native-drop-shadow";
import {Colors, Fonts} from '../../../../../../utils/Constants';
const CommonProfileTab = (props)=>{
    return(
        <DropShadow style={styles.shadowStyle}>
        <TouchableOpacity style={styles.mainContainer}
        onPress={props.onPress}
        >
            <View>
                <Image source={props.image} />
            </View>
            
            <View style={{marginLeft:12}}>
                <Text style={styles.semibold_13_black}>{props.TabName}</Text>
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Image source={imagesFile.ic_rightArrow} />
            </View>
        </TouchableOpacity>
        </DropShadow>
    )
}

export default CommonProfileTab;

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    semibold_13_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.black
    },
    mainContainer:{
        paddingVertical:7,
        paddingLeft:15,
        paddingRight:20,
        backgroundColor:Colors.white,
        borderRadius:18,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    }
})