import React from "react";
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";
//Redux
import { connect } from 'react-redux';
import { deviceToken } from '../Redux/Actions/Actions';
import { bindActionCreators } from 'redux';

const HandleNotifications = (props) => {
    React.useEffect(() => {
        checkApplicationPermission();

        PushNotification.configure({
            onRegister: function (token) {
                // console.log("TOKEN:", token);
            },
            onNotification: function (notification) {
            // process the notification
                notification.finish(PushNotificationIOS.FetchResult.NoData);
            },
            onRegistrationError: function(err) {
                console.error(err.message, err);
            },
            permissions: {
            alert: true,
            badge: true,
            sound: true,
            },
            popInitialNotification: true,
            requestPermissions: true,
        });
        // Create the channel
        PushNotification.createChannel(
            {
              channelId: "reminder-channel", // (required)
              channelName: "Reminder", // (required)
              channelDescription: "A channel to for providing reminder to users.", // (optional) default: undefined.
              soundName: "sample.mp3", // (optional) See `soundName` parameter of `localNotification` function
              importance: 4, // (optional) default: 4. Int value of the Android notification importance
              vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );

        // Get the device token
        messaging().getToken().then(token => {
            props.deviceToken(token);
        });
      
        // Register background handler outside of application logic 
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });
      
        //Subscribing to a topic
        messaging().subscribeToTopic('notification').then(() => console.log('Subscribed to topic!'));
      
        //When user opens the app through notification
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });
            
        // Check whether an initial notification is available
        messaging().getInitialNotification().then(remoteMessage => {
            if (remoteMessage) {
                console.log('Notification caused app to open from quit state:',remoteMessage.notification,);
                // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
            }
        });
      
        messaging().onMessage(async remoteMessage => {
            console.log('A new FCM message arrived!', remoteMessage);
            PushNotification.localNotification({
                channelId: "reminder-channel", // (required)
                channelName: "Reminder", // (required)
                title: remoteMessage.notification.title,
                message: remoteMessage.notification.body,
                largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
                smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
                data: remoteMessage.data.type,
                autoCancel: true,
                priority: "high",
                importance: "high",
                playSound: true,
                soundName: "default",
                vibrate: true, // (optional) default: true
                vibration: 300, 
            });
        })
      
       
    }, []);

    const checkApplicationPermission = async () => {
        const authorizationStatus = await messaging().requestPermission();
      
        if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
          console.log('User has notification permissions enabled.');
        } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
          console.log('User has provisional notification permissions.');
        } else {
          console.log('User has notification permissions disabled');
        }
        await messaging().requestPermission({
            provisional: true,
        });
    }
        
    return null;
}

const mapStateToProps = state => {
    
    return {
        device_token: state.device_token
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        deviceToken: bindActionCreators(deviceToken, dispatch)
    };
}
  
export default connect(mapStateToProps,mapDispatchToProps)(HandleNotifications);