
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native';
import MyStatusBar from '../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../utils/Constants';
//Import library for Speedometer
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const MacronutrientsCalcModal = props => {
  const [meterValue, setMeterValue] = useState(props?.meterValue ? props.meterValue : 100);

  const [calculateValue, setCalculateValue] = useState(props?.calculatedValue)
  const [tableData, setTableDarta] = useState([
    ['Protein', calculateValue?.protien + " grams/day"],
    ['Fat', calculateValue?.fat + " grams/day"],
    ['Carbs', calculateValue?.carb + " grams/day"],
    ['Food Energy', calculateValue?.totalEnergy + " Calories/day"]

  ])
  console.log('bmr result props', props);
  // const [reason,setReason] = useState('')
  const labels = [
    {
      name: 'UnderWeight',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Fit',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'OverWeight',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
    {
      name: 'looes',
      labelColor: '#00ff6b',
      activeBarColor: '#c9c9c9',
    },
  ];
  return (
    <>
      <MyStatusBar
        barStyle="light-content"
        backgroundColor={'rgba(0, 0, 0, 0.8)'}
      />
      <Modal
        animationType="slide"
        visible={props.visible}
        presentationStyle={'overFullScreen'}
        transparent={true}>
        <View style={styles.container}>
          {/* speedometer */}
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Colors.white }} >
            <View style={styles.HeadingView}>
              <Text style={styles.bold_12_black}>Macro Report</Text>
            </View>

            <View style={styles.descriptionView}>
              <Text style={styles.discriptionText}>
                This calculator can provide a range of suggested values for a person's macronutrient and Calorie needs under normal conditions.
            </Text>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.bold_12_black}>Macro Result</Text>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={styles.semibold_12_black}>The results below are the suggested amounts of macronutrients and food energy (Calories) you need to consume daily to maintain your weight. Each macronutrient amount is represented as a range of values. Please click whichever tab best suits your needs</Text>
            </View>
            <View style={{ margin: 5 }}>
              <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Rows data={tableData} textStyle={{ padding: 5, fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.black, textAlign: 'center' }} />
              </Table>
            </View>

            <View style={{ marginTop: 20, width: '100%' }}>
              <TouchableOpacity style={styles.btnView} onPress={props.onCancel}>
                <Text style={styles.semibold_12_white}>Done</Text>
              </TouchableOpacity>
            </View>
            {/* close button */}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default MacronutrientsCalcModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeadingView: {
    // top: 80,
    marginTop: 48,
    alignItems: 'center',
  },
  bold_12_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 17,
    color: Colors.black,
  },
  descriptionView: {
    backgroundColor: '#fffeed',
    alignItems: 'center',
    margin: 10,
    // top: 90,
    padding: 10,
    borderRadius: 6,
    //borderWidth:1,
  },
  discriptionText: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
  },
  descriptionView2: {
    alignItems: 'center',
    padding: 8,
    bottom: 20,
  },
  discriptionText2: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
    //color:Colors.Goal_BorderGrey,
    color: '#c0c0c0',
  },
  RmAdviceText: {
    textAlign: 'center',
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
  },
  textInputView: {
    borderWidth: 1,
    borderColor: Colors.inputGrey,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  semibold_12_white: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.white,
  },
  btnView: {
    borderRadius: 10,
    marginHorizontal: 20,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blue,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black
  }
});
