import React from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconBackIos, IconClose } from 'src/components/CustomIcons';

export default function BackButton(props) {
  const { navigation, icon, ...otherProps } = props;

  const routeBack = () => navigation.goBack();

  const ICON = {
    close: IconClose,
    back: IconBackIos,
  };

  return (
    <TopNavigationAction
      {...otherProps}
      icon={icon ? ICON[icon] : ICON.back}
      onPress={routeBack}
      accessibilityLiveRegion="polite"
      accessibilityLabel="Go back"
    />
  );
}
