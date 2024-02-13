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
import {Colors, Fonts, data} from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
import CommonDropDown from '../CommonDropDown';
import {RmConstants, Exercises} from '../ToolsConstants';
import InputLabel from '../../../../../commonComponents/InputLabel';
import SingleButton from '../../../../../commonComponents/SingleButton';
import {Toaster} from '../../../../../commonComponents/Toaster';
import RmCalculateModal from '../../../../../modals/RmCalculateModal';
import {Save_1RM} from '../../../../../../apiManager/tools';

const RmCalculatorScreen = () => {
  const navigation = useNavigation();
  const [selectExercise, setSelectExercise] = useState('');
  const [weightLifted, setWeightLifted] = useState('');
  const [reps, setReps] = useState('');
  const [rmModalOpen, setRmModalOpen] = useState(false);
  const [meterValue, setMeterValue] = useState(50);

  const checkValidation = () => {
    if (selectExercise == '') {
      Toaster(RmConstants.SELECT_EXERCISE);
    } else if (weightLifted == '') {
      Toaster(RmConstants.SELECT_WEIGHT);
    } else if (reps == '') {
      Toaster(RmConstants.SELECT_REPS);
    } else {
      calculateReps();
    }
  };

  const calculateReps = () => {
    let newRep = Math.round(weightLifted / [1.0278 - 0.0278 * reps]);
    setMeterValue(`${Math.floor(newRep)}`);
    setRmModalOpen(true);
    const data = {
      reps: reps,
      weightLifted: weightLifted,
      exercise: selectExercise,
    };

    Save_1RM(data)
      .then(response => {
        console.log('response:********* ', response);
      })
      .catch(err => console.log(err));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <ScrollView style={{flex: 1}}>
        <AppHeader
          Heading={RmConstants.Heading}
          onPress={() => navigation.goBack()}
        />
        <View>
          <Image style={{width: '100%'}} source={imagesFile.ic_banner} />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 18}}>
          <CommonDropDown
            Heading={RmConstants.EXERCISE}
            setSelected={val => setSelectExercise(val)}
            data={Exercises}
          />
        </View>
        <View style={{marginTop: 30, marginHorizontal: 18}}>
          <InputLabel
            placeholder={RmConstants.WEIGHT_LIFTED}
            Heading={RmConstants.WEIGHT_LIFTED}
            unit={RmConstants.KG}
            value={weightLifted}
            keyboardType={'numeric'}
            onChangeText={text => setWeightLifted(text)}
          />
        </View>
        <View style={{marginTop: 30, marginHorizontal: 18}}>
          <InputLabel
            placeholder={RmConstants.REPS}
            Heading={RmConstants.REPS}
            unit={RmConstants.REPS}
            value={reps}
            keyboardType={'numeric'}
            onChangeText={text => setReps(text)}
          />
        </View>
        <View style={{marginTop: 20}}>
          <SingleButton
            name={RmConstants.CALCULATE}
            onPress={() => checkValidation()}
          />
        </View>
        <View style={{marginTop: 20, marginHorizontal: 18}}>
          <Text style={styles.medium_10_opacity}>
            MFM’s plan & calculator use a combination of scientifically proven
            methodologies. Reference Data Here
          </Text>
        </View>
        <View style={{height: 80}}></View>
      </ScrollView>
      {rmModalOpen ? (
        <RmCalculateModal
          visible={rmModalOpen}
          meterValue={meterValue}
          reportTitle={'1 RM'}
          RangeTitle={'1 RM'}
          yourRange={'1 RM'}
          onCancel={() => setRmModalOpen(false)}
        />
      ) : null}
    </SafeAreaView>
  );
};

export default RmCalculatorScreen;

const styles = StyleSheet.create({
  medium_10_opacity: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
});
