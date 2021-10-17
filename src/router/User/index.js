import React, { useEffect } from 'react';

import { Alert, Platform, BackHandler } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

import Home from 'src/screens/User/HomeTab';

import Wallet from 'src/screens/User/WalletTab';

import Activities from 'src/screens/User/Activities';

import BillPay from 'src/screens/User/BillPayTab';

const { Navigator, Screen } = createBottomTabNavigator();

export default function UserRoute() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'YES', onPress: () => BackHandler.exitApp() },
      ]);

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="user" />}
    >
      <Screen name="HomeTab" component={Home} />
      <Screen name="MyWalletTab" component={Wallet} />
      <Screen name="BillPayTab" component={BillPay} />
      <Screen name="MyActivitiesTab" component={Activities} />
    </Navigator>
  );
}
