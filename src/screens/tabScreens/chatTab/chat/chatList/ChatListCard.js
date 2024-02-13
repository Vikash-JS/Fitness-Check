import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import imagesFile from '../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../utils/Constants';
import moment from 'moment';

const ChatListCard = (props) => {
    console.log("lastMesgProps=======", props.item)
    return (
        <View style={styles.mainView}>
            <View>
                <Image style={{ width: 51, height: 51, borderRadius: 25 }} source={props?.item?.participantId?.profilePicture?.url ? { uri: props?.item?.participantId?.profilePicture?.url } : imagesFile.ic_imgPlaceholder} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <View>
                    <Text style={styles.bold_17_black}>{props?.item?.participantId?.firstName} {props?.item?.participantId?.lastName}</Text>
                </View>
                <View>
                    <Text style={styles.medium_12_opacity}>{props?.item?.message?.type == "text" ? props?.item?.message?.message : props?.item?.message?.type == "application" ? "document" : props?.item?.message?.type}</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}></View>
            <View style={{ alignSelf: 'flex-end', right: 0 }}>
                <Text>{moment(props?.item?.message?.timestamp).fromNow()}</Text>
            </View>

            {/* <View>
                <Text style={styles.medium_12_opacity}>06:35</Text>
            </View> */}
        </View>
    )
}

export default ChatListCard;

const styles = StyleSheet.create({
    mainView: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        marginHorizontal: 18,
        paddingBottom: 10,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.inputGrey
    },
    bold_17_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 17,
        color: Colors.black
    },
    medium_12_opacity: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.4
    }
})