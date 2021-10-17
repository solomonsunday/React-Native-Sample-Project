import React from 'react';

import { Video } from 'expo-av';

import { useIsFocused } from '@react-navigation/native';

export default function CustomVideoPlayer(props) {
  const {
    videoUri,
    shouldPlay,
    shouldDisplay,
    isPreloaded,
    resizeMode,
    style,
    ...otherProps
  } = props;

  const isFocused = useIsFocused();

  return (shouldDisplay || isPreloaded) && isFocused ? (
    <Video
      {...otherProps}
      source={{ uri: videoUri }}
      shouldCorrectPitch
      resizeMode={resizeMode}
      usePoster
      posterSource={require('assets/images/banner/placeholder-image.png')}
      posterStyle={{ resizeMode, height: '100%', width: '100%' }}
      style={[style, { flex: 1 }]}
      shouldPlay={shouldPlay && shouldDisplay && isFocused}
    />
  ) : null;
}
