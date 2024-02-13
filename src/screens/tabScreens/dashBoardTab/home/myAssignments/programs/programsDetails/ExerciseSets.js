import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import { programConstants } from '../../../../dashBoardConstants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import ExerciseSetsHeader from './ExerciseSetsHeader';
import { styles } from './../programsDetails/programDetailStyle';
import { useNavigation } from '@react-navigation/native';
import LeavingModal from '../../../../../../modals/LeavingModal';
import DropShadow from "react-native-drop-shadow";
import CurrentWorkOutCard from '../../../../../../commonComponents/CurrentWorkOutCard';
const DATA = [
    {
        title: "Star Jumps",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Bodyweight Walking Lunge",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Press Ups",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 2, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    },
    {
        title: "Mountain Climbers",
        image: imagesFile.ic_demo1,
        data: [{ id: 1, weight: "5 kg", time: "00:30" }, { id: 3, weight: "6 kg", time: "00:30" }, { id: 3, weight: "7 kg", time: "00:30" }]
    }
];
const ExerciseSets = () => {

    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
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
            <View >
                <TouchableOpacity style={{ marginTop: 20, backgroundColor: Colors.blue, height: 54, justifyContent: 'center', alignItems: 'center', marginHorizontal: 18, borderRadius: 5 }}
                    onPress={() => navigation.navigate('WorkoutFinished')}
                >
                    <Text style={styles.semiBold_14_white}>{programConstants.FINISH_WORKOUTS}</Text>
                </TouchableOpacity>
                <View style={{ height: 80 }}></View>
            </View>
        )
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={{ flex: 1 }}>
                <AppHeader Heading={programConstants.CURRENT_WORKOUT} onPress={() => setModalVisible(true)} />
                {DATA.map((HeaderData) =>
                    <CurrentWorkOutCard data={HeaderData}/>
                )}
                <Footer/>
            </ScrollView>
            {modalVisible ? <LeavingModal visible={modalVisible} index={leaveModalId} CancelModal={(id) => leaveModalAction(id)} /> : null}
        </SafeAreaView>
    )
}

export default ExerciseSets;
