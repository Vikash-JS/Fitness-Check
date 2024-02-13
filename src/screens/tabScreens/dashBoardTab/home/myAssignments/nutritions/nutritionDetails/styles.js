import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
export const styles = StyleSheet.create({
    bold_20_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:20,
        color:Colors.black
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    durationView:{
        backgroundColor: Colors.white,
        marginTop: 20,
        marginHorizontal: 10,
        padding: 20,
        // borderRadius: 20
    },
    totalBtnView:{
        alignSelf:'center',
        width:154,
        height:54,
        borderWidth:1,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    semiBold_14_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.black
    },
    shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
    },
    description_note_view:{
        marginTop:12,
        borderWidth:1,
        borderColor:Colors.inputGrey,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius:7 ,
        backgroundColor:Colors.white
    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
})