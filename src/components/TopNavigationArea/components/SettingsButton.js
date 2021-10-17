import React from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconSettings } from 'src/components/CustomIcons';

export default function BackButton(props) {
  const { navigation, icon, ...otherProps } = props;

  const routeSettings = () => navigation.navigate('Settings');

  return (
    <TopNavigationAction
      {...otherProps}
      icon={IconSettings}
      onPress={routeSettings}
      accessibilityLiveRegion="polite"
      accessibilityLabel="Settings"
    />
  );
}
