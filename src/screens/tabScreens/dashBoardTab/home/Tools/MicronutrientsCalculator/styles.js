
import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
export const styles = StyleSheet.create({
    mainContainer:{
        // borderWidth:1
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    subContainer:{
        borderWidth:1,
        flexDirection:'row',
        marginTop:12,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        borderColor:Colors.inputGrey
    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    medium_12_black:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:12,
        color:Colors.black
    },
    gmMainContainer:{
        padding:6,
        flexDirection:'row',
        height:44,
        backgroundColor:Colors.inputGrey,
        borderRadius:7
    },
    gmSubContainer:{
        justifyContent:'center',
        alignItems:'center',
        flex:1,
        backgroundColor:Colors.white,
        borderRadius:8
    },
    bold_14_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    totalCalView:{
        
        flexDirection:'row',
        marginTop:30,
        justifyContent:'center',
        alignItems:'center'
    },
    midium_10_opacity:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black,
        opacity:0.4
    }
})