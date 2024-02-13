import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, SectionList, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import WeekHeader from './WeekHeader';
import { styles } from './programDetailStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import Weekspopup from './WeeksPopup';
import { Mark_As_Done } from '../../../../../../../apiManager/program/index';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import Loader from '../../../../../../commonComponents/Loader';
let ColorsPresent = [
    {
        type: 'Workout',
        color: Colors.yell
    },
    {
        type: 'Nutrition',
        color: Colors.nutritionColor
    },
    {
        type: 'Appointment',
        color: Colors.appointment
    },
    {
        type: 'Update Measurement',
        color: Colors.black
    },
    {
        type: 'Progress Photo',
        color: Colors.progressPhoto
    },
    {
        type: 'Rest Day',
        color: Colors.restBlue
    },

]
const Weeks = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const [weeklyData, setWeeklyData] = useState([])
    const [heading, setHeading] = useState(route?.params?.heading)
    const [programId, setProgramId] = useState(route?.params?.programId)
    const [loader, setLoader] = useState(false)
    const [extraData, setExtraData] = useState(new Date())

    useEffect(() => {
        console.log("routeParams=========", route?.params)
        route?.params?.data?.day.forEach(element => {
            if (element['dayName'] || element['activity']) {
                element['title'] = element['dayName'];
                element['data'] = element['activity']

                delete element['dayName'];
                delete element['activity']
            }

        });
        // setWeeklyData(route?.params?.data?.day)
        setWeeklyData(route?.params?.data?.day)
        console.log('Weeks=========', route?.params?.data?.day)
    }, [])

    const onNavigationCheck = (activityType, activityValue, activityId, title) => {
        console.log('title:***********', title);
        if (activityType == 'Workout') {
            navigation.navigate("WorkoutLibrary1", { name: activityValue, id: activityId, type: 'my' })
        } else if (activityType == 'Nutrition') {
            navigation.navigate("NutritionDetail", { name: activityValue, id: activityId, type: "my" })
        } else if (activityType == 'Update Measurement') {
            navigation.navigate('BodyMeasurementScreen')
        } else if (activityType == 'Add Progress Photo') {
            navigation.navigate('ProgressPhotoScreen')
        }
        // else if (activityType == 'Appointment') {
        //     navigation.navigate('AppointmentScreen',)
        // }
    }

    // const onMarkAsDone = (activityId) => {
    //     if (activityId != null) {
    //         let arr1 = weeklyData
    //         var isChecked = false;
    //         arr1.forEach(element => {
    //             element.data.forEach(element => {
    //                 if (element.activityId == activityId) {
    //                     if (element.doneStatus == false) {
    //                         element.doneStatus = true
    //                         isChecked = true
    //                     } else {
    //                         element.doneStatus = false
    //                         isChecked = false
    //                     }
    //                 }
    //             });
    //         });
    //         setWeeklyData([...arr1])
    //         console.log("UpdateArr=======", arr1)
    //         let raw = JSON.stringify({
    //             "programId": programId,
    //             "doneStatus": isChecked
    //         })
    //         setLoader(true)
    //         Mark_As_Done(raw, activityId).then((response) => {
    //             if (response.status == 200) {
    //                 console.log("responseMark======", response)
    //                 setLoader(false)
    //                 Toaster(response.message)
    //             }
    //         }).catch((error) => {
    //             setLoader(false)

    //             console.log("markDoneErr======", error)
    //         })
    //     } else {
    //         Alert.alert("ActivityId Null")
    //     }
    // }

    const onMarkAsDone = (id, index) => {
        let arr1 = weeklyData
        var isChecked = false;
        console.log("SelectedElementId=========", id)
        arr1.forEach(element => {
            element.data.forEach(activity => {
                if (activity._id == id) {
                    console.log("selectedActivity========", activity)
                    if (activity.doneStatus == false) {
                        activity.doneStatus = true
                        isChecked = true
                    } else {
                        activity.doneStatus = false
                        isChecked = false
                    }
                }
            });

        });
        setWeeklyData(arr1)
        setExtraData(new Date())
        // let raw = JSON.stringify({
        //     "programId": programId,
        //     "doneStatus": isChecked
        // })
        var raw = JSON.stringify({ "programId": programId, "doneStatus": isChecked });
        setLoader(true)
        Mark_As_Done(raw, id).then((response) => {
            if (response.status == 200) {
                console.log("responseMark======", response)
                setLoader(false)
                Toaster(response.message)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("markDoneErr======", error)
        })
    }

    const RenderItem = ({ title, index }) => {
        console.log("activityItem========", title)
        return (
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginVertical: 5,
                    height: 44,
                    borderRadius: 7,
                    backgroundColor:
                        title.activityType == 'Workout'
                            ? Colors.yell
                            : title.activityType == 'Nutrition'
                                ? Colors.nutritionColor
                                : title.activityType == 'Add Progress Photo'
                                    ? Colors.progressPhoto
                                    : title.activityType == 'Update Measurement'
                                        ? Colors.black
                                        : title.activityType == 'Appointment' ? Colors.appointment :
                                            Colors.restBlue,
                    marginHorizontal: 18,
                    marginTop: 5,
                    justifyContent: 'center',
                    paddingHorizontal: 20,
                }}>
                <View>
                    <Text style={styles.semibold_10_white}>{title.activityValue}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                {title.doneStatus ? (
                    <View style={{ marginRight: 10 }}>
                        <Image source={imagesFile.ic_blueTick} />
                    </View>
                ) : null}
                <View>
                    <Weekspopup
                        type={route?.params?.type}
                        tab1={title.doneStatus == false ? 'Mark as done' : 'Mark as undone'}
                        tab2="View detail"
                        onSelectViewDetail={() =>
                            onNavigationCheck(
                                title.activityType,
                                title.activityValue,
                                title.activityId,
                                title
                            )
                        }
                        onSelectMarkAsDone={() => onMarkAsDone(title._id, index)}
                    />
                </View>
            </View>
        );
    }
    const Footer = () => {
        return (
            <View style={{ height: 80 }}></View>
        )
    }

    // const renderLanguages = ({ item }) => (
    //     <View style={{

    //             borderRadius: 20,
    //         height: 38,
    //         width: 92,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         marginRight: 10,
    //         backgroundColor:Colors.inputGrey
    //     }}>
    //       <Text style={{
    //           bold_11_black:{
    //             fontFamily:Fonts.gilroy_Bold,
    //             fontSize:11,
    //             color:Colors.black
    //           }
    //       }}>{item}</Text>
    //     </View>
    //   );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>
                <SectionList
                    sections={weeklyData}
                    ListHeaderComponent={<><WeekHeader heading={heading} />
                        {/* <FlatList
                    numColumns={3}
                    data={ColorsPresent}
                    ItemSeparatorComponent={()=><View style ={{marginTop:10}}></View>}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderLanguages}
                    keyExtractor={item => item.id}
                  /> */}
                    </>
                    }
                    keyExtractor={(item, index) => item + index}
                    extraData={extraData}
                    renderItem={({ item, index }) => <RenderItem title={item} index={index} />}
                    renderSectionHeader={({ section: { title, dayNameNew } }) => (
                        console.log("SecHeader=======", title),
                        <View style={{ marginHorizontal: 18, marginVertical: 10 }}>
                            <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 16, color: Colors.black }} >{title + " - " + dayNameNew}</Text>
                        </View>
                    )}
                    ListFooterComponent={<Footer />}
                />
            </View>
            {loader ? <Loader /> : null}
        </SafeAreaView >
    )
}
export default Weeks;
