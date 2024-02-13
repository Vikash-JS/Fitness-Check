import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { smartMenuConstants } from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
import { GridViewCard, Heading } from './GridViewCard';
import { useNavigation } from '@react-navigation/native';

const GridView = () => {

    const navigation = useNavigation()
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                <View>
                    <Heading Title={smartMenuConstants.HOME} />
                </View>
                <TouchableOpacity style={{ marginTop: 12 }}
                    onPress={() => navigation.goBack()}
                >
                    <GridViewCard Image={imagesFile.sm_home} Name={smartMenuConstants.HOME} />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                <View>
                    <Heading Title={smartMenuConstants.ASSIGNMENTS} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 12 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Programs')}
                    >
                        <GridViewCard Image={imagesFile.sm_program} Name={smartMenuConstants.PROGRAMS} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}
                        onPress={() => navigation.navigate('MyNutritions')}
                    >
                        <GridViewCard Image={imagesFile.sm_Nutrition} Name={smartMenuConstants.NUTRITIONS} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}
                        onPress={() => navigation.navigate('MyWorkout')}
                    >
                        <GridViewCard Image={imagesFile.sm_workout} Name={smartMenuConstants.WORKOUT} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}

                    >
                        <GridViewCard Image={imagesFile.sm_file} Name={smartMenuConstants.FILES} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={{ marginLeft: 39 }}
                        onPress={() => navigation.navigate('HabitScreen')}
                    >
                        <GridViewCard Image={imagesFile.sm_habit} Name={smartMenuConstants.HABITS} />
                    </TouchableOpacity> */}
                    <TouchableOpacity style={{ marginLeft: 39 }}
                        onPress={() => navigation.navigate('FormScreen')}
                    >
                        <GridViewCard Image={imagesFile.sm_forms} Name={smartMenuConstants.FORMS} />
                    </TouchableOpacity>
                </ScrollView>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 29 }}>
                <View>
                    <Heading Title={smartMenuConstants.CALENDER} />
                </View>
                <TouchableOpacity style={{ marginTop: 12 }}
                    onPress={() => navigation.navigate('CalenderTab')}
                >
                    <GridViewCard Image={imagesFile.sm_calender} Name={smartMenuConstants.CALENDER} />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 29 }}>
                <View>
                    <Heading Title={smartMenuConstants.TRAINERS} />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ marginTop: 12 }}
                        onPress={() => navigation.navigate('TrainerTab')}
                    >
                        <GridViewCard Image={imagesFile.sm_trainer} Name={smartMenuConstants.MY_TRAINERS} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginTop: 12, marginLeft: 39 }}
                        onPress={() => navigation.navigate('TrainerHomeScreen',{index:1})}
                    >
                        <GridViewCard Image={imagesFile.sm_findTrainer} Name={smartMenuConstants.FIND_A_TRAINER} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 29 }}>
                <View>
                    <Heading Title={smartMenuConstants.MY_PACKAGES} />
                </View>
                <TouchableOpacity style={{ marginTop: 12 }}>
                    <GridViewCard Image={imagesFile.sm_calender} Name={smartMenuConstants.PACKAGES} />
                </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 18, marginTop: 29 }}>
                <View>
                    <Heading Title={smartMenuConstants.MFM_JOURNEY} />
                </View>
                <TouchableOpacity style={{ marginTop: 12 }}
                onPress={()=> navigation.navigate('ProgressRecordScreen')}
                >
                    <GridViewCard Image={imagesFile.sm_mfm} Name={smartMenuConstants.MFM_MENU} />
                </TouchableOpacity>
            </View>
            
            <View style={{ marginHorizontal: 18, marginTop: 20 }}>
                <View>
                    <Heading Title={smartMenuConstants.TOOLS} />
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{ marginTop: 12 }}>
                    <TouchableOpacity
                         onPress={() => navigation.navigate('BMRCalculatorScreen')}
                    >
                        <GridViewCard Image={imagesFile.sm_bmr} Name={smartMenuConstants.BMR_CALCULATOR_BREAK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}
                         onPress={() => navigation.navigate('MicronutrientCalculatorScreen')}
                    >
                        <GridViewCard Image={imagesFile.sm_macros} Name={smartMenuConstants.MACRONUTRIENTS_CALCULATOR_BREAK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}
                         onPress={() => navigation.navigate('BodyFatCalculatorScreen')}

                    >
                        <GridViewCard Image={imagesFile.sm_bodyfat} Name={smartMenuConstants.BODY_FAT_CALCULATOR_BREAK} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 39 }}
                        onPress={() => navigation.navigate('RmCalculatorScreen')}

                    >
                        <GridViewCard Image={imagesFile.sm_rm} Name={smartMenuConstants.RM_CALCULATOR_BREAK} />
                    </TouchableOpacity>

                </ScrollView>
            </View>

        </View>
    )
}

export default GridView;