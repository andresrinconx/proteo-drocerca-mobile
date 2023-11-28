import messaging from '@react-native-firebase/messaging';
import { getDataStorage, setDataStorage } from '../utils/asyncStorage';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // console.log('Authorization status:', authStatus);
  }
};

export const getFCMToken = async () => {
  const fcmToken = await getDataStorage('fcmToken');
  console.log(fcmToken);

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await setDataStorage('fcmToken', fcmToken);
        console.log(fcmToken);
        return fcmToken;
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    return fcmToken;
  }
};

export const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => { // background state
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
  .getInitialNotification()
  .then(remoteMessage => { // quit state
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
    }
  });

  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state...', remoteMessage);
  });
};