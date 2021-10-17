import React, { useContext, useState } from 'react';

import {
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import {
  IconCReorderLeft,
  IconCMarket,
  IconCSocial,
  IconCHome,
  IconCCharity,
} from 'src/components/CustomIcons';

export default function TopNavigationGlobalMenu(props) {
  const { navigation, selected } = props;

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const ICON_THEME = appState.darkMode ? '#FFFFFF' : '#0A143F';

  const [isNavigationMenuOpen, setNavigationMenuOpen] = useState(false);

  const openMenu = () => {
    setNavigationMenuOpen(true);
  };

  const closeMenu = () => {
    setNavigationMenuOpen(false);
  };

  const routeHome = () => navigation.replace('UserRoute');

  const routeSocial = () => navigation.replace('SocialRoute');

  const routeMarketPlace = () => navigation.replace('MarketPlaceRoute');

  const routeCharity = () => navigation.replace('CharityRoute');

  const NavigationAnchor = () => (
    <TopNavigationAction
      {...props}
      icon={IconCReorderLeft}
      onPress={openMenu}
      accessibilityLiveRegion="polite"
      accessibilityLabel="open menu"
    />
  );

  return (
    <OverflowMenu
      anchor={NavigationAnchor}
      visible={isNavigationMenuOpen}
      onBackdropPress={closeMenu}
      onTouchEnd={closeMenu}
      backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      accessibilityLiveRegion="polite"
      accessibilityHint="Extras"
    >
      {/* <MenuItem
        selected={selected === 'marketPlace'}
        accessoryLeft={() => (
          <IconCMarket
            style={{ height: 20, width: 20, tintColor: ICON_THEME }}
          />
        )}
        title={t('marketplace')}
        onPress={routeMarketPlace}
      />
      <MenuItem
        selected={selected === 'charity'}
        accessoryLeft={() => (
          <IconCCharity
            style={{ height: 20, width: 20, tintColor: ICON_THEME }}
          />
        )}
        title={t('charity')}
        onPress={routeCharity}
      /> */}
      <MenuItem
        selected={selected === 'social'}
        accessoryLeft={() => (
          <IconCSocial
            style={{ height: 20, width: 20, tintColor: ICON_THEME }}
          />
        )}
        title={t('social')}
        onPress={routeSocial}
      />
      <MenuItem
        accessoryLeft={() => (
          <IconCHome style={{ height: 20, width: 20, tintColor: ICON_THEME }} />
        )}
        title={t('home')}
        onPress={routeHome}
      />
    </OverflowMenu>
  );
}
