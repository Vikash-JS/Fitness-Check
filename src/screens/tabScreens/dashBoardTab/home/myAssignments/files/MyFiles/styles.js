import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../../utils/Constants'

export const styles = StyleSheet.create({
    usageView:{
        marginHorizontal:10,
        borderRadius:10,
        marginTop:15,
        backgroundColor:Colors.lightGrey,
        paddingHorizontal:20,
        paddingVertical:15
    },
    fullProgressBar:{
        height:8,
        marginTop:12,
        borderRadius:10,
        justifyContent:'center',
        backgroundColor:'#EBEBEB'
    },
    coloredProgressBar:{
        height:8,
        width:'60%',
        backgroundColor:Colors.blue,
        borderRadius:10
    }
})