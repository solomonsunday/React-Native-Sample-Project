import React from 'react';

import { TopNavigationAction } from '@ui-kitten/components';

import { IconBackIos, IconClose } from 'src/components/CustomIcons';

import {
  GeneralTextField,
  GeneralDatePicker,
  GeneralRadioGroup,
  GeneralSelect,
} from 'src/components/FormFields';

import { EvilIcons, Ionicons } from '@expo/vector-icons';

import { IconCalendar } from 'src/components/CustomIcons';

export default function Calendar(props) {
  const { navigation, icon, ...otherProps } = props;

  const RenderCalendar = () => {
    return <Ionicons name="calendar" size={26} color="white" />;
  };

  return (
    <TopNavigationAction
      {...otherProps}
      icon={<RenderCalendar />}
      //   onPress={routeBack}
      accessibilityLiveRegion="polite"
      accessibilityLabel="Go back"
    />
  );
}
