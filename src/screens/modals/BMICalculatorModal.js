import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import MyStatusBar from '../commonComponents/MyStatusBar';
import {Colors, Fonts} from '../../utils/Constants';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

const BMICalculatorModal = props => {

  const [meterValue, setMeterValue] = useState(props?.meterValue);
  const [tableHead, setTableHead] = useState(['BMI', 'Weight status']);
  const [tableData, setTableDarta] = useState([
    ['Below 18.5', 'Underweight'],
    ['18.5–24.9', 'Normal weight'],
    ['25–29.9', 'Overweight'],
    ['30–35', 'Obese'],
    ['Over 35', ' Morbid obesity'],
  ]);

  let parameterArray = [
    {title: 'Time to grab a bite!', color: 'rgb(175,50,45)'},
    {title: 'Great shape!', color: 'rgb(32,186,45)'},
    {title: 'Time to run!', color: 'rgb(231,73,36)'},
    {title: 'Time to run!', color: 'rgb(231,73,36)'},
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{flex: 1, backgroundColor: Colors.white}}>
            <View style={styles.HeadingView}>
              <Text style={styles.bold_12_black}>
                {props.reportTitle} Report{' '}
              </Text>
            </View>

            <View style={styles.descriptionView}>
              <Text style={styles.discriptionText}>
                The Body Mass Index (BMI) is a measurement of a person's
                leanness or corpulence based on their height and weight, and is
                intended to quantify tissue mass. It is widely used as a general
                indicator of whether a person has a healthy body weight for
                their height. Specifically, the value obtained from the
                calculation of BMI is used to categorize whether a person is
                underweight, normal weight, overweight, or obese depending on
                what range the value falls between.
              </Text>
            </View>
            <View style={{width: '100%'}}>
              <View style={{alignSelf: 'flex-start', marginVertical: 15}}>
                <Text style={styles.bold_12_black}>
                  {props.yourRange} Result
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View>
                  <Text style={styles.semibold_12_black}>Your BMI is =</Text>
                </View>
                <View>
                  <Text
                    style={[
                      styles.bold_12_green,
                      {color: parameterArray[props?.index]?.color},
                    ]}>
                    {' ' + meterValue}
                  </Text>
                </View>
                <View>
                  <Text style={[styles.semibold_12_black, {marginTop: -2}]}>
                    {' '}
                    Kg/m²
                  </Text>
                </View>
              </View>
              <View style={{marginTop: 10}}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                  <Row
                    data={tableHead}
                    style={{backgroundColor: Colors.blue}}
                    textStyle={{
                      padding: 5,
                      fontFamily: Fonts.gilroy_Bold,
                      fontSize: 14,
                      color: Colors.white,
                      textAlign: 'center',
                    }}
                  />
                  <Rows
                    data={tableData}
                    textStyle={{
                      padding: 5,
                      fontFamily: Fonts.gilroy_SemiBold,
                      fontSize: 12,
                      color: Colors.black,
                      textAlign: 'center',
                    }}
                  />
                </Table>
              </View>
              <View>
                <View>
                  <View>
                    <Text
                      style={[
                        styles.semibold_12_black,
                        {
                          color: parameterArray[props?.index]?.color,
                          fontSize: 15,
                          alignSelf: 'center',
                          marginTop: 15,
                        },
                      ]}>
                      {parameterArray[props?.index]?.title}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 20, width: '100%'}}>
                {/* close button */}
                <TouchableOpacity
                  style={styles.btnView}
                  onPress={props.onCancel}>
                  <Text style={styles.semibold_12_white}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>

          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

export default BMICalculatorModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
   
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
  },
  discriptionText: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
  },

  descriptionView2: {
    marginVertical: 8,
    bottom: 20,
  },
  discriptionText2: {
    fontFamily: Fonts.gilroy_Regular,
    fontSize: 13,
    lineHeight: 18,
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
    color: Colors.black,
  },
  bold_12_green: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 12,
    color: Colors.green,
  },
});
