import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
import DropShadow from "react-native-drop-shadow";
const CalenderCard = (props) => {
    // console.log(props?.item?.Activities, 'item')

    const renderItem = ({ item }) => (
        // console.log(item, 'item'),
        < DropShadow style={styles.shadowProp} >
            <TouchableOpacity style={styles.cardContainer}
                onPress={() => props.onPress(item?.activityType, item?.activityValue, item?.activityId)}
            >
                <View style={styles.animatedView}></View>
                <View>
                    <View>
                        <Text style={styles.semiBold_12_black}>{item?.activityValue}</Text>
                    </View>
                    <View>
                        <Text style={styles.semiBold_12_black}>{item?.activityModel}</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ marginRight: 18 }}>
                    <Image source={imagesFile.ic_rightArrow} />
                </View>
            </TouchableOpacity>
        </DropShadow >
    )

    return (
        <View style={{ flex: 1, marginTop: 40 }}>
            <View style={{ marginLeft: 20 }}>
                <Text style={styles.bold_14_black}>{props?.item?.Activities?.dayName}</Text>
            </View>
            <FlatList
                style={{ flex: 1 }}
                data={props?.item?.Activities?.activity}
                renderItem={renderItem}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

export default CalenderCard;

const styles = StyleSheet.create({
    bold_14_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.black
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    semiBold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    },
    semiBold_10_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4
    },
    cardContainer: {
        backgroundColor: Colors.white,
        paddingVertical: 6,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
        marginHorizontal: 18
    },
    animatedView: {
        width: 3,
        height: 63,
        // borderWidth: 1,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: Colors.yellow,
        borderRadius: 3
    }
})