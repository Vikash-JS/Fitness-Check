/**
 * @format
 */

import {
  AppRegistry,
  DeviceEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import uuid from 'react-native-uuid';
import { firebase } from '@react-native-firebase/auth';


// firebase.initializeApp()

// messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in the background!', remoteMessage);
  // if (remoteMessage?.data?.type === 'INCOMING_CALL') {
  //   let callUUID = uuid.v4();
  //   IncomingCall.display(
  //     callUUID,
  //     remoteMessage?.data?.trainer,
  //     'https://myfitmantra.s3.ap-south-1.amazonaws.com/e919a675-0480-4724-825d-84d6c341f6f5.png', // Avatar URL
  //     'Incomming Call',
  //     45000,
  //   );
  // } else if (remoteMessage?.data?.type === 'DISCONNECT') {
  //   IncomingCall.dismiss();
  // }

  // DeviceEventEmitter.addListener('endCall', payload => {});
  // DeviceEventEmitter.addListener('answerCall', payload => {
  //   console.log('answerCall', payload);
  //   if (payload.isHeadless) {
  //     IncomingCall.openAppFromHeadlessMode(payload.uuid);
  //   } else {
  //     IncomingCall.backToForeground();
  //   }
  // });
// })





AppRegistry.registerComponent(appName, () => App);
