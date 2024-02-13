import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../utils/Constants';

export const styles = StyleSheet.create({
    homeHeader:{
        width:'100%',
        height: 50,
        flexDirection: 'row',  
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth:1
        // position:'absolute'
    },
    bold_18_white:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.white
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    mainContainer:{
        
        // overflow: 'hidden',
        // height: 179,
        // height:100
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12,
        // backgroundColor: 'black' 
    },
    imgMainContainer:{
        
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10 
    },
    imgSubContainer:{
        overflow:'hidden',
        height: 88,
        width: 88,
        borderRadius:44,
        justifyContent:'center',
        alignItems:'center'
    },
    bold_16_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:16,
        color:Colors.black
    },
    semibold_12_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
        opacity:0.5
    },
    medium_10_black:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black,
        textAlign:'center'
    },
    semibold_10_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.white
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
    bold_12_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black
    },
    semibold_12_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.white
    },
    semibold_12_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.blue
    }
})