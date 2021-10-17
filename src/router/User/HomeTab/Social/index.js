import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomNavigationArea from 'src/components/BottomNavigationArea';

// Screens
import Social from 'src/screens/User/HomeTab/Social/SocialTab';
import Wooz from 'src/screens/User/HomeTab/Social/WoozTab';
import Profile from 'src/screens/User/HomeTab/Social/ProfileTab';
import Explore from '../../../../screens/User/Common/Movies/index';

import VideoUpload from 'src/screens/User/Common/VideoUpload';

// Routes
import Challenge from './Challenge';
import { Root } from 'native-base';

const { Navigator, Screen } = createBottomTabNavigator();

export default function SocialRoute() {
  return (
    <Root>
      <Navigator
        detachInactiveScreens
        tabBar={(props) => <BottomNavigationArea {...props} page="social" />}
      >
        <Screen name="SocialTab" component={Social} />
        <Screen name="Movies" component={Explore} />
        <Screen name="VideoUpload" component={VideoUpload} />
        <Screen name="ChallengeTab" component={Challenge} />
        <Screen name="ProfileTab" component={Profile} />
      </Navigator>
    </Root>
  );
}
