import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';

const MyTrainerCard = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ overflow: 'hidden', width: 46, height: 46, borderRadius: 26, justifyContent: 'center', alignItems: 'center' }}>
                <Image resizeMode='cover' style={{ borderRadius: 26, width: 46, height: 46, backgroundColor: Colors.inputGrey }} source={props?.item?.workoutCoverImage ? { uri: props?.item?.workoutCoverImage } : imagesFile.placeHolderWorkout} />
            </View>
            <View style={{ width: 12 }}></View>
            <View>
                <Text style={[styles.semibold_13, { textTransform: 'capitalize' }]}>{props?.item?.workoutName}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View>
                <Image source={imagesFile.ic_rightArrow} />
            </View>
        </View>
    )
}

export default MyTrainerCard;

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 18,
        flexDirection: 'row',
        // borderWidth: 1,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingLeft: 14,
        paddingRight: 20
    },
    semibold_13: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 13,
        color: Colors.black
    }
})