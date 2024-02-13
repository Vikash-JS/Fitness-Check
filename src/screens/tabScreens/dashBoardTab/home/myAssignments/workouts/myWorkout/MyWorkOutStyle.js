import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';

export const styles =StyleSheet.create({
    startWorkoutBtn:{
        width:124,
        height:34,
        backgroundColor:Colors.blue,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:5
    },
    semiBold_12_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.white
    }
})