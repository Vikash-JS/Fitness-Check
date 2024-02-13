import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity }from 'react-native';
import {Colors, Fonts} from '../../utils/Constants';
import DropShadow from "react-native-drop-shadow";

const TrainerTabBar =(props)=>{
    return(
        <DropShadow style={styles.shadowStyle}>
        <View style={styles.mainContainer}>
            
            <TouchableOpacity style={props.index == 0 ? styles.selectedTabView :styles.unselectedTabView}
            onPress={()=>props.onPress(0)}
            >
                <Text style={props.index == 0 ? styles.bold_10_white:styles.bold_10_black}>Feeds</Text>
            </TouchableOpacity>
            <TouchableOpacity style={props.index == 1 ? styles.selectedTabView :styles.unselectedTabView}
            onPress={()=>props.onPress(1)}
            >
                <Text style={props.index == 1 ? styles.bold_10_white:styles.bold_10_black}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={props.index == 2 ? styles.selectedTabView :styles.unselectedTabView}
            onPress={()=>props.onPress(2)}
            >
                <Text style={props.index == 2 ? styles.bold_10_white:styles.bold_10_black}>Packages</Text>
            </TouchableOpacity>
            <TouchableOpacity style={props.index == 3 ? styles.selectedTabView :styles.unselectedTabView}
            onPress={()=>props.onPress(3)}
            >
                <Text style={props.index == 3 ? styles.bold_10_white:styles.bold_10_black}>Reviews</Text>
            </TouchableOpacity>
        </View>
        </DropShadow>
    )
}

export default TrainerTabBar;

const styles  = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        paddingVertical:4,
        paddingHorizontal:6,
        marginBottom:20,
        borderRadius:10,
        backgroundColor:Colors.white
        // marginHorizontal:18
    },
    bold_10_white:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:10,
        color:Colors.white
    },
    bold_10_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:10,
        color:Colors.black
    },shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
        flex:1
    },
    selectedTabView:{
        backgroundColor:Colors.blue,
        borderRadius:10,
        height:42,
        flex:1,
        
        alignItems:'center',
        justifyContent:'center'
    },
    unselectedTabView:{
        borderRadius:10,
        height:42,
        flex:1,
        
        alignItems:'center',
        justifyContent:'center'
    }
})