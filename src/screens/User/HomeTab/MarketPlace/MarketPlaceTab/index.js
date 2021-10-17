import React, { useContext, useRef } from 'react';

import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List,
} from '@ui-kitten/components';

import { Video } from 'expo-av';

import Carousel from 'react-native-snap-carousel';

import {
  LoadingContext,
  LocaleContext,
  AppSettingsContext,
} from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import WithDefaultFetch from 'src/components/DataFetch';

import { DealsPosts } from 'src/components/MarketPosts';

import { marketDealsUrl } from 'src/api/dummy';

import marketPlaceItems from './data';

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/banner/mega-sale.jpg'),
  },
  {
    id: 2,
    banner: require('assets/images/banner/wooozeeAd.png'),
  },
  {
    id: 3,
    banner: require('assets/images/banner/valentine.jpg'),
  },
];

const sponsorsAd = [
  {
    id: 1,
    banner: {
      uri:
        'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/accessAd.mp4',
    },
  },
  {
    id: 2,
    banner: {
      uri:
        'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/ubaAd.mp4',
    },
  },
  {
    id: 3,
    banner: {
      uri:
        'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/globusAd.mp4',
    },
  },
  {
    id: 1,
    banner: {
      uri:
        'https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/marketplace/axaAd.mp4',
    },
  },
];

const _renderItem = ({ item, index }) => {
  return (
    <View key={index} style={styles.slide}>
      <TouchableOpacity>
        <Image
          // defaultSource= {require('../assets/sliders/images/placeholder2.png')}
          style={styles.slider}
          source={item.banner}
        />
      </TouchableOpacity>
    </View>
  );
};

const _renderItemAds = ({ item, index }) => {
  return (
    <View key={index} style={styles.slide}>
      <TouchableOpacity style={{ marginTop: 5 }}>
        <Video
          // defaultSource= {require('../assets/sliders/images/placeholder2.png')}
          style={styles.slider}
          source={item.banner}
          isLooping={true}
          shouldPlay={true}
          resizeMode="cover"
        />
      </TouchableOpacity>
    </View>
  );
};

const PLACEHOLDER_CONFIG = {
  count: 4,
  numColumns: 2,
  maxHeight: 180,
  mediaLeft: true,
};

// prettier-ignore
const DealsPostsArea = () => WithDefaultFetch(DealsPosts, marketDealsUrl, PLACEHOLDER_CONFIG);

export default function MarketPlace({ navigation }) {
  const { appState } = useContext(AppSettingsContext);

  useDisableAndroidExit();

  const t = useContext(LocaleContext);

  const sheetRefWallet = useRef(null);

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 160 : 120;

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const routeTo = (route) => navigation.navigate(route, { navigation });

  const MarketplaceItem = ({ data, navigation }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate(data.route)}
      activeOpacity={0.75}
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 3,
        marginVertical: 10,
        width: '25%',
      }}
      onPress={() => routeTo(data.route)}
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
  const renderHeaderArea = () => (
    <View style={{ flex: 1, paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flex: 1, Height: 180 }}>
        <Carousel
          // ref={(c) => { _carousel = c; }}
          data={woozeeeCards}
          renderItem={_renderItem}
          sliderWidth={400}
          itemWidth={350}
          autoplay={true}
          lockScrollWhileSnapping={true}
          loop={true}
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
        {marketPlaceItems.map((data) => (
          <MarketplaceItem data={data} key={data.id} navigation={navigation} />
        ))}
      </View>
      <Text
        category="s2"
        status="basic"
        style={{ flex: 1, marginBottom: 10, marginHorizontal: 10 }}
      >
        Our Partners
      </Text>
      <View style={{ flex: 1, Height: 180, marginBottom: 15 }}>
        <Carousel
          // ref={(c) => { _carousel = c; }}
          data={sponsorsAd}
          renderItem={_renderItemAds}
          sliderWidth={400}
          itemWidth={350}
          autoplay={true}
          lockScrollWhileSnapping={true}
          loop={true}
          autoplayDelay={2000}
          autoplayInterval={20000}
        />
      </View>
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="marketPlace"
      />

      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'transparent' }}
          ListHeaderComponent={renderHeaderArea}
          // ListFooterComponent={DealsPostsArea}
          ListFooterComponentStyle={{ paddingBottom: 10 }}
          horizontal={!IS_PORTRAIT}
          // alwaysBounceHorizontal
          // alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </Layout>
  );
}
const styles = StyleSheet.create({
  slide: {
    height: 200,
  },
  slider: {
    width: '100%',
    borderRadius: 5,
    resizeMode: 'cover',
    height: '100%',
  },
  container: {
    paddingHorizontal: 20,
  },
});
