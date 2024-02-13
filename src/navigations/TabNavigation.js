import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen,
    CalenderHomeScreen,
    TrainerHomeScreen,
    CommunityHomeScreen,
    // ChatHomeScreen,
    Programs,
    
    // Workouts,
    // Habits,
    // Forms,
    // Files,
    ProgramDetails,
    Weeks,
    WorkoutExercise,
    ExerciseSets,
    WorkoutFinished,
    MyWorkout,
    WorkoutLibrary1,
    WorkoutLibrary2,
    SessionStart,
    MyNutritions,
    NutritionDetail,
    Macros,

    MyFilesScreen,
    FilesDetail,

    FormScreen,
    FormDetailScreen,
    HabitScreen,
    HabitDetailScreen,
    
    BodyFatCalculatorScreen,
    MicronutrientCalculatorScreen,
    RmCalculatorScreen,
    BMRCalculatorScreen,
    TrainerProfile,
    MenuScreen,
    MyProfille,
    ResetPassword,
    ProfileDetailScreen,
    FollowingScreen,
    CommunityScreen,
    GoalsPreferernceScreen,
    ParqScreen,
    ProgressRecordScreen,
    CommunityDetailScreen,
    CommentScreen,
    AppointmentScreen,
    ChatListScreen,
    MessageScreen,
    AboutScreen,
    BodyMeasurementScreen,
    BodyFatMeasurementScreen,
    BodyVitalStatScreen,
    ProgressPhotoScreen,
    PackageCardDetails,
    PaymentDetails,
PurchasedDetails,
ExerciseDetail,
MacrosDetails,
Workout_Progress,
NutritionProgress,
BookMarkScreen,
ProgressHabitGraph,
BMICalculator,
BMRHistory,
ProductList,
ProductDetails,
productEnquiry,
rateProduct,
productReview,
productInvoice
} from '../screens/tabScreens/index';

import {Colors , Fonts} from '../utils/Constants'
import imagesFile from '../../assets/imagesFile';
import Notification from '../screens/tabScreens/dashBoardTab/home/notification';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const DashBoardTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Programs" component={Programs} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyNutritions" component={MyNutritions} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyWorkout" component={MyWorkout} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProgramDetails" component={ProgramDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Weeks" component={Weeks} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutExercise" component={WorkoutExercise} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ExerciseSets" component={ExerciseSets} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutFinished" component={WorkoutFinished} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutLibrary1" component={WorkoutLibrary1} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutLibrary2" component={WorkoutLibrary2} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="SessionStart" component={SessionStart} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="NutritionDetail" component={NutritionDetail} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Macros" component={Macros} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyFilesScreen" component={MyFilesScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="FilesDetail" component={FilesDetail} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="FormScreen" component={FormScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="FormDetailScreen" component={FormDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="HabitScreen" component={HabitScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="HabitDetailScreen" component={HabitDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BMRCalculatorScreen" component={BMRCalculatorScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyFatCalculatorScreen" component={BodyFatCalculatorScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MicronutrientCalculatorScreen" component={MicronutrientCalculatorScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="RmCalculatorScreen" component={RmCalculatorScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BMICalculator" component={BMICalculator} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MenuScreen" component={MenuScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyProfille" component={MyProfille} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProfileDetailScreen" component={ProfileDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="FollowingScreen" component={FollowingScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CommunityScreen" component={CommunityScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="GoalsPreferernceScreen" component={GoalsPreferernceScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ParqScreen" component={ParqScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProgressRecordScreen" component={ProgressRecordScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyMeasurementScreen" component={BodyMeasurementScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyFatMeasurementScreen" component={BodyFatMeasurementScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyVitalStatScreen" component={BodyVitalStatScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProgressPhotoScreen" component={ProgressPhotoScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="PurchasedDetails" component={PurchasedDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetail} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MacrosDetails" component={MacrosDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Workout_Progress" component={Workout_Progress} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="NutritionProgress" component={NutritionProgress} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProgressHabitGraph" component={ProgressHabitGraph} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="TrainerHomeScreen" component={TrainerHomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="TrainerProfile" component={TrainerProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="PackageCardDetails" component={PackageCardDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BMRHistory" component={BMRHistory} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="productEnquiry" component={productEnquiry} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="rateProduct" component={rateProduct} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="productReview" component={productReview} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="productInvoice" component={productInvoice} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Notifications" component={Notification} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}

const CalenderTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CalenderHomeScreen" component={CalenderHomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyMeasurementScreen" component={BodyMeasurementScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyFatMeasurementScreen" component={BodyFatMeasurementScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BodyVitalStatScreen" component={BodyVitalStatScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ProgressPhotoScreen" component={ProgressPhotoScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyNutritions" component={MyNutritions} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="NutritionDetail" component={NutritionDetail} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Macros" component={Macros} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="MyWorkout" component={MyWorkout} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="Weeks" component={Weeks} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutExercise" component={WorkoutExercise} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="ExerciseSets" component={ExerciseSets} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutFinished" component={WorkoutFinished} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutLibrary1" component={WorkoutLibrary1} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="WorkoutLibrary2" component={WorkoutLibrary2} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}

const TrainerTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TrainerHomeScreen" component={TrainerHomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="TrainerProfile" component={TrainerProfile} options={{ headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name="MessageScreen" component={MessageScreen} options={{ headerShown: false, gestureEnabled: false }} /> */}
            <Stack.Screen name="PackageCardDetails" component={PackageCardDetails} options={{ headerShown: false, gestureEnabled: false }} />
            
            <Stack.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            {/* <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false, gestureEnabled: false }} /> */}
        </Stack.Navigator>
    )
}

const CommunityTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="CommunityHomeScreen" component={CommunityHomeScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="CommunityDetailScreen" component={CommunityDetailScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="BookMarkScreen" component={BookMarkScreen} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}

const ChatTab = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="ChatListScreen" component={ChatListScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="AboutScreen" component={AboutScreen} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="TrainerProfile" component={TrainerProfile} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="PackageCardDetails" component={PackageCardDetails} options={{ headerShown: false, gestureEnabled: false }} />
            <Stack.Screen name="PaymentDetails" component={PaymentDetails} options={{ headerShown: false, gestureEnabled: false }} />
        </Stack.Navigator>
    )
}

export const TabNavigator = () => {
    return (
        <Tab.Navigator initialRouteName='DashBoardTab'
            screenOptions={{
                lazy: true,
                tabBarStyle: { position:'absolute', opacity:0.9 ,   justifyContent: 'center', alignItems: 'center' }
            }}
        >
            <Tab.Screen name="DashBoardTab" component={DashBoardTab}
                options={{
                    tabBarLabelStyle:{     
                        fontFamily:Fonts.gilroy_Bold,
                         fontSize:9,
                        
                    },
                    tabBarActiveTintColor:Colors.black,
                    tabBarLabel: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const image = focused ? imagesFile.ic_home_selected : imagesFile.ic_home
                        return (
                            <Image  source={image} style={{ marginTop: 5 }}>
                            </Image>
                        )
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen name="CalenderTab" component={CalenderTab}
                options={{
                    tabBarLabelStyle:{
                        fontFamily:Fonts.gilroy_Bold,
                         fontSize:9,
                         
                    },
                    tabBarActiveTintColor:Colors.black,
                    tabBarLabel: 'Calendar',
                    headerShown: false,

                    tabBarIcon: ({ focused }) => {
                        const image = focused ? imagesFile.ic_calenderSelected : imagesFile.ic_calender
                        return (
                            <Image source={image} style={{ marginTop: 0 }}>
                            </Image>
                        )
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen name="TrainerTab" component={TrainerTab}
                options={{
                    tabBarLabelStyle:{  
                        fontFamily:Fonts.gilroy_Bold,
                         fontSize:9,
                        
                    },
                    tabBarActiveTintColor:Colors.black,
                    tabBarLabel: 'Trainers',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const image = focused ? imagesFile.ic_trainerSelected : imagesFile.ic_trainer
                        return (
                            <Image source={image} style={{ marginTop: 0 }}>
                            </Image>
                        )
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen name="CommunityTab" component={CommunityTab}
                options={{
                    tabBarLabelStyle:{        
                        fontFamily:Fonts.gilroy_Bold,
                         fontSize:9,
                           
                    },
                    tabBarActiveTintColor:Colors.black,
                    tabBarLabel: 'Community',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const image = focused ? imagesFile.ic_communitySelected : imagesFile.ic_community
                        return (
                            <Image source={image} style={{ marginTop: 0 }}>
                            </Image>
                        )
                    }
                }}
            >
            </Tab.Screen>
            <Tab.Screen name="ChatTab" component={ChatTab}
                options={{
                    tabBarLabelStyle:{  
                        fontFamily:Fonts.gilroy_Bold,
                         fontSize:9, 
                        
                    },
                    tabBarActiveTintColor:Colors.black,
                    tabBarLabel: 'Chats',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        const image = focused ? imagesFile.ic_chatSelected : imagesFile.ic_chat
                        return (
                            <Image source={image} style={{ marginTop: 0 }}>
                            </Image>
                        )
                    }
                }}
            >
            </Tab.Screen>
        </Tab.Navigator>
    )
}