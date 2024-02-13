import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Colors, Fonts } from '../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './onBoardingStyle';
import FlatListHeader from './FlatListHeader';
import FlatListFooter from './FlatListFooter';
import MyStatusBar from '../../commonComponents/MyStatusBar';
import { AddIntrest } from '../../../apiManager/auth/index';
import { Toaster } from '../../commonComponents/Toaster';
import Loader from '../../commonComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../auth/authConstants';
import moment, { months } from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const numColm = 3
const data = [{ id: 1, name: "Calisthenics", checked: false }, { id: 2, name: "Trekking", checked: false }, { id: 3, name: "Martial Arts", checked: false }, { id: 4, name: "Power Lifing", checked: false }, { id: 5, name: "Body Building", checked: false }]
const OnBoardingScreen = () => {
    const navigation = useNavigation()
    const [dateOfBirth, setDateOfBirth] = useState(new Date())
    const [password, setPassword] = useState('')
    const [genderId, setGenderId] = useState(0)
    const [gender, selectedGender] = useState('')
    const [intrestData, setIntrestData] = useState(data)
    const [selectedIntrest, setSelectIntrest] = useState([])
    const [fitnessGoal, setFitnessGoal] = useState('')
    const [fitnessGoal1, setFitnessGoal1] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [targetWeight, setTargetWeight] = useState('')
    const [bodyFat, setBodyFat] = useState('')
    const [workoutFrequency, setWorkoutFrequency] = useState('')
    const [foodPreference, setFoodPreference] = useState('')
    const [laoder, setLoader] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [isSelection,setSelection]= useState(false)
    useEffect(() => {
        AsyncStorage.getItem(LoginConstants.TOKEN).then(value => {
            console.log("token========", value)
            global.Token = value
        })
    }, [])

    const onPressIntrest = (id, index, name) => {
        console.log("Index--------", index, name)
        let arr2 = selectedIntrest
        let arr1 = intrestData
        if (arr1[index].checked == false) {
            arr1[index].checked = true
            arr2.push(name)
        } else {
            arr1[index].checked = false
            arr2.splice(index, 1);
        }
        setSelectIntrest([...arr2])
        console.log("arr222=========", arr2)
        setIntrestData([...arr1])
    }
    const renderItem = ({ item, index }) => (
        <>
            <TouchableOpacity style={item.checked ? styles.intrestBtn_selected : styles.intrestBtn_unselected}
                onPress={() => onPressIntrest(item.id, index, item.name)}
            >
                <Text style={item.checked ? styles.intrestTextSelected : styles.intrestTextUnSelected}>{item.name}</Text>
            </TouchableOpacity>
            <View style={{ flex: 0.1 }}></View>
        </>
    )

    const onSelectGender = (id) => {
        if (id == 1) {
            selectedGender('Male')
        } else {
            selectedGender('Female')
        }
        setGenderId(id)
    }

    const checkValidation = () => {
        if(!isSelection)
        {
            Toaster('Please enter the DOB')
        }
       else if (gender == '') {
            Toaster('Please select gender')
        } else if (selectedIntrest.length == 0) {
            Toaster('Please select fitness interest')
        } else if (fitnessGoal1 == '') {
            Toaster("Please select fitness goal")
        } else if (height == '') {
            Toaster('Please enter current height')
        } else if (weight == '') {
            Toaster('Please enter current weight')
        } else if (targetWeight == '') {
            Toaster('Please enter target weight')
        } else if (workoutFrequency == '') {
            Toaster('Please enter workout frequency')
        } else if (foodPreference == '') {
            Toaster('Please enter food preference')
        } else {
            updateIntrest()
        }
    }

    const updateIntrest = () => {

        let fitness = [fitnessGoal, fitnessGoal1]
        var formdata = new FormData();
        let newDate = new Date(dateOfBirth)
        formdata.append("gender", gender);
        formdata.append("dateOfBirth", moment(newDate).format('YYYY-MM-DD'));
        formdata.append("fitnessInterests", selectedIntrest);
        formdata.append("fitnessGoal", fitness);
        formdata.append("currentHeight", height);
        formdata.append("currentWeight", weight);
        formdata.append("targetWeight", targetWeight);
        formdata.append("bodyFat", bodyFat);
        formdata.append("workoutFrequency", workoutFrequency);
        formdata.append("foodPreference", foodPreference);
        let data = JSON.stringify({
            'gender': gender,
            'dateOfBirth': dateOfBirth,
            'fitnessInterests': selectedIntrest,
            'fitnessGoal': fitness,
            'currentHeight': height,
            'currentWeight': weight,
            'targetWeight': targetWeight,
            'bodyFat': bodyFat,
            'workoutFrequency': workoutFrequency,
            'foodPreference': foodPreference
        });
        console.log("onboardData=======", data)
        setLoader(true)
        AddIntrest(data).then(response => {
            console.log("ResultOnMain===========", response)
            if (response.status == 200) {
                setSelectIntrest([])
                setLoader(false)
                AsyncStorage.setItem(LoginConstants.INTRESTE_ADDED, "true")
                Toaster(response.message)
                navigation.push('TabNavigator')
            }
        }).catch((error) => {
            setLoader(false)
            console.log("UpdateErr=======", error)
        })
    }

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={styles.mainContainer}>
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={true}
                    enableOnAndroid={true}
                    enableAutomaticScroll={true}
                    extraHeight={10}
                    extraScrollHeight={20}
                >
                    <View >
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 20, marginHorizontal: 18 }}
                            data={intrestData}
                            renderItem={renderItem}
                            numColumns={numColm}
                            ListHeaderComponent={<FlatListHeader openDatePicker={() => setOpenDate(true)}
                                visible={openDate}
                                selectedDate={dateOfBirth}
                                onConfirm={(date) => {    
                                        setDateOfBirth(date)
                                        setSelection(true)
                                        setOpenDate(false)
                                }}
                                onCancelDatePicker={()=>setOpenDate(false)}
                                genderSelectedId={genderId} genderSelected={(id) => onSelectGender(id)} onChangeText={(text) => setDateOfBirth(text)} />}
                            ListFooterComponent={<FlatListFooter
                                fitnessGoalValue={fitnessGoal}
                                onchangeFitnessGoal={(text) => setFitnessGoal(text)}
                                dropDown={(val) => setFitnessGoal1(val)}
                                Heightvalue={height}
                                onHeightChangeText={(text) => setHeight(text)}
                                Weightvalue={weight}
                                onWeightChangeText={(text) => setWeight(text)}
                                TargetWeightvalue={targetWeight}
                                onTargetWeightChangeText={(text) => setTargetWeight(text)}
                                WorkoutFrequencyvalue={workoutFrequency}
                                onWorkoutFrequencyChangeText={(text) => setWorkoutFrequency(text)}
                                Foodvalue={foodPreference}
                                onFoodChangeText={(text) => setFoodPreference(text)}
                                // onPress={() => updateIntrest()}
                                onPress={() => checkValidation()}
                            />}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </KeyboardAwareScrollView>
                {laoder ? <Loader /> : null}
            </SafeAreaView>
        </>
    )
}
export default OnBoardingScreen;