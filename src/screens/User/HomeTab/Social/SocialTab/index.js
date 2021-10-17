import React, {
  useCallback,
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';

import { View, useWindowDimensions, FlatList } from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import RBSheet from 'react-native-raw-bottom-sheet';

// prettier-ignore
import {
  Layout, List, Button, Text, Divider,
} from '@ui-kitten/components';

import Api from 'src/api';

import { Video } from 'expo-av';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import TopNavigationArea from 'src/components/TopNavigationArea';

import WithDefaultFetch from 'src/components/DataFetch';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import { StoryPosts } from 'src/components/SocialPosts';

import VideoView from 'src/components/VideoView';

import ImageView from 'src/components/ImageView';

import MoviesSection from 'src/components/MoviesSection';

import TrendingChallenges from 'src/components/TrendingChallenges';

import { trendingUrl } from 'src/api/dummy';

import { IconCStartStream, IconCLiveStreams } from 'src/components/CustomIcons';

import VideoComponent from 'src/components/VideoComponent/VideoComponent';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import getUserProfile from '../../../../../services/Requests/FetchUserProfile';

const PLACEHOLDER_CONFIG1 = {
  count: 2,
  numColumns: 2,
  maxHeight: 147,
  mediaLeft: false,
};

// prettier-ignore
const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 250,
  itemVisiblePercentThreshold: 35,
};

export default function Social({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const [_userId, setUserId] = useState('');

  const [userImg, setUserImg] = useState('');

  const SPACING = 57 + bottom + top;

  const VIEW_HEIGHT = height - SPACING;

  const ITEM_HEIGHT = VIEW_HEIGHT * 0.75;

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const sheetRef = useRef(null);

  const handleOpenSheet = () => sheetRef.current.open();

  const [shouldRefetch, setShouldRefresh] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const getUserId = async () => {
    const res = await AsyncStorage.getItem('userid');
    setUserId(res);
    // console.log(res);
  };

  const getUserImg = async () => {
    const res = await AsyncStorage.getItem('userImage');
    setUserImg(res);
  };

  // useEffect(() => {
  //   getUserProfile(_userId);
  // }, [navigation]);

  getUserImg();

  //view all async stuff
  // AsyncStorage.getAllKeys((err, keys) => {
  //   AsyncStorage.multiGet(keys, (error, stores) => {
  //     stores.map((result, i, store) => {
  //       console.log('async stuff ', { [store[i][0]]: store[i][1] });
  //       return true;
  //     });
  //   });
  // });

  const refreshFeeds = useCallback(() => {
    setShouldRefresh(true);
    // console.log("pulled to refresh'");
    wait(2000).then(() => setShouldRefresh(false));
  }, []);

  const routeLiveStream = useCallback(() => {
    sheetRef.current.close();
    navigation.navigate('LiveStream');
  }, [navigation]);

  const SocialPostsArea = () => {
    const cellRefs = useRef({});
    const handleOnViewableItemsChanged = useCallback((props) => {
      const { changed } = props;
      // console.log('changed is => ', changed);
      changed.forEach((item) => {
        const cell = cellRefs.current[item.key];
        if (cell) {
          if (item.isViewable) {
            cell.play();
          } else {
            cell.pause();
          }
        }
      });
    }, []);
    const {
      status,
      data,
      error,
      fetchMore,
      isFetching,
      isFetchingNextPage,
      isFetchingPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      refetch,
      hasNextPage,
      hasPreviousPage,
    } = useInfiniteQuery(
      ['inFiniteSocialVideos', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getVideos(pageParam);
        promise.cancel = () => Api.cancelRequest('Request aborted');

        return promise;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
        getNextPageParam: (lastPage) => lastPage.nextID ?? false,
        keepPreviousData: true,
        cacheTime: 5000,
        staleTime: 0,
      },
    );

    const [Viewable, SetViewable] = useState([]);
    const ref = useRef(null);

    const onViewRef = useRef((viewableItems) => {
      let Check = [];
      for (var i = 0; i < viewableItems.viewableItems.length; i++) {
        Check.push(viewableItems.viewableItems[i].item, { shouldPlay: true });
      }
      SetViewable(Check);
    });

    // console.log('viewable is -> ', Viewable);

    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 80 });

    const screenIsFocused = useIsFocused();

    const [lastPlayedVideo, setLastPlayedVideo] = useState();

    const handleVideoPlay = (itemData) => {
      // setLastPlayedVideo(itemData)
    };

    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft={false}
          count={1}
          numColumns={1}
          maxHeight={height * 0.8}
          maxWidth={width}
        />
      );
    }
    if (status === 'error') {
      return (
        <FetchFailed
          onPress={refetch}
          info={t('networkError')}
          retry={t('retry')}
        />
      );
    }

    if (
      // prettier-ignore
      status !== 'loading'
        && status !== 'error'
        && data.pages[0].pageData.data.length > 0
    ) {
      // console.log(data.pages);
      const res = data.pages.map((page) => page.pageData.data);
      const final = res.reduce((acc, element) => {
        return [...acc, ...element];
      }, []);

      // console.log(final);
      return (
        <View style={{ flex: 1 }}>
          <FlatList
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            windowSize={5}
            onRefresh={() => refreshFeeds()}
            refreshing={shouldRefetch}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={StoryPostsArea}
            ListHeaderComponentStyle={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: 'rgba(143, 155, 179, 0.08)',
            }}
            onEndReached={() => fetchNextPage()}
            onEndThreshold={0}
            data={final}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ item, index }) => {
              return (
                <>
                  {item.type == 'video' ? (
                    <VideoView
                      data={{ item, index }}
                      viewHeight={ITEM_HEIGHT}
                      navigation={navigation}
                      t={t}
                      viewable={Viewable}
                    />
                  ) : (
                    <ImageView
                      data={{ item, index }}
                      viewHeight={ITEM_HEIGHT}
                      navigation={navigation}
                      t={t}
                    />
                  )}
                  {index === 2 || index === 12 ? (
                    <MoviesSection
                      t={t}
                      navigation={navigation}
                      width={width}
                      height={ITEM_HEIGHT}
                    />
                  ) : null}
                  {index === 5 ? <StoryPostsArea /> : null}
                  {index === 8 ? (
                    <TrendingChallenges
                      t={t}
                      navigation={navigation}
                      width={width}
                      height={ITEM_HEIGHT}
                    />
                  ) : null}
                </>
              );
            }}
            ref={ref}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>
      );
      //
    }
    return (
      <FetchFailed
        onPress={refetch}
        info={t('noVideos')}
        retry={t('refresh')}
      />
    );
  };

  return (
    <>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          screen="social"
          onStreamClick={handleOpenSheet}
        />
        <SocialPostsArea />
      </Layout>
      <RBSheet
        ref={sheetRef}
        height={180}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
          },
        }}
      >
        <Layout
          level="5"
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
          }}
        >
          <Button
            appearance="ghost"
            status="primary"
            accessoryLeft={(evaProps) => (
              <IconCStartStream {...evaProps} height={32} width={32} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={routeLiveStream}
          >
            <Text style={{ fontSize: 16 }} status="primary">
              {t('startLiveStream')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="primary"
            accessoryLeft={(evaProps) => (
              <IconCLiveStreams {...evaProps} height={32} width={32} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={routeLiveStream}
          >
            <Text style={{ fontSize: 16 }} status="primary">
              {t('viewLiveStreams')}
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </>
  );
}
