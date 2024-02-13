import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Platform
} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import DropShadow from 'react-native-drop-shadow';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import RNFetchBlob, { RNFetchBlobConfig, RNFetchBlobSession } from 'rn-fetch-blob';
import { Toaster } from '../../../../../commonComponents/Toaster';

const PurchasedDetailsCard = props => {

  const navigation = useNavigation();

  const [flag, setflag] = useState(false);
  const [myPackage, setmypackage] = useState(props.item);

  console.log("my Packages Api=========>", props.item)

  const downloadFiles = (uri) => {
    const { config, fs } = RNFetchBlob;
    console.log("uri======", uri)
    let extension = uri.split('/').pop()
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
  }

  return (
    <DropShadow style={styles.shadowStyle}>
      <View style={styles.mainContainer}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 10,
                overflow: 'hidden',
              }}>
              <Image
                style={{ width: 60, height: 60 }}
                source={{ uri: props?.item?.businessId?.businessLogo?.imagePath }}
              />
            </View>
            <View style={{ paddingLeft: 7 }}>
              <Text>{props?.item?.businessId?.businessName}</Text>
              {/* <Text>Gym Mattas ltd.</Text> */}
            </View>
            <View style={{ flex: 1 }}></View>
            {/* <TouchableOpacity>
              <Image
                source={
                  flag == true ? imagesFile.ic_subtract : imagesFile.ic_addIcon
                }
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity>
            <>
              <TouchableOpacity onPress={() => navigation.navigate('PaymentDetails', {
                purchaseDetails: myPackage
              })}>
                <View style={{ marginTop: 12, overflow: 'hidden' }}>
                  <Image
                    style={{ height: 124, width: '100%', borderRadius: 10 }}
                    source={{ uri: props?.item?.packageId?.thumbnail }}
                  />
                </View>

                <View style={{ marginTop: 12 }}>
                  <Text style={styles.bold_16_black}>{props?.item?.packageId?.packageName}</Text>
                </View>
                <View style={{ marginTop: 4 }}>
                  <Text style={styles.semibold_9_opacity}>{props?.item?.packageId?.description}</Text>
                </View>
                <View style={{ marginTop: 12 }}></View>
                <View>
                  <Text style={styles.semibold_12_opacity}></Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 14.5,
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image source={imagesFile.ic_watch} />
                  </View>
                  <View style={{ paddingLeft: 11, paddingRight: 8 }}>
                    <Text style={styles.semibold_9_opacity}>Time Duration:</Text>
                  </View>
                  <View>
                    <Text style={styles.semiBold_10_bold}>{props?.item?.packageId?.packageDuration}</Text>
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
                    <Text style={styles.semiBold_10_bold}>{moment(props?.item?.createdAt).format('DD-MMMM-YYYY')}</Text>
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
                    <Text style={styles.semiBold_10_bold}>{moment(props?.item?.expiryDate).format('DD-MMMM-YYYY')}</Text>
                  </View>
                </View>
                <View
                  style={{
                    width: '100%',
                    borderWidth: 0.5,
                    marginVertical: 14,
                    borderColor: '#707070',
                    marginBottom: 8,
                  }}></View>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ width: '10%', }}>
                    <View style={{ paddingBottom: 2 }}>
                      <Text style={[styles.semibold_10_opacity]}>TOTAL</Text>
                    </View>

                    <View>
                      <Text style={[styles.semiBold_12, { textAlign: 'center' }]}>{props?.item?.packageId?.packagePrice?.price}</Text>
                    </View>
                  </View>
                  <View style={{ width: '32%', }}>
                    <View style={{ paddingBottom: 2 }}>
                      <Text style={[styles.semibold_10_opacity, { textAlign: 'center' }]}>PURCHASED ON</Text>
                    </View>
                    <View>
                      <Text style={[styles.semiBold_12, { textAlign: 'center' }]}>{moment(props?.item?.createdAt).format('DD-MMMM-YYYY')}</Text>
                    </View>
                  </View>
                  <View style={{ width: '57%', marginLeft: 3, }}>
                    <View style={{ paddingBottom: 2 }}>
                      <Text style={styles.semibold_10_opacity}>UNIQUE ID</Text>
                    </View>
                    <View>
                      <Text numberOfLines={1} style={[styles.semiBold_12, { width: '95%' }]}>{props?.item?.uniqueId}</Text>
                    </View>
                  </View>
                  <View style={{ flex: 1 }}></View>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.5,
                  marginVertical: 14,
                  borderColor: '#707070',
                }}></View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {/* <TouchableOpacity onPress={()=>downloadFiles(props?.item?.invoiceUrl)}> */}
                <View>
                  <Text style={styles.semibold_12_opacity}>Invoice</Text>
                </View>
                {/* </TouchableOpacity> */}
                <View style={{ flex: 1 }}></View>
                <View
                  style={{
                    paddingVertical: 9,
                    paddingHorizontal: 15,
                    borderRadius: 30,
                    backgroundColor: Colors.lightGreen

                  }}>
                  <Text>Completed</Text>
                </View>
              </View>
            </>
          </TouchableOpacity>
        </View>
      </View>
    </DropShadow>
  );
};

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  mainContainer: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    marginTop: 18
  },
  amountView: {
    borderRadius: 10,
    width: 115,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
  },
  buyPackageView: {
    borderRadius: 10,
    width: 82,
    height: 35,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold_16_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 16,
    color: Colors.black,
  },
  semibold_9_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 9,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_10_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.blue,
  },
  semibold_11_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 11,
    color: Colors.black,
  },
  semiBold_10_bold: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,

  },
  semiBold_12: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,

  }
});

export default PurchasedDetailsCard;
