import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../assets/imagesFile';
import { Calendar } from 'react-native-calendars';
import AppHeader from '../../../commonComponents/AppHeader';
import { Get_Home_Adds } from '../../../../apiManager/ads/index';

const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [dateObj, setDateObj] = useState({})
    const [adsUri, setAdsUri] = useState('')
    useEffect(() => {
        GetAds()
    }, [])

    const GetAds = () => {
        var raw = JSON.stringify({ "place": "Calendar", "panel": "Customer" });
        Get_Home_Adds(raw).then((response) => {
            if (response.status == 200) {
                setAdsUri(response.data.adsData[0].image.url)
                console.log("ProAdsresp========", response)
            }
        }).catch((error) => {
            console.log("programAddErr========", error)
        })
    }
    return (
        <View>
            <AppHeader Heading="Calendar" onPress={() => navigation.goBack()} />
            <View>
                <Image style={{ width: "100%", height: 110 }} source={{ uri: adsUri }} />
            </View>
            <View >
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
                        props.onSelectDate(day.dateString)
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
        </View>
    )
}

export default FlatListHeader;