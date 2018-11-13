import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity, PushNotificationIOS } from 'react-native';
import NotificationsIOS, {
  NotificationAction,
  NotificationCategory,
} from 'react-native-notifications';
// import app from '../../features/app';
// import auth from '../../features/auth';

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

const replyAction = new NotificationAction(
  {
    activationMode: 'background',
    title: 'Reply',
    behavior: 'textInput',
    authenticationRequired: true,
    identifier: 'REPLY_ACTION',
  },
  (action, completed) => {
    console.log('ACTION RECEIVED');
    console.log(action, completed);
  }
);

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

  componentDidMount() {
    NotificationsIOS.addEventListener('remoteNotificationsRegistered', this.onPushRegistered);
    NotificationsIOS.addEventListener('notificationOpened', this.onNotificationOpened);
    NotificationsIOS.addEventListener('notificationReceivedForeground', this.onNotificationOpened);
    NotificationsIOS.requestPermissions([cat]);
    NotificationsIOS.checkPermissions().then(() => {
      NotificationsIOS.consumeBackgroundQueue();
    });
    // auth();
  }

  componentWillUnmount() {
    NotificationsIOS.removeEventListener(
      'notificationReceivedForeground',
      this.onNotificationOpened
    );
    NotificationsIOS.removeEventListener('notificationOpened', this.onNotificationOpened);
    NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered);
    // NotificationsIOS.resetCategories();
  }

  onPushRegistered = deviceToken => {
    console.log(`Device Token Received: ${deviceToken}`);
  };

  onNotificationOpened = notification => {
    console.log(`Notification Received Foreground: ${JSON.stringify(notification)}`);
    NotificationsIOS.localNotification({
      alertBody: 'Received background notificiation!',
      alertTitle: 'Local Notification Title',
      alertAction: 'Click here to open',
      category: 'SOME_CATEGORY',
      userInfo: notification.getData(),
    });
  };

  scheduleLocalNotification = () => {
    console.log('date now', Date.now());
    for (let i = 1; i <= 64; i += 1) {
      console.log('Scheduling local notification', Date.now() + 60 * 1000 * i);
      NotificationsIOS.localNotification({
        fireDate: new Date(Date.now() + 60 * 1000 * i).toISOString(),
        alertBody: `FIRED NOTIF! ${i}`,
        alertTitle: 'Local Manual Notification Title',
        alertAction: 'Click here to open',
        category: 'SOME_CATEGORY',
      });
    }
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
