import React from 'react';
import { View, Text, Image, TouchableOpacity ,StyleSheet} from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../utils/Constants';
import ReportPostMenu from '../../../commonComponents/ReportPostMenu';

const CommentHeader = (props) => {

    console.log("userDetail========",props?.userDetail)
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
            onPress={props.onPressback}
            >
                <Image source={imagesFile.ic_back} />
            </TouchableOpacity>
            
            <View style={{marginLeft:14}}>
                <Image style={{width:34, height:34,borderRadius:17}} source={props.userDetail.trainer[0].profilePicture.url?{uri: props.userDetail.trainer[0].profilePicture.url} : imagesFile.ic_imgPlaceholder} />
            </View>
            <View style={{marginLeft:8}}>
                <View>
                    <Text style={styles.bold_14_black}>{props.userDetail.trainer[0].firstName} {props.userDetail.trainer[0].lastName}</Text>
                </View>
                {/* <View>
                    <Text style={styles.semibold_10_opacity}>6 hr</Text>
                </View> */}
            </View>
            <View style={{flex:1}}></View>
            <ReportPostMenu onBookmark={props.onBookmark} onReportPost={props.onReportPost}  tab1={'Report'} tab2={'Bookmark'} />
            {/* <View>
                <Image source={imagesFile.ic_threeDot} />
            </View> */}
        </View>
    )
}

export default CommentHeader;

const styles = StyleSheet.create({
    mainContainer:{
        height: 50,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:18 
    },
    bold_14_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    semibold_10_opacity:{
        fontSize:10,
        fontFamily:Fonts.gilroy_SemiBold,
        color:Colors.black,
        opacity:0.5
    }
})