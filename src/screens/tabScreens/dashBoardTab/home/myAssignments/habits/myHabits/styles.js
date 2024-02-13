import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../../utils/Constants';

export const styles = StyleSheet.create({
    addBtnStyle:{
        // flexDirection:'row',
        // width:102,
        // height:34,
        padding:15,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.blue,
        borderRadius:25,
        position:'absolute',
        alignSelf:'flex-end',
        right:20,
        bottom:100
    },
    semibold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    }
})