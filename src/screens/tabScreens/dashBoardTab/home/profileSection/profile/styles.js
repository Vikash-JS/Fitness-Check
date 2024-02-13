import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
export const styles = StyleSheet.create({
    profileImgContainer:{
        borderRadius:48,
        height:96,
        width:96,
        borderWidth:1,
        borderColor:Colors.lightBlue,
        justifyContent:'center',
        alignItems:'center',
        marginTop:4
    },
    bold_16_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:16,
        color:Colors.black
    },
    semiBold_12_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
        opacity:0.5
    },
    bold_20_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:20,
        color:Colors.black
    },
    semibold_10_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.black,
        opacity:0.5
    },
    medium_10_black:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black
    },
    bold_12_opacity:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        opacity:0.4
    }

})