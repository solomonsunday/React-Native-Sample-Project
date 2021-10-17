import React, { useState, useContext } from 'react';

import { Layout, Tab, TabView } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

// Tabs
import All from './All';
import Credit from './Credit';
import Debit from './Debit';

export default function Follow({ navigation }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="Transaction History"
        navigation={navigation}
        screen="default"
        options
      />
      <TabView
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        // shouldLoadComponent={shouldLoadComponent}
        onSelect={(index) => setSelectedIndex(index)}
      >
        <Tab title={t('all')} style={{ paddingVertical: 10 }}>
          <All navigation={navigation} />
        </Tab>
        <Tab title={t('credit')} style={{ paddingVertical: 10 }}>
          <Credit navigation={navigation} />
        </Tab>
        <Tab title={t('debit')} style={{ paddingVertical: 10 }}>
          <Debit navigation={navigation} />
        </Tab>
      </TabView>
    </Layout>
  );
}
