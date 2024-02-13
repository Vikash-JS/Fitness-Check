import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, FlatList, StyleSheet, TouchableOpacity, Linking, Modal } from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import MyStatusBar from '../../../../../../commonComponents/MyStatusBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import imagesFile from '../../../../../../../../assets/imagesFile';
import DropShadow from "react-native-drop-shadow";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import ImageViewer from 'react-native-image-zoom-viewer';


const ExerciseDetail = () => {

    const navigation = useNavigation()
    const route = useRoute()
    const bottomTabHeight = useBottomTabBarHeight()
    const [exerciseDetail, setExerciseDetail] = useState(route?.params?.data)
    const [imageModal, setImageModal] = useState(false)
    const [uri, setUri] = useState('')

    useEffect(() => {
        console.log("ExerParams======", route.params.data)
    }, [])

    const renderImages = ({ item }) => (
        <TouchableOpacity style={{ marginHorizontal: 5 }}
            onPress={() => { setImageModal(true), setUri(item?.imagePath) }}>
            <Image style={{ height: 50, width: 50, borderRadius: 7 }} source={{ uri: item?.imagePath }} />
        </TouchableOpacity>
    )

    function ImageModal(props) {
        return (
            <Modal visible={imageModal} transparent={true}>
                <ImageViewer
                    enableImageZoom={true}
                    enableSwipeDown={true}
                    onSwipeDown={() => {
                        setImageModal(false)
                    }}
                    //   renderIndicator={()=>}
                    imageUrls={[{ url: uri }]} />
            </Modal>
        )
    }

    const Row = ({ label, value }) => {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Text style={styles.semibold_14_opacity} >{label}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View style={{ width: '45%' }} >
                    <Text style={[styles.semibold_14_black, { textAlign: 'right' }]} >{value}</Text>
                </View>
            </View>
        )
    }

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView style={{ flex: 1 }}>
                    <AppHeader Heading="Exercise Detail" onPress={() => navigation.goBack()} />
                    <View style={{ flex: 1 }}>
                        <View style={{ marginHorizontal: 18, height: 160, borderRadius: 6, overflow: 'hidden' }}>

                            <Image resizeMode={exerciseDetail?.exerciseThumbnail ? 'cover' : 'contain'} style={{ width: '100%', height: 160 }} source={exerciseDetail?.exerciseThumbnail ? { uri: exerciseDetail?.exerciseThumbnail } : imagesFile.placeHolderExercise} />



                        </View>
                        <View style={{ marginHorizontal: 18, marginTop: 10 }}>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                horizontal={true}
                                data={exerciseDetail?.exerciseImage}
                                renderItem={renderImages}
                            />
                        </View>
                        <DropShadow style={styles.shadowStyle}>
                            <View style={{ backgroundColor: Colors.white, marginHorizontal: 18, marginTop: 10, padding: 10, borderRadius: 7 }}>
                                <View>
                                    <Row label="Exercise Name" value={exerciseDetail?.exerciseName} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Exercise Category" value={exerciseDetail?.exerciseCategory} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Approx Calories Burn" value={exerciseDetail?.approxCalorieBurn} />
                                </View>
                                {/* <View style={{ marginTop: 5 }}>
                                    <Row label="Total Calories Burn" value={exerciseDetail?.totalCalorieBurn} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Time Consumed" value={exerciseDetail?.totalTimeConsumed?.minutes +"min,"+exerciseDetail?.totalTimeConsumed?.seconds+"Sec" } />
                                </View> */}
                                <View style={{ marginTop: 10 }}>
                                    <View>
                                        <Text style={styles.semibold_14_opacity}>Description</Text>
                                    </View>
                                    <View style={{ marginTop: 5 }}>
                                        <Text>{exerciseDetail?.exerciseDescription}</Text>
                                    </View>
                                </View>
                            </View>
                        </DropShadow>
                        <DropShadow style={styles.shadowStyle}>
                            <View style={{ backgroundColor: Colors.white, marginHorizontal: 18, marginTop: 10, padding: 10, borderRadius: 7 }}>
                                <View>
                                    <Text style={styles.bold_20_black}>Exercise Breakdown</Text>
                                </View>
                                <View style={{ marginTop: 10 }}>
                                    <Row label="Exercise Type" value={exerciseDetail?.exerciseType} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Main Muscle Worked" value={exerciseDetail?.mainMuscle.toString()} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Other Muscles Worked" value={exerciseDetail?.otherMuscle.toString()} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Equipment" value={exerciseDetail?.equipment} />
                                </View>
                                {/* <View style={{ marginTop: 5 }}>
                                    <Row label="Sport" value={exerciseDetail?.sports == true ? "Yes" : "No"} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Force" value={exerciseDetail?.force} />
                                </View>
                                <View style={{ marginTop: 5 }}>
                                    <Row label="Level" value={exerciseDetail?.level} />
                                </View> */}
                            </View>
                        </DropShadow>
                        {exerciseDetail?.video ?
                            <DropShadow style={styles.shadowStyle}>
                                <View style={{ backgroundColor: Colors.white, marginHorizontal: 18, marginTop: 10, padding: 10, borderRadius: 7 }}>
                                    <View>
                                        <Text style={styles.bold_20_black}>Exercise Video</Text>
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={styles.semibold_14_opacity}>{exerciseDetail?.video?.title}</Text>
                                    </View>
                                    <TouchableOpacity style={{ marginTop: 5 }}
                                        onPress={() => Linking.openURL(exerciseDetail?.video?.url)}
                                    >
                                        <Text style={styles.semibold_14_blue}>{exerciseDetail?.video?.url}</Text>
                                    </TouchableOpacity>
                                </View>
                            </DropShadow> : null}
                        <View style={{ height: bottomTabHeight + 10 }}></View>
                    </View>
                </ScrollView>
                <ImageModal />
            </SafeAreaView>
        </>
    )
}

export default ExerciseDetail;

const styles = StyleSheet.create({
    shadowStyle: {
        marginTop: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    bold_20_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 20,
        color: Colors.black
    },
    semibold_14_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black,
        opacity: 0.4
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_14_blue: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.blue
    }
})