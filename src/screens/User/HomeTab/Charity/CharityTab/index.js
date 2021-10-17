import React, { useContext } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import WithDefaultFetch from 'src/components/DataFetch';

import { RecentPosts } from 'src/components/CharityPosts';

import { charityUrl } from 'src/api/dummy';

import CharityItems from './data';

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/banner/woozeee-ad.jpg'),
  },
  {
    id: 2,
    banner: require('assets/images/banner/valentine.jpg'),
  },
  {
    id: 3,
    banner: require('assets/images/banner/mega-sale.jpg'),
  },
];

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// prettier-ignore
const DealsPostsArea = () => WithDefaultFetch(RecentPosts, charityUrl, PLACEHOLDER_CONFIG);

export default function Charity({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 160 : 120;

  const t = useContext(LocaleContext);

  const routeTo = (route) => navigation.replace(route);

  const CharityItem = ({ data }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 3,
        marginVertical: 10,
        width: '25%',
      }}
    >
      <Layout
        level="1"
        style={{
          borderRadius: 5,
          paddingVertical: 15,
          paddingHorizontal: 20,
          marginBottom: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.05,
          shadowRadius: 3,
          elevation: 2,
        }}
      >
        <Image
          source={data.icon}
          defaultSource={data.icon}
          resizeMode="cover"
          style={{ height: 40, width: 40 }}
        />
      </Layout>
      <Text category="c2" style={{ textAlign: 'center' }}>
        {t(data.title)}
      </Text>
    </TouchableOpacity>
  );

  const WoozeeeCardsAds = (data) => (
    <View
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.25 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 150 : 110,
          width: '100%',
          borderRadius: 5,
        }}
        resizeMode="cover"
      />
    </View>
  );

  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flex: 1, Height: 180 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          contentContainerStyle={{ paddingHorizontal: 5 }}
          alwaysBounceHorizontal
          alwaysBounceVertical
          horizontal={IS_PORTRAIT}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={woozeeeCards}
          keyExtractor={(_, i) => i.toString()}
          renderItem={WoozeeeCardsAds}
          getItemLayout={(data, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * index,
            index,
          })}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}
      >
        {CharityItems.map((data) => (
          <CharityItem data={data} key={data.id} />
        ))}
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="charity"
      />

      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          ListFooterComponent={DealsPostsArea}
          ListFooterComponentStyle={{ paddingBottom: 10 }}
          horizontal={!IS_PORTRAIT}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}
