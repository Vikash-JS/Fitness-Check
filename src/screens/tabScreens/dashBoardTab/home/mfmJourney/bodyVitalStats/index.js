import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { ProgressRecordConstants } from '../mfmJourneyConstants';
import { useNavigation } from '@react-navigation/native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import ShadowInput from '../ShadowInput';
import SingleButton from '../../../../../commonComponents/SingleButton';
import DropShadow from "react-native-drop-shadow";
import moment from 'moment';
import { get_vitals, Add_Vitals } from '../../../../../../apiManager/mfmJourney/index';
import { Toaster } from '../../../../../commonComponents/Toaster';
import Loader from '../../../../../commonComponents/Loader';
import DatePicker from 'react-native-date-picker';
const DATA = [{ id: 1, name: 'Ectomorph' }, { id: 2, name: 'Mesomorph' }, { id: 3, name: 'Endomorph' }]
const TrainingFeq = [{ id: 1, name: 'Little To None' }, { id: 2, name: 'Light Exercise' }, { id: 3, name: 'Moderate Exercise' }, { id: 4, name: 'Heavy Exercise' }, { id: 5, name: 'Very Heavy Exercise' }]
const BodyVitalStatScreen = () => {
    const navigation = useNavigation()
    const [openDatePicker, setOpenDatePicker] = useState(false)
    const [muscleMass, setMuscleMass] = useState('')
    const [water, setWater] = useState('')
    const [height, setHeight] = useState('')
    const [heartRate, setHeartRate] = useState('')
    const [bloodPressureSystolic, setBloodPressureSystolic] = useState('')
    const [bloodPressureDiastolic, setBloodPressureDiastolic] = useState('')

    const [vitalStats, setVitalStats] = useState('')
    const [trainingFrequency, setTrainingFrequency] = useState('')
    const [loader, setLoader] = useState(false)
    const [vitals, setVitals] = useState([])
    const [measurementDate, setMeasurementDate] = useState(new Date())
    const [newDate, setNewDate] = useState(new Date())


    useEffect(() => {
        GetVitals()
    }, [])

    const GetVitals = () => {
        setLoader(true)
        get_vitals().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log("vitals=======", response)
                setVitals(response.data.data)
                setNewDate(new Date())
            }
        }).catch((error) => {
            setLoader(false)

            console.log("vitalErr===", error)
        })
    }

    const Validation = () => {
        if (!(muscleMass && water && height && heartRate && bloodPressureSystolic && bloodPressureDiastolic)) {
            Toaster("Please Complete Body Vital Stats")
        } else if (vitalStats == "") {
            Toaster("Please Select Body Type")
        } else if (trainingFrequency == "") {
            Toaster("Please Select Training Frequency")
        }
        else {
            AddVitals()
        }
    }

    const AddVitals = () => {
        // const valid = 
        var raw = JSON.stringify({
            "measurementDate": measurementDate,
            "vital": {
                "muscleMass": muscleMass,
                "water": water,
                "height": height,
                "heartRate": heartRate,
                "bloodPressure": {
                    "systolic": bloodPressureSystolic,
                    "diastolic": bloodPressureDiastolic
                },

            },
            "bodyType": vitalStats,
            "frequency": trainingFrequency
        });
        console.log("rowData==========", raw)
        Add_Vitals(raw).then((response) => {
            setLoader(true)
            if (response.status == 200) {
                setVitals([])
                setLoader(false)
                console.log("addResp========", response)
                setMuscleMass('')
                setBloodPressureDiastolic('')
                setBloodPressureSystolic('')
                setHeartRate('')
                setHeight('')
                setWater('')
                setHeight('')
                setVitalStats('')
                setTrainingFrequency('')


                GetVitals()
            }

        }).catch((error) => {
            setLoader(false)

            console.log("addErr========", error)
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
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.MUSCLEMASS}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.muscleMass + ' kg'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.WATER}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.water + ' ml'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.HEIGHT}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.height + ' inches'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.HEARTRATE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.heartRate + ' bpm'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.BLOOD_PRESSURE_SYSTOLIC}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.bloodPressure.systolic + ' mmHg'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.BLOOD_PRESSURE_DIASTOLIC}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.vital.bloodPressure.diastolic + ' mmHg'}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.BODY_TYPE}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.bodyType}</Text>
                    </View>
                </View>
                <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Text style={styles.semibold_14_black}>{ProgressRecordConstants.TRAINING_FREQUENCY}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Text style={styles.semibold_14_opacity}>{item.frequency}</Text>
                    </View>
                </View>
                {/* <View style={{ borderWidth: 1, height: 1, width: "100%", marginVertical: 15, borderColor: Colors.inputGrey }}></View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.semibold_14_black}>{ProgressRecordConstants.Right_CALF_SIZE}</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View>
                                <Text style={styles.semibold_14_opacity}>22 CM</Text>
                            </View>
                        </View> */}
            </View>
        </DropShadow>
    )

    const renderBodyVitals = ({ item }) => (
        <TouchableOpacity style={{ paddingVertical: 5, paddingHorizontal: 10, marginLeft: 10, borderRadius: 7, backgroundColor: item.name == vitalStats ? Colors.blue : Colors.inputGrey }}
            onPress={() => setVitalStats(item.name)}
        >
            {/* <Text style={{ color: item.name == vitalStats ? Colors.white : Colors.black }}>{item.name}</Text> */}
            <Text style={item.name == vitalStats ? styles.bold_12_white : styles.bold_12_black}>{item.name}</Text>

        </TouchableOpacity>
    )

    const renderTrainingFrequency = ({ item }) => (

        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 10, marginBottom: 10 }}
            onPress={() => setTrainingFrequency(item.name)}
        >
            <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={item.name == trainingFrequency ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
            <View style={{ marginLeft: 5 }}>
                <Text style={styles.bold_12_black}>{item.name}</Text>
            </View>
        </TouchableOpacity>

    )

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <ScrollView style={{ flex: 1 }}>
                <AppHeader Heading={ProgressRecordConstants.MFM_JOURNEY} onPress={() => navigation.goBack()} />
                <View>
                    <Image style={{ width: "100%" }} source={imagesFile.ic_banner} />
                </View>
                <View style={{ marginTop: 5, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.bold_20_black}>{ProgressRecordConstants.BODY_VITALS_STATS}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={() => setOpenDatePicker(true)}
                    >
                        <Image source={imagesFile.ic_NewCalender} />
                    </TouchableOpacity>
                </View>
                <ShadowInput placeholder={ProgressRecordConstants.MUSCLEMASS} unit={ProgressRecordConstants.KG} value={muscleMass} onChangeText={(text) => setMuscleMass(text)} />
                <ShadowInput placeholder={ProgressRecordConstants.WATER} unit={ProgressRecordConstants.ML} value={water} onChangeText={(text) => setWater(text)} />
                <ShadowInput placeholder={ProgressRecordConstants.HEIGHT} unit={ProgressRecordConstants.INCHES} value={height} onChangeText={(text) => setHeight(text)} />
                <ShadowInput placeholder={ProgressRecordConstants.HEARTRATE} unit={ProgressRecordConstants.BPM} value={heartRate} onChangeText={(text) => setHeartRate(text)} />
                <ShadowInput placeholder={ProgressRecordConstants.BLOOD_PRESSURE_SYSTOLIC} unit={ProgressRecordConstants.MMHG} value={bloodPressureSystolic} onChangeText={(text) => setBloodPressureSystolic(text)} />
                <ShadowInput placeholder={ProgressRecordConstants.BLOOD_PRESSURE_DIASTOLIC} unit={ProgressRecordConstants.MMHG} value={bloodPressureDiastolic} onChangeText={(text) => setBloodPressureDiastolic(text)} />

                <View style={{ marginTop: 15, marginHorizontal: 18 }}>
                    <View>
                        <Text style={styles.bold_20_black}>{ProgressRecordConstants.BODY_TYPE}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            horizontal={true}
                            data={DATA}
                            renderItem={renderBodyVitals}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 15, marginHorizontal: 18 }}>
                    <View>
                        <Text style={styles.bold_20_black}>{ProgressRecordConstants.TRAINING_FREQUENCY}</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <FlatList
                            numColumns={2}
                            data={TrainingFeq}
                            renderItem={renderTrainingFrequency}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={{ marginTop: 10 }}>
                    <SingleButton name={ProgressRecordConstants.SAVE_VITALS} onPress={() => Validation()} />
                </View>
                <View style={{ marginTop: 40, marginHorizontal: 18 }}>
                    <Text style={styles.bold_12_black}>{ProgressRecordConstants.MEASUREMENT_TABLE}</Text>
                </View>
                <FlatList
                    data={vitals}
                    renderItem={renderMeasurementTable}
                    keyExtractor={item => item._id}
                    extraData={newDate}
                />

                <View style={{ height: 80 }}></View>
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

export default BodyVitalStatScreen;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    bold_12_white: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.white
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