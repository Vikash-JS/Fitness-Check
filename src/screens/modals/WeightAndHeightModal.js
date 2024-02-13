import React, { useState, useRef } from 'react';
import { Modal, Text, View, TouchableOpacity, FlatList, StyleSheet, Image, TextInput, Platform, Dimensions } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
import SingleButton from '../commonComponents/SingleButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const windowHeight = Dimensions.get('window').height - 100;

const WeightAndHeigthModal = (props) => {
    const ref = useRef()
    const [height,setHeight] = useState(props?.currentHeight?.toString())
    const [weight,setWeight] = useState(props?.currentWeight?.toString())

    const Footer = () => {
        return (
            <View style={{ marginBottom: 30 }}>
                <SingleButton name='Done' onPress={() => props.onDone(height, weight)} />
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
            <View style={styles.mainContainer}>
                <View style={styles.subContainerStyle}>
                    <KeyboardAwareScrollView >
                        {/* <KeyboardAvoidingView ref={ref} behavior={Platform.OS =='ios'?'padding':'height'}   style={styles.subContainerStyle}> */}
                        <View style={styles.headerStyle}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.semibold_17_black}>Height & Weight</Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                                <TouchableOpacity
                                    onPress={props.cancelModal}
                                >
                                    <Image source={imagesFile.ic_cross} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.renderContainerStyle}>
                            <View style={{ marginTop: 11 }}>
                                <Text style={styles.semibold_12_opacity}>{'Enter your current height'}</Text>
                            </View>
                            <TextInput
                                ref={ref}
                                style={{ height: 44, color: Colors.black, backgroundColor: Colors.white }}
                                value={height}
                                onChangeText={(text) => setHeight(text)}
                                placeholder={"Height"}
                                keyboardType='numeric'

                            />
                        </View>
                        <View style={styles.renderContainerStyle}>

                            <View style={{ marginTop: 11 }}>
                                <Text style={styles.semibold_12_opacity}>{'Enter your current weight'}</Text>
                            </View>
                            <TextInput
                                ref={ref}
                                style={{ height: 44, color: Colors.black, backgroundColor: Colors.white }}
                                value={weight}
                                onChangeText={(text) => setWeight(text)}
                                placeholder={"Weight"}
                                keyboardType='numeric'
                            />
                        </View>
                  
                        <Footer />
                    </KeyboardAwareScrollView>
                    {/* </KeyboardAvoidingView> */}
                </View>
            </View>
        </Modal>
    )
}

export default WeightAndHeigthModal;

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
        paddingHorizontal: 30,
        marginBottom: 24,
        justifyContent: 'center',
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