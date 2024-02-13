import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import imagesFile from '../../../../../../../../assets/imagesFile';
import { programConstants } from '../../../../dashBoardConstants';
import { Capitalize, Colors, Fonts, getRandomColor } from '../../../../../../../utils/Constants';
import { styles } from './programDetailStyle';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Get_Program_Detail } from '../../../../../../../apiManager/program/index';
import Loader from '../../../../../../commonComponents/Loader';
import { Get_Home_Adds } from '../../../../../../../apiManager/ads/index';
import DropShadow from 'react-native-drop-shadow';

import moment from 'moment';
import DoughnutChart from '../../../../../../commonComponents/DoughnutChart';

const ProgramDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(0);
  const [startProgram, setStartProgram] = useState(false);
  const [programId, setProgramId] = useState(route.params.id);
  const [heading, setHeading] = useState(route.params.heading);
  const [type, setType] = useState(route.params.type);
  console.log('route.params.type: ', route.params.type);
  const [programDetail, setProgramDetail] = useState({});
  const [loader, setLoader] = useState(false);
  const [adsUri, setAdsUri] = useState('');
  const [completePercentage, setCompletePercentage] = useState(0);
  const [markAsDoneId, setMarkAsDoneId] = useState('');
  const [create, setCreate] = useState([]);
  const [totalNumDays, setTotalNumDays] = useState('');
  const [completeAct, setCompleteAct] = useState('');
  const [inCompleteAct, setinCompleteAct] = useState('');
  const [isProgramCompleted, setIsProgramCompleted] = useState(false);

  let dounutdata = [
    { "number": completeAct, "name": "Complete" },
    { "number": inCompleteAct, "name": "Incomplete" }
  ]
  const pieData = dounutdata.map(item => ({ ...item, color: getRandomColor() }));
  dounutdata = pieData

  const getInnerText = (index, dataAsset) =>
    index < 0
      ? {
        index: -1,
        text: `Duration ${totalNumDays} days`
      }
      : {
        index,
        text: `${dataAsset[index].name}
${dataAsset[index].number} Activities`
      };
  const [selectedPie, setSelectedPie] = useState(getInnerText(-1, dounutdata));

  useEffect(() => {
    FetchDates()
  }, [programDetail])

  const FetchDates = () => {
    let myData = programDetail?.program
    let exp = myData?.expiryDate
    let create = myData?.createdAt
    const date1 = new Date(exp);
    const date2 = new Date(create);
    // Calculate the time difference in milliseconds
    const timeDifference = date1 - date2;
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000)) + 2;
    // console.log(myData?.lastDay, 'daysDifference')
    setTotalNumDays(daysDifference)
    totalNumDays && setSelectedPie(getInnerText(-1, dounutdata))

  }


  const onPieItemSelected = newIndex => () =>
    setSelectedPie(
      getInnerText(newIndex === selectedPie.index ? -1 : newIndex, dounutdata)
    );

  useEffect(() => {
    const onFocus = () => {
      GetProgramDetail();
      GetAds();
    };

    const unsubscribe = navigation.addListener('focus', onFocus);
    return () => {
      // Clean up the listener when the component is unmounted
      unsubscribe();
    };
  }, [navigation]);

  const selectIndex = id => {
    setIndex(id);
  };

  const GetAds = () => {
    var raw = JSON.stringify({ place: 'Programs', panel: 'Customer' });
    Get_Home_Adds(raw)
      .then(response => {
        if (response.status == 200) {
          setAdsUri(response.data.adsData[0].image.url);
          console.log('ProAdsresp========', response);
        }
      })
      .catch(error => {
        console.log('programAddErr========', error);
      });
  };

  const GetProgramDetail = () => {
    setLoader(true);
    Get_Program_Detail(programId, type)
      .then(response => {
        if (response.status == 200) {
          // console.log('ProgramDetail========', response);
          // console.log('createdAt========', response?.data?.program );

          let date = response?.data?.program?.createdAt;
          function addDays(date, days) {
            var result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
          }

          let arr = [];

          for (let i = 0; i <= 6; i++) {
            let dateNew = addDays(date, i);
            console.log('date: ', date);
            let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][
              new Date(dateNew).getDay()
            ];
            arr.push(weekday);
          }
          console.log('arr:--------- ', arr);
          setCreate(arr);
          setLoader(false);
          setProgramDetail(response.data);
          let weeks = response.data.program.week;
          setMarkAsDoneId(response.data.program.programId);
          // console.log('AllWeeks=======', weeks);
          let completedActivity = [];
          let inCompleteActivity = [];
          weeks.forEach(element => {
            // console.log('weekElements======', element);
            element.day.forEach(days => {
              // console.log('allDays======', days);
              days.activity.forEach(activities => {
                // console.log('AllActivities========', activities);
                if (activities.doneStatus == false) {
                  inCompleteActivity.push(activities);
                } else {
                  completedActivity.push(activities);
                }
              });
            });
          });
          let totalActivity = [...completedActivity, ...inCompleteActivity];
          // console.log('CompletedActivity=========', completedActivity);
          // console.log('IncompleteActivities=========', inCompleteActivity);
          let completeLength = completedActivity.length;
          let incompleteLength = inCompleteActivity.length;
          let totalActivityLength = totalActivity.length;
          // console.log('totalActivityLength: ', totalActivityLength);
          let percentage = (completeLength / totalActivityLength) * 100;
          // console.log('completedLength========', completeLength);
          // console.log('incompletedLength========', incompleteLength);
          console.log('percentage========', percentage);
          setCompleteAct(completeLength);
          setinCompleteAct(totalActivityLength - completeLength);
          // console.log(totalActivityLength, 'inCompleteAct', completeLength)
          // console.log(typeof inCompleteAct, 'inCompleteAct')
          if (inCompleteAct == '0' || percentage == 100) {
            setIsProgramCompleted(true)
          } else {
            setIsProgramCompleted(false)
          }
          setCompletePercentage(percentage);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('ProDetailErr=========', error);
      });
  };

  const weekDetail = item => {
    console.log('SharedData=======', item);
    navigation.navigate('Weeks', {
      data: item,
      heading: heading,
      programId: programId,
      type: route.params?.type,
      dayName: create,
    });
    // navigation.navigate('Weeks', { data: item, heading: heading, programId: markAsDoneId })
  };

  const renderItem = ({ item, index }) => {
    item.day.forEach((items, index) => {
      items.dayNameNew = create[index];
    });
    // console.log('item:****** ', item);

    return (
      <TouchableOpacity
        style={styles.weekViewStyle}
        onPress={() => weekDetail(item)}>
        <View>
          <Text style={styles.bold_13_black}>{index + 1}</Text>
        </View>
        <View style={{ flex: 1 }}></View>
        <View style={{ flexDirection: 'row' }}>
          {item.day.map(day => {
            return (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginLeft: 20 }}>

                  <Text
                    style={{
                      color: day?.activity?.length ? Colors.blue : Colors.black,
                      fontFamily: Fonts.gilroy_Medium,
                    }}>
                    {day?.dayNameNew}
                  </Text>
                  <Image

                    style={{ marginLeft: 5, marginTop: 10 }}
                    source={
                      day?.activity?.length > 0
                        ? imagesFile.ic_blueDot
                        : imagesFile.ic_whiteDot
                    }
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View style={{ flex: 1 }}></View>
        <View>
          <Image source={imagesFile.ic_rightArrow} />
        </View>
      </TouchableOpacity>
    );
  };

  const renderCocreator = ({ item }) => (
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
  );

  const isProgramStarted = completePercentage !== 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
        <AppHeader Heading={heading} onPress={() => navigation.goBack()} />
        <View>
          {adsUri ? <Image style={{ width: '100%', height: 110 }} source={{ uri: adsUri }} /> : null}
        </View>
        {/*---------------- Prog ----------------*/}

        {type == 'my' ? <>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}>
            <View>
              <Text>
                {
                  isProgramCompleted ?
                    programConstants.PROGRAM_COMPLETED :
                    !isProgramStarted
                      ? programConstants.PROGRAM_NOT_STARTED
                      : programConstants.PROGRAM_STARTED}
              </Text>
            </View>
            {!isProgramCompleted ? <TouchableOpacity
              disabled={isProgramStarted}
              style={[
                styles.startProgramBtnStyle,
                isProgramStarted ? { backgroundColor: 'grey' } : null,
              ]}
              onPress={() => setStartProgram(true)}>
              <Text style={styles.semiBold_8_white}>
                {programConstants.START_PROGRAM}
              </Text>
            </TouchableOpacity> : null}
          </View>

          <View style={styles.durationView}>
            <View>
              <Text style={styles.bold_18_black}>
                {programConstants.DURATION}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={[styles.semiBold_10_black, { fontSize: 12 }]}>
                    {programConstants.START_DATE}
                  </Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View>
                  <Text style={[styles.semiBold_10_blue, { fontSize: 12 }]}>
                    {moment(programDetail?.program?.createdAt).format(
                      'DD MMM YYYY',
                    )}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <View>
                  <Text style={[styles.semiBold_10_black, { fontSize: 12 }]}>
                    {programConstants.COMPLITION}
                  </Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View>
                  <Text style={[styles.semiBold_10_blue, { fontSize: 12 }]}>
                    {moment(programDetail?.program?.expiryDate).format(
                      'DD MMM YYYY',
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </> : null}

        {type == 'my' ? <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 0,
            // backgroundColor: 'red'
          }}>
          <DoughnutChart
            pieSize={200 * 0.9}
            onItemSelected={onPieItemSelected}
            size={200}
            data={dounutdata}
            value={selectedPie}
          />
        </View> : null}


        {/*---------------- Prog ----------------*/}

        <View style={{ marginTop: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.bold_18_black}>Co-Creater</Text>
          </View>
          <View>
            {/* <Text style={styles.semiBold_10_black}>{programDetail?.program?.CoCreator != 0 ? programDetail?.program?.CoCreator.toString() : "--/--"}</Text> */}
            <FlatList
              data={programDetail?.program?.CoCreator}
              // data={[{id:1}]}
              style={{ marginTop: 5 }}
              renderItem={renderCocreator}
            />
          </View>
        </View>

        <View style={{ marginLeft: 10, marginRight: 14, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Image source={imagesFile.ic_week} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.semiBold_18_black}>
                {programConstants.WEEKS}
              </Text>
            </View>
          </View>
          <View>
            <FlatList
              data={programDetail?.program?.week}
              // data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
          </View>
        </View>
        {/* ----------Commented Code----------- */}
        {/* <View style={styles.latestWeightContainer}>
                    <View>
                        <Text style={styles.bold_18_black} >{programConstants.LATEST_WEIGHT}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View>
                            <Image source={imagesFile.ic_ellipse} />
                        </View>
                        <View style={{ position: 'absolute' }}>
                            <Text style={styles.bold_20_black}>65kg</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Text style={styles.semiBold_10_black}>{programConstants.STARTING_WEIGHT}</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View>
                                <Text style={styles.semiBold_10_blue}>65.00kg</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            <View>
                                <Text style={styles.semiBold_10_black}>{programConstants.WEIGHT_CHANGE}</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View>
                                <Text style={styles.semiBold_10_blue}>0.00kg</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.latestWeightContainer}>
                    <View>
                        <Text style={styles.bold_18_black} >{programConstants.TRACKER_WORKOUT}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <View>
                            <Image source={imagesFile.ic_ellipse} />
                        </View>
                        <View style={{ position: 'absolute' }}>
                            <View >
                                <Text style={styles.bold_14_black}>Completed: 0/21</Text>
                            </View>
                            <View >
                                <Text style={styles.bold_14_black}>Missed: 0/21</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.trackerBtnStyle}>
                        <TouchableOpacity style={index == 0 ? styles.btnSelected : styles.btnUnSelected}
                            onPress={() => selectIndex(0)}
                        >
                            <Text style={index == 0 ? styles.bold_10_white : styles.bold_10_black}>{programConstants.WORKOUTS}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={index == 1 ? styles.btnSelected : styles.btnUnSelected}
                            onPress={() => selectIndex(1)}
                        >
                            <Text style={index == 1 ? styles.bold_10_white : styles.bold_10_black}>{programConstants.NUTRITION}</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
        {/* ----------Commented Code----------- */}
        <View style={styles.latestWeightContainer}>
          <View>
            <Text style={styles.bold_18_black}>
              {programConstants.PROGRESS_PHOTO}
            </Text>
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.medium_10_black}>
              {programConstants.NO_PHOTO_UPLOADED_YET}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBtnStyle}
            onPress={() => navigation.navigate('ProgressPhotoScreen')}>
            <Text style={styles.bold_10_white}>
              {programConstants.UPLOAD_PHOTOS}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 80 }}></View>
      </ScrollView>
      {loader ? <Loader /> : null}
    </SafeAreaView>
  );
};

export default ProgramDetails;
