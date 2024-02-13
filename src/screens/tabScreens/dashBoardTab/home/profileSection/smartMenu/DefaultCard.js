import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
const DefaultCard = (props)=>{
    return(
        <View style={styles.mainConatainer}>
            <View>
                <Image style={props?.style} source={props.Image} />
            </View>
            <View style={{marginLeft:14}}>
                <Text style={styles.semibold_14_black}>{props.Name}</Text>
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Image  source={imagesFile.ic_rightArrow} />
            </View>
        </View>
    )
}

export default DefaultCard;

const styles = StyleSheet.create({
    mainConatainer:{
        borderColor:Colors.inputGrey,
        borderRadius:20,
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center'
    },
    semibold_14_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.black
    }
})