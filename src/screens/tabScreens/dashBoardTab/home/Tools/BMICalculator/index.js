import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Image, Alert} from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import imagesFile from '../../../../../../../assets/imagesFile';

import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import {
  BMRConstants,
  data,
  selecteGender,
  selecteAge,
  BMIConstants,
} from '../ToolsConstants';
import {styles} from './styles';
import CommonDropDown from '../CommonDropDown';
import InputLabel from '../../../../../commonComponents/InputLabel';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {Toaster} from '../../../../../commonComponents/Toaster';
import BMICalculatorModal from '../../../../../modals/BMICalculatorModal';
import {Save_BMI} from '../../../../../../apiManager/tools';

const BMICalculator = () => {
  const navigation = useNavigation();
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [bmiModalOpen, setBmiModalOpen] = useState(false);
  const [meterValue, setMeterValue] = useState(50);
  const [index, setIndex] = useState(0);
  const checkvalidation = () => {
    if (weight < 0 || height < 0 || age < 0) {
      Toaster(BMIConstants.VALID_UNITS);
      return;
    }
    if (gender == '') {
      Toaster(BMIConstants.SELECT_GENDER);
    } else if (age == '') {
      Toaster(BMIConstants.SLECET_AGE);
    } else if (weight == '') {
      Toaster(BMIConstants.SELECT_WEIGHT);
    } else if (height == '') {
      Toaster(BMIConstants.SELECT_HEIGHT);
    } else {
      calculatebmr();
    }
  };

  const calculatebmr = () => {
    let heightMeter = height / 100;
    let calculationBMI = weight / (heightMeter * heightMeter);
    console.log('calculationBMI: ', calculationBMI);
    setMeterValue(calculationBMI.toFixed(1));
    let fixedBMI = calculationBMI.toFixed(1);
    if (fixedBMI < 18.5) {
      setIndex(0);
    } else if (fixedBMI >= 18.5 && fixedBMI <= 24.9) {
      setIndex(1);
    } else if (fixedBMI >= 25 && fixedBMI <= 29.9) {
      setIndex(2);
    } else if (fixedBMI >= 30 && fixedBMI <= 100) {
      setIndex(3);
    }
    setBmiModalOpen(true);

    const data = {
      weight: weight,
      height: height,
      age: age,
      gender: gender,
    };

    Save_BMI(data)
      .then(response => {
        console.log('response:********* ', response);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView style={{flex: 1}}>
          <View>
            <AppHeader
              Heading="BMI Calculator"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={{flex: 1}}>
            <Image style={{width: '100%'}} source={imagesFile.ic_banner} />
          </View>
          <View style={{marginHorizontal: 18}}>
            <View style={{marginTop: 30}}>
              <CommonDropDown
                Heading={BMIConstants.GENDER}
                setSelected={val => setGender(val)}
                data={selecteGender}
              />
            </View>
            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMIConstants.AGE}
                unit={BMIConstants.Y}
                value={age}
                keyboardType={'numeric'}
                onChangeText={text => setAge(text)}
                placeholder={BMIConstants.AGE}
              />
            </View>
            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMIConstants.WEIGHT}
                unit={BMIConstants.KG}
                value={weight}
                keyboardType={'numeric'}
                onChangeText={text => setWeight(text)}
                placeholder={BMIConstants.ENTER_YOUR_WEIGHT}
              />
            </View>
            <View style={{marginTop: 30}}>
              <InputLabel
                Heading={BMIConstants.HEIGHT}
                unit={BMIConstants.CM}
                value={height}
                keyboardType={'numeric'}
                onChangeText={text => setHeight(text)}
                placeholder={BMIConstants.ENTER_YOUR_HEIGHT}
              />
            </View>
            <View style={{marginTop: 30}}>
              <SingleButton
                name="Calculate BMI"
                onPress={() => checkvalidation()}
              />
            </View>
          </View>
          <View style={{height: 80}}></View>
        </ScrollView>
        {bmiModalOpen ? (
          <BMICalculatorModal
            bmrValue={meterValue}
            visible={bmiModalOpen}
            meterValue={meterValue}
            reportTitle={'BMI'}
            RangeTitle={'BMI'}
            yourRange={'BMI'}
            index={index}
            onCancel={() => setBmiModalOpen(false)}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};

export default BMICalculator;
