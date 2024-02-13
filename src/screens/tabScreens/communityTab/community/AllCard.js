import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
const AllCard = (props) => {
    return (
        <View style={{  marginTop: 10 }}>
            <View style={styles.headerView}>
                <View style={{ width: 34, height: 34, borderRadius: 17 }}>
                    <Image source={props.item.profile} />
                </View>
                <View style={{ marginLeft: 8 }}>
                    <View>
                        <Text style={styles.bold_14_black}>{props.item.name}</Text>
                    </View>
                    <View>
                        <Text style={styles.semibold_10_opacity}>{props.item.hours}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={imagesFile.ic_coThreeDot} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 8, marginHorizontal: 18 }}>
                <View>
                    <Text style={styles.bold_14_black}>{props.item.title}</Text>
                </View>
                <View style={{ marginTop: 6 }}>
                    <Text style={styles.semibold_12_black}>{props.item.description}</Text>
                </View>
            </View>
            <View>
                <Image source={props.item.post} />
            </View>
            <View style={styles.footerView}>
                <View>
                    <Text>👍</Text>
                </View>
                <View>
                    <Text style={styles.semibold_12_opacity}>{props.item.likes}</Text>
                </View>
                <TouchableOpacity style={{ marginLeft: 17.4 }}
                onPress={props.onComment}
                >
                    <Image source={imagesFile.ic_message} />
                </TouchableOpacity>
                <View style={{ marginLeft: 6 }}>
                    <Text style={styles.semibold_12_opacity}>{props.item.comments}</Text>
                </View>
            </View>
        </View>
    )
}

export default AllCard;

const styles = StyleSheet.create({
    bold_14_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_10_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.5
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    },
    semibold_12_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.4
    },
    headerView: {
        flexDirection: 'row',
        marginHorizontal: 18,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerView: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 35,
        marginLeft: 18
    }
})