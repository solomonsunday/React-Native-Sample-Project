import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import {
  IconCAtmCard,
  IconCGiftBox,
  IconCBag,
  IconCWalletFill,
} from 'src/components/CustomIcons';

const TRANSACTION_HISTORY = [
  {
    id: 3,
    icon: IconCBag,
    iconColor: '#EE5E31',
    category: 'Click & Shop',
    title: 'Adidas Sneaker Lmited Edition',
    amount: '- 76,000.00',
    time: '06:54 AM',
  },
];

export default function All({ navigation }) {
  const t = useContext(LocaleContext);

  const HistoryItem = ({ data }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            height: 45,
            width: 45,
            borderRadius: 15,
            backgroundColor: data.iconColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <data.icon fill="white" style={{ height: 18, width: 18 }} />
        </View>
        <View>
          <Text category="s2" style={{ marginBottom: 5, maxWidth: 200 }}>
            {data.title}
          </Text>
          <Text category="c1">{data.category}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text category="s2" style={{ marginBottom: 5 }}>
          {data.amount}
        </Text>
        <Text category="c1">{data.time}</Text>
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 15, paddingVertical: 10 }}
      >
        <View style={{ marginVertical: 10 }}>
          <Text status="primary" category="s2" style={{ marginBottom: 10 }}>
            {t('today')}
          </Text>
          {TRANSACTION_HISTORY.map((data) => (
            <HistoryItem data={data} key={data.id} />
          ))}
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text status="primary" category="s2" style={{ marginBottom: 10 }}>
            {t('yesterday')}
          </Text>
          {TRANSACTION_HISTORY.map((data) => (
            <HistoryItem data={data} key={data.id} />
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
}
