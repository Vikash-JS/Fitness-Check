import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';

export const styles = StyleSheet.create({
    semibold_13_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.lightBlue
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    semibold_9_lightblue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:9,
        color:Colors.lightBlue
    },
    inputView:{
        marginTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: Colors.ProfileDetail_Grey,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center' 
    },
    datePickerStyle:{
            marginTop: 8,
            borderBottomWidth: 1,
            borderBottomColor: Colors.ProfileDetail_Grey,
            paddingBottom: 10,
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center' 
    },
    samibold_16_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:16,
        color:Colors.black
    }
})