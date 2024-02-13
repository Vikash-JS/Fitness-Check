import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';

export const styles = StyleSheet.create({
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    semibold_10_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.peacockBlue
    },
    profile_CardView:{
        marginTop:8,
        borderColor:Colors.inputGrey,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 9,
        marginHorizontal: 18,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profile_image_view:{
        width: 72,
        height: 72,
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 36,
        overflow:'hidden'
    }
})