import React from 'react';
import { View, Text, TextInput, StyleSheet ,TouchableOpacity}from 'react-native';
import {Colors ,Fonts} from '../../utils/Constants';

const IncDecInputBox = (props)=>{
    return(
        <TextInput
         style={styles.textInputStyle}
            placeholder={props.placeholder}
            placeholderTextColor={Colors.inputGrey}
            value={props.value}
            onChangeText={props.onChangeText}
        />
    )
}

export default IncDecInputBox;

const styles = StyleSheet.create({
    inputView:{
        borderWidth:1,
        height:54,
        // marginHorizontal:18,
        justifyContent:'center',
        alignItems:'center',
        // paddingHorizontal:10,
        borderColor:Colors.inputGrey,
        borderRadius:7,
       backgroundColor:Colors.white,
       color: Colors.black, 
       fontFamily:Fonts.gilroy_SemiBold, fontSize: 12
    },
    textInputStyle:{
        borderRadius:5,
         marginLeft:5,

        width:"89%",
        height:30,
        borderWidth:1,
        borderColor:Colors.inputGrey
    }
})