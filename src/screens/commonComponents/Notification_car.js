import { View, StyleSheet, Text, TouchableOpacity, Image, Modal } from 'react-native';
import React from 'react';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';

var moment = require('moment');

const NotificationsCard = props => {
    const item = props.data;
    // const dateAdded = item?.date_add

    const abc = Object.entries(item).map(([key, val]) => {
        if (key === "date_add") {
            return val;
        }
    }).filter((val) => val !== undefined)

    const today = moment();
    const someday = moment(...abc).format('YYYY-MM-DD HH:mm:ss');
    let dayDiff = today.diff(someday, 'days');
    const startTime = moment(someday);
    const endTime = moment(today);
    const miliseconds = endTime.diff(startTime);
    const totalTimeOfStudy = moment.utc(miliseconds).format('HH:mm:ss');
    var newww = totalTimeOfStudy.split(':').map((e) => +e);
    const [hour, min, sec] = newww;

    // console.log(dayDiff, 'days ago');

    const timeAgos = () => {
        return {
            day: dayDiff && dayDiff,
            hour: hour && hour,
            min: min && min
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.showDescription(item)}
            style={[styles.petCardContainer, item.counter ? styles.boxcolorchange : null]}>
            <View style={styles.cardbooking}>
                <View style={styles.detailContainer}>
                    {item.isCompleted == true || <View style={styles.countbox}></View>}
                    <View style={styles.detailRow}>
                        <View style={styles.detailCol}>
                            <View style={[styles.colContainer, { flexDirection: 'row' }]}>
                                <View style={[{ width: '71%', flexDirection: 'row', }]}>
                                    <Image source={imagesFile.ic_notification}
                                        style={{
                                            width: 12,
                                            height: 12,
                                            marginRight: 4,
                                            marginTop: 2,
                                        }}
                                    />
                                    <Text style={styles.nameproducts}>{item.title}</Text>
                                </View>
                                <View style={{
                                    width: '28%',
                                    alignContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-end',
                                    flexDirection: 'row'
                                }}>
                                    <Image source={imagesFile.ic_clock}
                                        style={{
                                            marginTop: 2,
                                            width: 10,
                                            height: 10
                                        }}
                                    />
                                    <Text style={styles.date}>{moment(item.createdAt).format('DD MMM, hh:mm a')}</Text>
                                    {/* {timeAgos().day ? <Text style={styles.date}>{timeAgos().day} day(s) ago</Text> :
                                        timeAgos().hour ? <Text style={styles.date}>{timeAgos().hour} hour(s) ago</Text> :
                                            timeAgos().min ? <Text style={styles.date}>{timeAgos().min} minutes ago</Text> : null} */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingLeft: 10, paddingTop: 4 }}>
                        <Text numberOfLines={1} style={styles.nameTextmap}>{item.message}</Text>
                    </View>
                </View>

            </View>
        </TouchableOpacity >
    );
};


export default NotificationsCard;

const styles = StyleSheet.create({
    petCardContainer: {
        margin: 8,
        padding: 8,
        borderRadius: 12,
        justifyContent: 'center',
        shadowColor: '#7f7f7f',
        backgroundColor: '#fff',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1.6,
        paddingBottom: 0,
        paddingTop: 0,
    },
    optionIcon: {
        marginRight: 6,
        marginTop: 2,
    },
    boxcolorchange: {
        margin: 10,
        padding: 8,
        borderRadius: 12,
        justifyContent: 'center',
        shadowColor: '#7f7f7f',
        backgroundColor: '#F1FAFF',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        elevation: 1.6,
        paddingBottom: 0,
        paddingTop: 0,
    },
    petImageContainer: {
        width: '20%',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 0,
    },
    imageStyle: {
        width: '100%',
        borderRadius: 10,
        height: 70,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    settingContainer: {
        borderRadius: 30,
        elevation: 1.6,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: Colors.PRIMARY,
        shadowOpacity: 0.1,
        width: 35,
        height: 35,
        backgroundColor: '#FFF',
        position: 'absolute',
        right: 10,
        justifyContent: 'center',
        alignItems: 'center',
        top: -30,
    },
    detailContainer: {
        paddingVertical: 0,
        width: '100%',
        paddingTop: 8,

    },
    mapicon: {
        marginRight: 5,
    },
    headerContainer: {
        paddingVertical: 5,
    },
    cardbooking: {
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        // flexWrap: 'wrap',
        paddingVertical: 12,
    },
    nameText: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#08138C',
    },
    nameTextmap: {
        fontSize: 12,
        fontFamily: Fonts.gilroy_Regular,
        color: '#4F4F4F',
    },
    nameTextstar: {
        fontSize: 15,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#4F4F4F',
    },
    namefromename: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#F99E0C',
        paddingBottom: 3,
        textDecorationLine: 'line-through',
        textDecorationStyle: 'solid',
        textDecorationColor: '#F99E0C',
    },
    namefromename2: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#F99E0C',
        paddingBottom: 3,
    },
    namepricename: {
        fontSize: 15,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#000',
    },

    nameproducts: {
        fontSize: 12,
        textAlign: 'left',
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#1C1C1C',
        maxWidth: '90%',
        // backgroundColor: 'red'
    },
    breedText: {
        fontSize: 12,
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        color: '#1C1C1C',
    },
    detailRow: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    detailCol: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    detailCol1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '10%'
    },
    colContainer: {
        justifyContent: 'center',
        // alignItems: 'center',
        width: "100%",
        maxWidth: "100%",
    },
    colContainer1: {
        width: '26%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    footerContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    vacBtn: {
        padding: 0,
        backgroundColor: '#24BBA6',
        borderRadius: 20,
        paddingHorizontal: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    vacIdTxt: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#696969',
    },
    vacBtnTxt: {
        fontSize: 14,
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#FFF',
    },
    datetimebox: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 5,
        width: '100%',
        margin: 2,
        marginTop: 5,
    },
    btnContainer: {
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '100%',
        marginBottom: -5,
    },
    ctaBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    ctaBtn: {
        // marginTop: 15,
        alignItems: 'center',
        backgroundColor: '#EE4023',
        borderRadius: 12,
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 40,
        paddingRight: 40,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15,
    },

    ctaBtnTxt: {
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        color: Colors.WHITE,
        fontSize: 15,
    },
    pricebox: {
        paddingTop: 5,
    },
    date: {
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        // textAlign: 'right',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        color: '#4D4D4D',
        fontSize: 10,
        // paddingTop: 7
        paddingLeft: 2,
        // paddingRight: -10,
    },
    countbox: {
        backgroundColor: '#F99E0C',
        width: 7,
        height: 7,
        borderRadius: 50,
        paddingTop: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        position: 'absolute',
        top: -5,
        right: 0
    },
})