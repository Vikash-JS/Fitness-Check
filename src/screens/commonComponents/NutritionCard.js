import React from 'react';
import {View, Text, Image ,StyleSheet} from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import {Capitalize, Colors ,Fonts } from '../../utils/Constants';

const NutritionCard = (props) =>{
    return(
        <View style={styles.mainContainer}>
            <View style={{width:12}}></View>
            <View>
          
                <Text style={styles.semiBold_13_black}>{Capitalize(props.item.planName??'')}</Text>
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Image source={imagesFile.ic_rightArrow} />
            </View>
        </View>
    )
}

export default NutritionCard;

const styles = StyleSheet.create({
    mainContainer:{
        flexDirection:'row',
        marginHorizontal:10,
        alignItems:'center',
        paddingHorizontal:14,
        paddingVertical:10,
        height:50,
    },
    semiBold_13_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.black
    },
    imageView:{
        width:46,
        height:46,
        borderRadius:26,
        overflow:'hidden',
    }
})