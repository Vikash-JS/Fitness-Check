import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView, Image, StyleSheet, FlatList } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { HabitsScreenConstants } from '../habitsConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { Calendar } from 'react-native-calendars';
import { Colors, Fonts } from '../../../../../../../utils/Constants'
import { Get_MyHabits, Get_MyHabit_ById } from '../../../../../../../apiManager/habit/index';
import Loader from '../../../../../../commonComponents/Loader';
import moment from 'moment';
import {Get_Home_Adds} from '../../../../../../../apiManager/ads/index';
const HabitDetailScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [dateObj, setDateObj] = useState({})
    const [habitId, setHabitId] = useState(route.params.id)
    const [type, setType] = useState(route.params.type)
    const [habitDetail, setHabitDetail] = useState({})
    const [loader, setLoader] = useState(false)
    const [adsUri,setAdsUri] = useState('')

    useEffect(() => {
        console.log("HabitId==========", habitId)
        console.log("type===========", type)
        habitDetail_Api()
        GetAds()
    }, [])

    const GetAds = ()=>{
        var raw = JSON.stringify({ "place": "Habits", "panel": "Customer" });
        Get_Home_Adds(raw).then((response)=>{
            if (response.status == 200) {
                setAdsUri(response.data.adsData[0].image.url)
                console.log("ProAdsresp========", response)
            }
        }).catch((error)=>{
            console.log("programAddErr========",error)
        })
    }

    const habitDetail_Api = () => {
        setLoader(true)
        Get_MyHabit_ById(habitId, type).then((response) => {
            if (response.status == 200) {

                setLoader(false)
                console.log("HabitDetail=========", response)
                setHabitDetail(response.data.habit)
                let obj1 = {}
                response.data.habit.activity.forEach(element => {
                    console.log("activityDetail=======", element.createdAt)
                    let key = moment(element.createdAt).format('YYYY-MM-DD');
                    obj1[key] = { marked: true, selected: true, selectedColor: 'blue' }
                });
                setDateObj(obj1)
            }

        }).catch((error) => {
            setLoader(false)
            console.log("habitDetailErr=======", error)
        })
    }

    const renderTimeSlot = ({item})=>(
        <View style={{padding:8,marginVertical:5,borderRadius:5,backgroundColor:Colors.inputGrey}}>
            <Text style={styles.semibold_12_black}>{item.time}</Text>
        </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:Colors.white}}>
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <AppHeader Heading={HabitsScreenConstants.HABITS_DETAILS} onPress={() => navigation.goBack()} />
                </View>
                <View>
                    <Image style={{ width: "100%",height:110 }} source={{uri:adsUri}} />
                </View>
                <View style={{ marginLeft: 20 }}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.semibold_12_opacity}>{HabitsScreenConstants.HABIT_NAME}</Text>
                    </View>
                    <View style={{ marginTop: 6 }}>
                        <Text style={styles.bold_20_black}>{habitDetail?.habitName}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.semibold_12_opacity}>{HabitsScreenConstants.DESCRIPTION}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.semibold_12_black}>{habitDetail?.description}</Text>
                    </View>
                </View>
                <View style={{marginHorizontal:20,marginTop:10}} >
                    <View>
                        <Text style={styles.semibold_12_opacity}>Time Slot</Text>
                    </View>
                    <FlatList
                    
                    data={habitDetail?.timeSlot}
                    renderItem={renderTimeSlot}
                    />
                </View>
                <View style={{ marginTop: 46 }}>

                    <Calendar
                        // theme={{
                        //     selectedDayBackgroundColor: Colors.blue,
                        //     dotColor: '#00adf5',
                        //     selectedDotColor: Colors.blue,
                        // }}
                        onDayPress={day => {
                            let key = day.dateString;
                            let arr1 = []
                            let obj1 = {}
                            obj1[key] = { marked: true, selected: true, selectedColor: 'blue' }
                            console.log("SelectedValue=======", obj1)
                            // let obj = {day:} 
                            setDateObj(obj1)
                            // console.log('selected day=========', obj)
                        }}
                        markingType={'custom'}
                        // markedDates={{
                        //     '2022-11-07': { marked: true,},
                        //     '2022-11-16': { marked: true,selected:true, selectedColor:'green' },
                        //     '2022-11-21': { marked: true, },
                        //     '2022-11-22': { marked: true, },
                        //     '2022-11-23': { marked: true, },
                        //     '2022-11-24': { marked: true, },
                        // }}
                        markedDates={dateObj}
                    />

                </View>
                <View style={{ height: 80 }}></View>
            </ScrollView>
            { loader ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default HabitDetailScreen;

const styles = StyleSheet.create({
    semibold_12_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.6
    },
    bold_20_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 20,
        color: Colors.black,

    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,

    },
})