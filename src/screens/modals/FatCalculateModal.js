
import React, {useState} from 'react';
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
import {Colors, Fonts} from '../../utils/Constants';
//Import library for Speedometer
import RNSpeedometer from 'react-native-speedometer';
import {Marker} from 'react-native-svg';
const FatCalculateModal = props => {
  const [meterValue, setMeterValue] = useState(props?.meterValue);
  console.log('bmr result props', props);
  // const [reason,setReason] = useState('')
  const labels = [
    {
      name: 'Essential 2% to 6%',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
    },
    {
      name: 'Athletes 6% to 14%',
      labelColor: '#f4ab44',
      activeBarColor: '#f4ab44',
    },
    {
      name: 'Fitness 14% to 18%',
      labelColor: '#00ff6b',
      activeBarColor: '#00ff6b',
    },
    {
      name: 'Average 18% to 25%',
      labelColor: '#c9c9c9',
      activeBarColor: '#c9c9c9',
    },
    {
      name: 'Obese greater than 25%',
      labelColor: '#ff2900',
      activeBarColor: '#ff2900',
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
          <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,backgroundColor:Colors.white}} >
          <View style={styles.HeadingView}>
            <Text style={styles.bold_12_black}>{props.reportTitle} Report</Text>
          </View>

          <View style={styles.descriptionView}>
            <Text style={styles.discriptionText}>
            The body fat percentage (BFP) of a human or other living being is the total mass of fat divided by total body mass, multiplied by 100; body fat includes essential body fat and storage body fat. Essential body fat is necessary to maintain life and reproductive functions.
            </Text>
          </View>
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              width: '100%',
            }}>
            <View style={{alignSelf: 'flex-start', margin: 15}}>
              <Text style={styles.bold_12_black}>{props.RangeTitle} Range</Text>
            </View>

            <View style={styles.descriptionView2}>
              <Text style={styles.discriptionText2}>
              For people aged 20 to 39, people should aim for 18% to 25% of body fat. athletes should have 6% to 14%. For fitness category 14% to 18% is required.Essential fat percentage is 2% to 6%
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'column',
                borderBottomColor: '#efefef',
                // borderBottomWidth: 1,
                // padding: 5,
                marginHorizontal:15,
              }}>
                
              {labels?.length > 0
                ? labels.map((data, index) => {
                    return (
                      <>
                      <View style={{flexDirection:'row'}}> 
                        <View
                          style={{
                            marginTop:10,
                            width: 20,
                            height: 20,
                            backgroundColor: data.labelColor,
                            borderRadius: 10,
                            marginHorizontal: 7,
                            
                            right:10
                          }}></View>

                        <View style={{marginTop:10,marginLeft:10}}>
                          <Text>{data.name}</Text>
                        </View>
                        </View>
                      </>
                    );
                  })
                : null}
                
            </View>
            <View style={{alignSelf: 'flex-start', margin: 15, padding: 5}}>
              <Text style={styles.bold_12_black}>Your {props.yourRange}</Text>
            </View>

            <RNSpeedometer
              value={Math.round(meterValue)}
              size={200}
              minValue={0}
              maxValue={30}
              allowedDecimals={2}
              labels={labels}
              //Labels for the different steps of Speedometer
            />
            <View
              style={{
                marginTop: 40,
                padding: 20,
                alignItems: 'center',
                margin: 10,
              }}>
              {/* <Text style={styles.RmAdviceText}>
                Enter the value for the speedometer graph between 0 to 100 Enter
                the value for the speedometer graph between 0 to 100 Enter the
                value for the speedometer graph between 0 to 100
              </Text> */}
            </View>
            <View style={{marginTop: 10,marginBottom:10, width: '100%'}}>
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

export default FatCalculateModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  HeadingView: {
    marginTop:48 ,
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
    marginHorizontal:15,
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
    // alignItems: 'center',
    // padding: 8,
    marginHorizontal:15,
    marginVertical:8,
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
});
