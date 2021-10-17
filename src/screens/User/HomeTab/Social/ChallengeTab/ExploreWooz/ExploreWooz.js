// prettier-ignore
import React, {
  useState, useRef, useContext, useCallback, useMemo,
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

import { Video } from 'expo-av';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import ChallengeVideo from 'src/components/ChallengeVideo';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import VideoFullscreen from 'src/components/VideoFullscreen';

import { IconBackIos, IconCMovie } from 'src/components/CustomIcons';

import Api from 'src/api';

import { viewVideo } from '../../../../../../services/Requests/index';

const InteractIcon = (props) => {
  const {
    Accessory,
    textContent,
    direction,
    onPress,
    status,
    height,
    width,
    align,
    style,
  } = props;

  return useMemo(
    () => (
      <View
        style={[
          style,
          {
            flexDirection: direction ?? 'column',
            alignItems: align ?? 'center',
          },
        ]}
      >
        <Button
          appearance="ghost"
          status={status ?? 'control'}
          size="tiny"
          style={{
            paddingVertical: 0,
            paddingHorizontal: 0,
          }}
          accessoryLeft={(evaProps) => (
            <Accessory
              {...evaProps}
              style={[
                evaProps.style,
                { height: height ?? 32, width: width ?? 32 },
              ]}
            />
          )}
          onPress={onPress}
        />
        {textContent ? (
          <Text
            status={status ?? 'control'}
            category="c2"
            style={{ textAlign: 'center', marginRight: 5 }}
          >
            {textContent}
          </Text>
        ) : null}
      </View>
    ),
    [textContent, onPress, height, width, status, style, direction],
  );
};

export default function ExploreWooz({ route, navigation }) {
  const exData = route.params;

  // console.log('route params -> ', exData);

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

  const routeMovies = () => navigation.navigate('Movies');

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

    const [exploreData, setExploreData] = useState({});

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
      ['ExploreWooz', 1],
      async ({ pageParam = 1 }) => {
        const promise = await Api.getExploreData(pageParam, exData.categoryId);
        if (data !== {} && data !== undefined) {
          setExploreData(data);
        } else {
          setExploreData({ message: 'No explore data loaded' });
        }
        promise.cancel = () => Api.cancelRequest('Request aborted');
        return promise;
      },
      {
        getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
        getNextPageParam: (lastPage) => lastPage.nextID ?? false,
        keepPreviousData: true,
        cacheTime: 0,
        staleTime: 0,
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
      const res = data.pages.map((page) => page.pageData.data);
      const final = res.reduce((acc, element) => {
        return [...acc, ...element];
      }, []);

      videoLength.current = data.pages[0].pageData.data.length;
      return (
        <View style={{ flex: 1 }}>
          <ScrollView
            style={{
              flex: 1,
              backgroundColor: 'transparent',
            }}
            pagingEnabled
            // scrollToIndex={autoIndex}
            disableIntervalMomentum
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
          >
            {data.pages.map((page) => (
              <React.Fragment key={uuidv4()}>
                {final.map((item, i) => (
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
                          item
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
                  <Video
                    ref={videoRef}
                    resizeMode="contain"
                    style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                    source={{ uri: page.pageData.data[index].mediaURL }}
                    isLooping
                    onPlaybackStatusUpdate={(playbackStatus) =>
                      onPlaybackStatusUpdate(
                        playbackStatus,
                        page.pageData.data[index].userEntryData.entryId,
                      )
                    }
                    isMuted={false}
                    shouldPlay={isFocused}
                    // prettier-ignore
                    onReadyForDisplay={() => Animated.timing(opacity, {
                      toValue: 1,
                      useNativeDriver: true,
                      duration: 500,
                    }).start()}
                  />
                </Animated.View>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      );
      // return data.pages.map((page) => (
      //   <React.Fragment key={page.nextID}>
      //     <View style={{ flex: 1 }}>
      //       <ScrollView
      //         style={{
      //           flex: 1,
      //           backgroundColor: 'transparent',
      //         }}
      //         pagingEnabled
      //         disableIntervalMomentum
      //         showsHorizontalScrollIndicator={false}
      //         showsVerticalScrollIndicator={false}
      //         onMomentumScrollEnd={onMomentumScrollEnd}
      //       >
      //         {page.pageData.data.map((item, i) => (
      //           <React.Fragment key={i.toString()}>
      //             <View style={{ position: 'relative' }}>
      //               <Image
      //                 resizeMode="contain"
      //                 style={{
      //                   height: VIEW_HEIGHT,
      //                   width: '100%',
      //                   overflow: 'hidden',
      //                   position: 'absolute',
      //                 }}
      //                 source={
      //                   data.pages
      //                     ? { uri: item.mediaURL }
      //                     : require('assets/images/banner/placeholder-image.png')
      //                 }
      //               />
      //             </View>
      // <ChallengeVideo
      //   ref={videoViewRef}
      //   data={item}
      //   height={VIEW_HEIGHT}
      //   videoRef={videoRef}
      //   navigation={navigation}
      // />
      //           </React.Fragment>
      //         ))}
      //         <Animated.View
      //           style={[
      //             StyleSheet.absoluteFillObject,
      //             { height: VIEW_HEIGHT, top: index * VIEW_HEIGHT, opacity },
      //           ]}
      //         >
      //           {page.pageData.data.length ? (
      //             <Video
      //               ref={videoRef}
      //               resizeMode="contain"
      //               style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
      //               source={{ uri: page.pageData.data[index].mediaURL }}
      //               isLooping
      //               shouldPlay={isFocused}
      //               onPlaybackStatusUpdate={(playbackStatus) =>
      //                 onPlaybackStatusUpdate(
      //                   playbackStatus,
      //                   page.pageData.data[index].userEntryData.entryId,
      //                 )
      //               }
      //               onReadyForDisplay={() =>
      //                 Animated.timing(opacity, {
      //                   toValue: 1,
      //                   useNativeDriver: true,
      //                   duration: 500,
      //                 }).start()
      //               }
      //             />
      //           ) : null}
      //         </Animated.View>
      //       </ScrollView>
      //     </View>
      //   </React.Fragment>
      // ));
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
            Accessory={IconCMovie}
            status="control"
            height={28}
            width={28}
            onPress={routeMovies}
          />
        </View>
        <WoozPostsArea />
      </View>
    </Layout>
  );
}
