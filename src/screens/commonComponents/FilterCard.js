import React from 'react';
import { View, Text ,Image, TouchableOpacity, StyleSheet} from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import {Colors, Fonts} from '../../utils/Constants';

const FilterCard = (props)=>{
    return(
    props.item._id  ? 
        (<View style={styles.mainContainer}>
            <View>
                <Image style={{width:30, height:30,borderRadius:15}} source={props?.item?.profilePicture?.url?{uri:props?.item?.profilePicture?.url}:imagesFile.ic_imgPlaceholder} />
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Text style={styles.semibold_13}>{props?.item?.firstName} {props?.item?.lastName}</Text>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity>
                <Image source={props.filterId == props.item._id? imagesFile.ic_blueTick:imagesFile.ic_recWhiteDot} />
            </TouchableOpacity>
            
        </View>):<View style={styles.blankmainContainer}>
        </View>
    
    )
}

export default FilterCard;

const styles = StyleSheet.create({
    mainContainer:{
        borderRadius: 18,
        flexDirection: 'row',
        // borderWidth: 1,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        backgroundColor: Colors.off_white,
        paddingVertical:10,
        paddingLeft:14,
        paddingRight:20
    },
    blankmainContainer:{
        flexDirection: 'row',
        // borderWidth: 1,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical:10,
        paddingLeft:14,
        paddingRight:20
    },
    semibold_13:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.black
    }
})