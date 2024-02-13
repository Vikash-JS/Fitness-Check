import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import Slider from '@react-native-community/slider';

const WaterIntakeModal = (props) => {
    const [value1, setvalue] = useState(0);
    const [showModal, setShowModal] = useState(false);

    return (
        <View>
            <Modal
                animationType="slide"
                visible={props.visible}
                // presentationStyle={'overFullScreen'}
                transparent={true}>
                <View style={styles.modelmainview}>
                    <View style={styles.container}>
                        <View style={{ marginTop: 25 }}>
                            <Text style={styles.yourdailyintake}>
                                Your Daily Water Intake
              </Text>
                        </View>
                        <View style={{ marginTop: 15 }}>
                            <Text style={styles.Recommnedetext}>Recommended</Text>
                        </View>
                        <View style={styles.litreView}>
                            <TouchableOpacity style={styles.litretextview}>
                                <Text style={styles.litretext}>6L</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.howmuchview}>
                            <Text style={styles.howmuchtext}>How Much Did you Drink?</Text>
                        </View>
                        <View style={styles.litreView}>
                            <TouchableOpacity style={styles.litretextview}>
                                <Text style={styles.litretext}>{value1}L</Text>
                            </TouchableOpacity>
                        </View>

                        <Slider
                            style={{
                                width: 300,
                                height: 40,
                                marginTop: 20,
                                marginBottom: 50,
                                transform: [{ scaleY: 1 }],
                            }}
                            // value={value1}
                            minimumValue={0}
                            maximumValue={10}
                            step={1}
                            minimumTrackTintColor="#3B22F8"
                            maximumTrackTintColor="#3B22F8"
                            thumbTintColor="#3B22F8"
                            //   thumbImage={require('../Asset/Path53812x.png')}
                            onValueChange={value => setvalue(value)}
                        />
                        <TouchableOpacity onPress={props.modalCancel}>
                            <View style={styles.button1}>
                                <Text style={styles.textsave}>Save</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',

        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        borderRadius: 7,
        backgroundColor: 'white',
    },
    yourdailyintake: {
        fontfamily: 'Segoe UI',
        fontstyle: 'normal',
        fontweight: 700,
        fontSize: 18,
        lineHeight: 24,
        color: '#000000',
    },
    Recommnedetext: {
        fontfamily: 'Segoe UI',
        fontstyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        color: '#000000',
    },
    litreView: {
        marginTop: 8,
        backgroundColor: 'lightgrey',
        borderBottomLeftRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    litretextview: {
        paddingHorizontal: 43,
        paddingVertical: 10,
    },
    litretext: {
        fontfamily: 'Segoe UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 20,
        lineHeight: 27,
        color: '#000000',
    },
    howmuchview: {
        marginTop: 30,
    },
    howmuchtext: {
        fontfamily: 'Segoe UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 12,
        lineHeight: 16,
        color: '#000000',
    },
    modelmainview: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0,0.5)',
        alignItems: 'center',
    },
    button1: {
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 60,
        marginBottom: 20,
        backgroundColor: '#3B22F8',
    },
    yourdailyintakeview: {
        margintop: 20,
    },
    textsave: {
        fontfamily: 'Segoe UI',
        fontStyle: 'normal',
        fontWeight: '700',
        fontSize: 14,
        lineHeight: 19,
        color: '#FFFFFF',
    },
});

export default WaterIntakeModal;