import 'react-native-gesture-handler';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ActivityIndicator,
  LogBox,
  Alert,
  Linking,
  StyleSheet,
  Dimensions,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from './src/screens/auth/authConstants';
import { MenuProvider } from 'react-native-popup-menu';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import PaymenetSuccessModal from './src/screens/modals/PaymenetSuccessModal';

import uuid from 'react-native-uuid';
import RNCallKeep from 'react-native-callkeep';
import { PermissionsAndroid } from 'react-native';
import {
  Bounce,
  CircleFade,
  Grid,
  Plane,
  Pulse,
  Swing,
  Wander,
} from 'react-native-animated-spinkit';
import { SafeAreaView } from 'react-native';
import NotificationWrapper from './src/notifications/notification';
LogBox.ignoreAllLogs();
let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

const App = () => {
  const [isloogedIn, setIsLoggedIn] = useState(false);
  const [isModal, setIsmodal] = useState(false);

  // useEffect(() => {
  //   setupVideoSDKEngine();
  //   RNCallKeep.addEventListener('answerCall', ({callUUID}) => {
  //     RNCallKeep.endCall(callUUID);
  //    RNCallKeep.backToForeground()
  //       onStartVideoCall();
  //   });
  //   RNCallKeep.addEventListener('endCall', ({callUUID}) => {
  //     console.log('End Call', callUUID);
  //   });
  //   return () => {
  //     RNCallKeep.removeEventListener('answerCall');
  //     RNCallKeep.removeEventListener('endCall');
  //   };

  //   const callIncoming = async () => {
  //     if (Platform.OS === 'android') {
  //       const payload = await IncomingCall.getExtrasFromHeadlessMode();
  //       console.log('launchParameters', payload);
  //       if (payload) {
  //         onStartVideoCall();
  //       }
  //       DeviceEventEmitter.addListener('endCall', payload => {});
  //       DeviceEventEmitter.addListener('answerCall', payload => {
  //         IncomingCall.backToForeground();
  //         onStartVideoCall();
  //       });
  //     }
  //   };
  //   callIncoming();
  // }, []);

  useEffect(() => {
    if (isModal == true) {
      setTimeout(() => {
        setIsmodal(false);
      }, 3000);
    }
  }, [isModal]);

  useEffect(() => {
    AsyncStorage.getItem(LoginConstants.INTRESTE_ADDED).then(value => {
      console.log('intrested========', value);
      if (value) {
        console.log('intrestedValue=====', value);
        global.isIntrestAdded = true;
      }
    });

    AsyncStorage.getItem(LoginConstants.USER_DETAIL).then(value => {
      if (value) {
        console.log('asyncVal-------', value);
        global.isSession = true;
      }
      setIsLoggedIn(true);
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);


  // Work on agora SDK
  const appId = '494af307ab284247920739893e3f627c';
  const channelName = 'ChannelTest';
  // const agoraEngineRef = useRef < IRtcEngine > {};
  const [loading, setLoading] = useState(false);
  const [videoCall, setVideoCall] = useState(false);
  const [connectData, setConnectionData] = useState({});


  const setupVideoSDKEngine = async () => {
    try {
      if (Platform.OS === 'android') {
        await getPermission();
        const options = {
          ios: {
            appName: 'VideoSDK',
          },
          android: {
            alertTitle: 'Permissions required',
            alertDescription:
              'This application needs to access your phone accounts',
            cancelButton: 'Cancel',
            okButton: 'ok',
            imageName: 'phone_account_icon',
          },
        };

        try {
          RNCallKeep.setup(options);
          Platform.OS === 'android' && RNCallKeep.setAvailable(false);
        } catch (err) {
          console.error('initializeCallKeep error:', err.message);
        }
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine?.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine?.initialize({
        appId: appId,
        channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      });
      agoraEngine?.enableVideo();
    } catch (e) {
      console.log(e);
    }
  };

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA,
      ]);
    }
  };
  const callbacks = {
    EndCall: () => setVideoCall(false),
  };

  const onStartVideoCall = () => {
    setLoading(true);

    fetch(
      `https://video-call-backend.onrender.com/access_token/rtc?channelName=${channelName}`,
    )
      .then(response => response.json())
      .then(response => {
        fetch(`https://video-call-backend.onrender.com/access_token/rtm`)
          .then(response => response.json())
          .then(res => {
            console.log('response', res, response);
            let connectionData = {
              appId: '494af307ab284247920739893e3f627c',
              channel: 'ChannelTest',
              username: 'shubham',
              rtcToken: response?.rtctoken,
              rtmToken: res?.rtmtoken,
            };
            setConnectionData(connectionData);
            setLoading(false);
            setVideoCall(true);
          });
      });
  };
  return (
    <>
      <MenuProvider>
        {/* <GestureHandlerRootView style={{flex:1}}> */}
        {videoCall ? (
          <SafeAreaView style={{ flex: 1 }}>
            <AgoraUIKit
              styleProps={styles.styleProps}
              connectionData={connectData}
              rtcCallbacks={callbacks}
            />
          </SafeAreaView>
        ) : loading ? (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignSelf: 'center' }}>
              <Swing size={55} color="#000000" />
            </View>
          </View>
        ) : (
          <NavigationContainer>
            <NotificationWrapper />
            {isloogedIn ? <RootNavigation /> : null}
          </NavigationContainer>
        )}

        {/* </GestureHandlerRootView> */}
      </MenuProvider>
      <PaymenetSuccessModal
        visible={isModal}
        onCancel={() => setIsmodal(false)}
      />
    </>
  );
};
const styles = StyleSheet.create({
  styleProps: {
    UIKitContainer: {
      flex: 1,
    },

    localBtnStyles: {
      switchCamera: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginTop: -8,
      },
      endCall: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginTop: -8,
      },
      muteLocalVideo: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginTop: -8,
      },
      muteLocalAudio: {
        backgroundColor: '#000000',
        borderColor: '#000000',
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        marginTop: -8,
      },
    },
    localBtnContainer: {
      borderWidth: 1,
      borderRadius: 10,
      height: 110,
      bottom: 20,
      backgroundColor: 'rgba(0,0,0,.5)',
    },

    videoPlaceholderContainer: {
      height: 160,
      width: 125,
      borderRadius: 10,
      alignSelf: 'center',
    },
    minViewStyles: {
      height: 160,
      width: 125,
    },
    maxViewStyles: {
      flexGrow: 1,
    },
    minViewContainer: {
      marginTop: 30,
      marginLeft: 5,
    },
  },
  button: {
    paddingHorizontal: 25,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#0055cc',
    margin: 5,
  },
  main: { flex: 1, alignItems: 'center' },
  scroll: { flex: 1, backgroundColor: '#ddeeff', width: '100%' },
  scrollContainer: { alignItems: 'center' },
  videoView: { width: '90%', height: 200 },
  btnContainer: { flexDirection: 'row', justifyContent: 'center' },
  head: { fontSize: 20 },
  info: { backgroundColor: '#ffffe0', color: '#0000ff' },
});

export default App;
