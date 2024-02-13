import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Fonts, Colors } from '../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';

const CommunityHeader = (props) => {
    const navigation = useNavigation()
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                onPress={props.onPress}
            >
                <Image source={imagesFile.ic_back} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <View>
                <Image source={imagesFile.mfm_headerLogo} />
            </View>
            <View style={{ marginLeft: 4 }}>
                <Text style={styles.bold_18_black}>
                    {props.Heading}
                </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            {/* <TouchableOpacity>
                <Image source={imagesFile.ic_black_dot} />
            </TouchableOpacity> */}
            <View style={{ width: 34 }}></View>
        </View>
    )
}
export default CommunityHeader;

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18,

    },
    bold_18_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 18,
        color: Colors.black
    }
})
