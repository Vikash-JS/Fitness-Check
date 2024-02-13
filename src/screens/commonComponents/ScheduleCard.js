import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropShadow from "react-native-drop-shadow";
import { Colors, Fonts } from '../../utils/Constants';

const ScheduleCard = (props) => {
    console.log("PRops========",props)
    return (
        <DropShadow style={styles.shadowStyle}>
            <View style={styles.mainContainer}>
                <View>
                    <View>
                        <Text style={styles.bold_12_black}>{props.item.activityValue?props.item.activityValue:props.item.habitName?props.item.habitName:props.item.title}</Text>
                    </View>
                    {/* <View style={{ marginTop: 7 }}>
                        <Text style={styles.bold_12_opacity}>08:00 AM</Text>
                    </View> */}
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={styles.coloredBar}></View>
            </View>
        </DropShadow>
    )
}

export default ScheduleCard;

const styles = StyleSheet.create({
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    mainContainer:{
        backgroundColor: Colors.white,
        marginHorizontal: 18,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 14,
        borderRadius: 7,
        marginTop: 5,
        marginBottom:5
    },
    bold_12_black:{
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black 
    },
    bold_12_opacity:{
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4 
    },
    coloredBar:{
        width: 3,
        height: 34,
        backgroundColor: Colors.pink,
        borderRadius:3
    }
})