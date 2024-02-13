import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, FlatList } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import PopupMenu from '../commonComponents/PopupMenu';
import Mark_as_done_Menu from '../tabScreens/dashBoardTab/home/myAssignments/habits/myHabits/Mark_as_done_Menu';
import moment from 'moment';
const HabitsCard = (props) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        modifiedData()
        console.log("CardItem========", props.item)

    }, [])

    const toggleSwitch = () => setVisible(previousState => !previousState);

    const modifiedData = (timeSlotId) => {
        var MarkedDate = false
        if (props?.item?.activity?.length > 0) {

            props?.item?.activity?.forEach(element => {
                let date = new Date()
                let elementDate = moment(element.createdAt).format("YYYY-MM-DD")
                let currentDate = moment(date).format('YYYY-MM-DD')
                if (element.timeSlotId == timeSlotId) {
                    if (elementDate == currentDate) {
                        console.log("elementdateTRUE====", elementDate)
                        console.log("currentDateTRUE====", currentDate)
                        MarkedDate = true
                    }
                }
            });
        }
        console.log('props?.item?.activity: ', props?.item?.activity);
        return MarkedDate;
    }

    const renderTimeSlot = ({ item }) => (
        <View style={modifiedData(item._id) ? styles.timeSlot_Selected : styles.timeSlot_unSelected}>
            <View >
                <Text style={styles.semibold_12_black}>{item.time}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View>
                {props.tabIndex != 2 ?
                    <Mark_as_done_Menu tabIndex={props.tabIndex} tab1={modifiedData(item._id) ? "Mark as undone" : "Mark as done"} onMarkDone={() => props.onMarkTimeSlot(item._id, modifiedData(item._id))} />
                    : null}
            </View>
        </View>
    )

    return (

        // <TouchableOpacity style={modifiedData() ? styles.mainContainerSelected : styles.mainContainer}
        <TouchableOpacity style={styles.mainContainer}

            onPress={toggleSwitch}
        >
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.bold_14_black}>{props.item.habitName}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity style={{ marginLeft: 10 }}>
                    <PopupMenu tabIndex={props.tabIndex} checkDate={modifiedData()} onSelectDelete={props.onSelectDelete} onSelectSend={props.onSelectSend} onSelectViewDetail={props.onSelectViewDetail} tab1={props.tab1} tab2={props.tab2} tab3={props.tab3} />
                </TouchableOpacity>
            </View>
            {visible ?
                <View>
                    <View style={{ borderWidth: 0.5, marginVertical: 16, borderColor: '#707070' }}></View>
                    <View style={{ marginBottom: 8 }}>
                        <Text style={[styles.semibold_12_black, { opacity: 0.5 }]}>Prefered Timing</Text>
                    </View>
                    <FlatList
                        data={props?.item?.timeSlot}
                        renderItem={renderTimeSlot}
                    />
                </View> : null}

            {/* <View>
                {modifiedData()? <Image source={imagesFile.ic_greenTick} /> : null}
            </View> */}
        </TouchableOpacity >
    )
}
export default HabitsCard;

const styles = StyleSheet.create({
    mainContainer: {
        borderColor: Colors.inputGrey,
        borderRadius: 7,
        marginHorizontal: 18,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 22,
        marginBottom: 8,
        justifyContent: 'center',
    },
    mainContainerSelected: {
        backgroundColor: Colors.lightGreenShade,
        borderColor: Colors.lightGreenShadeBorder,
        borderRadius: 7,
        marginHorizontal: 18,
        // flexDirection: 'row',
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 22,
        marginBottom: 8,
        justifyContent: 'center',
        //  alignItems: 'center'
    },
    semiBold_15_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 15,
        color: Colors.black
    },
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    },
    bold_14_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.black
    },
    timeSlot_unSelected: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: Colors.ProfileDetail_Grey
    },
    timeSlot_Selected: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 14,
        paddingHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        backgroundColor: Colors.lightGreenShade
    }
})