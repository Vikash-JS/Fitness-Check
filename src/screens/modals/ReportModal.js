import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MyStatusBar from '../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../utils/Constants';
const ReportModal = (props) => {
    const [reason, setReason] = useState('')
    return (
        <>
            <MyStatusBar barStyle='light-content' backgroundColor={'rgba(0, 0, 0, 0.8)'} />
            <Modal
                animationType='slide'
                visible={props.visible}
                presentationStyle={'overFullScreen'}
                transparent={true}
            >
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <View style={{ width: '90%', backgroundColor: Colors.white, padding: 20, borderRadius: 10 }}>
                        <View>
                            <Text style={styles.bold_12_black}>Report Reason</Text>
                        </View>
                        <View style={styles.textInputView}>
                            <TextInput
                                style={{ height: 40, marginHorizontal: 10 }}
                                placeholder={"Enter Reason"}
                                value={reason}
                                onChangeText={(text) => setReason(text)}
                            />
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity style={styles.btnView}
                                onPress={() => props.ReportPost(reason)}
                            >
                                <Text style={styles.semibold_12_white}>Report</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity style={styles.btnView}
                                onPress={props.onCancel}
                            >
                                <Text style={styles.semibold_12_white}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default ReportModal;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 17,
        color: Colors.black
    },
    textInputView: {
        borderWidth: 1,
        borderColor: Colors.inputGrey,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10
    },
    semibold_12_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    btnView: {
        borderRadius: 10,
        width: 100,
        height: 40,

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue
    }
})