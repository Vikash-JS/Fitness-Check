import React, { useState, useEffect, useMemo } from 'react';
import moment from 'moment';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
import { StyleSheet, Text, View, TouchableOpacity, Image, Modal, FlatList, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { GoalConstants } from '../tabScreens/dashBoardTab/home/profileSection/ProfileConstants';
const DATA = [{ id: 1, day: "Sunday" }, { id: 2, day: "Monday" }, { id: 3, day: "Tuesday" }, { id: 4, day: "Wednesday" }, { id: 5, day: "Thursday" }, { id: 6, day: "Friday" }, { id: 7, day: "Saturday" }]
const windowWidth = Dimensions.get('window').width / 2 - 30;
const TimingModal = (props) => {
    const [date, setDate] = useState(props.startDate);
    const [endDate, setEndDate] = useState(props.endDate)
    const [showRepeatModal, setShowRepeatModal] = useState(false);

    // this is just to show time formate in am pm formate
    // console.log(
    //     'Time picker formate in minute and hour',
    //     date.toLocaleString('en-US', {
    //         hour: 'numeric',
    //         minute: 'numeric',
    //         hour12: true,
    //     }),
    // );
    useMemo(() => {
        setDate(props.startDate ? props.startDate : new Date())
        setEndDate(props.endDate ? props.endDate : new Date())
    }, [props.startDate, props.endDate])

    const checkValidate = (days) => {
        var MarkedDone = false
        if (props?.repeat?.length > 0) {
            props?.repeat.forEach(element1 => {
                if (element1 == days) {
                    console.log("yaha aa raha hai===========")
                    MarkedDone = true
                }
            });
        }
        return MarkedDone
    }

    const FlatListHeader = () => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', padding: 30 }}>
                <View>
                    <Text style={styles.semibold_17_black}> Timings</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                    onPress={() => setShowRepeatModal(false)}
                >
                    <Image source={imagesFile.ic_cross} />
                </TouchableOpacity>
            </View>
        )
    }
    const Footer = () => {
        return (
            <View >
                <TouchableOpacity style={{ borderWidth: 1, height: 54, justifyContent: 'center', alignItems: 'center', marginBottom: 30, marginHorizontal: 18, borderRadius: 18, backgroundColor: Colors.blue }}
                    onPress={() => setShowRepeatModal(false)}
                >
                    <Text style={styles.semibold_14_white}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={{ marginHorizontal: 30, flexDirection: 'row', marginBottom: 25, padding: 5 }}
            onPress={() => props.SelectDays(item.day, index)}
        >
            <View>
                <Text style={styles.medium_17_black}>{item.day}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View>
                <Image source={checkValidate(item.day) ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
        </TouchableOpacity>
    )

    return (

        <Modal
            animationType="slide"
            visible={props.visible}
            transparent={true}>
            <View style={styles.modelmainview}>
                <View style={styles.container}>
                    {!showRepeatModal ?
                        <View style={styles.innercontainer}>
                            <View style={styles.timingmainview}>
                                <Text style={styles.semibold_17_black}> Timings</Text>
                                <View style={{ flex: 1 }}></View>
                                <TouchableOpacity onPress={props.cancelModal}>
                                    <View>
                                        <Image source={imagesFile.ic_cross} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View >
                                    <DatePicker
                                        style={{ width: windowWidth }}
                                        date={new Date(date)}
                                        onDateChange={(date) => props.onStartDateChange(date)}
                                        mode="time"
                                        dividerHeight={5}
                                    />
                                </View>
                                <View>
                                    <Text style={styles.semibold_17_black}>{'To'}</Text>
                                </View>
                                <View >
                                    <DatePicker
                                        style={{ width: windowWidth }}
                                        date={new Date(endDate)}
                                        onDateChange={(date) => props.onEndDateChange(date)}
                                        mode="time"
                                        dividerHeight={5}
                                    />
                                </View>
                                <View style={styles.sepratorView}></View>
                            </View>

                            <View>
                                <TouchableOpacity
                                    onPress={() => setShowRepeatModal(true)}
                                >
                                    <View style={styles.repeatextview}>
                                        <View>
                                            <Text style={styles.semibold_17_black}>Repeat</Text>
                                        </View>
                                        <View style={{ flex: 1 }}></View>
                                        <View>
                                            <Image source={imagesFile.ic_rightIndicator} />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button}
                                    onPress={() => props.doneModal(date, endDate)}
                                >
                                    <Text style={styles.semibold_14_white}>Done</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        :
                        <View  >
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                                ListHeaderComponent={<FlatListHeader />}
                                ListFooterComponent={<Footer />}
                                extraData={props.extDate}
                            />
                        </View>
                    }
                </View>
            </View>
        </Modal>
    );
};

export default TimingModal;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 25,
        overflow: 'hidden',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.white,
    },
    modelmainview: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        alignItems: 'center',
    },
    innercontainer: {
        // marginHorizontal: 20,
    },
    timingmainview: {
        marginHorizontal: 20,
        flexDirection: 'row',
        paddingTop: 29,
        justifyContent: 'center',
        alignItems: 'center'
    },
    repeatextview: {
        marginHorizontal: 20,
        flexDirection: 'row',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 28,
        backgroundColor: '#3B22F8',
        height: 54,
        marginBottom: 30,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    semibold_17_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.black
    },
    semibold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    sepratorView: {
        borderWidth: 0.5,
        borderColor: '#707070',
        marginTop: 30,
        marginBottom: 25,
        opacity: 0.2,
    },
    medium_17_black: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 17,
        color: Colors.black
    }
});

