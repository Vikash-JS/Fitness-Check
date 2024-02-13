import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { Colors, Fonts, DATA } from '../../../../../../../utils/Constants';
import { myWorkoutConstants } from '../WorkoutConstants';
import { styles } from './workoutLibraryStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import LeavingModal from '../../../../../../modals/LeavingModal';
import CurrentWorkOutCard from '../../../../../../commonComponents/CurrentWorkOutCard';
import SingleButton from '../../../../../../commonComponents/SingleButton';
var HeaderName;
const WorkoutLibrary2 = ()=>{
    const navigation = useNavigation()
    const route = useRoute()
    const [modalVisible, setModalVisible] = useState(false)
    const [headerName, setHeaderName] = useState(route.params.name)
    const [leaveModalId, setLeaveModalId] = useState(0)

    
    const leaveModalAction = (id) => {
        if (id == 0) {
            setLeaveModalId(id)
            setModalVisible(false)
        } else {
            setModalVisible(false)
            setTimeout(() => {
                navigation.goBack()
            }, 1000);
        }
    }

    const Footer = () => {
        return (
            <View style={{ marginTop: 20 }}>
                <SingleButton name={myWorkoutConstants.FINISH_WORKOUT} onPress={() => setModalVisible(true)} />
                <View style={{ height: 80 }}></View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={{ flex: 1 }}>
                <AppHeader Heading={headerName} onPress={() => navigation.goBack()}  />
                {DATA.map((HeaderData) =>
                    <CurrentWorkOutCard data={HeaderData}/>
                )}
                <Footer/>
            </ScrollView>
            {modalVisible ? <LeavingModal visible={modalVisible} index={leaveModalId} CancelModal={(id) => leaveModalAction(id)} /> : null}
        </SafeAreaView>
    )
}


export default WorkoutLibrary2;