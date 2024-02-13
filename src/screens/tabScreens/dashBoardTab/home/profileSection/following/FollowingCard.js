import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../utils/Constants';
const FollowingCard = (props) => {
    return (
        <View style={{ paddingHorizontal: 14, paddingVertical: 10,  flexDirection: 'row', alignItems: 'center', marginHorizontal: 10 }}>
            <View>
                <Image style={{width:46,height:46,borderRadius:23}} source={ props.item.trainerId.profilePicture.url?{uri:props.item.trainerId.profilePicture.url}:imagesFile.ic_imgPlaceholder} />
            </View>
            <View style={{ marginLeft: 14 }}>
                <View>
                    <Text style={styles.bold_15_black}>{props.item.trainerId.firstName} {props.item.trainerId.lastName}</Text>
                </View>
                <View>
                    <Text style={styles.medium_11_opacity}>{props.item.trainerId.email}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <TouchableOpacity style={{ borderRadius: 10, width: 72, height: 32, backgroundColor: Colors.lightBlue, justifyContent: 'center', alignItems: 'center' }}
            onPress={()=>props.onPress(props.item.trainerId._id)}
            >
                <Text style={styles.semibold_11_white}>unFollow</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FollowingCard;

const styles = StyleSheet.create({
    bold_15_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 15,
        color: Colors.black
    },
    medium_11_opacity: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 11,
        color: Colors.black,
        opacity: 0.5
    },
    semibold_11_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 11,
        color: Colors.white
    }
})