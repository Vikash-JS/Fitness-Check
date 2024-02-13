import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { myNutritionsConstants } from '../nutritionConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import WorkoutContainerTab from '../../../../../../commonComponents/WorkoutContainerTab';
import SearchTab from '../../../../../../commonComponents/SearchTab';
import FilterSearchBar from '../../../../../../commonComponents/FilterSearchBar';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';
const FlatListHeader = (props) => {
    const navigation = useNavigation()
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        var raw = JSON.stringify({ "place": "Nutritions", "panel": "Customer" });
        Get_Home_Adds(raw).then((response) => {
            console.log('response: *****', response);
            if (response.status == 200) {
                setAdsUri(response.data.adsData[0].image.url)
                console.log("response.data.adsData[0].image.url========", response.data.adsData[0].image.url)
            }
        }).catch((error) => {
            console.log("programAddErr========", error)
        })
    }, [])
    return (
        <View style={{ marginBottom: 20 }}>
            <AppHeader Heading={myNutritionsConstants.NUTRITION} onPress={() => navigation.goBack()} />

            <View>
                {console.log("adsUri", adsUri)}
                {
                    !adsUri ? null : (<Image style={{ width: "100%", height: 110 }} source={{ uri: adsUri }} />)
                }


            </View>


            {/* <ContainerTab
                FTab_FWord={myNutritionsConstants.M}
                FTab_SWord={myNutritionsConstants.Y_NUTRITIONS}
                STab_FWord={myNutritionsConstants.M}
                STab_SWord={myNutritionsConstants.FM_NUTRITIONS_LIBRARY}
                onPressTab={(id) => props.onPressTab(id)}
                index={props.index}
            /> */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}  >
                <WorkoutContainerTab
                    FTab_FWord={myNutritionsConstants.M}
                    FTab_SWord={myNutritionsConstants.Y_NUTRITIONS}
                    STab_FWord={myNutritionsConstants.M}
                    STab_SWord={myNutritionsConstants.FM_NUTRITIONS_LIBRARY}
                    // TTab_FWord={myNutritionsConstants.M}
                    // TTab_SWord={myNutritionsConstants.Y_PROGRESS}
                    index={props.index}
                    // visible={props.visible}
                    onPressTab={id => props.onPressTab(id)}
                />
            </ScrollView>
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