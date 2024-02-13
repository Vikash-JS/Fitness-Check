import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AppHeader from '../../../commonComponents/AppHeader';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import ContainerTab from '../../../commonComponents/ContainerTab';
import SearchTab from '../../../commonComponents/SearchTab';
import { Get_Home_Adds } from '../../../../apiManager/ads/index';
import FilterSearchBar from '../../../commonComponents/FilterSearchBar';
const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        GetAds()
    }, [])

    const GetAds = () => {
        var raw = JSON.stringify({ "place": "Trainers", "panel": "Customer" });
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
        <View style={{ flex: 1, }}>
            <AppHeader Heading="Trainer" onPress={() => navigation.goBack()} />
            <View>
                {adsUri ? <Image style={{ width: "100%", height: 110 }} source={{ uri: adsUri }} /> : null}
            </View>
            <ContainerTab
                FTab_FWord='M'
                FTab_SWord='y Trainers'
                STab_FWord='F'
                STab_SWord='ind a Trainer'
                index={props.index}
                onPressTab={(id) => props.onPressTab(id)} />
            {/* <SearchTab value={props.value} onChangeText={props.onChangeText} /> */}
            <FilterSearchBar from={props?.from} index={props.index} value={props.value} onChangeText={props.onChangeText} onFilterPress={props.onFilterPress} />
            {props.gender != "" || props.specialty.length > 0 ?
                <TouchableOpacity style={styles.clearFilterBtn}
                    onPress={props.clearFilter}
                >
                    <Text style={styles.semibold_12_black}>Clear Filter</Text>
                </TouchableOpacity> : null}
        </View>
    )
}
export default FlatListHeader;

const styles = StyleSheet.create({
    clearFilterBtn: {
        borderRadius: 6,
        borderColor: Colors.inputGrey,
        marginTop: 10,
        marginRight: 12,
        alignSelf: 'flex-end',
        width: 100,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    }
})
