import React from 'react';
import {SafeAreaView, Text, TextInput,View, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants'
export const CommonInput = (props)=>{
    return(
        <View style={{height:20}}>
            <TextInput
            style={{fontFamily:Fonts.gilroy_SemiBold,fontSize:16,color:Colors.black,backgroundColor:Colors.white,
                }}
            placeholder={props.placeholder}
            value={props.value}
            onChangeText={props.onChangeText}
            editable={props.editable}
            />
        </View>
    )
}

export default CommonInput;

export const CommonHeading = (props)=>{
    return(
        <View>
            <Text style={styles.semibold_10_opacity}>{props.Heading}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    semibold_10_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.black,
        opacity:0.4
    }
})