import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, Modal, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import MyStatusBar from '../commonComponents/MyStatusBar';
import InputLabel from '../commonComponents/InputLabel';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import { HabitsScreenConstants } from '../../screens/tabScreens/dashBoardTab/home/myAssignments/habits/habitsConstants';
const AddHabitModal = (props) => {

    const renderItem = ({ item ,index}) => (
        <View style={{backgroundColor: Colors.inputGrey, padding: 5, marginVertical: 5, borderRadius: 5 ,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
            <View>
                <Text style={styles.semibold_14_black}>{item.time}</Text>
            </View>
            <View style={{flex:1}}></View>
            <TouchableOpacity
            onPress={()=>props.onDelete(item.id,index)}
            >
                <Image style={{ height: 15, width: 15 }} source={imagesFile.ic_delete} />
            </TouchableOpacity>
        </View>
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
                    <View style={styles.subContainer}>
                        <View >
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={props.cancelModal}
                                >
                                    <Image source={imagesFile.ic_back} />
                                </TouchableOpacity>
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={styles.bold_22_black}>{HabitsScreenConstants.ADD_NEW_HABIT}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 14 }}>
                                <Text style={styles.semibold_12_opacity}>{HabitsScreenConstants.HABIT_NAME}</Text>
                            </View>
                            <View>
                                <View style={{ borderColor: Colors.inputGrey, borderRadius: 10, marginTop: 9, width: '100%', borderWidth: 1, height: 44, justifyContent: 'center' }}>
                                    <TextInput
                                        style={{ color: Colors.black, backgroundColor: Colors.white, }}
                                        value={props.habitValue}
                                        placeholder={HabitsScreenConstants.HABIT_NAME}
                                        onChangeText={props.onChangeHabitName}
                                    />
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.semibold_12_opacity}>{HabitsScreenConstants.FREQUENCY}</Text>
                            </View>
                            <View>
                                <View style={{ flexDirection: 'row', borderRadius: 10, marginTop: 12, width: '100%', alignItems: 'center' }}>
                                    {/* <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                    onPress={()=>props.onPress(1)}
                                    >
                                        <View>
                                            <Image source={props.radioId == 1? imagesFile.radio_Selected : imagesFile.radio_Unselected}/>
                                        </View>
                                        <View style={{marginLeft:6}}>
                                            <Text style={styles.semibold_14_black}>{HabitsScreenConstants.ONE_TIME}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection:'row',justifyContent:'center',alignItems:'center',marginLeft:20}}
                                    onPress={()=>props.onPress(2)}
                                    >
                                        <View>
                                            <Image source={props.radioId == 2? imagesFile.radio_Selected : imagesFile.radio_Unselected}/>
                                        </View>
                                        <View style={{marginLeft:6}}>
                                            <Text style={styles.semibold_14_black}>{HabitsScreenConstants.MULTIPLE}</Text>
                                        </View>

                                    </TouchableOpacity> */}
                                    <Text style={styles.semibold_14_black}>{props?.timeSlot.length>1?"Multiple":"OneTime"}</Text>

                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.semibold_12_opacity}>{HabitsScreenConstants.DESCRIPTION}</Text>
                            </View>
                            <View style={{ borderColor: Colors.inputGrey, marginTop: 9, height: 120, borderWidth: 1, borderRadius: 10, padding: 10 }}>
                                <TextInput
                                    style={{ color: Colors.black, backgroundColor: Colors.white, }}
                                    value={props.HabitDesc}
                                    placeholder={HabitsScreenConstants.DESCRIPTION}
                                    onChangeText={props.onChangeDesc}
                                />
                            </View>

                            <View>
                                <Text style={[styles.semibold_12_opacity,{marginTop:10}]}>Time Slot</Text>
                                <TouchableOpacity
                                style={{height:30,justifyContent:'center'}}
                                    onPress={props.onSelectTime}
                                >
                                    <Text style={styles.semibold_14_black}>{"Select Time"}</Text>
                                </TouchableOpacity>
                                <View>
                                    <FlatList
                                    showsVerticalScrollIndicator={false}
                                    style={{maxHeight:150}}
                                        data={props.timeSlot}
                                        renderItem={renderItem}
                                        extraData={props?.extraData}
                                    />
                                </View>
                            </View>
                            <TouchableOpacity style={styles.saveBtnStyle}
                                onPress={props.OnSubmit}
                            >
                                <Text style={styles.semibold_17_white}>{HabitsScreenConstants.SAVE}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default AddHabitModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    subContainer: {

        backgroundColor: Colors.white,
        borderRadius: 20,
        marginHorizontal: 11,
        paddingHorizontal: 20,
        paddingVertical: 25
    },
    semibold_12_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.6
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_17_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.white
    },
    saveBtnStyle: {
        marginTop: 20,
        borderRadius: 12,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.blue
    },
    bold_22_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 22,
        color: Colors.black
    }
})