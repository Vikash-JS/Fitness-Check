import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { programConstants } from '../../../../dashBoardConstants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { styles } from './programDetailStyle';
import ToggleSwitch from 'toggle-switch-react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import ToggleButton from '../../../../../../commonComponents/ToggleButton';
import { useNavigation } from '@react-navigation/native';
const WorkoutExercise = () => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(false);
    const [isEnabled1, setIsEnabled1] = useState(false);
    const [amWorkEnable, setAmWorkEnable] = useState(false)
    const [pmWorkEnable, setPmWorkEnable] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);

    const selectAmWork = () => setAmWorkEnable(previousState => !previousState);
    const selectPmWork = () => setPmWorkEnable(previousState => !previousState)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView>
                <AppHeader Heading={programConstants.MALE_BODY} onPress={()=>navigation.goBack()} />
                <View>
                    <Image source={imagesFile.ic_banner} />
                </View>
                <View style={styles.startNowToggleView}>
                    <View>
                        <Text style={styles.semiBold_14_black}>{programConstants.STARTING_WORK_NOW}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <ToggleButton isOn={isEnabled} onToggle={toggleSwitch} />
                    </View>
                </View>
                {isEnabled ?
                    <>
                        <View style={styles.startNowToggleSubView}>
                            <Text style={[styles.semiBold_12_black, { marginLeft: 20 }]}>Sep 22, 2022</Text>
                        </View>
                        <View style={styles.startNowToggleSubView}>
                            <Text style={[styles.semiBold_12_black, { marginLeft: 20 }]}>12:45 PM</Text>
                        </View>
                    </>
                    : null
                }
                <View style={styles.followWorkoutToggleView}>
                    <View>
                        <Text style={styles.semiBold_14_black}>{programConstants.FOLLOW_WORKOUT_TEMPLATE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <ToggleButton isOn={isEnabled1} onToggle={toggleSwitch1} />
                    </View>
                </View>
                {isEnabled1?
                <>
                <View style={{ marginTop: 19, marginLeft: 18 }}>
                    <Text style={styles.semiBold_12_blue}>{programConstants.TODAY_AM_WORKOUT}</Text>
                </View>
                <View style={styles.today_am_workoutStyle}>
                    <View>
                        <View>
                            <Text style={styles.bold_12_black}>Bodyweight Only - Week 1 - Day 1 (Circuit)</Text>
                        </View>
                        <View style={{ marginTop: 7 }}>
                            <Text style={styles.semiBold_10_black}>(PM) Male Body Weight</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={{ marginRight: 6 }}
                        onPress={selectAmWork}
                    >
                        <Image source={amWorkEnable ? imagesFile.ic_blueDot : imagesFile.ic_whiteDot} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginLeft: 18 }}>
                    <Text style={styles.semiBold_12_blue}>{programConstants.TODAY_PM_WORKOUT}</Text>
                </View>
                <View style={styles.today_am_workoutStyle}>
                    <View>
                        <View>
                            <Text style={styles.bold_12_black}>Bodyweight Only - Week 1 - Day 1 (Circuit)</Text>
                        </View>
                        <View style={{ marginTop: 7 }}>
                            <Text style={styles.semiBold_10_black}>(PM) Male Body Weight</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={{ marginRight: 6 }}
                        onPress={selectPmWork}
                    >
                        <Image source={pmWorkEnable ? imagesFile.ic_blueDot : imagesFile.ic_whiteDot} />
                    </TouchableOpacity>
                </View>
                </>
                :null}
                <TouchableOpacity style={styles.startBtnView}
                onPress={()=> navigation.navigate('ExerciseSets')}
                >
                    <Text style={styles.semiBold_14_white}>{programConstants.START}</Text>
                </TouchableOpacity>
                <View style={{ height: 80 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default WorkoutExercise;