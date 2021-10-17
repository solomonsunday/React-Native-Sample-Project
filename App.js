import 'react-native-gesture-handler';

import React, { Component, useState, useEffect } from 'react';

import { Dimensions, Linking, Alert } from 'react-native';

import { enableScreens } from 'react-native-screens';

import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// import { VESDK } from 'react-native-videoeditorsdk';

import { QueryClientProvider, QueryClient } from 'react-query';

import * as SplashScreen from 'expo-splash-screen';

import { StatusBar } from 'expo-status-bar';

import * as ScreenOrientation from 'expo-screen-orientation';

import Constants from 'expo-constants';

import * as eva from '@eva-design/eva';

import { EvaIconsPack } from '@ui-kitten/eva-icons';

import {
  ApplicationProvider,
  IconRegistry,
  Layout,
} from '@ui-kitten/components';

import i18n from 'i18n-js';

import AssetIconsPack from 'src/components/IconPacks/AssetIcon';

import mapping from 'src/constants/mapping.json';

import customTheme from 'src/constants/customTheme.json';

import mappingTheme from 'src/constants/mappingTheme';

import usePreFetchResources from 'src/hooks/usePreFetchResources';

import {
  AppSettingsContext,
  AuthContext,
  LoadingContext,
  LocaleContext,
} from 'src/contexts';

import useAppSettings from 'src/reducers/useAppSettings';

import useAuth from 'src/reducers/useAuth';

import Router from 'src/router';

import firebase from '@react-native-firebase/app';
import OneSignal from 'react-native-onesignal';

// import firestore from '@react-native-firebase/firestore';

import en from 'src/translations/en.json';
import fr from 'src/translations/fr.json';
import { Platform } from 'react-native';
import { oneSignalService } from './src/utilities/oneSignal';
// import { getUserLocation, requestLocationPermission } from './src/utilities/locationPermission';

enableScreens();

i18n.translations = { en, fr };

i18n.fallbacks = true;

// let VESDKLicense = null;

// one signal

// OneSignal.setLogLevel(6, 0);
// OneSignal.setAppId('7f2e4740-3498-4c48-8925-a8ffe8168c2b');
// // END OneSignal Init Code

// // Prompt for push on iOS

// // Method for handling notifications received while app in foreground
// OneSignal.setNotificationWillShowInForegroundHandler(
//   (notificationReceivedEvent) => {
//     console.log(
//       'OneSignal: notification will show in foreground:',
//       notificationReceivedEvent,
//     );
//     let notification = notificationReceivedEvent.getNotification();
//     console.log('notification: ', notification);
//     const data = notification.additionalData;
//     console.log('additionalData: ', data);
//     // Complete with null means don't show a notification.
//     notificationReceivedEvent.complete(notification);
//   },
// );

// //Method for handling notifications opened
// OneSignal.setNotificationOpenedHandler((notification) => {
//   console.log('OneSignal: notification opened:', notification);
// });

// if (Constants.platform.android) {
//   VESDKLicense = require('src/constants/vesdk_android_license.json');
// } else if (Constants.platform.ios) {
//   VESDKLicense = require('src/constants/vesdk_ios_license.json');
// }

// VESDK.unlockWithLicense(VESDKLicense);
const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

export default function App() {
  oneSignalService();
  SplashScreen.preventAutoHideAsync()
    .then(() => {})
    .catch(() => {});

  const isPreloaded = usePreFetchResources();

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  // console.log('height=', height, 'width=', width);

  const { appState, appOptions } = useAppSettings();

  const { authState, authOptions } = useAuth();

  const { fetchSettings } = appOptions;

  const { fetchToken } = authOptions;

  const [isLoading, setLoading] = useState(true);

  const [errorMsg, setErrorMsg] = useState({
    settings: null,
    auth: null,
    general: null,
  });

  const queryClient = new QueryClient();

  const firebaseConfig = {
    apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
    authDomain: 'woozeee-d7f6c.firebaseapp.com',
    databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
    projectId: 'woozeee-d7f6c',
    storageBucket: 'woozeee-d7f6c.appspot.com',
    messagingSenderId: '979696525592',
    appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
    measurementId: 'G-XQKMT94R9R',
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  useEffect(() => {
    (async () => {
      // OneSignal.addEventListener('opened', () => console.log(" opening here"));
      // const isIOS = Platform.OS === 'ios';
      // // const granted = await requestLocationPermission(isIOS);
      // if ((isIOS && granted) || !isIOS) {
      
      //   const location = getUserLocation();
      //   console.log("user location", location)
      // } else {
      //   Alert.alert(
      //     "It's important to grant permission.",
      //     'Please grant location permission to woozeee to enjoy more from us. Enable the permission in your settings',
      //     [{text: 'Go to Settings', onPress: openSetting}],
      //   );
      // }
      const deviceState = await OneSignal.getDeviceState();
      if (deviceState.isSubscribed === false) {
        OneSignal.promptForPushNotificationsWithUserResponse((response) => {
          console.log('user Response', response);
        });
      }
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP,
        );

        const settingsError = await fetchSettings();

        const authError = await fetchToken();

        if (settingsError || authError) {
          setErrorMsg((prevState) => ({
            ...prevState,
            settings: settingsError,
            auth: authError,
          }));
        }
      } catch (e) {
        setErrorMsg((prevState) => ({ ...prevState, general: e }));
      } finally {
        setLoading(false);
      }
    })();
  }, [fetchSettings, fetchToken]);

  i18n.locale = appState.locale || 'en';

  const t = (scope) => i18n.t(scope);

  const themeMode = appState.darkMode ? 'dark' : 'light';

  return isPreloaded ? (
    <SafeAreaProvider>
      <IconRegistry icons={[EvaIconsPack, AssetIconsPack]} />
      <ApplicationProvider
        {...eva}
        theme={{
          ...eva[themeMode],
          ...customTheme,
          ...mappingTheme[themeMode],
        }}
        customMapping={mapping}
      >
        <AppSettingsContext.Provider
          value={{
            appState,
            appOptions,
          }}
        >
          <AuthContext.Provider
            value={{
              authState,
              authOptions,
            }}
          >
            <LocaleContext.Provider value={t}>
              <QueryClientProvider client={queryClient}>
                <LoadingContext.Provider value={{ isLoading, setLoading }}>
                  <Layout
                    level="5"
                    style={{
                      flex: 1,
                      // alignItems: 'center',
                      // justifyContent: 'center',
                    }}
                  >
                    <SafeAreaView
                      style={{
                        flex: 1,
                        // width: width > 720 ? 720 : width,
                        // backgroundColor: 'red'
                      }}
                    >
                      <Router />
                    </SafeAreaView>
                  </Layout>
                </LoadingContext.Provider>
              </QueryClientProvider>
            </LocaleContext.Provider>
          </AuthContext.Provider>
        </AppSettingsContext.Provider>
      </ApplicationProvider>
      <StatusBar
        barStyle="auto"
        style={themeMode === 'light' ? 'dark' : 'light'}
      />
    </SafeAreaProvider>
  ) : null;
}
