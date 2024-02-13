import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, Image, ScrollView, TouchableOpacity } from 'react-native';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { ProgressRecordConstants } from '../mfmJourneyConstants';
import { useNavigation, useRoute } from '@react-navigation/native';
import imagesFile from '../../../../../../../assets/imagesFile';
import DualButton from '../../../../../commonComponents/DualButton';
import WaterConsumedCard from './WaterConsumedCard';
import Slider from '@react-native-community/slider';
import WaterIntakeModal from '../../../../../modals/WaterIntakeModal';
import { ProgressCard, Heading } from './ProgressCard';

const ProgressRecordScreen = () => {

    const navigation = useNavigation()

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView style={{ flex: 1 }}>
                    <AppHeader Heading={ProgressRecordConstants.MFM_JOURNEY} onPress={() => navigation.goBack()} />
                    <View style={{ flex: 1 }}>
                        <View>
                            <Image style={{ width: '100%' }} source={imagesFile.ic_banner} />
                        </View>
                        <View>
                            <TouchableOpacity style={{ marginTop: 12, marginHorizontal: 18 }}
                                onPress={() => navigation.navigate('BodyMeasurementScreen')}
                            >
                                <ProgressCard name={ProgressRecordConstants.BODY_MEASUREMENT} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 12, marginHorizontal: 18 }}
                                onPress={() => navigation.navigate('BodyFatMeasurementScreen')}
                            >
                                <ProgressCard name={ProgressRecordConstants.BODY_FAT_MEASUREMENT} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 12, marginHorizontal: 18 }}
                                onPress={() => navigation.navigate('BodyVitalStatScreen')}
                            >
                                <ProgressCard name={ProgressRecordConstants.BODY_VITAL_STATS} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ marginTop: 12, marginHorizontal: 18 }}
                                onPress={() => navigation.navigate('ProgressPhotoScreen')}
                            >
                                <ProgressCard name={ProgressRecordConstants.PROGRESS_PHOTO} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default ProgressRecordScreen;