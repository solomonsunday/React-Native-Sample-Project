import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Video } from 'expo-av';

import { useInfiniteQuery } from 'react-query';

import { Layout, List, Text, Button } from '@ui-kitten/components';

import { Overlay } from 'react-native-elements';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Challenges from 'src/components/TrendingChallenges/Challenges';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function ChallengePage({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const SPACING = 57 + bottom + top;

  const VIEW_HEIGHT = height - SPACING;

  const ITEM_HEIGHT = VIEW_HEIGHT * 0.75;

  const screenIsFocused = useIsFocused();

  const t = useContext(LocaleContext);

  const layout = useWindowDimensions();

  // const VideoPrev = () => {
  //   return (
  //     //   <View
  //     //     style={
  //     //       {
  //     //         //   flex: 1,
  //     //         //   paddingTop: 10,
  //     //         //   paddingHorizontal: 15,
  //     //         //   marginBottom: 20,
  //     //       }
  //     //     }
  //     //   >
  //     <Video
  //       source={require('../../../../assets/wwt.mp4')}
  //       shouldPlay={true}
  //       isMuted={true}
  //       resizeMode="cover"
  //       shouldPlay={screenIsFocused}
  //       isLooping={true}
  //       style={{
  //         height: 300,
  //         width: '100%',
  //       }}
  //     />
  //     //   </View>
  //   );
  // };

  return (
    <Layout
      level="6"
      style={{
        flex: 3,
      }}
    >
      <TopNavigationArea
        title="Challenges"
        navigation={navigation}
        screen="default"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 2,
          width: width,
        }}
      >
        {/* <VideoPrev /> */}
        <View style={{ padding: 8 }}>
          <Text
            status="basic"
            category="h6"
            style={{ fontSize: 18, fontWeight: 'bold' }}
          >
            #accessxtramile
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginVertical: 8,
            }}
          >
            <Text
              category="h6"
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: '#28A83C',
              }}
            >
              New
            </Text>
            <Text
              category="c2"
              style={{ fontSize: 14, marginTop: 1, marginHorizontal: 10 }}
            >
              Start: 3/06/2021
            </Text>
            <Text category="c2" style={{ fontSize: 14, marginTop: 1 }}>
              End: 30/06/2021
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                marginVertical: 8,
                backgroundColor: '#043F7C',
                height: 45,
                width: 40,
                borderTopLeftRadius: 10,
                paddingTop: 2,
                alignItems: 'center',
              }}
            >
              <Text category="s2" style={{ fontSize: 12, color: 'white' }}>
                Top
              </Text>
              <Text
                category="h6"
                style={{ fontSize: 18, color: 'white', marginBottom: 5 }}
              >
                10
              </Text>
            </View>
            <Text
              category="h6"
              style={{ fontSize: 18, color: '#043F7C', marginHorizontal: 8 }}
            >
              #1 on woozeee challenge today
            </Text>
          </View>
          <Text
            category="h6"
            status="basic"
            style={{ fontSize: 20, marginVertical: 8 }}
          >
            Reward: $1000
          </Text>
          <View
            style={{ marginVertical: 10, alignSelf: 'center', width: '100%' }}
          >
            <Button status="danger" size="large">
              <Text status="control" category="h6">
                Join Challenge
              </Text>
            </Button>
          </View>
          <Text
            // category=""
            status="basic"
            style={{ fontSize: 14, marginVertical: 5, lineHeight: 22 }}
          >
            Open an extramile access bank account, upload a video of how you
            spent NGN100,000 using access bank card
          </Text>
          <Text
            category="h6"
            style={{ fontSize: 18, color: '#043F7C', marginVertical: 15 }}
          >
            #acessXtramile challenge
          </Text>
        </View>
        <Challenges
          t={t}
          navigation={navigation}
          width={width}
          height={ITEM_HEIGHT}
        />
        <Challenges
          t={t}
          navigation={navigation}
          width={width}
          height={ITEM_HEIGHT}
        />
        <Challenges
          t={t}
          navigation={navigation}
          width={width}
          height={ITEM_HEIGHT}
        />
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  tabView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  activeTabTextColor: {
    color: 'rgba(255, 87, 87, 1)',
    fontSize: 13,
  },
  tabTextColor: {
    // color: '#494949',
    fontSize: 13,
  },
  overlay: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropStyle: {
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  scroll: {
    paddingVertical: 20,
    marginVertical: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
});
