import React from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconQuestionMarkCircle } from 'src/components/CustomIcons';

export default function HelpButton(props) {
  const { navigation, icon, ...otherProps } = props;

    const routeHelp = () => navigation.navigate('FAQs');

    return (
      <TopNavigationAction
        {...otherProps}
        icon={IconQuestionMarkCircle}
        onPress={routeHelp}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Open Help"
      />
    );
}
