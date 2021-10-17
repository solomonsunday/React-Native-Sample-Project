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
  Text,
} from 'react-native';

import {
  sendComment,
  handleLike,
  handleFollow,
  getUserData,
  viewVideo,
  handleBookmark,
} from '../../../../services/Requests/index';

import { useInfiniteQuery } from 'react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { v4 as uuidv4 } from 'uuid';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Constants from 'expo-constants';

import { Video } from 'expo-av';

import { Layout, List } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import ChallengeVideo from 'src/components/ChallengeVideo';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import InteractIcon from 'src/components/InteractIcon';

import { IconBackIos, IconCMedal } from 'src/components/CustomIcons';

import Api from 'src/api';

export default function ProfilePostsWooz({ route, navigation }) {
  const { _id } = route.params;
  // console.log('user id -> ', _id);

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

  const UserPostsArea = () => {
    const isFocused = useIsFocused();

    const [index, setIndex] = useState(0);

    const videoRef = useRef(null);

    const videoViewRef = useRef(null);

    const isMounted = useRef(false);

    const opacity = useRef(new Animated.Value(0.5)).current;

    const videoLength = useRef(0);

    const onMomentumScrollEnd = ({ nativeEvent }) => {
      // console.log(nativeEvent);
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

    const routeComments = async (item) => {
      // console.log('go to comment');
      const userId = await AsyncStorage.getItem('userid');
      const userData = await getUserData(userId);
      const { data } = userData;
      await navigation.navigate('Comments', {
        currUserData: data,
        postItem: item,
      });
    };

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
      ['userPosts', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getUserPosts(pageParam, _id);
        if (data !== {} && data !== undefined) {
          // console.log('data is =>', data);
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
        keepPreviousData: false,
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
    if (status === 'loading') {
      return (
        <Placeholders
          mediaLeft={false}
          count={1}
          numColumns={1}
          maxHeight={height * 0.75}
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
      status !== 'error'
        && status !== 'loading'
        && data.pages[0].pageData.data.length > 0
    ) {
      videoLength.current = data.pages[0].pageData.data.length;
      // console.log(VIEW_HEIGHT);
      return data.pages.map((page) => (
        <React.Fragment key={page.nextID}>
          <View>
            <ScrollView
              style={{
                // flex: 1,
                backgroundColor: 'transparent',
              }}
              pagingEnabled
              disableIntervalMomentum
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onMomentumScrollEnd={onMomentumScrollEnd}
            >
              {page.pageData.data.map((entry, index) => (
                <View
                  key={index.toString()}
                  style={{
                    height: VIEW_HEIGHT,
                  }}
                >
                  <ChallengeVideo
                    ref={videoViewRef}
                    data={entry}
                    height={VIEW_HEIGHT}
                    videoRef={videoRef}
                    navigation={navigation}
                    viewComments={() => routeComments(entry)}
                  />
                  <Animated.View
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        height: VIEW_HEIGHT,
                        top: index * VIEW_HEIGHT,
                        opacity,
                      },
                    ]}
                  >
                    <Video
                      ref={videoRef}
                      resizeMode="contain"
                      style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                      source={{ uri: entry.mediaURL }}
                      isLooping
                      shouldPlay={isFocused}
                      onReadyForDisplay={() =>
                        Animated.timing(opacity, {
                          toValue: 1,
                          useNativeDriver: true,
                          duration: 500,
                        }).start()
                      }
                    />
                  </Animated.View>
                </View>
              ))}
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
        </View>
        <View style={{ height: VIEW_HEIGHT }}>
          <UserPostsArea />
        </View>
      </View>
    </Layout>
  );
}
