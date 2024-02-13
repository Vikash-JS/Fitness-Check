import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
  ScrollView,
  Linking,
} from 'react-native';
import imagesFile from '../../../../assets/imagesFile';
import { LoginConstants, SignupConstants, CountryCode } from '../authConstants';
import InputBox from '../../commonComponents/InputBox';
import DropDown_InputBox from '../../commonComponents/DropDown_InputBox';
import CountryCodeModal from '../../modals/CountryCodeModal';
import { CountryPicker } from "react-native-country-codes-picker";
import { Colors, Fonts } from '../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Toaster } from '../../commonComponents/Toaster';
import { styles } from './signupStyles';
import {
  Signup_Request,
  Google_SignIn_Api,
} from '../../../apiManager/auth/index';
import MyStatusBar from '../../commonComponents/MyStatusBar';
import Loader from '../../commonComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { firebase } from '@react-native-firebase/auth';
import { HideIcon, ShowIcon } from '../login';
const SignupScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isEmail, setIsEmail] = useState(false);
  const [modalVisible, SetModalVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+91');
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);
  const [agree, setAgree] = useState(false);
  const [show, setShow] = useState(false);

  const emailCheck = () => setIsEmail(previousState => !previousState);

  useEffect(() => {
    // console.log('countryCode----------', CountryCode);
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      iosClientId:
        '856340862276-cn59n0h1dp32ougi0qtu46ja69fusthh.apps.googleusercontent.com',
      webClientId:
        '856340862276-nlr30eh9sqit75mbtpdq1b4gb8ft5ahg.apps.googleusercontent.com',
      //'575348081388-80d0agrtbntfv5h4a2pdpj8h4q6pdsr1.apps.googleusercontent.com',
      //webClientId: '228807374621-vppb5a0in5u601cr7lkin7rsranl1kg7.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    _isSignedIn();
  }, []);

  const _isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      //   alert('User is already signed in');
      // Set User Info if user is already signed in
      _getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
    setGettingLoginStatus(false);
  };

  const _getCurrentUserInfo = async () => {
    try {
      let info = await GoogleSignin.signInSilently();
      console.log('User Info --> ', info);
      setUserInfo(info);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // alert('User has not signed in yet');
        console.log('User has not signed in yet');
      } else {
        // alert("Unable to get user's info");
        console.log("Unable to get user's info");
      }
    }
  };

  const _signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices({
        // Check if device has Google Play Services installed
        // Always resolves to true on iOS
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      setUserInfo(userInfo);
      var raw = JSON.stringify({
        email: userInfo.user.email,
        displayName: userInfo.user.givenName,
        familyName: userInfo.user.familyName,
      });
      setLoader(true);
      Google_SignIn_Api(raw)
        .then(response => {
          if (response.status == 200) {
            setLoader(false);
            console.log('GSresponse====', response);
            AsyncStorage.setItem(
              LoginConstants.USER_DETAIL,
              JSON.stringify(response.data.client),
            );
            let token = response.data.token;
            global.Token = token;
            AsyncStorage.setItem(LoginConstants.TOKEN, response.data.token);
            let following = response.data.follow.toString();
            let community = response.data.community.toString();
            console.log('Counts==============', following, community);
            AsyncStorage.setItem(LoginConstants.FOLLOWING, following);
            AsyncStorage.setItem(LoginConstants.COMMUNITY, community);
            // navigation.replace('TabNavigator')
            if (response.data.showOnboarding == true) {
              navigation.navigate('OnBoardingScreen');
            } else {
              AsyncStorage.setItem(LoginConstants.INTRESTE_ADDED, 'true');
              navigation.replace('TabNavigator');
            }
          }
        })
        .catch(error => {
          setLoader(false);
          console.log('gSignErr=======', error);
        });
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  const onAppleButtonPress = async () => {
    // create login request for apple
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // Note: it appears putting FULL_NAME first is important, see issue #293
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    console.log('Reached1==============', appleAuthRequestResponse);

    const { identityToken, nonce } = appleAuthRequestResponse;
    if (identityToken) {
      const appleCredential = firebase.auth.AppleAuthProvider.credential(
        identityToken,
        nonce,
      );
      console.log('Reached2==============');

      firebase
        .auth()
        .signInWithCredential(appleCredential)
        .then(user => {
          console.log('appleLogin========', user);
          let email = user.additionalUserInfo.profile.email;
          let userName = email.split('@').shift();
          // Succeed fully user logs in
          var raw = JSON.stringify({
            email: email,
            displayName: userName,
            familyName: '',
          });
          setLoader(true);
          Google_SignIn_Api(raw)
            .then(response => {
              if (response.status == 200) {
                setLoader(false);
                console.log('ApSresponse====', response);
                AsyncStorage.setItem(
                  LoginConstants.USER_DETAIL,
                  JSON.stringify(response.data.client),
                );
                let token = response.data.token;
                global.Token = token;
                AsyncStorage.setItem(LoginConstants.TOKEN, response.data.token);
                let following = response.data.follow.toString();
                let community = response.data.community.toString();
                console.log('Counts==============', following, community);
                AsyncStorage.setItem(LoginConstants.FOLLOWING, following);
                AsyncStorage.setItem(LoginConstants.COMMUNITY, community);
                // navigation.replace('TabNavigator')
                if (response.data.showOnboarding == true) {
                  navigation.navigate('OnBoardingScreen');
                } else {
                  AsyncStorage.setItem(LoginConstants.INTRESTE_ADDED, 'true');
                  navigation.replace('TabNavigator');
                }
              }
            })
            .catch(error => {
              setLoader(false);
              console.log('gSignErr=======', error);
            });
        })
        .catch(error => {
          console.log('AppleLogErr=========', error);
          // Something goes wrong
        });
    }
    console.log('Reached3==============');
  };

  const onSelectPhoneCode = code => {
    setCountryCode(code);
    SetModalVisible(false);
  };

  const checkSignupValidation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneRegex = /^\d{10}$/;
    const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
    if (fullName == '') {
      Toaster(SignupConstants.FULLNAME_VALIDATION);
    } else if (email == '') {
      Toaster(SignupConstants.EMAIL_VALIDATION);
    } else if (reg.test(email) === false) {
      Toaster(SignupConstants.VALIDEMAIL_VALIDATION);
    } else if (phoneNumber == '') {
      Toaster(SignupConstants.PHONE_VALIDATION);
    } else if (phoneRegex.test(cleanedPhoneNumber) === false) {
      Toaster('Please Enter Valid Phone No.');
    } else if (password == '') {
      Toaster(SignupConstants.PASSWORD_VALIDATION);
    } else if (!agree) {
      Toaster('Please check terms & condition');
    } else {
      SignUp();
    }
  };

  const SignUp = () => {
    var formdata = new FormData();
    formdata.append('fullName', fullName);
    formdata.append('email', email);
    formdata.append('mobileNumber', phoneNumber);
    formdata.append('password', password);
    formdata.append('isEmail', isEmail);
    setLoader(true);
    Signup_Request(formdata)
      .then(response => {
        console.log('signupResp====', response);
        if (response.status == 200) {
          setLoader(false);
          Toaster(response.message);
          navigation.navigate('LoginScreen');
        } else if (response.error) {
          setLoader(false);
          Toaster(response.error);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log('SignupErr-----', err);
      });
  };

  const toggleSwitch = () => setAgree(previousState => !previousState);

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ marginTop: 16.1, marginLeft: 34 }}>
            <Image
              style={{ height: 37.85, width: 118.28 }}
              source={imagesFile.ic_logo}
            />
          </View>
          <View style={styles.headingViewStyle}>
            <Text style={styles.headingTextStyle}>
              {SignupConstants.SIGNUP_HEADING}
            </Text>
          </View>
          <View style={styles.subHeadingView}></View>
          <View style={{ marginTop: 20 }}>
            <View>
              <InputBox
                placeholder={SignupConstants.FULLNAME_PLACEHOLDER}
                value={fullName}
                onChangeText={text => setFullName(text)}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <InputBox
                placeholder={SignupConstants.EMAIL_PLACEHOLDER}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.DropDownInput_Style}>
              <TouchableOpacity
                style={styles.DropDownBtnStyle}
                onPress={() => SetModalVisible(true)}>
                <Text style={styles.DropDownBtnText}>{countryCode}</Text>
              </TouchableOpacity>
              <TextInput
                style={[styles.textInputStyle, { marginLeft: 4, width: '84%' }]}
                placeholder={SignupConstants.PHONE_NUMBER_PLACEHOLDER}
                placeholderTextColor={Colors.palceHolder_grey}
                value={phoneNumber}
                keyboardType={'number-pad'}
                autoCorrect={false}
                onChangeText={text => setPhoneNumber(text)}
              />
              {/* <DropDown_InputBox
                placeholder={SignupConstants.PHONE_NUMBER_PLACEHOLDER}
                value={phoneNumber}
                onChangeText={text => setPhoneNumber(text)}
              /> */}
            </View>
            <View style={{ marginTop: 15 }}>
              <InputBox
                placeholder={LoginConstants.PASSWORD_PLACEHOLDER}
                secureTextEntry={!show}
                value={password}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                style={styles.newIcon}
                onPress={() => {
                  setShow(!show);
                }}>
                {show ? (
                  <ShowIcon />

                ) : (
                  <HideIcon />

                )}
              </TouchableOpacity>
            </View>
            <View style={styles.forgotPassView}>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://myfitmantra.com/privacy-and-policy',
                    )
                  }>
                  <Text style={styles.medium_12_blue}>Privicy Policy</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                <TouchableOpacity
                  onPress={() =>
                    Linking.openURL(
                      'https://myfitmantra.com/terms-and-conditions',
                    )
                  }>
                  <Text style={styles.medium_12_blue}>Terms & Conditions</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginTop: 10 }}>
                <Text style={styles.keepMeSignInTextStyle}>
                  {SignupConstants.ACCEPT_TERMS}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  alignItems: 'center',
                }}
                onPress={toggleSwitch}>
                <View>
                  <Image
                    source={
                      agree ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot
                    }
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.bold_12_black}>I agree</Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.nextBtnViewStyle}
              onPress={() => checkSignupValidation()}>
              <Text style={styles.nextBtnTextStyle}>
                {SignupConstants.NEXT_BTN}
              </Text>
            </TouchableOpacity>
            {/* ----------------Social Login------------- */}
            <View style={styles.signInViewStyle}>
              <View>
                <Text style={styles.signInWithTextStyle}>
                  {SignupConstants.JOIN_WITH}
                </Text>
              </View>
              <View style={{ marginLeft: 25 }}>
                <TouchableOpacity onPress={() => _signIn()}>
                  <Image source={imagesFile.ic_google} />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={styles.signupBtnViewStyle}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text style={styles.notMemberTextStyle}>
                {SignupConstants.ALREADY_MENBER}
              </Text>
              <Text style={styles.signupTextStyle}>
                {SignupConstants.SIGN_IN}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        {/* {modalVisible ? (
          <CountryCodeModal
            visible={modalVisible}
            cancelModal={() => SetModalVisible(false)}
            onselect={code => onSelectPhoneCode(code)}
          />
        ) : null} */}
        <CountryPicker
          show={modalVisible}
          // disableBackdrop={true}
          onBackdropPress={() => SetModalVisible(false)}
          style={{
            modal: {
              height: '80%',
            },
            textInput: {
              height: 60,
              color: '#000',
              borderRadius: 0,
            },
            countryButtonStyles: {
              height: 50,
            },
            dialCode: {
              color: '#000',
            },
            countryName: {
              color: '#000'
            }
          }} pickerButtonOnPress={(item) => {
            onSelectPhoneCode(item.dial_code);
          }}
        />
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};
export default SignupScreen;
