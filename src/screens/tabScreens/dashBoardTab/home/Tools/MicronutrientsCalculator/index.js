import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {MicronutrientsConstants} from '../ToolsConstants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Colors, Fonts, data} from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import CommonPieChart from '../../../../../commonComponents/CommonPieChart';
import CommonDropDown from '../CommonDropDown';
import IncDecInput from './IncDecInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Toaster} from '../../../../../commonComponents/Toaster';
import InputLabel from '../../../../../commonComponents/InputLabel';
import {BMRConstants} from '../ToolsConstants';
import SingleButton from '../../../../../commonComponents/SingleButton';
import MacronutrientsCalcModal from '../../../../../modals/MacronutrientsCalcModal';
import {Save_macroNutrients} from '../../../../../../apiManager/tools';
// import {styles} from './styles';
const series = [123, 321, 123, 789, 537];
const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800'];

const MicronutrientCalculatorScreen = () => {
  const navigation = useNavigation();
  // const [selected, setSelected] = useState('');
  // const [protien, setProtein] = useState(0);
  // const [carbs, setCarbs] = useState(0);
  // const [fats, setFats] = useState(0);
  const [age, setAge] = useState('');
  const [gender, SetGender] = useState('');
  const [Height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [Goal, SetGoal] = useState('');
  const [Activity, SetActivity] = useState('');
  const [macro, setMacro] = useState('');
  const [macroNutirentsModalOpen, setMacroNutirentsModalOpen] = useState(false);
  const [protien, setProtien] = useState(0);
  const [fat, setFat] = useState(0);
  const [carb, setCarb] = useState(0);
  const [meterValue, setMeterValue] = useState(50);
  const [totalCal, setTotalCal] = useState(0);
  const [calculateValue, setCalculateValue] = useState({});

  console.log('Age==========>', age);
  console.log('Height============>', Height);
  console.log('Weight============>', weight);

  const Validation_Of_Field = () => {
    if (age == '') {
      Toaster(MicronutrientsConstants.SELECT_AGE);
    } else if (gender == '') {
      Toaster(MicronutrientsConstants.SELECT_GENDER);
    } else if (Height == '') {
      Toaster(MicronutrientsConstants.SELECT_HEIGHT);
    } else if (weight == '') {
      Toaster(MicronutrientsConstants.SELECT_WEIGHT);
    } else if (Goal == '') {
      Toaster(MicronutrientsConstants.SELECT_GOALS);
    } else if (/\.\./g.test(Height)) {
      Toaster(MicronutrientsConstants.SELECT_VALID_DECIMAL);
    } else if (/\.\./g.test(weight)) {
      Toaster(MicronutrientsConstants.SELECT_VALID_DECIMAL);
    } else if (Activity == '') {
      Toaster('Please select activity');
    } else if (macro == '') {
      Toaster('Please select macro');
    } else {
      CalculteMicronutrients();
    }
  };

  const SelectGender = id => {
    if (id == 1) {
      SetGender('Male');
      console.log('Genderrrrr=============>', gender);
    } else {
      SetGender('Female');
      console.log('Genderrrrr=============>', gender);
    }
  };
  const SelectGoal = id => {
    if (id == 1) {
      SetGoal('Current Weight');
    }
    if (id == 2) {
      SetGoal('Loose Weight');
    }
    if (id == 3) {
      SetGoal('Gain Weight');
    }
  };

  const SelectActivity = id => {
    console.log('My Activity ids===============>', id);
    if (id == 1) {
      SetActivity('Sedentary');
    }
    if (id == 2) {
      SetActivity('Lightly Active');
    }
    if (id == 3) {
      SetActivity('Moderately Active');
    }
    if (id == 4) {
      SetActivity('Very Active');
    }
    if (id == 5) {
      SetActivity('Extra Active');
    }
  };

  const selectmacro = id => {
    if (id == 1) {
      setMacro('High Carb');
    }
    if (id == 2) {
      setMacro('Moderate Carb');
    }
    if (id == 3) {
      setMacro('Zone Diet');
    }
    if (id == 4) {
      setMacro('Low Carb');
    }
    if (id == 5) {
      setMacro('Keto Diet');
    }
  };

  const CalculteMicronutrients = () => {
    // Gender from fixes options
    // weight in kg
    // height in cm
    // age in nubmer
    // activity from fixed options
    // dietType from fixed options
    let result = 0;
    const activityMap = {
      Sedentary: 1.2,
      'Lightly active': 1.375,
      'Moderately active': 1.55,
      'Very active': 1.725,
      'Extra active': 1.9,
    };
    if (gender === 'Male') {
      result = 10 * weight + 6.25 * Height - 5 * age + 5;
    }
    if (gender === 'Female') {
      result = 10 * weight + 6.25 * Height - 5 * age - 161;
    }
    console.log('Activity*******', Activity);
    let activityResult;
    if (Activity == 'Sedentary') {
      activityResult = result * 1.2;
    } else if (Activity == 'Lightly Active') {
      activityResult = result * 1.375;
    } else if (Activity == 'Moderately Active') {
      activityResult = result * 1.55;
    } else if (Activity == 'Very Active') {
      activityResult = result * 1.725;
    } else if (Activity == 'Extra Active') {
      activityResult = result * 1.9;
    }
    console.log('result=========', result);

    let Ass_Protien = 0;
    let Ass_Fat = 0;
    let Ass_carb = 0;

    if (macro == 'High Carb') {
      // setProtien(65)
      // setFat(25)
      // setCarb(15)
      Ass_Protien = 65;
      Ass_Fat = 25;
      Ass_carb = 15;
    } else if (macro == 'Moderate Carb') {
      // setProtien(50)
      // setFat(30)
      // setCarb(25)
      Ass_Protien = 50;
      Ass_Fat = 30;
      Ass_carb = 25;
    } else if (macro == 'Zone Diet') {
      // setProtien(40)
      // setFat(30)
      // setCarb(30)
      Ass_Protien = 40;
      Ass_Fat = 30;
      Ass_carb = 30;
    } else if (macro == 'Low Carb') {
      // setProtien(25)
      // setFat(35)
      // setCarb(40)
      Ass_Protien = 25;
      Ass_Fat = 35;
      Ass_carb = 40;
    } else if (macro == 'Keto Diet') {
      // setProtien(5)
      // setFat(35)
      // setCarb(60)
      Ass_Protien = 5;
      Ass_Fat = 35;
      Ass_carb = 60;
    }
    let cal_protien = (activityResult / Ass_Protien) * 9;
    let cal_fat = (activityResult / Ass_Fat) * 4;
    let cal_carb = (activityResult / Ass_carb) * 4;

    // setProtien(cal_protien);
    // setFat(cal_fat);
    // setCarb(cal_carb);
    // setTotalCal(`${Math.floor(activityResult)}`);
    let cal = calculateValue;
    // cal.protien = +cal_protien.toFixed(2);
    // cal.fat = +cal_fat.toFixed(2);
    // cal.carb = +cal_carb.toFixed(2);
    // cal.totalEnergy = `${Math.floor(activityResult)}`;
    setCalculateValue(cal);
    console.log('calcuatedVal========', cal);
    setMacroNutirentsModalOpen(true);
    // console.log({protien, carb, fat, totalEnergy
    const data = {
      macronutrientValue: [{...cal}],
      age: age,
      weight: weight,
      gender: gender,
      height: Height,
      goal: Goal,
      activity: Activity,
      macro: macro,
    };

    Save_macroNutrients(data)
      .then(response => {
        console.log('response:********* ', response);
      })
      .catch(err => console.log(err));
  };

  const onDoneButtonPress = () => {
    setAge('');
    setHeight('');
    setWeight('');
    SetGender('');
    SetGoal('');
    SetActivity('');
    setMacro('');
    setMacroNutirentsModalOpen(false);
  };

  return (
    <>
      <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView style={{flex: 1}}>
          <View>
            <AppHeader
              Heading={MicronutrientsConstants.HEADING}
              onPress={() => navigation.goBack()}
            />
          </View>
          <View>
            <Image style={{width: '100%'}} source={imagesFile.ic_banner} />
          </View>

          <View style={{marginHorizontal: 18}}>
            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMRConstants.AGE}
                value={age}
                keyboardType={'numeric'}
                onChangeText={newText => setAge(newText)}
                placeholder={MicronutrientsConstants.ENTER_YOUR_AGE}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.gilroy_Bold,
                  fontSize: 18,
                  color: Colors.black,
                }}>
                {BMRConstants.GENDER}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => SelectGender(1)}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      source={
                        gender == 'Male'
                          ? imagesFile.ic_blueTick
                          : imagesFile.ic_recWhiteDot
                      }
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.semibold_12_black}>Male</Text>
                  </View>
                </TouchableOpacity>

                <View style={{width: 50}}></View>
                <TouchableOpacity
                  onPress={() => SelectGender()}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      source={
                        gender == 'Female'
                          ? imagesFile.ic_blueTick
                          : imagesFile.ic_recWhiteDot
                      }
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.semibold_12_black}>Female</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMRConstants.HEIGHT}
                unit={BMRConstants.CM}
                value={Height}
                keyboardType={'numeric'}
                onChangeText={text => setHeight(text)}
                placeholder={BMRConstants.ENTER_YOUR_HEIGHT}
              />
            </View>

            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMRConstants.WEIGHT}
                unit={BMRConstants.KG}
                value={weight}
                keyboardType={'numeric'}
                onChangeText={text => setWeight(text)}
                placeholder={BMRConstants.ENTER_YOUR_WEIGHT}
              />
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.gilroy_Bold,
                  fontSize: 18,
                  color: Colors.black,
                }}>
                Goals
              </Text>
              <View style={{marginTop: 10}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => SelectGoal(1)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        Goal == 'Current Weight'
                          ? imagesFile.ic_blueTick
                          : imagesFile.ic_recWhiteDot
                      }
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.semibold_12_black}>
                      Maintain Current weight
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => SelectGoal(2)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        Goal == 'Loose Weight'
                          ? imagesFile.ic_blueTick
                          : imagesFile.ic_recWhiteDot
                      }
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.semibold_12_black}>Loose Weight</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => SelectGoal(3)}>
                  <View
                    style={{
                      width: 20,
                      height: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        Goal == 'Gain Weight'
                          ? imagesFile.ic_blueTick
                          : imagesFile.ic_recWhiteDot
                      }
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text style={styles.semibold_12_black}>Gain Weight</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.gilroy_Bold,
                  fontSize: 18,
                  color: Colors.black,
                }}>
                Activity Level
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => SelectActivity(1)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      Activity == 'Sedentary'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>Sedentary</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => SelectActivity(2)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      Activity == 'Lightly Active'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>
                    Lightly active (Light exercise/sports 3-5 days a week)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => SelectActivity(3)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      Activity == 'Moderately Active'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>
                    Moderately active (Moderate exercise/sports 3-5 days a week)
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => SelectActivity(4)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      Activity == 'Very Active'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>
                    Very active (Hard exercise/sports 6-7 days a week)
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => SelectActivity(5)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      Activity == 'Extra Active'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>
                    Extra active (Hard exercise/sports 6-7 days a week, plus
                    physical job)
                  </Text>
                </View>
              </TouchableOpacity>
              {/* <View style={{ marginVertical: 80 }}>
                                <SingleButton name={'Calcute Macros '} onPress={() => Validation_Of_Field()} />
                            </View> */}
            </View>
            <View style={{marginTop: 30}}>
              <Text
                style={{
                  fontFamily: Fonts.gilroy_Bold,
                  fontSize: 18,
                  color: Colors.black,
                }}>
                Select Macro
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}
                onPress={() => selectmacro(1)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      macro == 'High Carb'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>High Carb</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => selectmacro(2)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      macro == 'Moderate Carb'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>Moderate Carb</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => selectmacro(3)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      macro == 'Zone Diet'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>Zone Diet</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => selectmacro(4)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      macro == 'Low Carb'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>Low Carb</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}
                onPress={() => selectmacro(5)}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      macro == 'Keto Diet'
                        ? imagesFile.ic_blueTick
                        : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={styles.semibold_12_black}>Keto Diet</Text>
                </View>
              </TouchableOpacity>
              <View style={{marginVertical: 80}}>
                <SingleButton
                  name={'Calcute Macros '}
                  onPress={() => Validation_Of_Field()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        {macroNutirentsModalOpen ? (
          <MacronutrientsCalcModal
            visible={macroNutirentsModalOpen}
            calculatedValue={calculateValue}
            reportTitle={'Micronutrients'}
            RangeTitle={'Micronutrients'}
            yourRange={'Micronutrients'}
            onCancel={() => onDoneButtonPress()}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default MicronutrientCalculatorScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: 'white',
    width: '100%',
    flex: 1,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
});
