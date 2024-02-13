import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
const HabitCard = () => {
    return (
        <DropShadow style={styles.shadowStyle}>
        <View style={styles.mainContainer}>
            <View>
                <View>
                    <Text style={styles.bold_12_black}>{'30 Mins walk after lunch'}</Text>
                </View>
                <View style={{ marginTop: 7 }}>
                    <Text style={styles.bold_12_opacity}>1/1</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <Image source={imagesFile.ic_blueTick} />
        </View>
        </DropShadow>
    )
}

export default HabitCard;

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    mainContainer:{
        marginHorizontal: 18,
        // borderWidth: 1,
        backgroundColor:Colors.white,
        height: 54,
        flexDirection: 'row',
        padding: 14,
        borderRadius: 7,
        marginTop: 10 ,
        justifyContent:'center',
        alignItems:'center'
    },
    bold_12_black:{
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black 
    },
    bold_12_opacity:{
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4 
    },
})