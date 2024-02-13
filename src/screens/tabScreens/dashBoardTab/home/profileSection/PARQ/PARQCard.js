import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';

const PARQCard = (props)=>{
    return(
        <View style={styles.mainContianer}>
        <View>
            <Text style={styles.semibold_14_black}>{props.item.question}</Text>
        </View>
        <View style={{ flexDirection: 'row' ,alignItems:'center',marginTop:16}}>
            <TouchableOpacity style={{ flexDirection: 'row',alignItems:'center' }}
            onPress={()=>props.onPress(true)}
            >
                <View>
                    <Image source={props.item.ans == true? imagesFile.ic_blueDot:imagesFile.ic_recWhiteDot} />
                </View>
                <View style={{marginLeft:8}}>
                    <Text style={styles.semibold_14_black}>Yes</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row' ,alignItems:'center',marginLeft:29}}
            onPress={()=>props.onPress(false)}
            >
                <View>
                    <Image source={props.item.ans == false? imagesFile.ic_blueDot:imagesFile.ic_recWhiteDot} />
                </View>
                <View style={{marginLeft:8}}>
                    <Text style={styles.semibold_14_black}>No</Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
    )
}

export default PARQCard;

const styles = StyleSheet.create({
    mainContianer:{
        
        marginHorizontal:18,
        borderRadius:12,
        paddingHorizontal:20,
        paddingVertical:18,
        marginBottom:11,
        backgroundColor:'#F4F4F4',
    },
    semibold_14_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.black
    }
})