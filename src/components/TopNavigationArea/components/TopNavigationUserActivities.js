import React, { useContext, useState } from 'react';

import {
  TopNavigationAction,
  OverflowMenu,
  MenuItem,
  Toggle,
} from '@ui-kitten/components';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import {
  IconMoreVertical,
  IconMoon,
  IconEye,
  IconSettings,
  IconCUser,
  IconCUser2,
} from 'src/components/CustomIcons';

export default function TopNavigationUserActivities(props) {
  const { navigation } = props;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const t = useContext(LocaleContext);

  const { appState, appOptions } = useContext(AppSettingsContext);

  const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  const closeMenu = () => setNavigationMenuOpen(false);

  const routeSettingsGlobal = () => navigation.navigate('SettingsGlobal');

  const TopNavigationMenuAnchor = () => (
    <TopNavigationAction
      {...props}
      icon={IconMoreVertical}
      onPress={toggleMenu}
      accessibilityLiveRegion="polite"
      accessibilityLabel="open menu"
    />
  );

  return (
    <OverflowMenu
      anchor={TopNavigationMenuAnchor}
      visible={isNavigationMenuOpen}
      onBackdropPress={closeMenu}
      onTouchEnd={closeMenu}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
      accessibilityLiveRegion="polite"
      accessibilityHint="Options Menu"
      style={{ minWidth: 215 }}
    >
      <MenuItem
        accessoryLeft={IconCUser2}
        title={t('profile')}
        // onPress={routeSettingsGlobal}
      />
      <MenuItem
        accessoryLeft={IconSettings}
        title={t('settings')}
        onPress={routeSettingsGlobal}
      />
    </OverflowMenu>
  );
}
