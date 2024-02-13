
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import * as RootNavigation from '../navigations/RootNavigation';

import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const NotifyLocal = (payload, data = {}) => {
  const title = data?.title;
  const message = data?.message
  // console.log(data, title, message, '------')
  console.log(payload, 'payload', data)
  if (Platform.OS === "ios") {
    const details = {
      id: 'default-channel',
      title: payload?.title,
      body: payload?.body,
      badge: 0,
      repeats: false,
      playSound: true, // (optional) default: true
      soundName: "default",
      repeatsComponent: {},
      sound: "",
      category: "",
      isSilent: false,
      userInfo: data,
    }
    PushNotificationIOS.addNotificationRequest(details)
  } else {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'default-channel',
      autoCancel: true,
      largeIcon: 'ic_launcher',
      smallIcon: 'ic_stat',
      message: message,
      title: title,
      userInfo: data,
      route: data && data.route ? data.route : null,
      booking_token: data && data.booking_token ? data.booking_token : null,
      group_id: data && data.group_id ? data.group_id : null,
      chat_id: data && data.chat_id ? data.chat_id : null,
    });
  }
};

