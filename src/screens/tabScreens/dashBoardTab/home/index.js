import React, { useRef, useState, useEffect } from 'react';
import {
  AppState,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  DeviceEventEmitter,
  FlatList,
} from 'react-native';
import { Colors, Fonts } from '../../../../utils/Constants';
import imagesFile from '../../../../../assets/imagesFile';
import CarouselView from '../../../commonComponents/CarouselView';
import { styles } from './homeStyle';
import { homeConstants } from '../dashBoardConstants';
import ScheduleCard from '../../../commonComponents/ScheduleCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../auth/authConstants';
import MyAssignmentsBar from '../../../commonComponents/MyAssignmentsBar';
import ToolsBar from '../../../commonComponents/ToolsBar';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import { Today_Schedule } from '../../../../apiManager/auth/index';
import Loader from '../../../commonComponents/Loader';
import database from '@react-native-firebase/database';
import { Get_Home_Adds } from '../../../../apiManager/ads/index';
import { GET_Notification } from '../../../../apiManager/notifications';
const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Dimensions.get('window').width;
var userStatus = database().ref('status');
var userId;

const HomeScreen = () => {
  const navigation = useNavigation();
  const [workoutSelected, setWorkoutSelected] = useState('');
  const [nutritionSelected, setNutritionSelected] = useState('');
  const [habitSelected, setHabitSelected] = useState('');
  const [userData, setUserData] = useState({});
  const [openWorkout, setOpenWorkout] = useState(false);
  const [openNutrition, setOpenNutrition] = useState(false);
  const [openhabit, setOpenHabit] = useState(false);
  const [schedules, setSchedules] = useState(false);
  const [todayWorkouts, setTodayWorkouts] = useState([]);
  const [todayNutrition, setTodayNutrition] = useState([]);
  const [loader, setLoader] = useState(false);
  const [notificationCount, setNotificationCount] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [adsList, setAdsList] = useState([]);
  const [todaysHabit, setTodayshabit] = useState([]);
  const [scheduleList, setAllScheduleList] = useState([]);

  useEffect(() => {
    DeviceEventEmitter.addListener('updateProfile', () => getUserDetail());
    getUserTOken();
    getUserDetail();
    setTimeout(() => {
      Fetch_Notification();
    }, 1500);
  }, []);

  useEffect(() => {
    const onFocus = () => {
      Fetch_Notification();
    };
    const unsubscribe = navigation.addListener('focus', onFocus);
    return () => {
      // Clean up the listener when the component is unmounted
      unsubscribe();
    };
  }, [navigation]);

  const Fetch_Notification = () => {
    // console.log('Fetch_Notification---------------')
    setLoader(true);
    GET_Notification()
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          let notifications = response.data.notifications ?? [];
          let notifCount =
            notifications &&
            notifications?.length > 0 &&
            notifications?.filter(e => e?.isCompleted === false);
          setNotificationCount(notifCount?.length);
          // console.log(notifCount?.length, 'notifCount')
        } else {
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('Fetch_Notification_RSPsErr========', error);
      });
  };
  const SetUserStatus = async () => {
    console.log('userId=====', userId);
    const handleAppStateChange = nextAppState => {
      console.log('CurrentAppStatus==========', nextAppState);
      let date = new Date();
      let dateStr = date.toString();
      if (nextAppState == 'inactive') {
        userStatus.child(userId).set({
          status: 'away',
          timestamp: dateStr,
        });
      } else if (nextAppState == 'background') {
        userStatus.child(userId).set({
          status: 'away',
          timestamp: dateStr,
        });
      } else {
        userStatus.child(userId).set({
          status: 'online',
          timestamp: dateStr,
        });
      }
      //  return AppState.removeEventListener('change', handleAppStateChange);
    };
    AppState.addEventListener('change', handleAppStateChange);
  };

  const GetHomeAdds = () => {
    var raw = JSON.stringify({ place: 'Home', panel: 'Customer' });
    setLoader(true);
    Get_Home_Adds(raw)
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          setAdsList(response.data.adsData);
          console.log('resp========', response);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('addsErr=======', error);
      });
  };

  const toggleSwitch = () => setOpenWorkout(previousState => !previousState);
  const toggleSwitch1 = () => setOpenNutrition(previousState => !previousState);
  const toggleSwitch2 = () => setOpenHabit(previousState => !previousState);
  const toggleSwitch3 = () => setSchedules(previousState => !previousState);
  const getUserTOken = () => {
    AsyncStorage.getItem(LoginConstants.TOKEN).then(value => {
      // console.log('NewToken============', value);
      global.Token = value;
      if (global.Token) {
        getTodaySchedule();
      }
    });
  };

  const getUserDetail = () => {
    AsyncStorage.getItem(LoginConstants.USER_DETAIL).then(value => {
      let parseData = JSON.parse(value);
      console.log('UserDetail1======', parseData);
      setUserData(parseData);
      userId = parseData._id;
      setCurrentUserId(parseData._id);
      SetUserStatus();
      // SetUserStatus(parseData._id)
    });
  };

  const getTodaySchedule = () => {
    setTodayWorkouts(null);
    setTodayNutrition(null);
    let workout = [];
    let nutrition = [];

    setLoader(true);
    Today_Schedule()
      .then(response => {
        let client_Habits = response?.data?.clientHabits;
        let trainer_Habits = response?.data?.trainerHabits;
        let All_Habits = client_Habits.concat(trainer_Habits);
        setTodayshabit(All_Habits);
        // console.log('scheduleResp========', response);
        if (response.status == 200) {
          setLoader(false);
          let programResult = response.data.programResult;
          let appointmentList = response?.data?.appointmentData;

          programResult.forEach(element => {
            // console.log('element:****** ', element);
            if (element.Activities != null) {
              element.Activities.activity.forEach(element1 => {
                if (element1.activityType == 'Workout') {
                  // console.log('workEle=======', element1);
                  workout.push(element1);
                }
                if (element1.activityType == 'Nutrition') {
                  // console.log('nutriEle=======', element1);
                  nutrition.push(element1);
                }
              });
            }
          });
          GetHomeAdds();
          setAllScheduleList(appointmentList);
          setTodayWorkouts(workout);
          setTodayNutrition(nutrition);
          // console.log('TodayWorkoutList==========', workout);
          // console.log('TodayNutritionList==========', nutrition);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('scheduleErr======', error);
      });
  };

  const conditionalNavigation = (
    activityType,
    activityValue,
    activityId,
    item,
  ) => {
    if (activityType == 'Nutrition') {
      navigation.navigate('NutritionDetail', {
        name: activityValue,
        id: activityId,
        type: 'my',
      });
    } else if (activityType == 'Workout') {
      navigation.navigate('WorkoutLibrary1', {
        name: activityValue,
        id: activityId,
        type: 'my',
      });
    } else if (item?.habitName) {
      navigation.navigate('HabitScreen');
    } else {
      navigation.navigate('AppointmentScreen', { appointment: item });
    }
  };

  const renderTodaySchedule = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        conditionalNavigation(
          item.activityType,
          item.activityValue,
          item.activityId,
          item,
        )
      }>
      <ScheduleCard item={item} />
    </TouchableOpacity>
  );

  const EmptyComponent = ({ name }) => {
    return (
      <View style={styles.emptyView}>
        <Text style={styles.semiBold_12_black}>No {name} found!</Text>
      </View>
    );
  };

  const TodayScheduleComponent = props => {
    return (
      <View>
        <FlatList
          data={props.item}
          renderItem={renderTodaySchedule}
          keyExtractor={item => item.id}
          ListEmptyComponent={<EmptyComponent name={props.name} />}
        />
      </View>
    );
  };

  return (
    <>
      <MyStatusBar backgroundColor={Colors.black} barStyle="light-content" />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <View>
              <View style={{ flex: 1 }}>
                <CarouselView adsList={adsList} />
                {/* <Image  source={imagesFile.ic_carousel} /> */}
              </View>
              <View style={styles.homeHeader}>
                <View style={{ marginLeft: -10, width: 34, height: 34 }}></View>
                {/* <View style={{ flex: 1 }}></View> */}
                <View>{/* <Image source={imagesFile.ic_homeLogo} /> */}</View>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                  style={{
                    marginRight: 12,
                    padding: 6,
                    borderRadius: 17,
                    backgroundColor: '#fff',
                  }}
                  onPress={() => navigation.navigate('Notifications')}>
                  <Image
                    style={{ width: 16, height: 16, padding: 6 }}
                    source={imagesFile.ic_notification}
                  />
                  {notificationCount && notificationCount > 0 ? (
                    <View
                      style={{
                        right: -2,
                        padding: 0,
                        backgroundColor: '#F99E0C',
                        width: '80%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: -4,
                        borderRadius: 30,
                      }}>
                      <Text
                        style={{
                          color: '#fff',
                          padding: 1,
                          fontSize: 8,
                          borderRadius: 30,
                          textAlign: 'center',
                        }}>
                        {notificationCount}
                      </Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginRight: 18, borderRadius: 17 }}
                  onPress={() => navigation.navigate('MenuScreen')}>
                  <Image
                    style={{ width: 34, height: 34, borderRadius: 17 }}
                    source={
                      userData?.profilePicture?.url != null
                        ? { uri: userData?.profilePicture?.url }
                        : imagesFile.ic_imgPlaceholder
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.bold_12_black}>
                {homeConstants.MY_ASSIGNMENTS}
              </Text>
            </View>
            <MyAssignmentsBar />

            <View style={{ marginLeft: 18, marginTop: 30 }}>
              <Text style={styles.bold_12_black}>{homeConstants.TOOLS} </Text>
            </View>
            <ToolsBar />
            {/* <View style={styles.scheduleTextContainer}>
              <TouchableOpacity onPress={()=>
                            {
                                navigation.navigate('ProductList')
                            }}>
                            <Text style={styles.bold_12_black}>{"New Dev"}</Text>
                            </TouchableOpacity>
              <View style={{flex: 1}}></View>
            </View> */}
            <View style={styles.scheduleTextContainer}>
              <Text style={styles.bold_12_black}>
                {homeConstants.TODAY_SCHEDULE}
              </Text>
              <View style={{ flex: 1 }}></View>
            </View>
            <TouchableOpacity
              style={styles.todayScheduleBtnStyle}
              onPress={toggleSwitch}>
              <View style={styles.justifyView}>
                <Text style={styles.bold_12_black}>Workout</Text>
                {openWorkout ? (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_up}
                  />
                ) : (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_down}
                  />
                )}
              </View>
            </TouchableOpacity>

            {openWorkout ? (
              <>
                <TodayScheduleComponent name="Workout" item={todayWorkouts} />
              </>
            ) : null}
            <TouchableOpacity
              style={styles.todayScheduleBtnStyle}
              onPress={toggleSwitch1}>
              <View style={styles.justifyView}>
                <Text style={styles.bold_12_black}>Nutrition</Text>
                {openNutrition ? (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_up}
                  />
                ) : (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_down}
                  />
                )}
              </View>
            </TouchableOpacity>
            {openNutrition ? (
              <TodayScheduleComponent name="Nutrition" item={todayNutrition} />
            ) : null}
            <TouchableOpacity
              style={styles.todayScheduleBtnStyle}
              onPress={toggleSwitch2}>
              <View style={styles.justifyView}>
                <Text style={styles.bold_12_black}>Habits</Text>
                {openhabit ? (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_up}
                  />
                ) : (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_down}
                  />
                )}
              </View>
            </TouchableOpacity>
            {openhabit ? (
              <TodayScheduleComponent name="Habit" item={todaysHabit} />
            ) : null}
            <TouchableOpacity
              style={styles.todayScheduleBtnStyle}
              onPress={toggleSwitch3}>
              <View style={styles.justifyView}>
                <Text style={styles.bold_12_black}>Schedule</Text>
                {schedules ? (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_up}
                  />
                ) : (
                  <Image
                    style={styles.iconStyle}
                    source={imagesFile.chevron_down}
                  />
                )}
              </View>
            </TouchableOpacity>
            {schedules ? (
              <TodayScheduleComponent name="Schedule" item={scheduleList} />
            ) : null}

            <View style={{ height: 90 }}></View>
          </View>
        </ScrollView>
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};
export default HomeScreen;
