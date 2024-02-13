import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Fonts} from '../../utils/Constants';
import DropShadow from "react-native-drop-shadow";
const HabitTabBar = (props) => {
    return (
        <DropShadow style={styles.shadowStyle}>
        <View style={styles.trackerBtnStyle}>
            <TouchableOpacity style={props.index == 0 ? styles.btnSelected : styles.btnUnSelected}
                onPress={()=>props.onPress(0)}
            >
                <Text style={props.index == 0 ? styles.bold_12_white : styles.bold_12_black}>{props.tab1}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={props.index == 1 ? styles.btnSelected : styles.btnUnSelected}
                onPress={()=>props.onPress(1)}
            >
                <Text style={props.index == 1 ? styles.bold_12_white : styles.bold_12_black}>{props.tab2}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={props.index == 2 ? styles.btnSelected : styles.btnUnSelected}
                onPress={()=>props.onPress(2)}
            >
                <Text style={props.index == 2 ? styles.bold_12_white : styles.bold_12_black}>{props.tab3}</Text>
            </TouchableOpacity>
        </View>
        </DropShadow>
    )
}

export default HabitTabBar;

const styles = StyleSheet.create({
    trackerBtnStyle:{
        marginHorizontal:28,
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
        paddingHorizontal:4,
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
    bold_12_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        textAlign:'center'
    },
    bold_12_white:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.white,
        textAlign:'center'
    },
    shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
    },
    
})