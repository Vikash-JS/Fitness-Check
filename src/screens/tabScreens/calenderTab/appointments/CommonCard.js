import React from 'react';
import {View, Text, StyleSheet,Linking} from 'react-native';
import {Colors, Fonts} from '../../../../utils/Constants';
import {AppointmentConstants} from '../CalenderConstants';
const CommonCard = (props)=>{
    return(
        <View style={styles.mainView}>
            <View>
                <Text style={styles.bold_10_black}>{props?.Title}</Text>
            </View>
            <View style={styles.subView}>
                <Text style={props?.Title ==AppointmentConstants?.MEETING_URL? styles.semibold_12_blue : styles.semibold_12_black}>{props?.value}</Text>
            </View>
        </View>
    )
}

export default CommonCard;

const styles = StyleSheet.create({
    mainView:{
        marginHorizontal:18,
        marginTop:26
    },
    subView:{
        borderWidth:1,
        paddingHorizontal:20,
        paddingVertical:16,
        borderRadius:7,
        borderColor:Colors.inputGrey,
        marginTop:10
    },
    bold_10_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:10,
        color:Colors.black
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    semibold_12_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.blue
    }
})