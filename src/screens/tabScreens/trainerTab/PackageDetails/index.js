import React, { useState, useSyncExternalStore, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
  Video,
  StyleSheet,
  ScrollView,
  Linking
} from 'react-native';
import AppHeader from '../../../commonComponents/AppHeader';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../../../utils/Constants';
import { styles } from '../trainerDetail/styles';
import imagesFile from '../../../../../assets/imagesFile';
import { useNavigation, useRoute } from '@react-navigation/native';
import { PackageDetaislByid } from '../../../../apiManager/trainer';
import DropShadow from 'react-native-drop-shadow';
import { Buy_Package } from '../../../../apiManager/trainer/index';
import Loader from '../../../commonComponents/Loader';
import moment from 'moment';

const PackageCardDetails = ({ route }) => {
  const [packageid, SetPackageId] = useState(route.params.pacakgeId);
  const [packagedetails, setPacakgeDetails] = useState();
  const [benefits, setbenefits] = useState([]);
  const [trainerId, setTrainerId] = useState('')

  console.log('My Packageid===========>', route.params.pacakgeId);
  const navigation = useNavigation();
  const [Workoutdata, setWorkoutdat] = useState([{ id: 1 }, { id: 2 }]);
  const [loader, setLoader] = useState(false)

  const PacagedetailCard = () => {
    //console.log("my benetssssss=====>",benifits)
    PackageDetaislByid(packageid)
      .then(response => {
        if (response.status == 200) {
          console.log('packagedetaislbyid=========>', response);
          setPacakgeDetails(response.data.packages);
          setbenefits(response.data.packages.benefits);
          // setworkout(response.data.packages.workout);
          // setnutrition(response.data.packages.nutrition);
          // setProgramme(response.data.packages.program);
          setTrainerId(response.data.packages.createdBy.userId)
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    PacagedetailCard();
  }, []);

  const onBuyPackage = () => {
    setLoader(true)
    Buy_Package(packageid, trainerId).then((response) => {
      console.log("buyPackageResp=========", response)
      if (response.status == 200) {
        setLoader(false)
        Linking.openURL(response?.data?.session?.url)
      }

    }).catch((error) => {
      setLoader(false)
      console.log("buyPackageErr=======", error)
    })
  }
  let expiryDate = new Date(packagedetails?.createdAt);
  expiryDate.setDate(expiryDate.getDate() + packagedetails?.packageDuration);

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView style={{ flex: 1 }}>
          <View>
            <AppHeader
              Heading="Package Details"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={Style.container}>
            <View>
              <View style={{ marginTop: 12, overflow: 'hidden' }}>
                <Image
                  style={{ height: 124, width: '100%', borderRadius: 10 }}
                  source={{ uri: packagedetails?.thumbnail }}
                />
              </View>

              <View style={{ marginTop: 8 }}>
                <Text style={styles.bold_16_black}>
                  {packagedetails?.packageName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 7,
                  alignItems: 'center',
                }}>
                <View>
                  <Image source={imagesFile.ic_blueTick} />
                </View>
                <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                  <Text style={styles.semibold_9_opacity}>Time Duration:</Text>
                </View>
                <View>
                  <Text style={styles.bold_16_black}>
                    {packagedetails?.packageDuration} days
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 14.5,
                  alignItems: 'center',
                }}>
                <View>
                  <Image source={imagesFile.ic_blueTick} />
                </View>
                <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                  <Text style={styles.semibold_9_opacity}>Start Date:</Text>
                </View>
                <View>
                  <Text style={styles.bold_16_black}>{moment(packagedetails?.createdAt).format("MMM DD, YYYY")}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 14.5,
                  alignItems: 'center',
                }}>
                <View>
                  <Image source={imagesFile.ic_blueTick} />
                </View>
                <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                  <Text style={styles.semibold_9_opacity}>Expiry Date:</Text>
                </View>
                <View>
                  <Text style={styles.bold_16_black}>{moment(expiryDate).format("MMM DD, YYYY")}</Text>
                </View>
              </View>

            </View>
            <DropShadow style={Style.shadowStyle}>
              <View style={{ marginTop: 10, borderRadius: 10, paddingHorizontal: 16, backgroundColor: Colors.white }}>
                <View style={{ paddingTop: 12 }}>
                  <Text style={Style.bold_16_black}>Description</Text>
                </View>

                <View style={{ paddingVertical: 12 }}>
                  <Text style={Style.semibold_12_black}>{packagedetails?.description}</Text>
                </View>
              </View>
            </DropShadow>
            <DropShadow style={Style.shadowStyle}>
              <View style={Style.PackageBenifitsView}>
                <View style={{ paddingBottom: 11, paddingTop: 12 }}>
                  <Text style={Style.bold_16_black}>Package Benefits</Text>
                </View>
                {benefits.map(e => (
                  <View
                    style={{

                      marginBottom: 8,
                      paddingHorizontal: 17,
                      paddingVertical: 13,
                      borderRadius: 10,
                      backgroundColor: "#CCCCCC"
                    }}>
                    <Text style={Style.semibold_10_black}>{e}</Text>
                  </View>
                ))}
              </View>
            </DropShadow>
            <TouchableOpacity
              style={Style.Button}
              onPress={() => onBuyPackage()}>
              <Text style={{ color: Colors.white }}>Buy Package</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};

export default PackageCardDetails;
const Style = StyleSheet.create({
  container: {
    marginHorizontal: 18,
  },
  AssosiatedView: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  SubViewAssosiatedwith: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  Indiaview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingBottom: 8,
  },
  PackageIncludeView: {
    marginTop: 10,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    height: 54,
    backgroundColor: '#3B22F8',
    borderRadius: 10,
    marginBottom: 60,
  },
  PackageBenifitsView: {
    marginTop: 10,

    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderRadius: 10
  },
  Workoutcard: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#F2F2F2',
  },
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    flex: 1,
  },
  bold_16_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 16,
    color: Colors.black
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black
  },
  semibold_10_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black
  }
});
