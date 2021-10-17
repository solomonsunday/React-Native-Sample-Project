import React, { useMemo, useCallback } from 'react';

import {
  Divider,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

import {
  IconCNotification,
  IconSearch,
  IconOptions,
  IconCVideo,
  IconCSearch,
  IconCPlus,
} from 'src/components/CustomIcons';

// Components import
import BackButton from './components/BackButton';
import Calendar from './components/Calendar';
import Title from './components/Title';
import Logo from './components/Logo';
import SearchField from './components/SearchField';
import SettingsButton from './components/SettingsButton';

import TopNavigationGlobalMenu from './components/TopNavigationGlobalMenu';
import TopNavigationUserMenu from './components/TopNavigationUserMenu';
import TopNavigationUserActivities from './components/TopNavigationUserActivities';

export default function TopNavigationArea(props) {
  const {
    navigation,
    title,
    status,
    icon,
    style,
    screen,
    search,
    options,
    balanceVisible,
    toggleBalance,
    pressed,
    // notification,
    onStreamClick,
  } = props;

  const routeSearch = useCallback(
    () => navigation.navigate('Search', { chat: null }),
    [navigation],
  );

  const routeMessaging = useCallback(
    () => navigation.navigate('Messaging'),
    [navigation],
  );

  const renderSocialTools = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCVideo}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Livestream"
          onPress={onStreamClick}
        />
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, onStreamClick, routeMessaging],
  );

  const renderMarketPlaceTools = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, routeSearch, routeMessaging],
  );

  const renderNotificationTool = useCallback(
    () => (
      <>
        <TopNavigationAction
          {...props}
          icon={IconCNotification}
          accessibilityLiveRegion="polite"
          accessibilityLabel="Notification"
          onPress={routeMessaging}
        />
      </>
    ),
    [props, routeMessaging],
  );

  const renderSearchIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconSearch}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Search"
        onPress={routeSearch}
      />
    ),
    [props, routeSearch],
  );

  const renderNotificationIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconCNotification}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Notification"
        onPress={routeMessaging}
      />
    ),
    [props, routeMessaging],
  );

  const renderOptionsIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconOptions}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Options"
        onPress={pressed}
      />
    ),
    [props, pressed],
  );

  const renderAddStreamIcon = useCallback(
    () => (
      <TopNavigationAction
        {...props}
        icon={IconCPlus}
        accessibilityLiveRegion="polite"
        accessibilityLabel="Options"
      />
    ),
    [props],
  );

  // render tools based on screen
  const renderTools = useMemo(
    () => ({
      social: renderSocialTools,
      marketPlace: renderMarketPlaceTools,
      charity: renderNotificationTool,
    }),
    [renderSocialTools, renderMarketPlaceTools, renderNotificationTool],
  );

  const TopNavigationAuth = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => (
            <Title {...evaProps} status={status} title={title} />
          )}
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
          )}
          // accessoryRight={(evaProps) => (
          //   <HelpButton {...evaProps} navigation={navigation} />
          // )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, title, icon, style],
  );

  const TopNavigationActivities = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => (
            <Title {...evaProps} status={status} title={title} />
          )}
          // accessoryLeft={(evaProps) => (
          //   <Calendar {...evaProps} navigation={navigation} icon={icon} />
          // )}
          accessoryRight={() => (
            <TopNavigationUserActivities navigation={navigation} />
          )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, title, icon, style],
  );

  const TopNavigationUser = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Logo {...evaProps} />}
          // accessoryRight={() => <IconCFlag style={{ height: 28, width: 28 }} />}
          accessoryRight={() => (
            <TopNavigationUserMenu
              balanceVisible={balanceVisible}
              toggleBalance={toggleBalance}
              navigation={navigation}
            />
          )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, balanceVisible, toggleBalance, navigation],
  );

  const TopNavigationSearch = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon="back" />
          )}
          title={(evaProps) => <SearchField {...evaProps} />}
          accessoryRight={
            icon === 'AddStream' ? renderAddStreamIcon : renderOptionsIcon
          }
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, navigation, icon, renderOptionsIcon, renderAddStreamIcon],
  );

  const TopNavigationProfile = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          accessoryLeft={(evaProps) => (
            <SettingsButton {...evaProps} navigation={navigation} />
          )}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
      </Layout>
    ),
    [style, navigation],
  );

  const TopNavigationGlobal = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Logo {...evaProps} />}
          accessoryLeft={(evaProps) => (
            <TopNavigationGlobalMenu
              {...evaProps}
              navigation={navigation}
              selected={screen}
            />
          )}
          accessoryRight={renderTools[screen]}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [navigation, style, renderTools, screen],
  );

  const TopNavigationToolbar = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          // accessoryLeft={(evaProps) => (
          //   <TopNavigationUserMenu {...evaProps} navigation={navigation} />
          // )}
          accessoryRight={renderSearchIcon}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, renderSearchIcon],
  );

  const TopNavigationNotificationToolbar = useMemo(
    //topNavBar at money matters home
    () => (
      <Layout level="5">
        <TopNavigation
          title="Home"
          alignment="start"
          accessoryLeft={(evaProps) => <BackButton navigation={navigation} />}
          accessoryRight={renderNotificationIcon}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[
            style,
            {
              backgroundColor: 'transparent',
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}
        />
        <Divider />
      </Layout>
    ),
    [style, renderNotificationIcon],
  );

  const TopNavigationDefault = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          title={(evaProps) => <Title {...evaProps} title={title} />}
          accessoryLeft={(evaProps) => (
            <BackButton {...evaProps} navigation={navigation} icon={icon} />
          )}
          accessoryRight={
            (search && renderSearchIcon) || (options && renderOptionsIcon)
          }
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [
      navigation,
      title,
      icon,
      style,
      search,
      renderSearchIcon,
      renderNotificationIcon,
      options,
      renderOptionsIcon,
    ],
  );

  const TopNavigationBillPay = useMemo(
    () => (
      <Layout level="5">
        <TopNavigation
          alignment="center"
          // title={(evaProps) => <Logo {...evaProps} />}
          // accessoryRight={() => <IconCFlag style={{ height: 28, width: 28 }} />}
          accessoryRight={renderNotificationTool}
          accessibilityLiveRegion="polite"
          accessibilityLabel="screen navigation"
          style={[style, { backgroundColor: 'transparent' }]}
        />
        <Divider />
      </Layout>
    ),
    [style, renderNotificationTool],
  );

  const navs = {
    default: TopNavigationDefault,
    auth: TopNavigationAuth,
    user: TopNavigationUser,
    search: TopNavigationSearch,
    toolbar: TopNavigationToolbar,
    notification: TopNavigationNotificationToolbar,
    profile: TopNavigationProfile,
    social: TopNavigationGlobal,
    marketPlace: TopNavigationGlobal,
    charity: TopNavigationGlobal,
    billPay: TopNavigationBillPay,
    activities: TopNavigationActivities,
  };

  return navs[screen];
}
