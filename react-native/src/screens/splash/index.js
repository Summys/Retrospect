/* eslint-disable import/no-unresolved */
import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import NotificationsIOS, {
  NotificationAction,
  NotificationCategory,
} from 'react-native-notifications';
import auth from '../../features/auth';
import app from '../../features/app';

const upvoteAction = new NotificationAction(
  {
    activationMode: 'background',
    title: String.fromCodePoint(0x1f44d),
    identifier: 'UPVOTE_ACTION',
  },
  (action, completed) => {
    NotificationsIOS.log('ACTION RECEIVED');
    NotificationsIOS.log(JSON.stringify(action));

    completed();
  }
);

const replyAction = new NotificationAction({
  activationMode: 'background',
  title: 'Reply',
  behavior: 'textInput',
  authenticationRequired: true,
  identifier: 'REPLY_ACTION',
});

const cat = new NotificationCategory({
  identifier: 'SOME_CATEGORY',
  actions: [upvoteAction, replyAction],
  context: 'default',
});

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered);
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened);
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationOpened);
    NotificationsIOS.requestPermissions([cat]);
    NotificationsIOS.checkPermissions().then(() => {
      NotificationsIOS.consumeBackgroundQueue();
    });
    const userId = await AsyncStorage.getItem('Meteor.userId');
    // const apolloCachePersist = await AsyncStorage.getItem('apollo-cache-persist');
    // const getAllKeys = await AsyncStorage.getAllKeys();
    if (userId) {
      app();
    } else {
      auth();
    }
  }

  componentWillUnmount() {
    NotificationsIOS.removeEventListener(
      'notificationReceivedForeground',
      this.onNotificationOpened
    );
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened);
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered);
    // // NotificationsIOS.resetCategories();
  }

  onPushRegistered = () => {};

  onNotificationOpened = () => {};

  scheduleLocalNotification = () => {
    // console.log('date now', Date.now());
    // for (let i = 1; i <= 64; i += 1) {
    //   console.log('Scheduling local notification', Date.now() + 60 * 1000 * i);
    //   NotificationsIOS.localNotification({
    //     fireDate: new Date(Date.now() + 60 * 1000 * i).toISOString(),
    //     alertBody: `FIRED NOTIF! ${i}`,
    //     alertTitle: 'Local Manual Notification Title',
    //     alertAction: 'Click here to open',
    //     category: 'SOME_CATEGORY',
    //   });
    // }
  };

  render() {
    return (
      <SafeAreaView>
        <TouchableOpacity onPress={this.scheduleLocalNotification}>
          <Text> SplashScreen </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
