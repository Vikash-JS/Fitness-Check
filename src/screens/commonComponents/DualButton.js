import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import DropShadow from "react-native-drop-shadow";
const DualButton = (props) => {
    return (
        <DropShadow style={styles.shadowStyle}>
            <View style={styles.trackerBtnStyle}>
                <TouchableOpacity style={props.index == 0 ? styles.btnSelected : styles.btnUnSelected}
                    onPress={() => props.onPress(0)}
                >
                    <Text style={props.index == 0 ? styles.bold_10_white : styles.bold_10_black}>{props.tab1}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={props.index == 1 ? styles.btnSelected : styles.btnUnSelected}
                    onPress={() => props.onPress(1)}
                >
                    <Text style={props.index == 1 ? styles.bold_10_white : styles.bold_10_black}>{props.tab2}</Text>
                </TouchableOpacity>
            </View>
        </DropShadow>
    )
}

export default DualButton;

const styles = StyleSheet.create({
    trackerBtnStyle: {
        marginHorizontal: 73,
        padding: 4,
        // flex:1,
        flexDirection: 'row',
        height: 50,
        marginTop: 20,
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    btnSelected: {
        flex: 1,
        backgroundColor: Colors.blue,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    btnUnSelected: {
        flex: 1,
        backgroundColor: Colors.white,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    bold_10_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 10,
        color: Colors.black
    },
    bold_10_white: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 10,
        color: Colors.white
    },
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
})