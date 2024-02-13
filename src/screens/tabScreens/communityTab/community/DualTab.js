import React from 'react';
import {View, Text,TouchableOpacity, StyleSheet} from 'react-native';
import {CommunityHomeConstants} from '../CommunityConstants';
import {Colors,Fonts} from '../../../../utils/Constants';

const DualTab = (props)=>{
    return(
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={ props.index ==0 ?styles.AllBtnSelected :styles.AllBtnUnselected }
            onPress={props.onPressAll}
            >
                <Text style={props.index ==0 ? styles.semiBold_14_white :styles.semibold_13_blue}>{CommunityHomeConstants.ALL}</Text>
            </TouchableOpacity>
            <View style={{width:6}}></View>
            <TouchableOpacity style={ props.index ==1 ? styles.communityBtnSelected :styles.communityBtnUnselected}
            onPress={props.onPressCommunity}
            >
                <Text style={props.index ==1 ?styles.semiBold_14_white : styles.semibold_13_blue}>{CommunityHomeConstants.COMMUNITY}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ props.index ==2 ? styles.bookMarkBtnselected :styles.bookMarkBtnUnselected}
            onPress={props.onPressBookmark}
            >
                <Text style={props.index ==2 ?styles.semiBold_14_white : styles.semibold_13_blue}>{CommunityHomeConstants.BOOKMARK_POST}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DualTab;

const styles = StyleSheet.create({
    AllBtnUnselected:{
        width:57,
        height:38,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        backgroundColor:"rgba(59,34,248,0.1)"
    },
    AllBtnSelected:{
        width:57,
        height:38,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.blue,
        borderRadius:10
    },
    communityBtnUnselected:{
        justifyContent:'center',
        alignItems:"center",
        width:98,
        height:38,
        borderRadius:10,
        backgroundColor:"rgba(59,34,248,0.1)"
    },
    bookMarkBtnUnselected:{
        marginLeft:10,
        justifyContent:'center',
        alignItems:"center",
        paddingHorizontal:10,
        borderRadius:10,
        backgroundColor:"rgba(59,34,248,0.1)"
    },
    bookMarkBtnselected:{
        marginLeft:10,
        paddingHorizontal:10,
        justifyContent:'center',
        alignItems:"center",
        
        backgroundColor:Colors.blue,
        borderRadius:10
    },
    communityBtnSelected:{
        justifyContent:'center',
        alignItems:"center",
        width:98,
        height:38,
        backgroundColor:Colors.blue,
        borderRadius:10
    },
    semiBold_14_white:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:14,
        color:Colors.white
    },
    semibold_13_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.blue
    }
})