import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import {smartMenuConstants} from '../ProfileConstants';

export const ListViewCard = (props)=>{
    return(
        <View style={{alignItems:'center',flexDirection:'row'}}>
            <View style={{borderWidth:props?.isBorder?1:0,borderRadius:5,borderColor:Colors.Goal_BorderGrey}}>
                <Image source={props.Image}/>
            </View>
            <View style={{marginLeft:12,width:'75%'}}>
                <View>
                    <Text style={styles.bold_12_black}>{props.Name}</Text>
                </View>
                {/* <View style={{marginTop:5}}>
                    <Text style={styles.medium_10_opacity}>{props.Description}</Text>
                </View> */}
            </View>
        </View>
    )
}

export const Heading = (props)=>{
    return(
        <View >
            <Text style={styles.bold_12_opacity}>{props.Title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bold_12_opacity:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        opacity:0.4
    },
    bold_12_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        
    },
    medium_10_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black,
        opacity:0.5
    }
})