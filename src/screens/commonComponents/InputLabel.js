import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';

const InputLabel = (props)=>{
    return(
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.bold_18_black}>{props.Heading}</Text>
            </View>
            <View style={styles.subContainer}>
                <View style={{width:'90%',height:44,justifyContent:'center'}}>
                    <TextInput
                    value={props.value}
                    style={{height:30,marginHorizontal:5,backgroundColor:Colors.white}}
                    placeholder={props.placeholder}
                    placeholderTextColor={Colors.palceHolder_grey}
                    fontFamily={Fonts.gilroy_SemiBold}
                    fontSize={12}
                    onChangeText={props.onChangeText}
                    keyboardType={props.keyboardType}
                    onFocus={props?.onFocus}
                    />
                </View>
                <View >
                    <Text style={styles.semiBold_12_black}>{props.unit}</Text>
                </View>
            </View>
        </View>
    )
}

export default InputLabel;

const styles = StyleSheet.create({
    mainContainer:{
        // borderWidth:1

    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    subContainer:{
        borderWidth:1,
        flexDirection:'row',
        marginTop:12,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        borderColor:Colors.inputGrey
    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    }
})