import React, { useState, useContext } from 'react';

import { Layout, Tab, TabView } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import Notifications from './Notifications';
import Inbox from './messge_inbox';

export default function Messaging({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const t = useContext(LocaleContext);

  const shouldLoadComponent = (index) => index === selectedIndex;

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea title="" navigation={navigation} screen="default" />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        // shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title={t('messages')} style={{ paddingVertical: 10 }}>
          <Inbox navigation={navigation} />
        </Tab>
        <Tab title={t('notifications')} style={{ paddingVertical: 10 }}>
          <Notifications navigation={navigation} />
        </Tab>
      </TabView>
    </Layout>
  );
}
