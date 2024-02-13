import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';

const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        GetAds()
    }, [])

    const GetAds = () => {
        var raw = JSON.stringify({ "place": "Forms", "panel": "Customer" });
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
            <AppHeader Heading={props.title} onPress={() => navigation.goBack()} />
            <View>
                {adsUri ? <Image style={{ width: "100%", height: 110 }} source={{ uri: adsUri }} /> : null}
            </View>
        </View>
    )
}

export default FlatListHeader;