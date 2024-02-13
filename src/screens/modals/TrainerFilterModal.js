import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, TextInput, FlatList } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import FilterCard from '../commonComponents/FilterCard';
import MyStatusBar from '../commonComponents/MyStatusBar';

const TrainerFilterModal = (props) => {
    const [gender, setGender] = useState(props?.gender)
    const [trainerSpeciality, setTrainerSpeciality] = useState(['Fitness & Nutrition', 'Strength and Conditioning', 'Yoga', 'Zumba', 'Calisthenics', 'Injury Rehab', 'Pilates'])
    const [selectedSpec, setSelectedSpec] = useState(props?.speciality)
    const [extraData, setExtraData] = useState(new Date())

    const onSelectSpeciality = (index, item) => {
        console.log("selectedItem=======", index, item)
        let selectedArr = selectedSpec
        if (selectedArr.length == 0) {
            selectedArr.push(item)
            setExtraData(new Date())
            setSelectedSpec(selectedArr)
        } else {
            let Filter = selectedArr.includes(item)
            if (Filter) {
                let newIndex = selectedArr.indexOf(item)
                selectedArr.splice(newIndex, 1)
            } else {
                selectedArr.push(item)
            }
            setExtraData(new Date())
            setSelectedSpec(selectedArr)
            console.log("updatedArr======", selectedArr)
        }
    }

    const checkValidate = (id) => {
        var MarkedDone = false
        if (selectedSpec?.length > 0) {
            selectedSpec.forEach(element1 => {
                if (id == element1) {
                    console.log("yaha aa raha hai===========")
                    MarkedDone = true
                }
            });
        }
        return MarkedDone
    }

    const renderSpecialities = ({ item, index }) => (
        <TouchableOpacity style={{ flexDirection: 'row', marginVertical: 5 }}
            onPress={() => onSelectSpeciality(index, item)}
        >
            <View>
                <Image source={checkValidate(item) ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.semibold_12_black}>{item}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <>
            <MyStatusBar barStyle='light-content' backgroundColor={'rgba(0, 0, 0, 0.8)'} />
            <Modal
                animationType='slide'
                visible={props.visible}
                presentationStyle={'overFullScreen'}
                transparent={true}
            >
                <View style={styles.main_containerStyle}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={props.cancelModal}></TouchableOpacity>
                    <View style={styles.subContainer}>
                        <View style={styles.headingView}>
                            <View>
                                <Text style={styles.semiBold_17_black}>Filter by Trainers</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity
                                onPress={props.cancelModal}
                            >
                                <Image source={imagesFile.ic_cross} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <View style={{ marginHorizontal: 18 }}>
                                <View>
                                    <Text style={styles.semiBold_17_black}>Select Gender</Text>
                                </View>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}
                                    onPress={() => setGender("male")}
                                >
                                    <View>
                                        <Image source={gender == "male" ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.semibold_12_black}>Male</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
                                    onPress={() => setGender("female")}
                                >
                                    <View>
                                        <Image source={gender == "female" ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.semibold_12_black}>Female</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}
                                    onPress={() => setGender("both")}
                                >
                                    <View>
                                        <Image source={gender == "both" ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text style={styles.semibold_12_black}>Both</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 18, marginTop: 10 }}>
                            <View>
                                <Text style={styles.semiBold_17_black}>Select Specialities</Text>
                            </View>
                            <FlatList
                                style={{ marginTop: 5 }}
                                data={trainerSpeciality}
                                renderItem={renderSpecialities}
                                extraData={extraData}
                            />
                        </View>
                        <TouchableOpacity style={styles.filterBtnView}
                            onPress={() => props.addFilter(gender, selectedSpec)}
                        >
                            <Text style={styles.semiBold_14_white}>Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default TrainerFilterModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    subContainer: {
        flex: 2,
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    headingView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    semiBold_17_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.black
    },
    filterBtnView: {
        height: 54,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        borderRadius: 5,
        marginTop: 10

    },
    semiBold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    inputSubView: {
        marginTop: 10,
        borderColor: Colors.inputGrey,
        borderWidth: 1,
        //  width: '100%',
        height: 40,
        marginHorizontal: 18,
        borderRadius: 10,
        justifyContent: 'center',
    },
    textInputStyle: {
        height: 30,
        marginHorizontal: 5,
        backgroundColor: Colors.white,
        borderRadius: 10
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    }
})