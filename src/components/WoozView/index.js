import React from 'react';

import {
  View,
  Animated,
  ScrollView,
  useWindowDimensions,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';

import { Video } from 'expo-av';

import VideoFullscreen from 'src/components/VideoFullscreen';

export default function WoozView({
  VIEW_HEIGHT,
  item,
  videoViewRef,
  videoRef,
  navigation,
  index,
  opacity,
  isFocused,
}) {
  console.log('item is => ', item);
  return (
    <View style={{ flex: 1 }}>
      <React.Fragment>
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
        <VideoFullscreen
          ref={videoViewRef}
          data={item}
          height={VIEW_HEIGHT}
          videoRef={videoRef}
          navigation={navigation}
        />
      </React.Fragment>
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
          source={{ uri: item.mediaURL }}
          isLooping
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
    </View>
  );
}
