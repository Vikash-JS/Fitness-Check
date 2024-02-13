import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, Image, Alert} from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
// import { useNavigation, useRoute } from '@react-navigation/native';
import {useNavigation, useRoute} from '@react-navigation/native';
import imagesFile from '../../../../../../../assets/imagesFile';

import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import {BMRConstants, data, selecteGender, selecteAge} from '../ToolsConstants';
import {styles} from './styles';
import CommonDropDown from '../CommonDropDown';
import InputLabel from '../../../../../commonComponents/InputLabel';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {Toaster} from '../../../../../commonComponents/Toaster';
import BmrCalculatorModal from '../../../../../modals/BmrCalculatorModal';
import {Save_BMR} from '../../../../../../apiManager/tools';

const BMRCalculatorScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [exercise, setExercise] = useState('');
  const [bmrModalOpen, setBmrModalOpen] = useState(false);
  const [meterValue, setMeterValue] = useState(50);

  const checkvalidation = () => {
    //setBmrModalOpen(true);
    if (exercise == '') {
      Toaster(BMRConstants.SELECT_EXERCISE);
    } else if (gender == '') {
      Toaster(BMRConstants.SELECT_GENDER);
    } else if (weight == '') {
      Toaster(BMRConstants.SELECT_WEIGHT);
    } else if (height == '') {
      Toaster(BMRConstants.SELECT_HEIGHT);
    } else if (age == '') {
      Toaster(BMRConstants.SLECET_AGE);
    } else {
      calculatebmr();
    }
  };

  const calculatebmr = () => {
    let myCurrentBmrValue = 0;
    console.log('mygender', gender);
    if (gender == 'Male') {
      const maleBMR = Math.round(10 * weight + 6.25 * height - 5 * age + 5);
      console.log('my latest mensbmr', maleBMR);
      myCurrentBmrValue = Math.floor(maleBMR);
      setMeterValue(`${Math.floor(maleBMR)}`);
    } else {
      const femalbmr = Math.round(10 * weight + 6.25 * height - 5 * age - 161);
      myCurrentBmrValue = Math.floor(femalbmr);
      setMeterValue(`${Math.floor(femalbmr)}`);
    }
    setBmrModalOpen(true);
    const data = {
      height: height,
      weight: weight,
      age: age,
      gender: gender,
      exercise: exercise,
      bmrValue: myCurrentBmrValue,
    };
    Save_BMR(data)
      .then(response => {
        console.log('response:********* ', response);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <ScrollView>
        <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
          <ScrollView style={{flex: 1}}>
            <View>
              <AppHeader
                onGraphCall={() => navigation?.navigate('BMRHistory')}
                Heading={'BMR Calculator'}
                image={imagesFile.ic_graph}
                onPress={() => navigation?.goBack()}
              />
            </View>
            <View>
              <Image style={{width: '100%'}} source={imagesFile.ic_banner} />
            </View>
            <View style={{marginHorizontal: 18}}>
              <View style={{marginTop: 20}}>
                <CommonDropDown
                  Heading={BMRConstants.I_EXERCISE}
                  setSelected={val => setExercise(val)}
                  data={data}
                />
                <View style={{marginTop: 30}}>
                  <SingleButton
                    name="Calculate BMR"
                    onPress={() => checkvalidation()}
                  />
                </View>
              </View>
              <View style={{marginTop: 30}}>
                <CommonDropDown
                  Heading={BMRConstants.GENDER}
                  setSelected={val => setGender(val)}
                  data={selecteGender}
                />
              </View>
              <View style={{marginTop: 30}}>
                <InputLabel
                  Heading={BMRConstants.AGE}
                  unit={BMRConstants.Y}
                  value={age}
                  keyboardType={'numeric'}
                  onChangeText={text => setAge(text)}
                  placeholder={BMRConstants.AGE}
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
                <InputLabel
                  Heading={BMRConstants.HEIGHT}
                  unit={BMRConstants.CM}
                  value={height}
                  keyboardType={'numeric'}
                  onChangeText={text => setHeight(text)}
                  placeholder={BMRConstants.ENTER_YOUR_HEIGHT}
                />
              </View>
              {/* <View style={{ marginTop: 30 }}>
                            <InputLabel
                                Heading={BMRConstants.MY_FAT_PERCENTAGE}
                                unit={BMRConstants.M}
                                
                                placeholder={BMRConstants.ENTER_YOUR_FAT_PERCENTAGE} />
                        </View>
                        <View style={{marginTop:8}}>
                            <Text style={styles.medium_10_black}>I don’t know my fat percentage</Text>
                        </View> */}
            </View>
            <View style={{height: 80}}></View>
          </ScrollView>
          {bmrModalOpen ? (
            <BmrCalculatorModal
              bmrValue={meterValue}
              visible={bmrModalOpen}
              meterValue={meterValue}
              reportTitle={'BMR'}
              RangeTitle={'BMR'}
              yourRange={'BMR'}
              onCancel={() => setBmrModalOpen(false)}
            />
          ) : null}
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default BMRCalculatorScreen;
