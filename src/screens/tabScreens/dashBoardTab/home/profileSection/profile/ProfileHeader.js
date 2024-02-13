import React from 'react';
import {View, Text,Image, TouchableOpacity, StyleSheet} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';
const ProfileHeader = (props)=>{
    
    return(
        <View style={styles.mainContainer}>
            <TouchableOpacity
            onPress={props.goBack}
            >
                <Image source={props.image}/>
            </TouchableOpacity>
            <View style={{flex:1}}></View>
            <View>
                <Text style={styles.bold_18_black}>{props.Heading}</Text>
            </View>
            <View style={{flex:1}}></View>
            {props.image1?
            
            
            <TouchableOpacity style={{width:34, height:34,borderRadius:17}}
            onPress={props.onPress}
            >
                <Image style={{width:34, height:34,borderRadius:17}} source={props.isEditable?props.image2:props.image1} />
            </TouchableOpacity>
            
            :<View style={{width:34, height:34}}></View>}
            
        </View>
    )
}

export default ProfileHeader;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        
        height:50,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:18
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    }
})