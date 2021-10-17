import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Challenge from 'src/screens/User/HomeTab/Social/ChallengeTab';

import ChallengeWooz from 'src/screens/User/HomeTab/Social/ChallengeTab/ChallengeWooz';

import ExploreWooz from 'src/screens/User/HomeTab/Social/ChallengeTab/ExploreWooz/ExploreWooz';

const { Navigator, Screen } = createStackNavigator();

export default function ChallengeRoute() {
  return (
    <Navigator headerMode="none" detachInactiveScreens>
      <Screen name="Challenge" component={Challenge} />
      <Screen name="ChallengeWooz" component={ChallengeWooz} />
      <Screen name="ExploreWooz" component={ExploreWooz} />
    </Navigator>
  );
}
