import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Platform, Alert } from 'react-native';
import FlatListHeader from './FlatListHeader';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import FilesCard from '../../../../../../commonComponents/FilesCard';
import FilterModal from '../../../../../../modals/FilterModal';
import { useNavigation } from '@react-navigation/native';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
import { Get_Files } from '../../../../../../../apiManager/ads/index';
import Loader from '../../../../../../commonComponents/Loader';
import RNFetchBlob, {
  RNFetchBlobConfig,
  RNFetchBlobSession,
} from 'rn-fetch-blob';
import { Toaster } from '../../../../../../commonComponents/Toaster';
const DATA = [{ id: '1', name: '24232432.jpeg', image: imagesFile.ic_demo4 }, { id: '2', name: '24232432.jpeg', image: imagesFile.ic_demo4 }, { id: '3', name: '24232432.jpeg', image: imagesFile.ic_demo4 }, { id: '4', name: '24232432.jpeg', image: imagesFile.ic_demo4 }]
const MyFilesScreen = () => {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)
  const [fileList, setFileList] = useState([])
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    getFiles()
  }, [])

  const getFiles = () => {
    setLoader(true)
    Get_Files().then((response) => {
      if (response.status == 200) {
        // console.log(response.data.files, 'response.data.files---')
        setLoader(false)
        setFileList(response.data.files)
      }
    }).catch((error) => {
      setLoader(false)
      console.log("filesErr========", error)
    })
  }



  const renderItem = ({ item }) => (
    <TouchableOpacity
      // onPress={()=>navigation.navigate('FilesDetail')}
      onPress={() => item?.fileId?.fileUrl ? downloadFiles(item.fileId.fileUrl) : Toaster("Not a valid file while trying to download")}
    >
      <FilesCard item={item} />
    </TouchableOpacity>
  )

  const downloadFiles = (uri) => {
    const { config, fs } = RNFetchBlob;
    console.log('uri===============>', uri);
    let extension = uri.split('.').pop();
    console.log('fileExtension======', extension);
    let date = new Date();
    var fileDir;
    let configOptions;
    if (Platform.OS == 'ios') {
      fileDir = RNFetchBlob.fs.dirs.DocumentDir;
      configOptions = {
        fileCache: true,
        path:
          fileDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          `.${extension}`,

        notification: true,
      };

      config(configOptions)
        .fetch('GET', uri)
        .then(res => {
          // onResumeCall();

          Toaster('File downloaded successfully');
          setTimeout(() => {
            // RNFetchBlob.ios.previewDocument('file://' + res.path());   //<---Property to display iOS option to save file
            RNFetchBlob.ios.openDocument(res.data); //<---Property to display downloaded file on documaent viewer
            // Alert.alert(CONSTANTS.APP_NAME,'File downloaded successfully');
          }, 1000);
        })
        .catch(errorMessage => {

          console.log('ErrorMsg====', errorMessage);
        });
    } else {
      // fileDir = RNFetchBlob.fs.dirs.downloadDir;
      fileDir = RNFetchBlob.fs.dirs.DCIMDir;
      configOptions = {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path:
            fileDir +
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

          console.log('errirMsg=======', errorMessage);
        });
    }
  };

  const Footer = () => {
    return (
      <View style={{ height: 80 }}></View>
    )
  }
  const onFilterTab = () => {
    setModalVisible(true)
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={fileList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListHeaderComponent={<FlatListHeader onFilterPress={() => onFilterTab()} />}
          ListFooterComponent={<Footer />}
          ListEmptyComponent={<EmptyComponent Heading={"Empty Files!"} />}
        />
      </View>
      {loader ? <Loader /> : null}
      {modalVisible ? <FilterModal cancelModal={() => setModalVisible(false)} visible={modalVisible} /> : null}
    </SafeAreaView>
  )
}

export default MyFilesScreen;