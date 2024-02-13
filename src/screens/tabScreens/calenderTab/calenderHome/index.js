import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Alert } from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import AppHeader from '../../../commonComponents/AppHeader';
import { Colors, Fonts } from '../../../../utils/Constants'
import { Calendar } from 'react-native-calendars';
import CalenderCard from '../../../commonComponents/CalenderCard';
import { useNavigation } from '@react-navigation/native';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import { Get_Events } from '../../../../apiManager/calender/index';
import FlatListHeader from './FlatListHeader';
import Loader from '../../../commonComponents/Loader';
import moment from 'moment';
import FlatListFooter from './FlatListFooter';
const DATA = [{ id: 0 }]
const CalenderHomeScreen = () => {
    const navigation = useNavigation()
    const [dateObj, setDateObj] = useState({})
    const [loader, setLoader] = useState(false)
    const [newDate, setNewDate] = useState(new Date())
    const [eventList, setEventList] = useState([])
    const [appointment, setAppointment] = useState({})
    useEffect(() => {
        console.log("NewDate=======", moment(newDate).format("YYYY-MM-DD"))
        let formateDate = moment(newDate).format("YYYY-MM-DD")
        Get_Today_Activity(formateDate)
    }, [])

    const Get_Today_Activity = (formateDate) => {
        // console.log('formateDate: -==-=--=-=--=-=', formateDate);
        let raw = JSON.stringify({ "date": formateDate });
        setLoader(true)
        Get_Events(raw).then((response) => {
            // console.log('response: ************', response);
            if (response.status == 200) {
                setEventList(response.data.programResult)
                setAppointment(response.data?.appointmentData)
                console.log('response.data?.appointmentData: -=-==-=-=-=--=-=-', response.data?.appointmentData);
                // console.log("Calenderesponse====", response)
                setLoader(false)
            }

        }).catch((error) => {
            setLoader(false)
            console.log("activityErr=========", error)
        })
    }
    const onSelectDate = (date) => {
        Get_Today_Activity(date)
        console.log("selectedDate=======", date)
    }
    const onSelectEvent = (activityType, activityValue, activityId) => {
        console.log("EventType=========", activityType)
        if (activityType == "Workout") {
            navigation.navigate("WorkoutLibrary1", { name: activityValue, id: activityId, type: 'my' })
        } else if (activityType == "Nutrition") {
            navigation.navigate("NutritionDetail", { name: activityValue, id: activityId, type: "my" })
        } else if (activityType == "Rest Day") {

        } else if (activityType == "Appointment") {
            navigation.navigate('AppointmentScreen')
        } else if (activityType == "Update Measurement") {
            navigation.navigate('BodyMeasurementScreen')
        } else if (activityType == "Add Progress Photo") {
            navigation.navigate('ProgressPhotoScreen')
        }
    }

    const renderItem = ({ item }) => (
        <CalenderCard onPress={(activityType, activityValue, activityId) => onSelectEvent(activityType, activityValue, activityId)} item={item} />
    )

    const EmptyComponent = () => {
        return (
            <View style={{ alignSelf: 'center', flex: 1 }}>
                <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 20, color: Colors.inputGrey, paddingVertical: 50 }}>No event found..</Text>
            </View>
        )
    }

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={eventList}
                        ListHeaderComponent={<FlatListHeader onSelectDate={(date) => onSelectDate(date)} />}
                        ListEmptyComponent={<EmptyComponent />}
                        ListFooterComponent={<FlatListFooter appointment={appointment} onPress={(index) => navigation.navigate('AppointmentScreen', { appointment: appointment[index] })} />}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 100 }}
                        keyExtractor={item => item.id}
                    />
                </View>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        </>
    )
}
export default CalenderHomeScreen;