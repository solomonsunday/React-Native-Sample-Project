import OneSignal from 'react-native-onesignal';

//END OneSignal Init Code
// 5fa5db3c-9280-47b6-a278-9b6c892fc74c
// 7f2e4740-3498-4c48-8925-a8ffe8168c2b
// a06d658b-0df6-45af-977b-ff050fd8e5c6
// 9da241a8-0035-4a0f-85e4-a3b6932b0149

export const oneSignalService = () => {

  //Prompt for push on iOS
  OneSignal.setAppId('a06d658b-0df6-45af-977b-ff050fd8e5c6');
  //OneSignal.promptForPushNotificationsWithUserResponse(response => {
  //  console.log('Prompt response:', response);
  //});

  //OneSignal Init Code
  OneSignal.setLogLevel(6, 0);

  //Method for handling notifications received while app in foreground
  OneSignal.setNotificationWillShowInForegroundHandler(
    notificationReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notificationReceivedEvent,
      );
      let notification = notificationReceivedEvent.getNotification();
      console.log('notification: ', notification);
      const data = notification.additionalData;
      console.log('additionalData: ', data);
      // Complete with null means don't show a notification.
      notificationReceivedEvent.complete(notification);
    },
  );

  //Method for handling notifications opened


//   Method for setting external ID.

};