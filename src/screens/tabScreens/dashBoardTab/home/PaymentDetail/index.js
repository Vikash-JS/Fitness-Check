import React, { useEffect, useState, } from 'react';
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
  Platform
} from 'react-native';
import { Colors, Fonts } from '../../../../../utils/Constants';
import MyStatusBar from '../../../../commonComponents/MyStatusBar';
import imagesFile from '../../../../../../assets/imagesFile';
import AppHeader from '../../../../commonComponents/AppHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import RNFetchBlob, { RNFetchBlobConfig, RNFetchBlobSession } from 'rn-fetch-blob';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import { Toaster } from '../../../../commonComponents/Toaster';

const PaymentDetails = () => {

  const navigation = useNavigation();
  const router = useRoute();
  console.log("routedata=============>", router.params)
  const [singleFile, setSingleFile] = useState('');

  const downloadFiles = (uri) => {
    if (uri) {
      const { config, fs } = RNFetchBlob;
      let extension = uri?.split('/').pop()
      let newExt = extension.split('?')
      console.log("fileExtension======", newExt[0])
      let date = new Date()
      var fileDir;
      let configOptions;
      if (Platform.OS == 'ios') {
        fileDir = RNFetchBlob.fs.dirs.DocumentDir;
        configOptions = {
          fileCache: true,
          path: fileDir +
            '/file_' +
            Math.floor(date.getTime() + date.getSeconds() / 2) +
            `.${newExt[0]}`,

          notification: true,
        }
        config(configOptions)
          .fetch('GET', uri)
          .then(res => {
            // onResumeCall();
            Toaster('File downloaded successfully');
            setTimeout(() => {
              // RNFetchBlob.ios.previewDocument('file://' + res.path());   //<---Property to display iOS option to save file
              RNFetchBlob.ios.openDocument(res.data);                      //<---Property to display downloaded file on documaent viewer
              // Alert.alert(CONSTANTS.APP_NAME,'File downloaded successfully');
            }, 1000);

          })
          .catch(errorMessage => {
            console.log("ErrorMsg====", errorMessage)
          });
      } else {
        // fileDir = RNFetchBlob.fs.dirs.downloadDir;
        fileDir = RNFetchBlob.fs.dirs.DCIMDir
        configOptions = {
          fileCache: false,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: fileDir +
              '/file_' +
              Math.floor(date.getTime() + date.getSeconds() / 2) +
              `.${extension}`,
            description: 'Downloading xlsx...',
          },
        };
        config(configOptions)
          .fetch('GET', uri)
          .then(res => {
            Toaster('File downloaded successfully');
            setTimeout(() => {
              RNFetchBlob.android.actionViewIntent(res.path());
            }, 2000);
          })
          .catch((errorMessage, statusCode) => {
            console.log("errirMsg=======", errorMessage)
          });
      }
    } else {
      Toaster('Receipt not generated.');
    }
  }

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ backgroundColor: Colors.white }}>
        <View>
          <AppHeader
            Heading="Purchase Details"
            onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView>
          <View style={Style.container}>
            <View style={{ marginTop: 8 }}>
              <Image
                style={{ width: '100%', height: 133, borderRadius: 10 }}
                source={{ uri: router.params.purchaseDetails.packageId.thumbnail }}
              />
            </View>
            <View style={{ marginVertical: 12 }}>
              <Text style={Style.boldblack_19_Gliroy}>{router.params.purchaseDetails.packageId.packageName}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center',
              }}>
              <View>
                <Image source={imagesFile.ic_watch} />
              </View>
              <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                <Text style={Style.Gilroy_Semibold_10}>Time Duration:</Text>
              </View>
              <View>
                <Text style={Style.Gilroy_Semibold_10_opacityfull}>{router.params.purchaseDetails.packageId.packageDuration}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center',
              }}>
              <View>
                <Image source={imagesFile.ic_calen} />
              </View>
              <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                <Text style={Style.Gilroy_Semibold_10}>Creation Date:</Text>
              </View>
              <View>

                <Text style={Style.Gilroy_Semibold_10_opacityfull}>{moment(router.params.purchaseDetails.createdAt).format('DD-MMMM-YYYY')}</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 7,
                alignItems: 'center',
              }}>
              <View>
                <Image source={imagesFile.ic_calen} />
              </View>
              <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                <Text style={Style.Gilroy_Semibold_10}>Expiration Date:</Text>
              </View>
              <View>

                <Text style={Style.Gilroy_Semibold_10_opacityfull}>{moment(router.params.purchaseDetails.expiryDate).format('DD-MMMM-YYYY')}</Text>
              </View>
            </View>
            <View style={{ marginTop: 19 }}>
              <View>
                <Text style={Style.Gilroy_Bold_ten}>Description</Text>
                <View style={{ marginTop: 8 }}>
                  <Text style={Style.Gilroy_medium_ten}>
                    {router.params.purchaseDetails.packageId.description}
                  </Text>
                </View>
                <View style={{ borderBottomWidth: 1, marginVertical: 15, borderBottomColor: '#EDEDED' }}>

                </View>
              </View>
            </View>
            <View style={{ marginBottom: 7 }}></View>
            <View style={{ flexDirection: 'row' }}>
              <View style={Style.PaymentSuccess}>
                <Text style={Style.Gilroy_Semibold_10_opacityfull}>
                  Your purchase was successful
                </Text>
              </View>
              <View style={{ flex: 1 }}></View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 12,
                alignItems: 'center',
              }}>
              <View>
                <Text style={Style.Gilroymedium_12}>Package total</Text>
              </View>
              <View style={{ flex: 1 }}></View>
              <View>
                <Text style={Style.Gilroy_12_medium}>{router.params.purchaseDetails.packageId.packagePrice.price}</Text>
              </View>
            </View>
            {/* <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <View>
                <Text style={Style.Gilroymedium_12}>Taxes</Text>
              </View>
              <View style={{ flex: 1 }}></View>
              <View>
                <Text style={Style.Gilroy_12_medium}>₹0.00</Text>
              </View>
            </View> */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 8,
                alignItems: 'center',
              }}>
              <View>
                <Text style={Style.Gilroymedium_12}>Total Amount</Text>
              </View>
              <View style={{ flex: 1 }}></View>
              <View>
                <Text style={Style.Gilroy_12_medium}>{router.params.purchaseDetails.packageId.packagePrice.price}</Text>
              </View>



            </View>
            <View style={{ borderBottomWidth: 1, marginVertical: 15, borderBottomColor: '#EDEDED' }}>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={Style.Gilroy_15Semibold}>Purchase Details</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text style={Style.Gilroy_12_medium}>UNIQUE ID</Text>
            </View>
            <View>
              <Text>{router?.params?.purchaseDetails?.uniqueId}</Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={Style.Gilroy_12_medium}>PAYMENT</Text>
            </View>
            <View>
              <Text style={Style.Gilroy_12_medium}>{router.params.purchaseDetails.paymentMethod}</Text>
            </View>
            <View style={{ marginTop: 12 }}>
              <Text style={Style.Gilroy_12_medium}>DATE</Text>
            </View>
            <View>
              <Text style={Style.Gilroy_12_medium}>{moment(router.params.purchaseDetails.createdAt).format('DD-MMMM-YYYY')}</Text>
            </View>
            <TouchableOpacity onPress={() => downloadFiles(router?.params?.purchaseDetails?.invoiceUrl)} style={Style.Button}>
              <Text style={{ color: Colors.white }}>Download Receipt</Text>
            </TouchableOpacity>
            <View style={{ height: 80 }}></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PaymentDetails;

const Style = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
  },

  bold_18_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 10,
    color: Colors.black,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 55,
    height: 54,
    backgroundColor: '#3B22F8',
    borderRadius: 10,
    marginBottom: 65,
  },
  PaymentSuccess: {
    paddingHorizontal: 14,
    borderWidth: 1,
    paddingVertical: 5,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEA90',
    height: 22,
  },
  boldblack_19_Gliroy: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 19,
    color: Colors.black
  },
  Gilroy_Semibold_10: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4
  },
  Gilroy_Semibold_10_opacityfull: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
  },

  Gilroy_Bold_ten: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 10,
    color: Colors.black,
  },
  Gilroy_medium_ten: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 10,
    color: Colors.black,
  },
  Gilroymedium_12: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 16,
    color: Colors.black,
  },

  Gilroy_12_medium: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
  },
  Gilroy_15Semibold: {
    fontSize: 15,
    color: Colors.black,
    fontFamily: Fonts.gilroy_SemiBold
  }
});
