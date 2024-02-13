import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { myWorkoutConstants } from '../WorkoutConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import WorkoutContainerTab from '../../../../../../commonComponents/WorkoutContainerTab';
import SearchTab from '../../../../../../commonComponents/SearchTab';
import FilterSearchBar from '../../../../../../commonComponents/FilterSearchBar';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';
const FlatListHeader = (props) => {

    const navigation = useNavigation()
    const [adsUri, setAdsUri] = useState('')

    useEffect(() => {
        GetAds()
    }, [])

    const GetAds = () => {
        var raw = JSON.stringify({ "place": "Workouts", "panel": "Customer" });
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
            <AppHeader Heading={myWorkoutConstants.WORKOUTS} onPress={() => navigation.goBack()} />
         
                   <View>
                   {!adsUri?null:
                   <Image style={{ width: '100%', height: 110 }} source={{ uri: adsUri }} />
}
               </View>
     
            {/* <ContainerTab
                FTab_FWord={myWorkoutConstants.M}
                FTab_SWord={myWorkoutConstants.Y_WORKOUTS}
                STab_FWord={myWorkoutConstants.M}
                STab_SWord={myWorkoutConstants.FM_WORKOUT_LIBRARY}
                index={props.index}
                visible={props.visible}
                onPressTab={(id) => props.onPressTab(id)} /> */}
            <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} >
                <WorkoutContainerTab
                    FTab_FWord={myWorkoutConstants.M}
                    FTab_SWord={myWorkoutConstants.Y_WORKOUTS}
                    STab_FWord={myWorkoutConstants.M}
                    STab_SWord={myWorkoutConstants.FM_WORKOUT_LIBRARY}
                    // TTab_FWord={myWorkoutConstants.M}
                    // TTab_SWord={myWorkoutConstants.Y_PROGRESS}
                    index={props.index}
                    visible={props.visible}
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