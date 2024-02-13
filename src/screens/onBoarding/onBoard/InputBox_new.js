import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../utils/Constants';

const InputBox_new = (props) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.textInputStyle}
                placeholder={props.placeholder}
                placeholderTextColor={Colors.palceHolder_grey}
                value={props.value}
                onChangeText={props.onChangeText}
                keyboardType={props.keyboardType}
            />
            <View >
                <Text style={styles.semiBold_12_black}>{props.unit}</Text>
            </View>
        </View>
    )
}
export default InputBox_new;
const styles = StyleSheet.create({
    inputView: {
        borderWidth: 1,
        height: 54,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 22,
        borderColor: Colors.inputGrey,
        borderRadius: 7,
        backgroundColor: Colors.white,
        color: Colors.black,
        fontFamily: Fonts.gilroy_SemiBold, fontSize: 12,
    },
    textInputStyle: {
        width: '100%',
        height: 30,

    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
    }
})