import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Image,
    Modal,
    ImageBackground,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Colors, Fonts } from '../../../../../utils/Constants'
import imagesFile from '../../../../../../assets/imagesFile';
import Card_Notifications from '../../../../commonComponents/Notification_car'
import MyStatusBar from '../../../../commonComponents/MyStatusBar';
import AppHeader from '../../../../commonComponents/AppHeader';
import { Delete_ALL_Notification, Delete_Notification, GET_Notification, Mark_Notification_As_Read } from '../../../../../apiManager/notifications';
import Loader from '../../../../commonComponents/Loader';


const Notification = ({ navigation }) => {
    const [notifModal, setNotifModal] = useState(false)
    const [notifData, setNotifData] = useState({})
    const [notificationsList, setNotificationsList] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        const onFocus = () => {
            Fetch_Notification()
        };
        const unsubscribe = navigation.addListener('focus', onFocus);
        return () => {
            // Clean up the listener when the component is unmounted
            unsubscribe();
        };
    }, [navigation]);

    const Fetch_Notification = () => {
        setLoader(true)
        GET_Notification().then((response) => {
            if (response.status == 200) {
                // console.log("Fetch_Notification_RSP=", response?.data?.notifications)
                setLoader(false)
                setNotificationsList(response.data.notifications)
            } else {
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("Fetch_Notification_RSPsErr========", error)
        })
    }
    const Delete_A_Notification = (_id) => {
        setLoader(true)
        Delete_Notification(_id).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                // setFormList(response.data.forms)
                Fetch_Notification()
            } else {
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("notific remove===", error)
        })
    }
    const Delete_All_Notification = (_id) => {
        setLoader(true)
        Delete_ALL_Notification().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                // setFormList(response.data.forms)
                Fetch_Notification()
            } else {
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("notific remove===", error)
        })
    }
    const Notification_Read = (item) => {
        setLoader(true)
        Mark_Notification_As_Read(item).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                Fetch_Notification()
            } else {
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("notific===", error)
        })
    }
    const handleModalNotif = (item) => {
        setNotifData(item)
        setNotifModal(true)
        Notification_Read(item)
    }
    const handleRemoveNotification = (item, rowMap) => {
        Delete_A_Notification(item?.item?._id)
        rowMap[item.index].closeRow()
    }

    const handleRemoveAllNotification = (id) => {
        const Data = {
            user: id
        }
        Alert.alert(
            "Warning",
            "Are you sure you want to clear all the notifications?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        Delete_All_Notification()
                        setNotifModal(false)
                    },
                    // onPress: () => removeAllNotification(Data),
                },
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
            ],
            { cancelable: true }
        );
    }

    const EmptyComponent = () => {
        return (
            <View
                style={{
                    alignSelf: 'center',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                }}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontFamily: Fonts.gilroy_Bold,
                        fontSize: 20,
                        color: Colors.inputGrey,
                        paddingVertical: 50,
                    }}>No Notifications available..</Text>
            </View>
        );
    };

    const handleNavigation = (item) => {
        const route = item?.notificationModel
        setNotifModal(false)
        console.log(item)

        if (route == 'ClientTrainer') {
            navigation.navigate('TrainerHomeScreen')
        }
        if (route == 'ClientCommunity') {
            navigation.navigate('CommunityHomeScreen')
        }
        if (route == 'ClientCommunityPost') {
            navigation.navigate('CommunityHomeScreen')
        }
        if (route == 'ClientWorkout') {
            navigation.navigate('MyWorkout')
        }
        if (route == 'ClientNutrition') {
            navigation.navigate('MyNutritions')
        }
        if (route == 'ClientHabit') {
            navigation.navigate('HabitScreen')
        }
        if (route == 'ClientFiles') {
            navigation.navigate('MyFilesScreen')
        }
        if (route == 'ClientsForm') {
            // navigation.navigate('FormDetailScreen', { title: item.formId.title, FormId: item._id, TrainerId: item.trainerId._id, businessId: item.businessId })
            navigation.navigate('FormScreen')
        }
        if (route == 'ClientUser') {
            navigation.navigate('MyProfille')
        }
        if (route == 'Package') {
            navigation.navigate('PackageCardDetails')
        }
        if (route == 'ClientProgram') {
            // navigation.navigate('Programs')
            navigation.navigate("ProgramDetails", { id: item?.entity?.entityId, heading: item.title, type: 'my' })
        }
        if (route == 'Appointment') {
            navigation.navigate('AppointmentScreen')
        }
    }

    const notifications = notificationsList ?? []
    let userId = notifications && notifications?.length > 0 && notifications[0]?.user?.userId
    // console.log(notifications, 'notifications', userId)
    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <AppHeader Heading="Notifications" onPress={() => navigation.goBack()} />
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    {/* <Header1
                        headerText="Notifications"
                        onPress={() => navigation.navigate('Notifications')}
                        functionPropName={() => navigation.navigate('cart')}
                        handleBackPress={() => navigation.goBack()}
                    /> */}
                    {true && (
                        <>
                            <View style={styles.containerBox}>

                                {notifications && notifications.length > 0 ? <TouchableOpacity onPress={() => handleRemoveAllNotification(userId)}
                                    style={styles.viewallBtn}>
                                    <View style={styles.clearbutton}>
                                        <Text style={styles.clearbuttontext}>Clear all</Text>
                                    </View>
                                </TouchableOpacity> : null}

                                <>
                                    <View style={[styles.inputView, { marginTop: 10 }]}>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.petListContainer}>
                                                <SwipeListView
                                                    data={notifications}
                                                    showsVerticalScrollIndicator={false}
                                                    keyExtractor={(item, index) => index.toString()}
                                                    renderItem={({ item, index }) => {
                                                        return (
                                                            <Card_Notifications
                                                                data={item}
                                                                key={index}
                                                                showDescription={(e) => { handleModalNotif(e) }}
                                                                navigationProp={(e, data) =>
                                                                    navigation.navigate(e, data)
                                                                }
                                                            />
                                                        );
                                                    }}
                                                    ListEmptyComponent={<EmptyComponent />}
                                                    renderHiddenItem={(item, rowMap) => (
                                                        <View style={styles.rowBack}>
                                                            <TouchableOpacity
                                                                onPress={() => rowMap[item.index].closeRow()}>
                                                                <View style={styles.actionButtonStyle}>
                                                                    <Image source={imagesFile.ic_close}
                                                                        style={{ width: 16, height: 16 }}
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                            <TouchableOpacity onPress={() => handleRemoveNotification(item, rowMap)}>
                                                                <View style={styles.actionButtonStyle}>
                                                                    <Image source={imagesFile.ic_delete}
                                                                        style={{ width: 20, height: 20 }}
                                                                    />
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )}
                                                    rightOpenValue={-100}
                                                />
                                            </View></View>
                                    </View>
                                </>

                            </View>
                        </>
                    )}
                </SafeAreaView>
                {/* Edit Modal */}
                <Modal
                    visible={notifModal}
                    animationType="slide"
                    onRequestClose={() => setNotifModal(false)}
                    transparent={true}
                >
                    <View style={styles.editModalContainer}>
                        <View style={styles.editModalView}>
                            <View style={styles.editModalHeader}>
                            </View>
                            <View style={styles.innerInputContainer}>
                                <View style={[styles.inputView1, {}]}>
                                    <View style={[styles.inputView1,]}>

                                    </View>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => setNotifModal(false)}
                                            style={styles.editModalCloseIcon}
                                        >
                                            <Image source={imagesFile.ic_close}
                                                style={{ width: 12, height: 12 }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={[styles.inputView3,]}>
                                    <View style={[styles.inputView2, { marginTop: 14 }]}>
                                        <Text style={styles.titile}>{notifData?.title}</Text>
                                    </View>
                                    <View style={[styles.inputView2,]}>
                                        <Text style={styles.details}>{notifData?.message}</Text>
                                    </View>
                                    <View style={[styles.inputView2, { marginRight: 0 }]}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                handleNavigation(notifData)
                                            }}
                                            style={styles.editModalCloseIcon1}
                                        >
                                            <Text style={styles.closeButtonStyle}>View</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
            {loader && <Loader />}
        </>
    )
}

export default Notification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    background: {
        width: '100%',
        height: '100%',
    },
    backRightBtn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 12,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // paddingRight: 0,
    },
    actionButtonStyle: {
        // backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: 46,
        height: '100%'
        // padding: 10,
    },
    scrollView: {
        marginHorizontal: 0,
        // backgroundColor: 'red'
    },
    contentView: {
        paddingVertical: 10,
    },
    innerInputContainer: {
        padding: 15
    },
    closeButtonStyle: {
        color: '#fff',
        fontSize: 16,
        paddingVertical: 4,
    },
    noDataFound: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#08138C',
        paddingTop: 10,
        marginTop: 20,
    },
    inputView1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputView2: {
        marginVertical: 4,
        flexDirection: "row",
        borderColor: '#ddd',
        alignItems: 'center',
        // borderBottomWidth: 0.6,
    },
    inputView3: {
        alignItems: 'center',
    },
    headerContainer: {
        //   marginBottom:10
    },
    headerTitle: {
        fontSize: 18,
        fontFamily: Fonts.gilroy_SemiBold,
        color: '#1C1C1C',
    },
    containerBox: {
        padding: 5,
        // marginTop: 5,
        paddingBottom: 110,
        // marginBottom: 205,
    },
    viewallBtn: {
        // paddingRight: 4,
        marginRight: 10,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    clearbutton: {
        backgroundColor: 'rgba(26, 58, 127, 0.4)',
        borderRadius: 20,
        width: '20%',
        // height: 27,
        padding: 6,
        // paddingHorizontal: 4,

    },
    clearbuttontext: {
        color: 'white',
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        alignItems: 'center',
        textAlign: 'center',
    },
    tabbadgecolor: {
        backgroundColor: '#F99E0C',
        right: -13,
        position: 'absolute',
        top: -4,
        width: 16,
        height: 16,
    },
    tabbadgecoloractive: {
        backgroundColor: '#F99E0C',
        color: '#fff',
    },
    topBox: {},
    inputLabel: {
        color: 'gray',
        // color: Colors.PRIMARY,
        fontSize: 16,
        paddingVertical: 10

    },
    details: {
        color: 'gray',
        // color: Colors.PRIMARY,
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 4

    },
    titile: {
        fontFamily: Fonts.gilroy_SemiBold,
        // fontWeight: Typography.FW_SEMIBOLD,
        color: '#1C1C1C',
    },
    topBoxTxt0: {
        color: Colors.PRIMARY,
        // fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        fontSize: 25,
    },

    // Tabbing style open here //
    Favoritestabbar: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    segmentView: {
        borderRadius: 15,
        position: 'absolute',
        top: -30,
        zIndex: 20,
        width: '85%',
        margin: 0,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },

    tabsContainerStyle: {
        borderRadius: 25,
        backgroundColor: Colors.GRAY_LIGHT,
        overflow: 'hidden',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 5,

    },

    tabStyle: {
        borderColor: 'transparent',
        backgroundColor: 'transparent',
    },

    tabTextStyle: {
        // fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        fontSize: 14,
        color: Colors.PRIMARY_TEXT,
        textAlign: 'center'
    },

    activeTabStyle: {
        color: '#08138C',
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 5,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        shadowOffset: { width: 0.2, height: 0.2 },
        shadowColor: Colors.PRIMARY,
        shadowOpacity: 0.1,
        elevation: 1.6,
    },

    activeTabTextStyle: {
        color: '#08138C',
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
    },
    Button2: {
        width: '100%',
    },

    // Tabbing style close here //

    modalContainer: {
        width: '100%'
    },
    centeredView: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginTop: 50
    },
    modalView: {
        backgroundColor: '#F4F4F4',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingVertical: 40,
    },
    genderBtnContainer: { paddingTop: 20 },
    inputBox: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 18,
        textAlignVertical: 'top',
        paddingLeft: 20,
        alignContent: 'flex-start',
        paddingTop: 10,
        height: 40,
    },
    inputboxmain: {
        width: '100%',
    },
    ctaBtnRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    ctaBtn: {
        // marginTop: 15,
        alignItems: 'center',
        backgroundColor: Colors.PRIMARY,
        borderRadius: 25,
        padding: 10,

        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    ctaBtnTxt: {
        // fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        color: '#fff',
        // color: Colors.WHITE,
        fontSize: 18,
    },
    /* Empty condition style open */

    empContainer: {
        padding: 15,
        paddingTop: 50,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    empImgView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    empImg: {

    },

    empHead: {
        color: '#08138C',
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        fontSize: 23,
        textAlign: 'center',
        marginTop: 0,
        marginBottom: 15,
        width: '60%',
        lineHeight: 32
    },

    empTxt: {
        color: '#4F4F4F',
        fontFamily: Fonts.gilroy_Regular,
        // fontWeight: Typography.FW_REGULAR,
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        width: 280,
    },

    empBtnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    empBtn: {
        alignItems: 'center',
        backgroundColor: '#F99E0C',
        borderRadius: 12,
        padding: 6,
        marginBottom: 15,
        marginTop: 15,
        width: 100,
    },

    empBtnTxt: {
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        color: 'white',
        fontSize: 14,
    },
    editModalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        padding: 20,
    },
    editModalView: {
        backgroundColor: "#fff",
        padding: 10,
        justifyContent: "center",
        borderRadius: 10,

    },
    editModalHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    editModalHeaderText: {
        fontFamily: Fonts.gilroy_Medium,
        // fontWeight: Typography.FW_MEDIUM,
        fontSize: 18,
        marginTop: 4,
        color: "#000",
    },
    editModalCloseIcon: {
        backgroundColor: "#fff",
        padding: 6,
        // paddingVertical: 8,
        // marginTop: 4,
        borderRadius: 5,
        elevation: 1.6,
        shadowColor: Colors.PRIMARY,
        shadowOffset: { width: 0.2, height: 0.2 },
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.1
    },
    editModalCloseIcon1: {
        backgroundColor: Colors.blue,
        padding: 4,
        paddingVertical: 4,
        width: '50%',
        marginTop: 8,
        borderRadius: 5,
        elevation: 1.6,
        shadowColor: Colors.blue,
        shadowOffset: { width: 0.8, height: 0.3 },
        justifyContent: "center",
        alignItems: "center",
        shadowOpacity: 0.1
    },

    /* Empty condition style close */
});