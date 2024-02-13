import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import { homeConstants } from '../tabScreens/dashBoardTab/dashBoardConstants';
import DropShadow from "react-native-drop-shadow";

const MyAssignmentsBar = () => {
    const navigation = useNavigation()
    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} horizontal={true}>
            <TouchableOpacity style={styles.BarImageStyle}
                onPress={() => navigation.navigate('Programs')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_program} />
                    </View>
                </DropShadow>
                <View>
                    <Text style={styles.bold_12_black}>{homeConstants.PROGRAMS}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
                onPress={() => navigation.navigate('MyNutritions')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_nutrition} />
                    </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.NUTRITIONS}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
                onPress={() => navigation.navigate('MyWorkout')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_workout} />
                    </View>
                </DropShadow>
                <View>
                    <Text style={styles.bold_12_black}>{homeConstants.WORKOUTS}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
                onPress={() => navigation.navigate('MyFilesScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_file} />
                    </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.FILES}</Text>
                </View>
            </TouchableOpacity>
            {/* ---------------Need to Enable habit--------------- */}
            <TouchableOpacity
                onPress={() => navigation.navigate('HabitScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_habit} />
                    </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.HABITS}</Text>
                </View>
            </TouchableOpacity>
            {/* -----------------Need to Enable habit--------------- */}
            <TouchableOpacity style={styles.BarImageStyle}
                onPress={() => navigation.navigate('FormScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                    <View>
                        <Image style={{ width: 80, height: 80 }} source={imagesFile.ic_form} />
                    </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.FORMS}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default MyAssignmentsBar;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    BarImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    shadowStyle: {
        // flex:1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
})