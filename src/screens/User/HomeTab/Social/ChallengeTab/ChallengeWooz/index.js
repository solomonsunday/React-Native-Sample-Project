// prettier-ignore
import React, {
  useState, useRef, useContext, useCallback,
} from 'react';

import {
  View,
  Animated,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
} from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { v4 as uuidv4 } from 'uuid';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Constants from 'expo-constants';

import { Video } from 'expo-av';

import { Layout } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import ChallengeVideo from 'src/components/ChallengeVideo';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import InteractIcon from 'src/components/InteractIcon';

import { IconBackIos, IconCMedal } from 'src/components/CustomIcons';

import Api from 'src/api';

import { viewVideo } from '../../../../../../services/Requests/index';

export default function Wooz({ route, navigation }) {
  // console.log('route params -> ', route.params);
  const { _id } = route.params;

  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  // check for some odd devices like mine
  const spacing = top % 1 === 0 ? bottom + top : 0;

  // if (Constants.platform.ios) {
  //   spacing = bottom + top;
  // }

  const VIEW_HEIGHT = height - (57 + spacing);

  const t = useContext(LocaleContext);

  const goBack = () => navigation.goBack();

  const routeRanking = () =>
    navigation.navigate('Rankings', { challengeId: _id });

  const WoozPostsArea = () => {
    const isFocused = useIsFocused();

    const [index, setIndex] = useState(0);

    const videoRef = useRef(null);

    const videoViewRef = useRef(null);

    const isMounted = useRef(false);

    const opacity = useRef(new Animated.Value(0.5)).current;

    const videoLength = useRef(0);

    const onMomentumScrollEnd = ({ nativeEvent }) => {
      const newIndex = Math.ceil(nativeEvent.contentOffset.y / VIEW_HEIGHT);
      // console.log('new index is -> ', newIndex);

      if (
        // prettier-ignore
        newIndex !== index
        && newIndex < videoLength.current
        && newIndex >= 0
      ) {
        opacity.setValue(0);
        setIndex(newIndex);
        videoViewRef.current?.resetPlayState(true);
      }
    };

    const [woozData, setWoozData] = useState({});

    const startVideo = async () => {
      try {
        const status = await videoRef.current.getStatusAsync();

        if (status.isLoaded) {
          await videoRef.current.playAsync();
          videoViewRef.current.resetPlayState(true);
        }
      } catch (e) {
        const msg = e;
      }
    };

    const stopVideo = async () => {
      try {
        const status = await videoRef.current.getStatusAsync();

        if (status.isLoaded) {
          await videoRef.current.stopAsync();
          videoViewRef.current.resetPlayState(false);
        }
      } catch (e) {
        const msg = e;
      }
    };

    useFocusEffect(
      useCallback(() => {
        isMounted.current = true;

        if (isMounted.current && videoViewRef.current) {
          videoViewRef.current.resetPlayState(true);
        }

        return () => {
          isMounted.current = false;

          if (videoViewRef.current) {
            videoViewRef.current.resetPlayState(true);
          }
        };
      }, [videoViewRef]),
    );

    const {
      status,
      data,
      error,
      isFetching,
      isFetchingNextPage,
      isFetchingPreviousPage,
      fetchNextPage,
      fetchPreviousPage,
      refetch,
      hasNextPage,
      hasPreviousPage,
    } = useInfiniteQuery(
      ['ChallengeWooz', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getWoozData(pageParam, _id);
        if (data !== {} && data !== undefined) {
          setWoozData(data);
        } else {
          setWoozData({ message: 'No challenge data loaded' });
        }
        promise.cancel = () => Api.cancelRequest('Request aborted');
        return promise;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
        getNextPageParam: (lastPage) => lastPage.nextID ?? false,
        keepPreviousData: true,
        staleTime: 0,
        cacheTime: 0,
      },
    );

    const onPlaybackStatusUpdate = async (playbackStatus, entryId) => {
      if (playbackStatus.didJustFinish) {
        const res = await viewVideo(entryId);
        // console.log(res);
      }
    };

    // console.log(status);

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
      status !== 'error'
      && status !== 'loading'
      && data.pages[0].pageData.data.length > 0
    ) {
      videoLength.current = data.pages[0].pageData.data.length;
      return data.pages.map((page) => (
        <React.Fragment key={page.nextID}>
          <View style={{ flex: 1 }}>
            <ScrollView
              style={{
                flex: 1,
                backgroundColor: 'transparent',
              }}
              pagingEnabled
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumScrollEnd}
            >
              {page.pageData.data.map((item, i) => (
                <React.Fragment key={i.toString()}>
                  <View style={{ position: 'relative' }}>
                    <Image
                      resizeMode="contain"
                      style={{
                        height: VIEW_HEIGHT,
                        width: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                      }}
                      source={
                        data.pages
                          ? { uri: item.mediaURL }
                          : require('assets/images/banner/placeholder-image.png')
                      }
                    />
                  </View>
                  <ChallengeVideo
                    ref={videoViewRef}
                    data={item}
                    height={VIEW_HEIGHT}
                    videoRef={videoRef}
                    navigation={navigation}
                  />
                </React.Fragment>
              ))}
              <Animated.View
                style={[
                  StyleSheet.absoluteFillObject,
                  { height: VIEW_HEIGHT, top: index * VIEW_HEIGHT, opacity },
                ]}
              >
                {/* {console.log(data)} */}
                {page.pageData.data.length ? (
                  <Video
                    ref={videoRef}
                    resizeMode="contain"
                    style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                    source={{ uri: page.pageData.data[index].mediaURL }}
                    isLooping
                    shouldPlay={isFocused}
                    onPlaybackStatusUpdate={(playbackStatus) =>
                      onPlaybackStatusUpdate(
                        playbackStatus,
                        page.pageData.data[index].userEntryData.entryId,
                      )
                    }
                    onReadyForDisplay={() =>
                      Animated.timing(opacity, {
                        toValue: 1,
                        useNativeDriver: true,
                        duration: 500,
                      }).start()
                    }
                  />
                ) : null}
              </Animated.View>
            </ScrollView>
          </View>
        </React.Fragment>
      ));
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
    <Layout level="6" style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#04070C',
        }}
      >
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 25,
            zIndex: 19,
            position: 'absolute',
            top: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <InteractIcon
            Accessory={IconBackIos}
            status="control"
            height={28}
            width={28}
            onPress={goBack}
          />
          <InteractIcon
            Accessory={IconCMedal}
            status="control"
            height={28}
            width={28}
            onPress={routeRanking}
          />
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
