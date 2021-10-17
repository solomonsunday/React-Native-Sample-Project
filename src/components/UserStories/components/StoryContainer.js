import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modalbox';
import GestureRecognizer from 'react-native-swipe-gestures';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import Story from './Story';
import UserView from './UserView';
import Readmore from './Readmore';
import ProgressArray from './ProgressArray';

const SCREEN_WIDTH = Dimensions.get('window').width;

const StoryContainer = (props) => {
  const { user } = props;
  // console.log('from story container user is -> ', user);
  const { items = [] } = user || {};
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModelOpen, setModel] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [isLoaded, setLoaded] = useState(false);
  const [duration, setDuration] = useState(3);
  const story = items.length ? items[currentIndex] : {};
  const { isReadMore, url } = story || {};

  const [reply, setReply] = useState('');

  // const onVideoLoaded = (length) => {
  //   props.onVideoLoaded(length.duration);
  // };

  const changeStory = (evt) => {
    if (evt.locationX > SCREEN_WIDTH / 2) {
      nextStory();
    } else {
      prevStory();
    }
  };

  const nextStory = () => {
    if (items.length - 1 > currentIndex) {
      setCurrentIndex(currentIndex + 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryNext();
    }
  };

  const prevStory = () => {
    if (currentIndex > 0 && items.length) {
      setCurrentIndex(currentIndex - 1);
      setLoaded(false);
      setDuration(3);
    } else {
      setCurrentIndex(0);
      props.onStoryPrevious();
    }
  };

  const onImageLoaded = () => {
    setLoaded(true);
  };

  const onVideoLoaded = (length) => {
    setLoaded(true);
    setDuration(length.duration);
  };

  const onPause = (result) => {
    setIsPause(result);
  };

  const onReadMoreOpen = () => {
    setIsPause(true);
    setModel(true);
  };
  const onReadMoreClose = () => {
    setIsPause(false);
    setModel(false);
  };

  const loading = () => {
    if (!isLoaded) {
      return (
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={[styles.loading, { backgroundColor: 'red' }]}
        >
          <View style={{ width: 1, height: 1 }}>
            <Story
              onImageLoaded={onImageLoaded}
              pause
              onVideoLoaded={onVideoLoaded}
              story={story}
            />
          </View>
          <ActivityIndicator color="white" />
        </LinearGradient>
      );
    }
  };

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };

  const onSwipeDown = () => {
    if (!isModelOpen) {
      props.onClose();
    } else {
      setModel(false);
    }
  };

  const onSwipeUp = () => {
    if (!isModelOpen && isReadMore) {
      setModel(true);
    }
  };

  return (
    <GestureRecognizer
      onSwipeDown={onSwipeDown}
      onSwipeUp={onSwipeUp}
      config={config}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={1}
        delayLongPress={500}
        onPress={(e) => changeStory(e.nativeEvent)}
        onLongPress={() => onPause(true)}
        onPressOut={() => onPause(false)}
        style={styles.container}
      >
        <View style={styles.container}>
          <Story
            onImageLoaded={onImageLoaded}
            pause={isPause}
            isNewStory={props.isNewStory}
            onVideoLoaded={onVideoLoaded}
            story={story}
          />

          {loading()}

          <UserView
            name={`${user.userFirstName} ${user.userLastName} `}
            profile={user.userImageURL}
            onClosePress={props.onClose}
            details={items}
          />
          {/* <View
            style={{
              position: 'absolute',
              backgroundColor: 'transparent',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 15,
              width: '100%',
              top: 800,
            }}
          >
            <TextInput
              placeholder="Reply..."
              onFocus={() => setIsPause(true)}
              placeholderTextColor="black"
              onChangeText={(text) => setReply(text)}
              style={{
                width: '85%',
                borderRadius: 50,
                height: 55,
                color: 'black',
                backgroundColor: 'white',
                paddingHorizontal: 15,
              }}
              defaultValue={reply}
            />
            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                height: 50,
                width: 50,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => console.log(reply, story)}
            >
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View> */}

          {/* <Readmore onReadMore={onReadMoreOpen} /> */}
          {/* {isReadMore && <Readmore onReadMore={onReadMoreOpen} />} */}

          <ProgressArray
            next={nextStory}
            isLoaded={isLoaded}
            duration={duration}
            pause={isPause}
            isNewStory={props.isNewStory}
            stories={items}
            currentIndex={currentIndex}
            currentStory={items[currentIndex]}
            length={items.map((_, i) => i)}
            progress={{ id: currentIndex }}
          />
        </View>

        <Modal
          style={styles.modal}
          position="bottom"
          isOpen={isModelOpen}
          onClosed={onReadMoreClose}
        >
          <View style={styles.bar} />
          {/* <WebView source={{ uri: 'https://www.google.com' }} /> */}
        </Modal>
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  progressBarArray: {
    flexDirection: 'row',
    position: 'absolute',
    top: 30,
    width: '98%',
    height: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userView: {
    flexDirection: 'row',
    position: 'absolute',
    top: 55,
    width: '98%',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 12,
    color: 'white',
  },
  time: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 3,
    marginLeft: 12,
    color: 'white',
  },
  content: { width: '100%', height: '100%' },
  loading: {
    // backgroundColor: '#FF5757',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '90%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bar: {
    width: 50,
    height: 8,
    backgroundColor: 'gray',
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 8,
  },
});

export default StoryContainer;
