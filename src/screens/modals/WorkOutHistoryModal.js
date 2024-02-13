import React, { useState, useCallback, useMemo, useRef } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
import SingleButton from '../commonComponents/SingleButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const windowHeight = Dimensions.get('window').height - 100;
const workoutData = [
    { id: 1, name: "No, I don’t" },
    { id: 2, name: "Once in a week" },
    { id: 3, name: "1-3 times in a week" },
    { id: 4, name: "3-5 times in a week" },
    { id: 5, name: "6-7 times in a week" },
    { id: 6, name: "More than 7 Times" },
]
const WorkOutHistoryModal = (props) => {
    const ref = useRef()
    const [workout, setWorkout] = useState('')
    const [onend, setonEnd] = useState(props.workout?.toString())
    const [frequency, setFrequency] = useState(props.frequency)

    // useMemo(()=>{
    //     setWorkout(props.workout)
    // },[workout])

    const FlatListHeader = useCallback(({ onend }) => {
        return (
            <View style={styles.headerStyle} >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.semibold_17_black}>Workout History</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={props.cancelModal}
                    >
                        <Image source={imagesFile.ic_cross} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 11 }}>
                    <Text style={styles.semibold_12_opacity}>Mention the type of workout</Text>
                </View>
                <View>
                    <TextInput
                        ref={ref}
                        style={{ height: 44, color: Colors.black, backgroundColor: Colors.white }}
                        placeholder={'Enter types of workout'}
                        value={onend}
                        onChangeText={(text) => setonEnd(text)}
                    />
                </View>
                <View style={{ marginTop: 25 }}>
                    <Text style={styles.semibold_12_opacity}>I Workout</Text>
                </View>
            </View>
        )
    }, [workoutData])

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.renderContainerStyle}
            onPress={() => setFrequency(item.name)}
        >
            <View >
                {/* <Image source={checkValidate(item.name)? imagesFile.ic_blueTick :imagesFile.ic_recWhiteDot} /> */}
                <Image source={frequency == item.name ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
            <View style={{ marginLeft: 8 }}>
                <Text style={styles.semibold_14_black}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
    const Footer = () => {
        return (
            <View style={{ marginBottom: 30 }}>
                <SingleButton name='Done' onPress={() => props.onDone(onend, frequency)} />
            </View>
        )
    }

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            presentationStyle={'overFullScreen'}
            transparent={true}
        >
            <View style={styles.mainContainer}  >
                <View style={styles.subContainerStyle}>
                    <KeyboardAwareScrollView>
                        <FlatListHeader onend={onend} />
                        <FlatList
                            data={workoutData}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                            // ListHeaderComponent={<FlatListHeader />}
                            ListFooterComponent={<Footer />}
                        />
                    </KeyboardAwareScrollView>
                </View>
            </View>

        </Modal >
    )
}

export default WorkOutHistoryModal;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    subContainerStyle: {
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    headerStyle: {
        paddingHorizontal: 30,
        paddingTop: 20,
        marginBottom: 16
    },
    semibold_17_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.black
    },
    semibold_12_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.4
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    renderContainerStyle: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        marginBottom: 24,
        alignItems: 'center',
        paddingVertical: 5
    },
    ButtonStyle: {
        height: 54,
        marginBottom: 30,
        marginHorizontal: 18,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12
    },
    semibold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    }
})