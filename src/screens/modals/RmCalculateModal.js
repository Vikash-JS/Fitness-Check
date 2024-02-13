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
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

const RmCalculateModal = props => {
  const [meterValue, setMeterValue] = useState(props?.meterValue);
  const [tableHead, setTableHead] = useState(['Perecentage%', 'Kgs'])
  const [tableData, setTableDarta] = useState([
    ['95%', Math.round(meterValue * (95 / 100))],
    ['90%', Math.round(meterValue * (90 / 100))],
    ['85%', Math.round(meterValue * (85 / 100))],
    ['80%', Math.round(meterValue * (80 / 100))],
    ['75%', Math.round(meterValue * (75 / 100))],
    ['70%', Math.round(meterValue * (70 / 100))],
    ['65%', Math.round(meterValue * (65 / 100))],
    ['60%', Math.round(meterValue * (60 / 100))],
    ['55%', Math.round(meterValue * (55 / 100))],
    ['50%', Math.round(meterValue * (50 / 100))]

  ])
  const [tableData1, setTableData1] = useState([
    ["Speed and power", "50-60 percent, 3-5 reps per set"],
    ["Muscle size", "70-80 percent, 8-12 reps per set "],
    ["Strength", "85-95 percent, 3-5 reps per set"],
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
      name: 'Looes',
      labelColor: '#c9c9c9',
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
              <Text style={styles.bold_12_black}>{props.reportTitle} Report</Text>
            </View>

            <View style={styles.descriptionView}>
              <Text style={styles.discriptionText}>
                Calculate your max for any lift with this 1RM calculator. Get strategic about getting bigger, stronger, and faster!
            </Text>
            </View>
            <View
              style={{
                justifyContent: 'center',

                flex: 1,
                width: '100%',
              }}>
              <View style={{ alignSelf: 'flex-start', margin: 10 }}>
                <Text style={styles.bold_12_black}>{props.RangeTitle} Result</Text>
              </View>

              <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', marginLeft: 10 }}>
                <Text style={[styles.semibold_12_black, { textAlign: 'left' }]}>Your one rep max is {meterValue} kg</Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                  <Row data={tableHead} style={{ backgroundColor: Colors.blue }} textStyle={{ padding: 5, fontFamily: Fonts.gilroy_Bold, fontSize: 14, color: Colors.white, textAlign: 'center' }} />
                  <Rows data={tableData} textStyle={{ padding: 5, fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.black, textAlign: 'center' }} />
                </Table>
              </View>
              <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Text style={styles.semibold_12_black}>WHAT PERCENTAGE OF MY ONE-REP MAX SHOULD I LIFT?</Text>
                <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>

                  <Rows data={tableData1} textStyle={{ padding: 5, fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.black, textAlign: 'center' }} />
                </Table>
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
  );
};

export default RmCalculateModal;

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
