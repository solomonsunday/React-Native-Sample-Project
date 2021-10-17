/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
// import Image from 'react-native-scalable-image';
import PropTypes from 'prop-types';

const ScreenWidth = Dimensions.get('window').width;

const Story = (props) => {
  const { story } = props;
  const { srcURL, type } = story || {};

  return (
    <View style={styles.container}>
      {type === 'photo' ? (
        <Image
          source={{ uri: srcURL }}
          onLoadEnd={props.onImageLoaded}
          style={styles.content}
          resizeMode="contain"
        />
      ) : (
        <Video
          source={{ uri: srcURL }}
          paused={props.pause || props.isNewStory}
          onLoad={(item) => props.onVideoLoaded(item)}
          style={styles.content}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

Story.propTypes = {
  story: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  content: { flex: 1, width: undefined, height: undefined },
  imageContent: {
    width: '100%',
    height: '100%',
    flex: 1,
  },
});

export default Story;
