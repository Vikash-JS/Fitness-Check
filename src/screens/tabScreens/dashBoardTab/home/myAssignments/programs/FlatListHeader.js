import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import AppHeader from '../../../../../commonComponents/AppHeader';
import imagesFile from '../../../../../../../assets/imagesFile';
import ContainerTab from '../../../../../commonComponents/ContainerTab';
import SearchTab from '../../../../../commonComponents/SearchTab';
import FilterSearchBar from '../../../../../commonComponents/FilterSearchBar';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Get_Home_Adds } from '../../../../../../apiManager/ads/index';
const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        var raw = JSON.stringify({ "place": "Programs", "panel": "Customer" });
        Get_Home_Adds(raw).then((response) => {
            if (response.status == 200) {
                setAdsUri(response.data.adsData[0].image.url)
                console.log("ProAdsresp========", response)
            }
        }).catch((error) => {
            console.log("programAddErr========", error)
        })
    }, [])

    return (
        <View>
            <AppHeader Heading="Programs" onPress={() => navigation.goBack()} />
            <View>
                {adsUri ? <Image style={{ width: "100%", height: 110 }} source={{ uri: adsUri }} /> : null}
            </View>
            <ContainerTab
                FTab_FWord='M'
                FTab_SWord='y Programs'
                STab_FWord='M'
                STab_SWord='FM Program Library'
                index={props.index}
                visible={props.visible}
                onPressTab={(id) => props.onPressTab(id)} />
            <FilterSearchBar index={props.index} value={props.value} onChangeText={props.onChangeText} onFilterPress={props.onFilterPress} />
            {props.filterId != "" ?
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