import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
export const styles = StyleSheet.create({
    semibold_10_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4
    },
    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3B22F8',
        height: 50,
        marginHorizontal: 18,
        borderRadius: 12
    },
    semibold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    }
})