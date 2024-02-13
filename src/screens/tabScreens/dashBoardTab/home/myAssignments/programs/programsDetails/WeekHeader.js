import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { programConstants } from '../../../../dashBoardConstants';
import { useNavigation } from '@react-navigation/native';
import DropDown from '../../../../../../commonComponents/DropDown';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';

const WeekHeader = (props) => {
    const navigation = useNavigation()
    const [selectedValue, setSelectedValue] = useState('');
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        GetAds()
    }, [])

    const GetAds = () => {
        var raw = JSON.stringify({ "place": "Programs", "panel": "Customer" });
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
            <AppHeader Heading={props.heading} onPress={() => navigation.goBack()} />
            <View>
                {adsUri ? <Image style={{ width: '100%', height: 110 }} source={{ uri: adsUri }} /> : null}
            </View>

            {/* <View style={{ marginHorizontal: 18 }}>
                <DropDown placeholder={"select weeks"} data={dropDowndata} setSelected={(text) => setSelectedValue(text)} />
            </View> */}

        </View>
    )
}

export default WeekHeader;