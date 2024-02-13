import React, { useEffect, useRef } from 'react';
import messaging from '@react-native-firebase/messaging';
import { NotifyLocal } from './general';
import PushNotification from 'react-native-push-notification';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const NotificationWrapper = ({ token, sendFcmToken }) => {


  function createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: 'default-channel',
        channelName: 'MyFitMantra',
        channelDescription: 'A default channel',
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`)
    );
  }

  const getFirebaseToken = async callBack => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      callBack && callBack(fcmToken);
    } else {
      Alert.alert('fcmToken');
    }
  };

  const checkNotificationPermission = async callBack => {
    console.log('*********');
    const permission = await messaging().hasPermission();
    console.log('callback******', callBack, permission);

    if (permission == -1) {
      requestForPermission(callBack);
    }
    if (permission == 1) {
      callBack && callBack();
    }
    if (permission == 0) {
      Alert.alert(
        'Notification Permission',
        'You have blocked notification please allow to run the app',
        [
          {
            text: 'Active Permission',
            onPress: () => Linking.openSettings(),
          },
          {
            text: 'Cancel',
            style: 'destructive',
          },
        ],
      );
    }
  };
  const requestForPermission = callBack => {
    messaging()
      .requestPermission()
      .then(permission => {
        if (permission == 1) {
          callBack && callBack();
        } else {
          checkNotificationPermission(callBack);
        }
      });
  };
  const handleDynamicLink = link => {
    if (link) {
      setIsmodal(true);
    }
  };
  const storeFirebaseToken = callBack => {
    checkNotificationPermission(() => {
      getFirebaseToken(callBack);
    });
  };

  const handleNotitificationOpenApp = () => {
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('first----')
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage,
          );
        }
      });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('second----')
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
    });
  };

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    const getTokens = async () => {
      await messaging().registerDeviceForRemoteMessages();
      storeFirebaseToken(token => {
        console.log('fcmToken*********', token);
        AsyncStorage.setItem('@FCM_TOKEN', token)
      });
    };
    getTokens();
    handleNotitificationOpenApp();
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // const onNotif = (notif) => {
    //   console.log("notif", notif);
    //   let route = notif?.data?.screen;
    //   let payload = { key: notif?.data?.key, screen: notif?.data?.screen };
    //   console.log(payload), 'payload';

    //   if (notif) {
    //     switch (route) {
    //       case 'booking':
    //         RootNavigation.navigate('Bookings', payload);
    //         break;
    //       case 'pet':
    //         RootNavigation.navigate('MyPets', payload);
    //         break;
    //       case 'cart':
    //         RootNavigation.navigate('cart', payload);
    //         break;
    //       case 'center':
    //         RootNavigation.navigate('centerdetails', payload.key);
    //         break;
    //       case 'register':
    //         RootNavigation.navigate('BottomTabNav', payload);
    //         break;
    //       default:
    //         if (route !== undefined && route !== null && route !== ':screen') {
    //           RootNavigation.navigate("BottomTabNav", {
    //             [notif.data.param_key]: notif.data.id,
    //           });
    //         } else {
    //           RootNavigation.navigate('BottomTabNav');
    //         }
    //         break;
    //     }
    //   }
    // };
    createDefaultChannels()
    messaging().onMessage(async (remoteMessage) => {
      NotifyLocal(remoteMessage.notification, remoteMessage?.data);
    });
  }, []);

  return null;
}

export default NotificationWrapper
