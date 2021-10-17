import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import MarketPlace from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab';

import Wallet from 'src/screens/User/WalletTab';

import BillPay from 'src/screens/User/BillPayTab';

import Profile from 'src/screens/User/HomeTab/Social/ProfileTab';

import VideoUpload from 'src/screens/User/Common/VideoUpload';

const { Navigator, Screen } = createBottomTabNavigator();

export default function MarketPlaceRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="marketPlace" />}
    >
      <Screen name="MarketPlaceTab" component={MarketPlace} />
      <Screen name="MyWalletTab" component={Wallet} />
      <Screen name="VideoUpload" component={VideoUpload} />
      <Screen name="BillPayTab" component={BillPay} />
      <Screen name="ProfileTab" component={Profile} />

      {/* <Screen name="ProfileTab" component={MarketPlace} /> */}
    </Navigator>
  );
}
 