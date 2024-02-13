import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';

const InputBox = (props) => {
    return (
        <View style={styles.inputView}>
            <TextInput
                style={styles.textInputStyle}
                keyboardType={props.keyboardType}
                placeholder={props.placeholder}
                autoCapitalize={props.autoCapitalize}
                autoCorrect={props.autoCorrect}
                placeholderTextColor={Colors.palceHolder_grey}
                value={props.value}
                secureTextEntry={props.secureTextEntry}
                onChangeText={props.onChangeText}
            />
        </View>
    )
}
export default InputBox;
const styles = StyleSheet.create({
    inputView: {
        borderWidth: 1,
        height: 54,
        marginHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderColor: Colors.inputGrey,
        borderRadius: 7,
        backgroundColor: Colors.white,
        color: Colors.black,
        fontFamily: Fonts.gilroy_SemiBold, fontSize: 12,
    },
    textInputStyle: {
        width: '100%',
        height: 30,
        backgroundColor: Colors.white,
        color: Colors.black,

    }
})