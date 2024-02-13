import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  StyleSheet,
} from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {BodyFatConstants, selecteGender} from '../ToolsConstants';
import {Colors, Fonts, data} from '../../../../../../utils/Constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import imagesFile from '../../../../../../../assets/imagesFile';
import CommonDropDown from '../CommonDropDown';
import InputLabel from '../../../../../commonComponents/InputLabel';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {styles} from '../BMRCalculator/styles';
import {Toaster} from '../../../../../commonComponents/Toaster';
import FatCalculateModal from '../../../../../modals/FatCalculateModal';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Save_bodyFat} from '../../../../../../apiManager/tools';
const BodyFatCalculatorScreen = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [fatModalOpen, setFatModalOpen] = useState(false);
  const [meterValue, setMeterValue] = useState();
  const [gender, setGender] = useState('');

  const checkValidation = () => {
    if (gender == '') {
      Toaster('Please select gender');
    } else if (age == '') {
      Toaster('Please enter your age');
    } else if (weight == '') {
      Toaster('Please enter weight');
    } else if (height == '') {
      Toaster(BodyFatConstants.SELECT_HEIGHT);
    } else {
      calculateBodyfat();
    }
  };

  const calculateBodyfat = () => {
    let height_me = height / 100;
    let Bmi = weight / height_me ** 2;
    let fatPercentage;
    if (gender == 'male') {
      fatPercentage = 1.2 * Bmi + 0.23 * age - 16.2;
    } else {
      fatPercentage = 1.2 * Bmi + 0.23 * age - 5.4;
    }

    console.log('BodyFatPer========', fatPercentage.toFixed(2));
    setMeterValue(fatPercentage.toFixed(2));
    setFatModalOpen(true);

    const data = {
      weight: weight,
      height: height,
      age: age,
      gender: gender,
    };

    Save_bodyFat(data)
      .then(response => {
        console.log('response:********* ', response);
      })
      .catch(err => console.log(err));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView style={{flex: 1}}>
        <AppHeader
          Heading={BodyFatConstants.HEADING}
          onPress={() => navigation.goBack()}
        />
        <View>
          <Image style={{width: '100%'}} source={imagesFile.ic_banner} />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 18}}>
          <View>
            <Text style={styles.bold_18_black}>Gender</Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <TouchableOpacity
              style={{flexDirection: 'row', alignItems: 'center'}}
              onPress={() => setGender('male')}>
              <View>
                <Image
                  source={
                    gender == 'male'
                      ? imagesFile.ic_blueDot
                      : imagesFile.ic_whiteDot
                  }
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text>Male</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}
              onPress={() => setGender('female')}>
              <View>
                <Image
                  source={
                    gender == 'female'
                      ? imagesFile.ic_blueDot
                      : imagesFile.ic_whiteDot
                  }
                />
              </View>
              <View style={{marginLeft: 10}}>
                <Text>Female</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 30}}>
            <InputLabel
              Heading={'Age'}
              placeholder={'Age'}
              value={age}
              keyboardType={'numeric'}
              onChangeText={text => setAge(text)}
              //  unit={BodyFatConstants.CM}
            />
          </View>
          <View style={{marginTop: 30}}>
            <InputLabel
              Heading={'Weight'}
              placeholder={'weight'}
              value={weight}
              keyboardType={'numeric'}
              onChangeText={text => setWeight(text)}
              unit={BodyFatConstants.KG}
            />
          </View>
          <View style={{marginTop: 30}}>
            <InputLabel
              Heading={BodyFatConstants.HEIGHT}
              placeholder={BodyFatConstants.ENTER_HEIGHT}
              value={height}
              keyboardType={'numeric'}
              onChangeText={text => setHeight(text)}
              unit={BodyFatConstants.CM}
            />
          </View>
        </View>
        <View style={{marginTop: 30}}>
          <SingleButton
            name={BodyFatConstants.CALCULATE}
            onPress={() => checkValidation()}
          />
        </View>
        <View style={{marginTop: 12, marginHorizontal: 18}}>
          <Text style={styles.medium_10_opacity}>
            MFM’s plan & calculator use a combination of scientifically proven
            methodologies. Reference Data Here
          </Text>
        </View>
        <View style={{height: 80}}></View>
      </ScrollView>
      {fatModalOpen ? (
        <FatCalculateModal
          visible={fatModalOpen}
          meterValue={meterValue}
          reportTitle={'Body Fat'}
          RangeTitle={'Body Fat'}
          yourRange={'Body Fat'}
          onCancel={() => setFatModalOpen(false)}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default BodyFatCalculatorScreen;
