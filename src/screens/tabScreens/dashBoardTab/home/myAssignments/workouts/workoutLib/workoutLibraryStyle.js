import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';

export const styles = StyleSheet.create({
    semiBold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    },
    startProgramBtnStyle:{
        borderRadius:5,
        width:120,
        height:35,
        backgroundColor:Colors.blue,
        justifyContent:'center',
        alignItems:'center',
        marginTop:10
    },
    semiBold_8_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:8,
        color:Colors.white
    },
    semiBold_18_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:18,
        color:Colors.black
    },
    weekViewStyle:{
        paddingHorizontal:20,
        height:66,
        // borderWidth:1,
        marginTop:14,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:"center"
    },
    bold_13_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:13,
        color:Colors.black
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    },
    bold_20_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:20,
        color:Colors.black
    },
    semiBold_10_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.black
    },
    semiBold_10_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.black,
        opacity:0.4
    },
    semiBold_10_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.blue
    },
    latestWeightContainer:{
        
        backgroundColor: Colors.lightGrey,
        marginTop: 30,
        marginHorizontal: 10,
        padding: 20,
        borderRadius: 20
    },
    durationView:{
        backgroundColor: Colors.white,
        marginTop: 30,
        marginHorizontal: 10,
        padding: 20,
        // borderRadius: 20
    },
    bold_14_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:14,
        color:Colors.black
    },
    bold_10_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:10,
        color:Colors.black
    },
    bold_10_white:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:10,
        color:Colors.white
    },
    trackerBtnStyle:{
        marginHorizontal:73,
        padding:4,
        flex:1,
        flexDirection: 'row',
        height:50,
        
        marginTop: 20,
        backgroundColor:Colors.white ,
        borderRadius:10
    },
    btnSelected:{
        flex:1,
        backgroundColor:Colors.blue,
        borderRadius:10,
        justifyContent:'center',
        alignItems:"center"
    },
    btnUnSelected:{
        flex:1,
        backgroundColor:Colors.white,
        borderRadius:10,
        justifyContent:'center',
        alignItems:"center"
    },
    medium_10_black:{
        fontFamily:Fonts.gilroy_Medium,
        fontSize:10,
        color:Colors.black
    },
    uploadBtnStyle:{
        borderRadius:10,
        height:42,
        width:106,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.blue,
        marginTop:10
    },
    semibold_10_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.white
    },
    semiBold_14_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.black
    },
    semiBold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    },
    startNowToggleView:{
        marginHorizontal: 18,
        flexDirection: 'row',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 18
    },
    followWorkoutToggleView:{
        marginHorizontal: 18,
        flexDirection: 'row',
        // borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 35
    },
    startNowToggleSubView:{
        borderWidth:1,
        height:54,
        marginHorizontal:18,
        marginTop:16,
        borderRadius:7,
        borderColor:Colors.inputGrey,
        justifyContent:'center'
    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black,
        lineHeight:20
    },
    semiBold_12_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.blue
    },
    bold_12_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black
    },
    today_am_workoutStyle:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginHorizontal:18,
        padding:14,
        borderRadius:7,
        borderColor:Colors.inputGrey
    },
    today_pm_workoutStyle:{
        marginTop:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        marginHorizontal:18,
        padding:14,
        borderRadius:7,
        borderColor:Colors.inputGrey
    },
    startBtnView:{
        marginTop:30,
        marginHorizontal:18,
        height:54,
        justifyContent:'center',
        alignItems:"center",
        borderRadius:5,
        backgroundColor:Colors.blue
    },
    bold_22_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:22,
        color:Colors.black
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
    shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
    },
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
})