import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import FilterCard from '../commonComponents/FilterCard';
import MyStatusBar from '../commonComponents/MyStatusBar';
const LeavingModal = (props) => {
    return (
        <>
            <MyStatusBar barStyle='light-content' backgroundColor={'rgba(0, 0, 0, 0.8)'} />
            <Modal
                animationType='slide'
                visible={props.visible}
                presentationStyle={'overFullScreen'}
                transparent={true}
            >
                <View style={styles.main_containerStyle} >

                    <View style={styles.subContainer}>
                        <View>
                            <Text style={styles.bold_18_black}>Leaving Too Soon?</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={props.index == 0 ? styles.btnSelected : styles.btnUnSelected}
                                onPress={() => props.CancelModal(0)}
                            >
                                <Text style={props.index == 0 ? styles.btnTextSelected : styles.btnTextUnSelected}>Re-Order Exercise</Text>
                            </TouchableOpacity>
                            <View style={{ width: 11 }}></View>
                            <TouchableOpacity style={props.index == 1 ? styles.btnSelected : styles.btnUnSelected}
                                onPress={() => props.CancelModal(1)}
                            >
                                <Text style={props.index == 1 ? styles.btnTextSelected : styles.btnTextUnSelected}>Quit Session</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default LeavingModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
        width: "90%",
        backgroundColor: Colors.white,
        height: 136,
        marginHorizontal: 18
    },
    bold_18_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 18,
        color: Colors.black
    },
    btnSelected: {
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderColor: Colors.blue,
        backgroundColor: Colors.blue,
        borderRadius: 5
    },
    btnUnSelected: {
        height: 40,
        borderWidth: 1,
        borderColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        borderRadius: 5
    },
    btnTextSelected: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.white
    },
    btnTextUnSelected: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black
    }
})