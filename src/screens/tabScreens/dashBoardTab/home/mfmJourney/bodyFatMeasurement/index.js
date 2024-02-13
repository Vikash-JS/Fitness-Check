
import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { ProgressRecordConstants } from '../mfmJourneyConstants';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import ShadowInput from '../ShadowInput';
import SingleButton from '../../../../../commonComponents/SingleButton';
import { Add_BodyMeasurement, Add_BodyFat, Get_Body_Fat } from '../../../../../../apiManager/mfmJourney/index';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Loader from '../../../../../commonComponents/Loader';
import { Toaster } from '../../../../../commonComponents/Toaster';
import DropShadow from "react-native-drop-shadow";

const BodyFatMeasurementScreen = () => {

    const navigation = useNavigation()
    const [chestRight, setChestRight] = useState('')
    const [chestLeft, setChestLeft] = useState('')
    const [tricepLeft, setTricepLeft] = useState('')
    const [tricepRight, setTricepRight] = useState('')
    const [bicepLeft, setBicepLeft] = useState('')
    const [bicepRight, setBicepRight] = useState('')
    const [suprailiacRight, setSuprailiacRight] = useState('')
    const [suprailiacLeft, setSuprailiacLeft] = useState('')
    const [tighRight, setTighRight] = useState('')
    const [tighLeft, setTighLeft] = useState('')
    const [bodyFatLeft, setBodyFatLeft] = useState('')
    const [bodyFatRight, setBodyFatRight] = useState('')
    const [bodyFatTotal, setBodyFatTotal] = useState('')
    const [subscapularLeft, setSubscapularLeft] = useState('')
    const [subscapularRight, setSubscapularRight] = useState('')
    const [midaxillaryLeft, setMidaxillaryLeft] = useState('')
    const [midaxillaryRight, setMidaxillaryRight] = useState('')
    const [abdominalLeft, setAbdominalLeft] = useState('')
    const [abdominalRight, setAbdominalRight] = useState('')
    const [measurementDate, setMeasurementDate] = useState(new Date())
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [loader, setLoader] = useState(false)
    const [measurementData, setMeasurementData] = useState([])
    const [newDate, setNewDate] = useState(new Date())
    
    useEffect(() => {
        getBodyFat()
    }, [])

    const getBodyFat = () => {
        setLoader(true)
        Get_Body_Fat().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log("bodyFatResp======", response)
                setMeasurementData(response.data.data)
                setNewDate(new Date())
            }
        }).catch((error) => {
            setLoader(false)
            console.log("getFatErr======", error)
        })
    }
    const Validation = param => {
      if (newDate == '') {
        Toaster('Please Select Date');
      } else if (chestLeft == '') {
        Toaster('Please Enter Chest Size');
      } else if (tricepLeft == '') {
        Toaster('Please Enter LeftTriceps Size');
      } else if (tricepRight == '') {
        Toaster('Please Enter RightTriceps Size');
      } else if (bicepLeft == '') {
        Toaster('Please Enter BicepsLeft Size');
      } else if (bicepRight == '') {
        Toaster('Please Enter BicepsRight Size');
      } else if (suprailiacRight == '') {
        Toaster('Please Enter suprailiacRight Size');
      } else if (suprailiacLeft == '') {
        Toaster('Please Enter suprailiacLeft Size');
      } else if (tighRight == '') {
        Toaster('Please Enter thighRight Size');
      } else if (tighLeft == '') {
        Toaster('Please Enter thighLeft Size');
      } else if (subscapularLeft == '') {
        Toaster('Please Enter subscapularLeft Size');
      } else if (subscapularRight == '') {
        Toaster('Please Enter subscapularRight Size');
      } else if (midaxillaryRight == '') {
        Toaster('Please Enter midaxillaryRight Size');
      } else if (abdominalLeft == '') {
        Toaster('Please Enter abdominalLeft Size');
      } else if (abdominalRight == '') {
        Toaster('Please Enter abdominalRight Size');
      } 
       else {
        if (param == 'calculate') {
          calculateFat();
        } else if (param == 'save') {
             if(!bodyFatTotal)
      {
            Toaster('Please calculate fat to continue')
      }
      else
      {
          addWeight();

      }
        }
      }
    };
const calculateFat = () =>
{
    let totalLeft = Number(chestLeft) + Number(tricepLeft) + Number(bicepLeft) + Number(suprailiacLeft) + Number(tighLeft) + Number(subscapularLeft) + Number(midaxillaryLeft) + Number(abdominalLeft)+
    Number(tricepRight) + Number(bicepRight) + Number(suprailiacRight) + Number(tighRight) + Number(subscapularRight) + Number(midaxillaryRight) + Number(abdominalRight)
    let totalFatLeftPerc = (totalLeft/15)?.toFixed(2)
    setBodyFatTotal(totalFatLeftPerc)

}



    const addWeight = () => {
        var raw = JSON.stringify({
            "measurementDate": measurementDate,
            "bodyFat": {
                "fat": bodyFatTotal,
                "chest": chestLeft,
                // "chestRight": chestRight,
                "tricepLeft": tricepLeft,
                "tricepRight": tricepRight,
                "bicepsLeft": bicepLeft,
                "bicepsRight": bicepRight,
                "subscapularLeft": subscapularLeft,
                "subscapularRight": subscapularRight,
                "midaxillaryLeft": midaxillaryLeft,
                "midaxillaryRight": midaxillaryRight,
                "abdominalLeft": abdominalLeft,
                "abdominalRight": abdominalRight,
                "suprailiacLeft": suprailiacLeft,
                "suprailiacRight": suprailiacRight,
                "thighLeft": tighLeft,
                "thighRight": tighRight,
                "fatLeft": bodyFatLeft,
                "fatRight": bodyFatRight
            }
        });
        console.log("RowData======", raw)
        setLoader(true)
        Add_BodyFat(raw).then((response) => {

            if (response.status == 200) {
                setLoader(false)
                setMeasurementData([])
                Toaster(response.message)
                getBodyFat()
                console.log("AddBodyResp=======", response)
                setChestLeft('')
                setChestRight('')
                setTricepLeft('')
                setTricepRight('')
                setBicepLeft('')
                setBicepRight('')
                setSuprailiacLeft('')
                setSuprailiacRight('')
                setSubscapularLeft('')
                setSubscapularRight('')
                setTighLeft('')
                setTighRight('')
                setMidaxillaryLeft('')
                setMidaxillaryRight('')
                setAbdominalLeft('')
                setAbdominalRight('')
                setBodyFatTotal('')

   
            }
        }).catch((error) => {
            setLoader(false)
            console.log("AddBodyErr=======", error)
        })
    }

    const renderMeasurementTable = ({ item }) => (
        <DropShadow style={styles.shadowStyle}>
            <View style={{ marginTop: 15, marginBottom: 15, marginHorizontal: 18, backgroundColor: Colors.white, paddingVertical: 20, paddingHorizontal: 18, borderRadius: 12 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.DATE_MEASUREMENT_TAKEN}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{moment(item.measurementDate).format("ll")}</Text>
                    </View>
                </View>
         
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.CHEST_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.chest} inches</Text>
                    </View>
                </View>
                {/* <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.CHEST_RIGHT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.chestRight} inches</Text>
                    </View>
                </View> */}
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.TRICEP_LEFT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.tricepLeft} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.TRICEP_RIGHT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.tricepRight} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.BICEP_LEFT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.bicepsLeft} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.BICEP_RIGHT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item?.bodyFat?.bicepsRight} inches</Text>
                    </View>
                </View>
                
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.SUBSCAPULARLEFT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.subscapularLeft} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.SUBSCAPULARRIGHT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.subscapularRight} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.MIDAXILLARYLEFT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.midaxillaryLeft} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.MIDAXILLARYRIGHT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.midaxillaryRight} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.ABDOMINALLEFT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.abdominalLeft} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.ABDOMINALRIGHT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.abdominalRight} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.SUPRAILIAC_LEFT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.suprailiacLeft} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.SUPRAILIAC_RIGHT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.suprailiacRight} inches
            </Text>
                    </View>
                </View>

                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.THIGH_LEFT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.thighLeft} inches
            </Text>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: 1,
                        height: 1,
                        width: '100%',
                        marginVertical: 15,
                        borderColor: Colors.inputGrey,
                    }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>
                            {ProgressRecordConstants.THIGH_RIGHT}
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>
                            {item?.bodyFat?.thighRight} inches
            </Text>
                    </View>
                </View>
       
       
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
              
              <View style={{ flexDirection: 'row' }}>
                  <View>
                      <Text style={styles.semibold_14_black}>{ProgressRecordConstants.FAT}</Text>
                  </View>
                  <View style={{ flex: 1 }}></View>
                  <View>
                      <Text style={styles.semibold_14_opacity}>{(item?.bodyFat?.fat??'-' )+ ' %'} </Text>
                  </View>
              </View>
            </View>
        </DropShadow>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }} keyboardShouldPersistTaps='always'>
                <View>
                    <AppHeader Heading={ProgressRecordConstants.MFM_JOURNEY} onPress={() => navigation.goBack()} />
                </View>
                <View>
                    <Image style={{ width: '100%' }} source={imagesFile.ic_banner} />
                </View>
                <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.bold_20_black}>{ProgressRecordConstants.BODY_FAT_MEASUREMENT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={() => setOpenDatePicker(true)}
                    >
                        <Image source={imagesFile.ic_NewCalender} />
                    </TouchableOpacity>

                </View>
                <ShadowInput keyboardType={'numeric'} placeholder={'Chest Size'} unit={ProgressRecordConstants.INCHES} value={chestLeft} onChangeText={(text) => setChestLeft(text)} />
                {/* <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.CHEST_RIGHT} unit={ProgressRecordConstants.MM} value={chestRight} onChangeText={(text) => setChestRight(text)} /> */}
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.TRICEP_LEFT} unit={ProgressRecordConstants.INCHES} value={tricepLeft} onChangeText={(text) => setTricepLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.TRICEP_RIGHT} unit={ProgressRecordConstants.INCHES} value={tricepRight} onChangeText={(text) => setTricepRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.BICEP_LEFT} unit={ProgressRecordConstants.INCHES} value={bicepLeft} onChangeText={(text) => setBicepLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.BICEP_RIGHT} unit={ProgressRecordConstants.INCHES} value={bicepRight} onChangeText={(text) => setBicepRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.SUPRAILIAC_LEFT} unit={ProgressRecordConstants.INCHES} value={suprailiacLeft} onChangeText={(text) => setSuprailiacLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.SUPRAILIAC_RIGHT} unit={ProgressRecordConstants.INCHES} value={suprailiacRight} onChangeText={(text) => setSuprailiacRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.THIGH_LEFT} unit={ProgressRecordConstants.INCHES} value={tighLeft} onChangeText={(text) => setTighLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.THIGH_RIGHT} unit={ProgressRecordConstants.INCHES} value={tighRight} onChangeText={(text) => setTighRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.SUBSCAPULARRIGHT} unit={ProgressRecordConstants.INCHES} value={subscapularRight} onChangeText={(text) => setSubscapularRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.SUBSCAPULARLEFT} unit={ProgressRecordConstants.INCHES} value={subscapularLeft} onChangeText={(text) => setSubscapularLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.MIDAXILLARYLEFT} unit={ProgressRecordConstants.INCHES} value={midaxillaryLeft} onChangeText={(text) => setMidaxillaryLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.MIDAXILLARYRIGHT} unit={ProgressRecordConstants.INCHES} value={midaxillaryRight} onChangeText={(text) => setMidaxillaryRight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.ABDOMINALLEFT} unit={ProgressRecordConstants.INCHES} value={abdominalLeft} onChangeText={(text) => setAbdominalLeft(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.ABDOMINALRIGHT} unit={ProgressRecordConstants.INCHES} value={abdominalRight} onChangeText={(text) => setAbdominalRight(text)} />
                {/* <ShadowInput  editable={false} isFatcal={true} keyboardType={'numeric'} placeholder={ProgressRecordConstants.BODY_FAT_LEFT} value={bodyFatLeft?.toString()}  /> */}
                {/* <ShadowInput editable={false}isFatcal={true} keyboardType={'numeric'} placeholder={ProgressRecordConstants.BODY_FAT_RIGHT} value={bodyFatRight?.toString()}  /> */}
                <ShadowInput editable={false} isFatcal={true} keyboardType={'numeric'} placeholder={ProgressRecordConstants.BODY_FAT_TOTAL} value={bodyFatTotal?.toString()} />
                <View style={{ marginTop: 10 }}>
                    <SingleButton name={ProgressRecordConstants.CALCULATE_FAT} onPress={() => Validation('calculate')} />
                </View>
                <View style={{ marginTop: 10 }}>
                    <SingleButton name={ProgressRecordConstants.SAVE_BODY_FAT} onPress={() => Validation('save')} />
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 18 }}>
                    <Text style={styles.bold_12_black}>{ProgressRecordConstants.BODY_FAT_TABLE}</Text>
                </View>
                <FlatList
                    data={measurementData}
                    renderItem={renderMeasurementTable}
                    keyExtractor={item => item._id}
                    extraData={newDate}
                />

                <View style={{ height: 90 }}></View>
            </ScrollView>
            <DatePicker
                modal
                open={openDatePicker}
                date={measurementDate}
                mode={'date'}
                maximumDate={new Date()}
                onConfirm={(date) => { setMeasurementDate(date), setOpenDatePicker(false) }}
                onCancel={() => {
                    setOpenDatePicker(false)
                }}
            />
            {loader ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default BodyFatMeasurementScreen;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_14_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black,
        opacity: 0.4
    },
    shadowStyle: {
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    bold_20_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 20,
        color: Colors.black
    }

})