import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
const fitnessData = [{ id: 1, name: 'Lose Weight' },
{ id: 2, name: 'Gain Weight' },
{ id: 3, name: 'Body Building' },
{ id: 4, name: 'Strength & Conditioning' },
{ id: 5, name: 'Stamina and Mobility' },
{ id: 6, name: 'Injury & Rehabilitation' },
]
const FitnessGoalModal = (props) => {

    const checkValidate = (goals) => {
        var MarkedDone = false
        if (props?.fitnessGoal?.length > 0) {
            props?.fitnessGoal?.forEach(element1 => {
                if (element1 == goals) {
                    console.log("yaha aa raha hai===========")
                    MarkedDone = true
                }
            });
        }
        return MarkedDone
    }

    const FlatListHeader = () => {
        return (
            <View style={styles.headerStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.semibold_17_black}>Fitness Goals</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={props.cancelModal}
                    >
                        <Image source={imagesFile.ic_cross} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 11 }}>
                    <Text style={styles.semibold_12_opacity}>What’s your Primary Goal?</Text>
                </View>
            </View>
        )
    }

    const Footer = () => {
        return (
            <View >
                <TouchableOpacity style={styles.ButtonStyle}
                    onPress={props.FitessModalDone}
                >
                    <Text style={styles.semibold_14_white}>Done</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.renderContainerStyle}
            onPress={() => props.onSelectGoal(item.name)}
        >
            <View>
                <Image source={checkValidate(item.name) ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
            <View style={{ marginLeft: 8 }}>
                <Text style={styles.semibold_14_black}>{item.name}</Text>
            </View>

        </TouchableOpacity>
    )

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            presentationStyle={'overFullScreen'}
            transparent={true}
        >
            <View style={styles.mainContainer}>
                <View style={styles.subContainerStyle}>
                    <FlatList
                        data={fitnessData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader />}
                        ListFooterComponent={<Footer />}
                        extraData={props.extDate}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default FitnessGoalModal;

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