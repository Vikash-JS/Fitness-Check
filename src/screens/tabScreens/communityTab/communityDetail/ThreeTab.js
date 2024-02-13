import React from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import {CommunityHomeConstants} from '../CommunityConstants';
import {Colors,Fonts} from '../../../../utils/Constants';

const ThreeTab = (props)=>{
    return(
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={ props.index ==0 ?styles.AllBtnSelected :styles.AllBtnUnselected }
            onPress={props.onPressFeeds}
            >
                <Text style={props.index ==0 ? styles.bold_13_white :styles.bold_13_black}>{CommunityHomeConstants.FEEDS}</Text>
            </TouchableOpacity>
            <View style={{width:10}}></View>
            <TouchableOpacity style={ props.index ==1 ? styles.communityBtnSelected :styles.communityBtnUnselected}
            onPress={props.onPressAbout}
            >
                <Text style={props.index ==1 ?styles.bold_13_white : styles.bold_13_black}>{CommunityHomeConstants.ABOUT}</Text>
            </TouchableOpacity>
            <View style={{width:10}}></View>
            <TouchableOpacity style={ props.index ==2 ? styles.communityBtnSelected :styles.communityBtnUnselected}
            onPress={props.onPressPeople}
            >
                <Text style={props.index ==2 ?styles.bold_13_white : styles.bold_13_black}>{CommunityHomeConstants.PEOPLE}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ThreeTab;

const styles = StyleSheet.create({
    AllBtnUnselected:{
        width:84,
        height:38,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"rgba(59,34,248,0.1)"
    },
    AllBtnSelected:{
        width:84,
        height:38,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.blue,
        borderRadius:10
    },
    communityBtnUnselected:{
        justifyContent:'center',
        alignItems:"center",
        width:84,
        height:38,
        borderRadius:10,
        backgroundColor:"rgba(59,34,248,0.1)"
    },
    communityBtnSelected:{
        justifyContent:'center',
        alignItems:"center",
        width:84,
        height:38,
        backgroundColor:Colors.blue,
        borderRadius:10
    },
    bold_13_white:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:13,
        color:Colors.white
    },
    bold_13_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:13,
        color:Colors.black
    }
})