import React, { useContext, useMemo, useCallback } from 'react';

import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Divider,
} from '@ui-kitten/components';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import SocialUpload from 'src/components/BottomNavigationArea/SocialUpload';
import MarketUpload from 'src/components/BottomNavigationArea/MarketUpload';
import CharityUpload from 'src/components/BottomNavigationArea/CharityUpload';

import {
  IconCHome,
  IconCWallet,
  IconCList,
  IconCClock,
  IconCUser,
  IconCWooz,
  IconCSocial,
  IconCCup,
  IconCMarket,
  IconCCart,
  IconCGrid,
  IconCUser2,
  IconCCharity,
  IconCCampaign,
  IconCHero,
  IconGrid,
  IconSettings,
  IconClipboard,
  IconCMovie,
} from '../CustomIcons';

// Screens
const screens = {
  user: {
    home: IconCHome,
    wallet: IconCWallet,
    billPay: IconCList,
    activities: IconCClock,
  },
  social: {
    social: IconCSocial,
    movies: IconCMovie,
    upload: SocialUpload,
    challenge: IconCCup,
    profile: IconCUser,
  },
  marketPlace: {
    market: IconCMarket,
    wallet: IconCWallet,
    upload: MarketUpload, //change component to scan component
    billPay: IconCList,
    profile: IconCUser,
  },
  askADoc: {
    home: IconCHome,
    appointments: IconCWallet,
    // healthBlog: IconCWallet,
  },
  moneyMatters: {
    moneyMatters: IconCHome,
    history: IconClipboard,
    // manage: IconSettings,
  },
  charity: {
    charity: IconCCharity,
    campaigns: IconCCampaign,
    upload: CharityUpload,
    heroes: IconCHero,
    profile: IconCUser,
  },
};

export default function BottomNavigationArea(props) {
  // prettier-ignore
  const {
    navigation, state, style, page,
  } = props;

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const ICON_THEME = appState.darkMode ? '#FFFFFF' : '#0A143F';

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const renderIcon = useCallback(
    (Icon, otherProps, active) => (
      <Icon
        {...otherProps}
        style={{ height: 22, width: 22, tintColor: ICON_THEME }}
        active={active}
        navigation={navigation}
        theme={BG_THEME}
      />
    ),
    [navigation, ICON_THEME, BG_THEME],
  );

  const PAGE_ITEMS = Object.entries(screens[page]);

  return useMemo(
    () => (
      <Layout level="5">
        <Divider />
        <BottomNavigation
          appearance="noIndicator"
          style={[style, { backgroundColor: 'transparent' }]}
          selectedIndex={state.index}
          /* prettier-ignore */
          onSelect={(index) => PAGE_ITEMS[index][0] !== 'upload'
            && navigation.navigate(state.routeNames[index])}
        >
          {PAGE_ITEMS.map(([title, icon], id) => (
            <BottomNavigationTab
              title={title === 'upload' ? null : t(title)}
              // prettier-ignore
              icon={(evaProps) => renderIcon(icon, evaProps, state.index === id)}
              key={title}
            />
          ))}
        </BottomNavigation>
      </Layout>
    ),
    [t, navigation, state, style, PAGE_ITEMS, renderIcon],
  );
}
