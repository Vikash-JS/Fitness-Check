import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { Colors, Fonts, DATA, Capitalize } from '../../../../../../../utils/Constants';
import { myWorkoutConstants } from '../WorkoutConstants';
import { styles } from './workoutLibraryStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import LeavingModal from '../../../../../../modals/LeavingModal';
import CurrentWorkOutCard from '../../../../../../commonComponents/CurrentWorkOutCard';
import DualButton from '../../../../../../commonComponents/DualButton';
import SingleButton from '../../../../../../commonComponents/SingleButton';
import imagesFile from '../../../../../../../../assets/imagesFile';
import PDFCard from '../../../../../../commonComponents/PDFCard';
import DropShadow from 'react-native-drop-shadow';
import Loader from '../../../../../../commonComponents/Loader';
import {
  Get_WorkoutDetail_ById,
  MyWorkout_Detail,
  mark_as_done,
  Export_Pdf,
} from '../../../../../../../apiManager/workout/index';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import uuid from 'react-native-uuid';
import TripleTab from '../../../../../../commonComponents/TripleTab';
import { Calendar } from 'react-native-calendars';
import RNFetchBlob, {
  RNFetchBlobConfig,
  RNFetchBlobSession,
} from 'rn-fetch-blob';

const WorkoutLibrary1 = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [headerName, setHeaderName] = useState(route.params.name);
  const [workoutId, setWorkoutId] = useState(route.params.id);
  const [type, setType] = useState(route.params.type);
  const [loader, setLoader] = useState(false);
  const [workoutDetail, setWorkoutDetail] = useState({});
  const [dynamicId, setDynamicId] = useState(0);
  const [date, setDate] = useState(new Date());
  const [uniqueId, setUniqueId] = useState('');
  const [dateObj, setDateObj] = useState({});
  const selectIndex = id => {
    if (id == 0) {
      myWorkout_Detail();
    } else if (id == 1) {
      // workoutDetail_byId()
    }
    setIndex(id);
  };
  useEffect(() => {
    let sessionId = uuid.v1().toString();
    setUniqueId(sessionId);
    myWorkout_Detail();
  }, []);

  const myWorkout_Detail = () => {
    setLoader(true);
    MyWorkout_Detail(workoutId, type)
      .then(response => {
        if (response.status == 200) {
          let key = 'exerciseId';
          response.data.workout.exerciseGroup.forEach(element => {
            element.exercise.forEach(exercise => {
              exercise.sets.forEach(sets => {
                sets[key] = exercise._id;
              });
            });
          });

          setWorkoutDetail(() => response.data.workout);
          if (response?.data?.workout?.activity?.length > 0) {
          }
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
      });
  };

  const onSelectWorkout = (setId, index, exerciseId, exeGrpId) => {
    let arr1 = workoutDetail;
    var index;
    var isExist = false;
    var isMarkTrue = true;
    if (arr1.activity.length > 0) {
      arr1.activity.forEach(element => {
        if (element.setId == setId) {
          if (element.sessionId == uniqueId) {
            index = arr1.activity.indexOf(element);
            isExist = true;
            isMarkTrue = false;
          }
        }
      });

      if (isExist) {
        arr1.activity.splice(index, 1);
        setWorkoutDetail({ ...arr1 });
        setDate(new Date());
        let raw = JSON.stringify({
          workoutId: workoutId,
          exerciseGroupId: exeGrpId,
          exerciseId: exerciseId,
          setId: setId,
          sessionId: uniqueId,
          status: isMarkTrue,
        });
        markAsDone(raw);
      } else {
        let id = dynamicId + 1;
        let obj1 = { _id: id, setId: setId, sessionId: uniqueId };
        setDynamicId(id);
        arr1.activity.push(obj1);
        setWorkoutDetail({ ...arr1 });
        setDate(new Date());
        let raw = JSON.stringify({
          workoutId: workoutId,
          exerciseGroupId: exeGrpId,
          exerciseId: exerciseId,
          setId: setId,
          sessionId: uniqueId,
          status: isMarkTrue,
        });
        markAsDone(raw);
      }
    } else {
      let id = dynamicId + 1;
      let obj1 = { _id: id, setId: setId, sessionId: uniqueId };
      setDynamicId(id);
      arr1.activity.push(obj1);
      setWorkoutDetail({ ...arr1 });
      setDate(new Date());
      let raw = JSON.stringify({
        workoutId: workoutId,
        exerciseGroupId: exeGrpId,
        exerciseId: exerciseId,
        setId: setId,
        sessionId: uniqueId,
        status: isMarkTrue,
      });
      markAsDone(raw);
    }
  };
  const markAsDone = raw => {
    mark_as_done(raw)
      .then(response => {
        setLoader(true);
        if (response.status == 200) {
          Toaster(response.message);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
      });
  };

  const downloadPopup = uri => {
    Alert.alert('Download', 'Are you sure want to downlaod this file', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => downloadFiles(uri),
      },
    ]);
  };

  const downloadFiles = uri => {
    const { config, fs } = RNFetchBlob;
    let extension = uri.split('.').pop();
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
          Toaster('File downloaded successfully');
          setTimeout(() => {
            RNFetchBlob.ios.openDocument(res.data); //<---Property to display downloaded file on documaent viewer
          }, 1000);
        })
        .catch(errorMessage => {
          console.log('ErrorMsg====', errorMessage);
        });
    } else {
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

  const verifyPlatform = async () => {
    if (Platform.OS === 'ios') {
      downloadExportPdf();
    } else {
      try {
        if (Platform.OS === 'android' && Platform.Version < 33) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
          if (
            granted !== "granted"
          ) {
            setLoader(false);
            Toaster('storage_permission');
          } else {
            console.log('Storage Permission Granted.');
            downloadExportPdf();
          }
        } else {
          console.log('Storage Permission Granted.');
          downloadExportPdf();
        }
      } catch (err) {
        console.log('error', err);
        setLoader(false);
      }
    }
  };

  const downloadExportPdf = () => {
    setLoader(true);
    console.log("workout udddddd", workoutId)
    Export_Pdf(workoutId)
      .then(async response => {
        let jsonPa = response.data.pdf;

        var fileDir;
        let date = new Date()
        if (Platform.OS == 'ios') {
          fileDir = RNFetchBlob.fs.dirs.DocumentDir;
        } else {
          fileDir = RNFetchBlob.fs.dirs.DownloadDir;
        }

        const filePath = `${fileDir}/${Math.floor(date.getTime() + date.getSeconds() / 2)}.pdf`;
        // console.log(response.pdf, 'response.pdf')
        RNFetchBlob.fs.createFile(filePath, response.data.pdf, 'base64').then(path => {
          // necessary ?
          console.log('newPath....', path)
          RNFetchBlob.session("all").add(path);
        });
        Toaster('Plan exported successfully');
        setLoader(false)
        // console.log("DownLodRes...", response)
      })
      .catch(error => {
        Error(error);
        setLoader(false);
      });
  };

  const renderWorkout = ({ item }) => (
    (
      <CurrentWorkOutCard
        uniqueId={uniqueId}
        type={type}
        detail={workoutDetail}
        data={item}
        onSelect={(setId, index, exerciseId) =>
          onSelectWorkout(setId, index, exerciseId, item._id)
        }
        onSelectExercise={exerciseDetail =>
          navigation.navigate('ExerciseDetail', { data: exerciseDetail })
        }
      />
    )
  );

  const renderItem = ({ item }) => (
    <View style={{ marginVertical: 6 }}>
      <PDFCard item={item} onPress={() => downloadPopup(item.filePath)} />
    </View>
  );

  const renderCocreator = ({ item }) => (
    (
      <DropShadow style={styles.shadowStyle}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: 3,
            borderRadius: 5,
            marginVertical: 5,
            marginHorizontal: 10,
          }}>
          <Text
            style={{
              fontFamily: Fonts.gilroy_SemiBold,
              fontSize: 14,
              color: Colors.black,
              paddingVertical: 8,
              marginLeft: 7
            }}>
            {Capitalize(item.fullName ?? '')}
          </Text>
        </View>
      </DropShadow>
    )
  );

  const Footer = () => {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={{ marginBottom: 10 }}>
          {workoutDetail?.files?.length > 0 ? <SingleButton
            name={'Export as PDF'}
            onPress={() => verifyPlatform()}
          /> : null}
        </View>
        <SingleButton
          name={myWorkoutConstants.FINISH_WORKOUT}
          onPress={() => navigation.goBack()}
        />
        <View style={{ height: 80 }}></View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView style={{ flex: 1 }}>
        {type == 'my' ? (
          <AppHeader
            onGraphCall={() =>
              navigation.navigate('Workout_Progress', {
                progressData: route?.params,
              })
            }
            Heading={headerName}
            image={imagesFile.ic_graph}
            onPress={() => navigation.goBack()}
          />
        ) : (
          <AppHeader Heading={headerName} onPress={() => navigation.goBack()} />
        )}
        <DualButton
          index={index}
          onPress={id => selectIndex(id)}
          tab1={myWorkoutConstants.EXERCISE}
          tab2={myWorkoutConstants.DETAILS}
        />
        {index == 0 ? (
          <>
            <View style={{ marginTop: 10 }}>
              <View style={{ marginHorizontal: 10 }}>
                <Text
                  style={{
                    fontFamily: Fonts.gilroy_Bold,
                    fontSize: 14,
                    color: Colors.black,
                  }}>
                  Co-Creator
                </Text>
              </View>

              <View>
                <FlatList
                  data={workoutDetail?.CoCreator}
                  renderItem={renderCocreator}
                  style={{ marginTop: 10 }}
                  keyExtractor={item => item._id}
                />
              </View>
            </View>
            <FlatList
              data={workoutDetail?.exerciseGroup}
              renderItem={renderWorkout}
              keyExtractor={item => item._id}
              extraData={date}
            />
          </>
        ) : index == 1 ? (
          <View style={{ marginHorizontal: 18, marginTop: 20 }}>
            <View style={{ height: 160, borderRadius: 6, overflow: 'hidden' }}>
              <Image
                resizeMode={'cover'}
                style={{ width: '100%', height: 160 }}
                source={
                  workoutDetail?.workoutCoverImage
                    ? { uri: workoutDetail?.workoutCoverImage }
                    : imagesFile.ic_demo3
                }
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={styles.bold_18_black}>
                  {myWorkoutConstants.DESCRIPTION}
                </Text>
              </View>
              <DropShadow style={styles.shadowStyle}>
                <View style={styles.description_note_view}>
                  <Text style={styles.semiBold_12_black}>
                    {workoutDetail?.workoutDescription}
                  </Text>
                </View>
              </DropShadow>
            </View>
            <View style={{ marginTop: 20 }}>
              <View>
                <Text style={styles.bold_18_black}>
                  {myWorkoutConstants.NOTES}
                </Text>
              </View>
              <DropShadow style={styles.shadowStyle}>
                <View style={styles.description_note_view}>
                  <Text style={styles.semiBold_12_black}>
                    {workoutDetail?.notes}
                  </Text>
                </View>
              </DropShadow>
            </View>
            {workoutDetail?.files?.length > 0 ? <View style={{ marginTop: 20 }}>
              <View style={{ marginBottom: 12 }}>
                <Text style={styles.bold_18_black}>
                  {myWorkoutConstants.FILES}
                </Text>
              </View>
              <FlatList
                data={workoutDetail?.files}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View> : null}
          </View>
        ) : (
          <View style={{ marginTop: 17, marginHorizontal: 24 }}>
            <View>
              <Text>Description</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              <Text>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry’s standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Text>
            </View>
            <View>
              <View>
                <Calendar
                  onDayPress={day => {
                    let key = day.dateString;
                    let arr1 = [];
                    let obj1 = {};
                    obj1[key] = {
                      marked: true,
                      selected: true,
                      selectedColor: 'blue',
                    };
                    setDateObj(obj1);
                  }}
                  markingType={'custom'}
                  markedDates={dateObj}
                />
              </View>
            </View>
          </View>
        )}
        {index != 2 ? <Footer /> : null}
      </ScrollView>
      {loader ? <Loader /> : null}
    </SafeAreaView>
  );
};
export default WorkoutLibrary1;
