import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import AppHeader from '../../../commonComponents/AppHeader';
import { AppointmentConstants } from '../CalenderConstants';
import { Colors, Fonts } from '../../../../utils/Constants';
import CommonCard from './CommonCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
const AppointmentScreen = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const bottomTabHeight = useBottomTabBarHeight()
    const [appointment, setAppointment] = useState(route?.params?.appointment)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                <AppHeader Heading={AppointmentConstants.APPOINTMENT} onPress={() => navigation.goBack()} />
                <View>
                    <CommonCard Title={AppointmentConstants.APPOINTMENT_TITLE} value={appointment?.title} />
                </View>
                <View>
                    <CommonCard Title={AppointmentConstants.DATE} value={moment(appointment?.startDate).format('DD-MM-YYYY')} />
                </View>
                <View>
                    <CommonCard Title={AppointmentConstants.TIME} value={moment(appointment?.startTime).format('hh:mm') + ' | ' + moment(appointment?.endTime).format('hh:mm')} />
                </View>
                <View>
                    <CommonCard Title={AppointmentConstants.REPEAT} value={appointment?.repeat} />
                </View>
                {appointment?.appointmentType == 'Virtual' ?
                    <TouchableOpacity
                        onPress={() => Linking.openURL(appointment?.meetingUrl ? appointment?.meetingUrl : `https://${appointment?.meetingUrl}`)}
                    >
                        <CommonCard Title={AppointmentConstants.MEETING_URL} value={appointment?.meetingUrl} />
                    </TouchableOpacity>
                    :
                    <CommonCard Title={AppointmentConstants.MEETING_URL} value={"In-Person"} />
                }


                <View style={{ marginBottom: bottomTabHeight }}>
                    <CommonCard Title={AppointmentConstants.DESCRIPTION} value={appointment?.description} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AppointmentScreen;