import { StyleSheet } from 'react-native';
import {Colors, Fonts} from '../../../utils/Constants';

export const styles = StyleSheet.create({
mainContainer:{
    flex: 1,
    backgroundColor:Colors.white 
},
headingViewStyle:{
    marginTop: 37.1,
    justifyContent: 'center',
    // marginHorizontal:18
},
headingTextStyle:{
    fontFamily:Fonts.gilroy_Bold,
    fontSize:22,
    color:Colors.black
},
subHeadingView:{
    justifyContent: 'center',
    marginTop: 8,
    // marginHorizontal:18 
},
subHeadingTextStyle:{
    opacity:0.5,
    fontFamily:Fonts.gilroy_Medium,
    fontSize:12,
    color:Colors.black
},
birthdayRewardTextStyle:{
    opacity:0.4,
    fontFamily:Fonts.gilroy_Medium,
    fontSize:12,
    color:Colors.black
},
forgotPassView:{
    flexDirection:'row',
    marginTop:10,
    marginHorizontal:18,
    justifyContent:'center',
    alignItems:'center'
},
checkBoxViewStyle:{
    borderRadius:7,
    borderWidth:1,
    borderColor:Colors.inputGrey,
    width:18,
    height:18
},
keepMeSignInTextStyle:{
    opacity:0.4,
    fontFamily:Fonts.gilroy_Medium,
    fontSize:12,
    color:Colors.black
},
nextBtnViewStyle:{
    backgroundColor:Colors.blue,
    height:54,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:5,
    marginTop:20,
    marginHorizontal:18
},
nextBtnTextStyle:{
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:14,
    color:Colors.white
},
signInViewStyle:{
    alignItems:"center",
    marginTop:26,
    flexDirection:'row',
    marginLeft:18
},
signInWithTextStyle:{
    fontFamily:Fonts.gilroy_Medium,
    fontSize:12,
    color:Colors.black
},
notMemberTextStyle:{
    opacity:0.4,
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.black
},
signupBtnViewStyle:{
    borderRadius:5,
    borderColor:Colors.inputGrey,
    marginTop:26,
    borderWidth:1,
    flexDirection:'row',
    height:40,
    marginHorizontal:18,
    justifyContent:'center',
    alignItems:'center'
},
signupTextStyle:{
    
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.black,
    marginLeft:8
},
maleBtn_unselected:{
    borderColor:Colors.inputGrey,
    borderRadius:5,
    borderWidth:1,
    height:54,
    flex:1,
    justifyContent:'center',
    alignItems:'center'
},
maleBtn_selected:{
    borderColor:Colors.inputGrey,
    borderRadius:5,
    borderWidth:1,
    height:54,
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Colors.blue
},
genderText_unselected:{
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.black
},
genderText_selected:{
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.white
},
intrestBtn_unselected:{
    borderWidth:1,
    borderColor:Colors.inputGrey,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginBottom:5
},
intrestBtn_selected:{
    borderWidth:1,
    borderColor:Colors.blue,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    marginBottom:5,
    backgroundColor:Colors.blue
},
intrestTextUnSelected:{
    fontFamily:Fonts.gilroy_SemiBold ,fontSize:12 , color:Colors.black
},
intrestTextSelected:{
    fontFamily:Fonts.gilroy_SemiBold ,fontSize:12 , color:Colors.white
},
fitnessGoalSubViewText:{
    fontFamily:Fonts.gilroy_SemiBold,
    fontSize:12,
    color:Colors.black,
    opacity:0.4
},
DropDownInput_Style:{
    flexDirection:'row',
    
        marginTop:10,
            borderWidth:1,
            height:54,
            width:"100%",
            // marginHorizontal:18,
            //  justifyContent:'center',
            alignItems:'center',
            // paddingHorizontal:10,
            borderColor:Colors.inputGrey,
            borderRadius:7,
           backgroundColor:Colors.white,
           color: Colors.black, 
           fontFamily:Fonts.gilroy_SemiBold, fontSize: 12,
        },
})
