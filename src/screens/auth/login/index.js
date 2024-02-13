import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
} from 'react-native';
import imagesFile from '../../../../assets/imagesFile';
import { LoginConstants } from '../authConstants';
import InputBox from '../../commonComponents/InputBox';
import { Colors, Fonts } from '../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Login_Request, Google_SignIn_Api } from '../../../apiManager/auth/index';
import { styles } from './loginStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SingleButton from '../../commonComponents/SingleButton';
import Toast from 'react-native-simple-toast';
import SimpleToast from 'react-native-simple-toast';
import { Toaster } from '../../commonComponents/Toaster';
import MyStatusBar from '../../commonComponents/MyStatusBar';
import Loader from '../../commonComponents/Loader';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { firebase } from '@react-native-firebase/auth';
import { Path, Svg } from 'react-native-svg';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [show, setShow] = useState(false);
  const [gettingLoginStatus, setGettingLoginStatus] = useState(true);

  useEffect(() => {
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
      // alert('User is already signed in');
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

  const AuthValidation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      Toaster(LoginConstants.EMAIL_VALIDATION);
    } else if (reg.test(email) === false) {
      Toaster(LoginConstants.VALIDEMAIL_VALIDATION);
    } else if (password == '') {
      Toaster(LoginConstants.PASSWORD_VALIDATION);
    } else {
      loginAuth();
    }
  };

  const loginAuth = () => {
    setLoader(true);
    Login_Request(email, password)
      .then(response => {
        console.log('LoginResposne=======', response);
        // navigation.navigate('OnBoardingScreen')
        if (response.status == 200) {
          setLoader(false);
          // Toaster(response.message)
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

          if (response.data.showOnboarding == true) {
            navigation.navigate('OnBoardingScreen');
          } else {
            AsyncStorage.setItem(LoginConstants.INTRESTE_ADDED, 'true');
            navigation.replace('TabNavigator');
          }
        } else if (response.error) {
          setLoader(false);
          Toaster(response.error);
        } else {
          Toaster(response.message);
          setLoader(false);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log('LoginErr=======', err);
      });
  };
  const _signOut = async () => {
    setGettingLoginStatus(true);
    // Remove user session from the device.
    try {
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
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      // Removing user Info
      setUserInfo(null);
    } catch (error) {
      console.error(error);
    }
    setGettingLoginStatus(false);
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 16.1, marginLeft: 34 }}>
            <Image
              style={{ height: 37.85, width: 118.28 }}
              source={imagesFile.ic_logo}
            />
          </View>
          <View style={styles.headingViewStyle}>
            <Text style={styles.headingTextStyle}>
              {LoginConstants.LOGIN_HEADING}
            </Text>
          </View>
          <View style={styles.subHeadingView}></View>
          <View style={{ marginTop: 20 }}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInputStyle}
                placeholder={LoginConstants.EMAIL_PLACEHOLDER}
                placeholderTextColor={Colors.palceHolder_grey}
                value={email}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setEmail(text)}
                secureTextEntry={false}
              />
            </View>
            <View style={{ marginTop: 15 }}>
              <View style={styles.inputView}>
                <TextInput
                  style={styles.textInputStyle}
                  placeholder={LoginConstants.PASSWORD_PLACEHOLDER}
                  placeholderTextColor={Colors.palceHolder_grey}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={!show}
                />
              </View>

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
              <View style={{ flex: 1 }}></View>
              <TouchableOpacity
                style={{ padding: 5 }}
                onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                <Text style={styles.keepMeSignInTextStyle}>
                  {LoginConstants.FORGOTTEN_PASSWORD}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20 }}>
              <SingleButton
                name={LoginConstants.NEXT_BTN}
                onPress={() => AuthValidation()}
              />
            </View>

            <View style={styles.signInViewStyle}>
              <View>
                <Text style={styles.signInWithTextStyle}>
                  {LoginConstants.ORSIGNIN_WITH}
                </Text>
              </View>
              <View style={{ marginLeft: 25 }}>
                <TouchableOpacity onPress={() => _signIn()}>
                  <Image source={imagesFile.ic_google} />
                </TouchableOpacity>
              </View>
              <View style={{ marginLeft: 16 }}></View>
            </View>

            <TouchableOpacity
              style={styles.signupBtnViewStyle}
              onPress={() => navigation.navigate('SignupScreen')}>
              <Text style={styles.notMemberTextStyle}>
                {LoginConstants.NOT_A_MEMBER}
              </Text>
              <Text style={styles.signupTextStyle}>
                {LoginConstants.SIGN_UP}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};
export default LoginScreen;


export const HideIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 32 32"
    >
      <Path d="M25 5.5c-.9 1.1-2.5 1.3-6.5.9-6.4-.8-13.2 2-16.5 6.7-2 2.7-2 3-.4 5.4.9 1.4 2.6 3 3.6 3.6 1.9 1 1.9 1.1.2 3-.9 1-1.4 2.2-1 2.6C5.1 28.4 28 6.2 28 4.8c0-1.3-1.7-.9-3 .7zm-5 4c-.3.5-1.7.9-3.2.7-3.8-.4-7.2 3.1-6.4 6.8.8 4.2-1.4 5.6-4.8 2.9-4.3-3.4-3.2-6.5 3.9-10.3 3.2-1.7 11.3-1.8 10.5-.1zm-4.6 5.6c-2.3 2.4-3 2.7-3.2 1.4-.5-2.2 1.6-4.5 4.1-4.5 1.9 0 1.8.2-.9 3.1zM26 10.9c0 .5.7 1.4 1.5 2.1.8.7 1.5 2 1.5 3 0 3.4-7.7 8-13.5 8-1.9 0-3.5.4-3.5 1 0 1.7 7.2 1.1 11.7-1.1 2.3-1.1 5.2-3.4 6.4-5l2-2.9-2.1-3c-2.1-2.9-4-3.9-4-2.1z" />
      <Path d="M18.2 18.6C16 20.9 15.4 22 16.5 22c1.9 0 5.5-3.5 5.5-5.5 0-1.9.1-2-3.8 2.1z" />
    </Svg>
  )
}
export const ShowIcon = () => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 32 32"
    >
      <Path d="M9.5 7.4C6.3 8.8 1 14.3 1 16.2c0 .6 1.7 2.7 3.8 4.8 6.6 6.6 15.8 6.6 22.4 0 2.1-2.1 3.8-4.2 3.8-4.8 0-2-5.4-7.5-8.7-8.8-4-1.7-8.9-1.7-12.8 0zm13 2.2c4.8 2.2 6.9 5.7 5.3 8.5-1.7 2.8-8 5.9-11.9 5.9-4.1 0-9.4-2.6-11.4-5.6-1.4-2.2-1.4-2.6 0-4.8 3.4-5.2 11.7-7 18-4z" />
      <Path d="M12 12c-1.1 1.1-2 2.9-2 4 0 2.6 3.4 6 6 6s6-3.4 6-6c0-1.1-.9-2.9-2-4s-2.9-2-4-2-2.9.9-4 2zm7 1.5c2.6 3.2-1.3 8.1-4.7 5.9-2.3-1.4-2.8-4.1-1.3-5.9 1.6-1.9 4.4-1.9 6 0z" />
    </Svg>
  )
}