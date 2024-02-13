import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const PaymenetSuccessModal = (props) => {
    return (
        <Modal
            animationType='fade'
            visible={props.visible}
            presentationStyle={'overFullScreen'}
            transparent={true}
        >
            <TouchableOpacity style={styles.main_containerStyle}
                onPress={props.onCancel}
            >
                <View style={styles.subContainer}>
                    <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 20, color: Colors.green }}>Payment Successfully Done!</Text>
                    </View>
                    <Image style={{ marginTop: -50, width: 100, position: 'absolute', height: 100 }} source={imagesFile.ic_paymentSuccess} />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}
export default PaymenetSuccessModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    subContainer: {
        //  justifyContent:'center',
        alignItems: 'center',
        borderRadius: 7,
        width: "90%",
        backgroundColor: Colors.white,
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