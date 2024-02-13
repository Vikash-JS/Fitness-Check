import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Colors,Fonts} from '../../../../../utils/Constants';
import imagesFile from '../../../../../../assets/imagesFile';
import moment from 'moment';

const MessageHeader = (props) => {
    
    return (
        <View style={styles.mainView}>
            <TouchableOpacity
                onPress={props.onBackPress}
            >
                <Image source={imagesFile.ic_back} />
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
            onPress={props.onProfilePress}
            >
                <View style={{ marginLeft: 10 }}>
                    <View>
                    <Image style={{ width: 41, height: 41, borderRadius: 20 }} source={props.profileImage?{uri:props.profileImage}:imagesFile.ic_imgPlaceholder} />
                    </View>
                    {props.onlineStatus == 'online'?
                    <View style={styles.onlineStatusView}></View>
                    :<View style={styles.offlineStatusView}></View>}
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View>
                        <Text style={styles.bold_18_black}>{props.firstName} {props.lastName}</Text>
                    </View>
                    <View>
                        <Text style={props.onlineStatus == 'online'? styles.medium_10_green:styles.medium_10_opacity}>{props.onlineStatus == 'online'?'online':moment(props.trainerTimeStamp).fromNow() == 'Invalid date'?"offline" :moment(props.trainerTimeStamp).fromNow()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}></View>
            <View>
                {/* <Image source={imagesFile.ic_threeDot} /> */}
            </View>
        </View>
    )
}

export default MessageHeader;

const styles = StyleSheet.create({
    mainView: {
        flexDirection: 'row',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    medium_10_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black,
        opacity:0.4
    },
    medium_10_green:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.green,
        opacity:0.4
    },
    onlineStatusView:{
        borderWidth:2,
        borderColor:Colors.white,
        alignSelf:'flex-end',
        marginTop:20,
        right:-7, 
        position:'absolute',
        width:15,
        height:15,
        borderRadius:7.5,
        backgroundColor:Colors.green
    },
    offlineStatusView:{
        borderWidth:2,
        borderColor:Colors.white,
        alignSelf:'flex-end',
        marginTop:20,
        right:-7, 
        position:'absolute',
        width:15,
        height:15,
        borderRadius:7.5,
        backgroundColor:'grey'
    }
})