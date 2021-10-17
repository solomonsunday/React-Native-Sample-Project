import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import Charity from 'src/screens/User/HomeTab/Charity/CharityTab';

import VideoUpload from 'src/screens/User/Common/VideoUpload';

const { Navigator, Screen } = createBottomTabNavigator();

export default function CharityRoute() {
  return (
    <Navigator
      detachInactiveScreens
      tabBar={(props) => <BottomNavigationArea {...props} page="charity" />}
    >
      <Screen name="CharityTab" component={Charity} />
      <Screen name="CartTab" component={Charity} />
      {/* <Screen name="VideoUpload" component={VideoUpload} /> */}
      <Screen name="CategoryTab" component={Charity} />
      <Screen name="ProfileTab" component={Charity} />
    </Navigator>
  );
}
