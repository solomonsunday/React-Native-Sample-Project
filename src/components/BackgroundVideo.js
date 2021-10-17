import React, { useMemo } from 'react';

// prettier-ignore
import {
  Animated, StyleSheet, Image, View,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';

import { Video } from 'expo-av';

// import { Asset } from 'expo-asset';

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default function BackgroundVideo(props) {
  // prettier-ignore
  const {
    videoUri, thumbUri, style, isMuted,
  } = props;

  const isFocused = useIsFocused();

  const opacity = useMemo(() => new Animated.Value(0.75), []);

  const thumbOpacity = useMemo(() => new Animated.Value(0.75), []);

  // const [cachedUri, setCachedUri] = useState(null);
  //
  // useMemo(() => {
  //   (async () => {
  //     try {
  //       const [{ localUri }] = await Asset.loadAsync(videoUri);
  //
  //       setCachedUri(localUri);
  //     } catch (e) {
  //       const err = e;
  //     }
  //   })();
  // }, [videoUri]);

  // prettier-ignore
  const VideoThumb = () => (thumbUri ? (
    <Animated.View
      style={[styles.backgroundViewWrapper, { opacity: thumbOpacity }]}
    >
      <Image
        source={thumbUri}
        defaultSource={thumbUri}
        style={[
          style,
          {
            width: '100%',
            height: '100%',
          },
        ]}
        resizeMode="cover"
        onLoad={() => {
          Animated.timing(thumbOpacity, {
            toValue: 1,
            useNativeDriver: true,
            duration: 1000,
          }).start();
        }}
      />
    </Animated.View>
  ) : null);

  return (
    <View style={styles.background}>
      <VideoThumb />
      {isFocused ? (
        <Animated.View style={[styles.backgroundViewWrapper, { opacity }]}>
          <Video
            isLooping
            source={{ uri: videoUri }}
            onLoad={() => {
              Animated.timing(opacity, {
                toValue: 1,
                useNativeDriver: true,
                duration: 1000,
              }).start();
            }}
            // usePoster
            // posterSource={thumbUri}
            // posterStyle={{
            //   resizeMode: 'cover',
            //   height: '100%',
            //   width: '100%',
            // }}
            resizeMode="cover"
            isMuted={isMuted}
            shouldPlay={isFocused || false}
            style={[style, { flex: 1 }]}
          />
        </Animated.View>
      ) : null}
    </View>
  );
}
