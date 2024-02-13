import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import DropShadow from "react-native-drop-shadow";
import { Colors, Fonts } from '../../utils/Constants';
const FilesCard = (props) => {
    return (
        <DropShadow style={styles.shadowProp}>
            <View style={styles.mainContainer}>
                {/* <View style={{ width: 40, height: 40, borderRadius: 8, overflow: 'hidden' }}>
                    <Image style={{ width: 40, height: 40, borderRadius: 8 }} source={props.item.image} />
                </View> */}
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.semiBold_12_black}>{props?.item?.fileId?.title}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ marginRight: 10.8 }}>
                    <Image source={imagesFile.ic_download} />
                </View>
            </View>
        </DropShadow>
    )
}

export const FilesCardNew = (props) => {
    return (
        <DropShadow style={styles.shadowProp}>
            <View style={styles.mainContainer}>
                {/* <View style={{ width: 40, height: 40, borderRadius: 8,  overflow: 'hidden' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 8 }} source={props.item.image} />
            </View> */}
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.semiBold_12_black}>{props?.item?.fileName}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ marginRight: 10.8 }}>
                    <Image source={imagesFile.ic_download} />
                </View>
            </View>
        </DropShadow>
    )
}

export default FilesCard;

const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        borderRadius: 7,
        marginTop: 10,
        padding: 10,
        marginHorizontal: 18
    },
    semiBold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    }
})