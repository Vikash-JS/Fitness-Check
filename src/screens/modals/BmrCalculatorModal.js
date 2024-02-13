import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native';
import MyStatusBar from '../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../utils/Constants';
//Import library for Speedometer
import RNSpeedometer from 'react-native-speedometer';
import { Marker } from 'react-native-svg';
import DropShadow from "react-native-drop-shadow";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const BmrCalculatorModal = props => {
  const [meterValue, setMeterValue] = useState(props?.meterValue);
  const [tableHead, setTableHead] = useState(['Activity Level', 'Calorie'])
  const [tableData, setTableDarta] = useState([
    ['Sedentary: little or no exercise', Math.round(meterValue * 1.2)],
    ['Exercise 1-3 times/week	', Math.round(meterValue * 1.375)],
    ['Exercise 4-5 times/week	', Math.round(meterValue * 1.465)],
    ['Daily exercise or intense exercise 3-4 times/week	', Math.round(meterValue * 1.55)],
    ['Intense exercise 6-7 times/week', Math.round(meterValue * 1.725)],
    ['Very intense exercise daily, or physical job	', Math.round(meterValue * 1.9)]

  ])
  // console.log('bmr result props', props);
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
      labelColor: '#c9c9c9',
      activeBarColor: '#c9c9c9',
    },
  ];
  return (
    // <SafeAreaView style={{flex:1}}>
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
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, backgroundColor: Colors.white }} >
            {/* speedometer */}
            <View style={styles.HeadingView}>
              <Text style={styles.bold_12_black}>{props.reportTitle} Report </Text>
            </View>

            <View style={styles.descriptionView}>
              <Text style={styles.discriptionText}>
                The Basal Metabolic Rate (BMR) Calculator estimates your basal metabolic rate—the amount of energy expended while at rest in a neutrally temperate environment, and in a post-absorptive state (meaning that the digestive system is inactive, which requires about 12 hours of fasting).
            </Text>
            </View>
            <View style={{ width: '100%', }}>
              <View style={{ alignSelf: 'flex-start', marginVertical: 15 }}>
                <Text style={styles.bold_12_black}>{props.yourRange} Result</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.semibold_12_black} >Your BMR is =</Text>
                </View>
                <View>
                  <Text style={styles.bold_12_green}>{meterValue}</Text>
                </View>
                <View>
                  <Text style={styles.semibold_12_black}> Calories/day</Text>
                </View>
              </View>
              <View style={{  marginTop: 10 }}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                  <Row  data={tableHead} style={{backgroundColor:Colors.blue}} textStyle={{padding:5,fontFamily:Fonts.gilroy_Bold,fontSize:14,color:Colors.white,textAlign:'center'}} />
                  <Rows data={tableData} textStyle={{padding:5,fontFamily:Fonts.gilroy_SemiBold,fontSize:12,color:Colors.black,textAlign:'center'}}   />
                </Table>
              </View>
              <View>
                <View>
                  <View>
                    <Text style={styles.bold_12_black}>Exercise</Text>
                  </View>
                  <View>
                    <Text style={styles.semibold_12_black}>15-30 minutes of elevated heart rate activity.</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={styles.bold_12_black}>Intense exercise</Text>
                  </View>
                  <View>
                    <Text style={styles.semibold_12_black}>45-120 minutes of elevated heart rate activity.</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={styles.bold_12_black}>Very intense exercise</Text>
                  </View>
                  <View>
                    <Text style={styles.semibold_12_black}>2+ hours of elevated heart rate activity.</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 20, width: '100%' }}>
                <TouchableOpacity style={styles.btnView} onPress={props.onCancel}>
                  <Text style={styles.semibold_12_white}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* close button */}
          </ScrollView>
        </View>
      </Modal>
   </>
    // </SafeAreaView>
  );
};

export default BmrCalculatorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 15
  },
  HeadingView: {
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
    marginVertical: 10,

    padding: 14,
    borderRadius: 6,
    //borderWidth:1,
  },
  discriptionText: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
  },

  descriptionView2: {
    // alignItems: 'center',
    marginVertical: 8,
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
  },
  bold_12_green: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 12,
    color: Colors.green
  }
});
