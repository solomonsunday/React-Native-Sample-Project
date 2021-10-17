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

import { useInfiniteQuery } from 'react-query';

import { v4 as uuidv4 } from 'uuid';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import Constants from 'expo-constants';

import { Video } from 'expo-av';

import { Layout } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import LikeVideo from 'src/components/LikeVideo';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import InteractIcon from 'src/components/InteractIcon';

import { IconBackIos, IconCMedal } from 'src/components/CustomIcons';

import Api from 'src/api';

export default function ProfileLikedPosts({ route, navigation }) {
  // console.log('route params -> ', route.params);
  const likedData = route.params;

  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const spacing = top % 1 === 0 ? bottom + top : 0;

  const VIEW_HEIGHT = height - (57 + spacing);

  const t = useContext(LocaleContext);

  const goBack = () => navigation.goBack();

  const LikedPostsArea = () => {
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
    videoLength.current = likedData.length;
    return (
      <ScrollView
        style={{
          // flex: 1,
          backgroundColor: 'transparent',
        }}
        pagingEnabled
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        // onMomentumScrollEnd={onMomentumScrollEnd}
      >
        {likedData.map((page, index) => {
          return (
            <>
              <LikeVideo
                ref={videoViewRef}
                data={page}
                height={VIEW_HEIGHT}
                videoRef={videoRef}
                navigation={navigation}
                // viewComments={() => routeComments(entry)}
              />
              <Animated.View
                key={page._id}
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
                  source={{ uri: page.entryMediaURL }}
                  resizeMode="contain"
                  style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                  isLooping
                  shouldPlay={true}
                  onReadyForDisplay={() =>
                    Animated.timing(opacity, {
                      toValue: 1,
                      useNativeDriver: true,
                      duration: 500,
                    }).start()
                  }
                />
              </Animated.View>
            </>
          );
        })}
      </ScrollView>
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
          <LikedPostsArea />
        </View>
      </View>
    </Layout>
  );
}
