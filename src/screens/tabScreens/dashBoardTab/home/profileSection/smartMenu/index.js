import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Image, TouchableOpacity, ScrollView,DeviceEventEmitter, Alert,Linking } from 'react-native';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import { Colors } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation, useRoute ,CommonActions} from '@react-navigation/native';
import { styles } from './styles';
import ListView from './ListView';
import GridView from './GridView';
import { smartMenuConstants } from '../ProfileConstants';
import ToggleSwitch from 'toggle-switch-react-native';
import DefaultCard from './DefaultCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../../../auth/authConstants';
import {Delete_Account_Api} from '../../../../../../apiManager/profile/index';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-community/google-signin';
  import {Toaster} from '../../../../../commonComponents/Toaster';
import Loader from '../../../../../commonComponents/Loader';
import InAppReview from 'react-native-in-app-review';

const MenuScreen = () => {
    const navigation = useNavigation()
    const [isEnabled, setIsEnabled] = useState(true);
    const [userData, setUserData] = useState({})
    const [loader, setLoader] = useState(false)
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        DeviceEventEmitter.addListener('updateProfile', () => callBack())
        // AsyncStorage.getItem(LoginConstants.USER_DETAIL).then((value) => {
        //     let parseData = JSON.parse(value)
        //     console.log("UserDetail1======", parseData)
        //     setUserData(parseData)
        // })
        callBack()
    }, [])

    const callBack = ()=>{
        AsyncStorage.getItem(LoginConstants.USER_DETAIL).then((value) => {
            let parseData = JSON.parse(value)
            console.log("UserDetail1======", parseData)
            setUserData(parseData)
        })
    }
    const userLogout = async() => {
        
            // Remove user session from the device.
            setLoader(true)
            try {
            //   await GoogleSignin.revokeAccess();
            GoogleSignin.configure({
                scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
                iosClientId: '856340862276-cn59n0h1dp32ougi0qtu46ja69fusthh.apps.googleusercontent.com',
                webClientId: '856340862276-nlr30eh9sqit75mbtpdq1b4gb8ft5ahg.apps.googleusercontent.com',
                //'575348081388-80d0agrtbntfv5h4a2pdpj8h4q6pdsr1.apps.googleusercontent.com',
                //webClientId: '228807374621-vppb5a0in5u601cr7lkin7rsranl1kg7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
                offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            });
              await GoogleSignin.signOut();
              setLoader(false)
              // Removing user Info
            //   setUserInfo(null); 
            } catch (error) {
                setLoader(false)
              console.error(error);
            }
            // setGettingLoginStatus(false);
            setLoader(false)
            AsyncStorage.removeItem(LoginConstants.USER_DETAIL)
            // AsyncStorage.setItem(LoginConstants.INTRESTE_ADDED, "true")
            global.isSession = false
        // navigation.navigate('LoginScreen')
        navigation.dispatch(CommonActions.reset({routes:[
            { name: 'LoginScreen' },]}))
    }

    const actionOnDelete = ()=>{
        Alert.alert(
            "Delete Account",
            "Are you sure you want to delete account?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: 'cancel'
                },
                {
                    text: "Yes",
                    onPress: () => onDeleteAccount(),
                    style: "default"
                }
    
            ],
            { cancelable: false })
    }

    const onDeleteAccount = ()=>{
        console.log("trueDeleted=======")
        
        setLoader(true)
        Delete_Account_Api().then((response)=>{
            if(response.status == 200){
                Toaster(response.message)
                userLogout()
            }
        }).catch((error)=>{
            setLoader(false)
            console.log("deleteAccErr========",error)
        })
    }

    const rateOnStore = ()=>{
        InAppReview.isAvailable()
        

// trigger UI InAppreview
InAppReview.RequestInAppReview()
  .then((hasFlowFinishedSuccessfully) => {
    // when return true in android it means user finished or close review flow
    console.log('InAppReview in android', hasFlowFinishedSuccessfully);

    // when return true in ios it means review flow lanuched to user.
    console.log(
      'InAppReview in ios has launched successfully',
      hasFlowFinishedSuccessfully,
    );

    // 1- you have option to do something ex: (navigate Home page) (in android).
    // 2- you have option to do something,
    // ex: (save date today to lanuch InAppReview after 15 days) (in android and ios).

    // 3- another option:
    if (hasFlowFinishedSuccessfully) {
        console.log('hasFlowFinishedSuccessfully: ', hasFlowFinishedSuccessfully);
      // do something for ios
      // do something for android
    }

    // for android:
    // The flow has finished. The API does not indicate whether the user
    // reviewed or not, or even whether the review dialog was shown. Thus, no
    // matter the result, we continue our app flow.

    // for ios
    // the flow lanuched successfully, The API does not indicate whether the user
    // reviewed or not, or he/she closed flow yet as android, Thus, no
    // matter the result, we continue our app flow.
  })
  .catch((error) => {
    //we continue our app flow.
    // we have some error could happen while lanuching InAppReview,
    // Check table for errors and code number that can return in catch.
    console.log("RatingErrr=============",error);
  });
    }

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View style={{ height: 50, justifyContent: 'center',flexDirection:'row' }}>
                        <TouchableOpacity style={{ marginLeft: 18 }}
                            onPress={() => navigation.goBack()}
                        >
                            <Image source={imagesFile.ic_back} />
                        </TouchableOpacity>
                        <View style={{flex:1}}></View>

                    </View>
                    <TouchableOpacity style={styles.profile_CardView}
                        onPress={() => navigation.navigate('MyProfille')}
                    >
                        <View>
                            <View>
                                <Text style={styles.bold_18_black}>{userData?.fullName}</Text>
                            </View>
                            <View style={{ marginTop: 4 }}>
                                <Text style={styles.semibold_12_black}>{userData?.email}</Text>
                            </View>
                            <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                                <View>
                                    <Text style={styles.semibold_10_blue}>View activities</Text>
                                </View>
                                <View style={{ marginLeft: 8 }}>
                                    <Image source={imagesFile.ic_blueRightArr} />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <View style={styles.profile_image_view}>
                            <Image style={{width:72,height:72,borderRadius:36}} source={userData?.profilePicture?.url?{uri : userData?.profilePicture?.url}:imagesFile.ic_imgPlaceholder} />
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginTop: 30, flexDirection: 'row', marginHorizontal: 18, justifyContent: 'center', alignItems: 'center' }}>
                        <View>
                            <Text style={styles.bold_18_black}>{smartMenuConstants.MFM_MENU}</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <View>
                            <ToggleSwitch
                                isOn={isEnabled}
                                onColor="#EFEFEF"
                                // offColor="#EFEFEF"
                                size='medium'
                                onToggle={toggleSwitch}
                                thumbOffStyle={{ backgroundColor: Colors.black, }}
                                thumbOnStyle={{ backgroundColor: Colors.blue }}
                                icon={<Image source={isEnabled ? imagesFile.ic_toggleOnIcon : imagesFile.ic_toggleOfIcon} />}
                            />
                        </View>
                    </View>
                    {isEnabled ?
                        <ListView /> :
                        <GridView />}
                    <View style={{ marginHorizontal: 18, marginTop: 54 }}>
                        <TouchableOpacity
                        onPress={()=>Linking.openURL('https://myfitmantra.com/about')}
                        >
                            <DefaultCard Image={imagesFile.sm_about} Name={smartMenuConstants.ABOUT} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ marginTop: 15 }}
                        onPress={()=>Linking.openURL('https://myfitmantra.com/contact')}
                        >
                            <DefaultCard Image={imagesFile.sm_feedback} Name={smartMenuConstants.SEND_FEEDBACK} />
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ marginTop: 15 }}
                        onPress={()=>rateOnStore()}
                        >
                            <DefaultCard Image={imagesFile.sm_rateus} Name={smartMenuConstants.RATE_US} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 15 }}
                        onPress={()=>Linking.openURL('https://myfitmantra.com/contact')}
                        
                        >
                            <DefaultCard Image={imagesFile.sm_help} Name={smartMenuConstants.CONTACT_US} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={() => userLogout()}
                        >
                            <DefaultCard Image={imagesFile.sm_logout} Name={smartMenuConstants.LOGOUT} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 15 }}
                            onPress={()=>actionOnDelete()}
                        >
                            <DefaultCard style={{width:40,height:40}}  Image={imagesFile.ic_deleteAcc} Name={smartMenuConstants.DELETE_ACCOUNT} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView>
                {loader?<Loader/>:null}
            </SafeAreaView>
        </>
    )
}

export default MenuScreen;