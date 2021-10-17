import React, { useState } from 'react';

import { Layout, Text } from '@ui-kitten/components';
import { useWindowDimensions, StyleSheet } from 'react-native';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import Versus from 'src/screens/User/HomeTab/Social/ChallengeTab/VersusTab';
import Explore from 'src/screens/User/HomeTab/Social/ChallengeTab/ExploreWooz';

import TopNavigationArea from 'src/components/TopNavigationArea';
import { t } from 'i18n-js';

import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Challenge({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const [selectedIndex, setSelectedIndex] = useState(0);

  const shouldLoadComponent = (index) => index === selectedIndex;

  const styles = StyleSheet.create({
    activeTabTextColor: {
      color: '#0959AB',
      fontSize: 17,
    },
    tabTextColor: {
      // color: 'grey',
      fontSize: 17,
    },
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: t('challenge') },
    { key: 'second', title: t('explore') },
  ]);

  const renderScene = SceneMap({
    first: Versus,
    second: Explore,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#0959AB' }}
      style={{ backgroundColor: 'transparent' }}
      renderLabel={({ route, focused, color }) => (
        <>
          {/* <MaterialCommunityIcons
            name="view-dashboard"
            size={24}
            color="black"
          /> */}
          <Text
            style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
            status="basic"
          >
            {route.title}
          </Text>
        </>
      )}
    />
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="toolbar"
      />
      {/* <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title={t('challenge')} style={{ paddingVertical: 10 }}>
          <Versus />
        </Tab>
        <Tab title={t('explore')} style={{ paddingVertical: 10 }}>
          <Explore />
        </Tab>
      </TabView> */}
      <TabView
        renderTabBar={renderTabBar}
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </Layout>
  );
}
