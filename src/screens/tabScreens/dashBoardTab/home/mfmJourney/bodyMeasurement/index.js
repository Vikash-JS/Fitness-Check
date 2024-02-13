import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { ProgressRecordConstants } from '../mfmJourneyConstants';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import ShadowInput from '../ShadowInput';
import SingleButton from '../../../../../commonComponents/SingleButton';
import { Add_BodyMeasurement, Find_Body_Weight } from '../../../../../../apiManager/mfmJourney/index';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import Loader from '../../../../../commonComponents/Loader';
import { Toaster } from '../../../../../commonComponents/Toaster';
import DropShadow from "react-native-drop-shadow";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const BodyMeasurementScreen = () => {
    const navigation = useNavigation()
    const [weight, setWeight] = useState('')
    const [neck, setNeck] = useState('')
    const [chestSize, setChestSize] = useState('')
    const [waistSize, setWaistSize] = useState('')
    const [hipSize, setHipSize] = useState('')
    const [leftArmSize, setLeftArmSize] = useState('')
    const [rightArmSize, setRightArmSize] = useState('')
    const [leftThighSize, setLeftThighSize] = useState('')
    const [rightThighSize, setRightThighSize] = useState('')
    const [leftCalfSize, setLeftCalfSize] = useState('')
    const [rightCalfSize, setRightCalfSize] = useState('')
    const [measurementDate, setMeasurementDate] = useState(new Date())
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [loader, setLoader] = useState(false)
    const [allWeight, setAllWeight] = useState([])
    const [newDate, setNewDate] = useState(new Date())

    useEffect(() => {
        get_weight_Data()
    }, [])

    const get_weight_Data = () => {
        setLoader(true)
        Find_Body_Weight().then((response) => {
            if (response.status == 200) {
                setLoader(false)

                setAllWeight(response.data.weights)
                setNewDate(new Date())
                console.log("weightResp========", response)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("getWeightResp=======", error)
        })
    }

    const checkValidation = ()=>{
        if(weight == ""){
            Toaster("Please enter weight")
        }else if(neck == ""){
            Toaster("Please enter neck")
        }else if(chestSize == ""){
            Toaster("Please enter chestSize")
        }else if(waistSize == ""){
            Toaster("Please enter waistSize")
        }else if(hipSize == ""){
            Toaster("Please enter hipSize")
        }else if(leftArmSize == ""){
            Toaster("Please enter leftArmSize")
        }else if(rightArmSize == ""){
            Toaster("Please enter rightArmSize")
        }else if(leftThighSize == ""){
            Toaster("Please enter leftThighSize")
        }else if(rightThighSize == ""){
            Toaster("Please enter rightThighSize")
        }else if(leftCalfSize == ""){
            Toaster("Please enter leftCalfSize")
        }else if(rightCalfSize == ""){
            Toaster("Please enter rightCalfSize")
        }else{
            addWeight()
        }
    }

    const addWeight = () => {
        var raw = JSON.stringify({
            "measurementDate": moment(measurementDate).format('YYYY-MM-DD'),
            "weight": {
                "weight": weight * 1,
                "neck": neck * 1,
                "chest": chestSize * 1,
                "waist": waistSize * 1,
                "hips": hipSize * 1,
                "armLeft": leftArmSize * 1,
                "armRight": rightArmSize * 1,
                "thighLeft": leftThighSize * 1,
                "thighRight": rightThighSize * 1,
                "calfLeft": leftCalfSize * 1,
                "calfRight": rightCalfSize * 1
            }
        });
        console.log("RowData======", raw)

        setLoader(true)
        Add_BodyMeasurement(raw)
          .then(response => {
            if (response.status == 200) {
              setLoader(false);
              setAllWeight([]);
              get_weight_Data();
              Toaster(response.message);
              console.log('AddWeightResp=======', response);

              setWaistSize('');
              setNeck('');
              setChestSize('');
              setWeight('');
              setHipSize('');
              setLeftArmSize('');
              setRightArmSize('');
              setLeftThighSize('');
              setRightThighSize('');
              setLeftCalfSize('');
              setRightCalfSize('');
            }
          })
          .catch(error => {
            setLoader(false);
            console.log('AddWeightErr=======', error);
          });
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
                        <Text style={styles.semibold_14_opacity}>{moment(item.measurementDate).format('ll')}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.WEIGHT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.weight} kg</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.CHEST}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.chest} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.WAIST_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.waist} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.NECK}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.neck} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.HIP_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.hips} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.LEFT_ARM_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.armLeft} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.RIGHT_ARM_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.armRight} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.LEFT_THIGH_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.thighLeft} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.RIGHT_THIGH_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.thighRight} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.LEFT_CALF_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.calfLeft} inches</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.Right_CALF_SIZE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.weight.calfRight} inches</Text>
                    </View>
                </View>
            </View>
        </DropShadow>
    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 } } keyboardShouldPersistTaps='always'> 
            
                <View>
                    <AppHeader Heading={ProgressRecordConstants.MFM_JOURNEY} onPress={() => navigation.goBack()} />
                </View>
                <View>
                    <Image style={{ width: '100%' }} source={imagesFile.ic_banner} />
                </View>
                <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.bold_20_black}>{ProgressRecordConstants.BODY_MEASUREMENT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={() => setOpenDatePicker(true)}
                    >
                        <Image source={imagesFile.ic_NewCalender} />
                    </TouchableOpacity>

                </View>
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.WEIGHT} unit={ProgressRecordConstants.KG} value={weight} onChangeText={(text) => setWeight(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.NECK} unit={ProgressRecordConstants.INCHES} value={neck} onChangeText={(text) => setNeck(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.CHEST_SIZE} unit={ProgressRecordConstants.INCHES} value={chestSize} onChangeText={(text) => setChestSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.WAIST_SIZE} unit={ProgressRecordConstants.INCHES} value={waistSize} onChangeText={(text) => setWaistSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.HIP_SIZE} unit={ProgressRecordConstants.INCHES} value={hipSize} onChangeText={(text) => setHipSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.LEFT_ARM_SIZE} unit={ProgressRecordConstants.INCHES} value={leftArmSize} onChangeText={(text) => setLeftArmSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.RIGHT_ARM_SIZE} unit={ProgressRecordConstants.INCHES} value={rightArmSize} onChangeText={(text) => setRightArmSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.LEFT_THIGH_SIZE} unit={ProgressRecordConstants.INCHES} value={leftThighSize} onChangeText={(text) => setLeftThighSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.RIGHT_THIGH_SIZE} unit={ProgressRecordConstants.INCHES} value={rightThighSize} onChangeText={(text) => setRightThighSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.LEFT_CALF_SIZE} unit={ProgressRecordConstants.INCHES} value={leftCalfSize} onChangeText={(text) => setLeftCalfSize(text)} />
                <ShadowInput keyboardType={'numeric'} placeholder={ProgressRecordConstants.Right_CALF_SIZE} unit={ProgressRecordConstants.INCHES} value={rightCalfSize} onChangeText={(text) => setRightCalfSize(text)} />
                <View style={{ marginTop: 10 }}>
                    <SingleButton name={ProgressRecordConstants.SAVE_BODY_MEASUREMENT} onPress={() => checkValidation()} />
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 18 }}>
                    <Text style={styles.bold_12_black}>{ProgressRecordConstants.MEASUREMENT_TABLE}</Text>
                </View>
                <FlatList
                    data={allWeight}
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

export default BodyMeasurementScreen;

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