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
} from 'src/components/CustomIcons';

export default function TopNavigationUserMenu(props) {
  const { balanceVisible, toggleBalance, navigation } = props;

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  // const { authOptions } = useContext(AuthContext);

  // const { logout } = authOptions;

  // const { setLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const { appState, appOptions } = useContext(AppSettingsContext);

  const { darkMode } = appState;

  const { updateSettings } = appOptions;

  // const [isLoading, setLoading] = useState(false);

  const [isError, setError] = useState(false);

  const toggleMenu = () => setNavigationMenuOpen((prevState) => !prevState);

  const closeMenu = () => setNavigationMenuOpen(false);

  // const handleLogout = async () => {
  //   try {
  //     closeMenu();
  //     setLoading(true);
  //     await logout();
  //   } catch (e) {
  //     const err = e;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const changeAppSettings = async (option) => {
    try {
      // setLoading(true);
      const settingsError = await updateSettings({
        ...option,
      });

      if (settingsError) {
        setError(true);
      }
    } catch (e) {
      setError(true);
    } finally {
      // setLoading(false);
    }
  };

  const handleSwitchTheme = async () => {
    await changeAppSettings({ darkMode: !darkMode });
  };

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
        accessoryLeft={IconSettings}
        title={t('settings')}
        onPress={routeSettingsGlobal}
      />
      <MenuItem
        accessoryLeft={IconMoon}
        title={t('darkMode')}
        accessoryRight={() => (
          <Toggle checked={darkMode} onChange={handleSwitchTheme} />
        )}
      />
      <MenuItem
        accessoryLeft={IconEye}
        title={t('hideBalance')}
        accessoryRight={() => (
          <Toggle checked={!balanceVisible} onChange={toggleBalance} />
        )}
      />
    </OverflowMenu>
  );
}
