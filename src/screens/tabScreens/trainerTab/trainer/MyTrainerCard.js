import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import DropShadow from "react-native-drop-shadow";
import { Rating } from 'react-native-stock-star-rating';

const MyTrainerCard = (props) => {
    return (
        <DropShadow style={styles.shadowStyle}>
            <View style={styles.mainContainer}>
                <View style={styles.imageView}>
                    <Image style={{ width: 112, height: 112 }} source={{ uri: props?.item?.profilePicture?.url }} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.bold_15_black}>{props?.item?.firstName}{props?.item?.lastName}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 5.9 }}>

                    <Rating stars={props?.item?.ratingAvg} maxStars={5} size={20} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <Text style={styles.semibold_10_opacity}>{props?.item?.people}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <View style={{ borderRadius: 8, backgroundColor: Colors.tainerGrey, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: 55, height: 30 }}>
                        <View>
                            <Image source={imagesFile.ic_shop} />
                        </View>
                        <View style={{ marginLeft: 6 }}>
                            {console.log(props?.item?.ratingAvg, 'oooo')}
                            <Text style={styles.semibold_12_black}>{props?.item?.followerCount}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ marginLeft: 8, borderRadius: 8, width: 30, height: 30, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.tainerGrey }}
                        onPress={() => props.onPressMessage(props.item._id)}>
                        <Image source={imagesFile.ic_msg} />
                    </TouchableOpacity>
                </View>
            </View>
        </DropShadow>
    )
}

export default MyTrainerCard;

const styles = StyleSheet.create({
    mainContainer: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        paddingVertical: 15
    },
    semibold_13: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 13,
        color: Colors.black
    },
    bold_15_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 15,
        color: Colors.black
    },
    semibold_10_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.5
    },
    imageView: {
        height: 112,
        width: 112,
        overflow: 'hidden',
        borderRadius: 10
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    },
    shadowStyle: {
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
})