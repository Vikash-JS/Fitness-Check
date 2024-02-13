import React from 'react';
import {View,Text, StyleSheet, TextInput} from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { Colors,Fonts } from '../../../../../utils/Constants';
const ShadowInput = (props)=>{
    return(
        <DropShadow style={styles.shadowStyle}>
        <View style={{flexDirection:'row',backgroundColor:props?.isFatcal?Colors.inputGrey:Colors.white,marginTop:10,marginHorizontal:18,paddingHorizontal:10,justifyContent:'center',alignItems:'center',borderRadius:12}}>
            <View style={{flex:1}}>
                <TextInput
                style={{height:40,backgroundColor:props?.isFatcal?Colors.inputGrey:Colors.white,
                    color: Colors.black, }}
                placeholder={props.placeholder}
                value={props.value}
                editable={props?.editable}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
                />
            </View>
            <View style={{marginLeft:10}}>
                <Text style={styles.semibold_12_opacity}>{props.unit}</Text>
            </View>
        </View>
        </DropShadow>
    )
}

export default ShadowInput;

const styles = StyleSheet.create({
    shadowStyle: {
        flex:1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    semibold_12_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
        opacity:0.4
    }
})