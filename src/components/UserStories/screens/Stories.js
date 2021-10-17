import React, { useRef, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import Video from 'react-native-video';

import FastImage from 'react-native-fast-image';

// import Modal from 'react-native-modalbox';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import AllStories from '../constants/AllStories';
import StoryContainer from '../components/StoryContainer';

import { Text } from '@ui-kitten/components';
import { v4 as uuidv4 } from 'uuid';
import { LinearGradient } from 'expo-linear-gradient';

const Stories = (props) => {
  const { storyData, extraWidth } = props;
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const { width, height } = useWindowDimensions();
  const IS_PORTRAIT = height > width;
  const COLUMN_COUNT = IS_PORTRAIT ? 3 : 5;

  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (storyData.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      // console.log('next');
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      // console.log('previous');
      setCurrentScrollValue(scrollValue);
    }
  };

  // console.log('story is -> ', storyData);

  return (
    <View style={styles.container}>
      <FlatList
        data={storyData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ index }) => (
          <TouchableOpacity
            activeOpacity={0.75}
            style={{
              height: 150,
              width: IS_PORTRAIT
                ? width / (COLUMN_COUNT + extraWidth)
                : width / (COLUMN_COUNT + extraWidth),
              paddingHorizontal: 3,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'flex-start',
              overflow: 'hidden',
            }}
            onPress={() => onStorySelect(index)}
          >
            {storyData[index].items[0].type === 'photo' ? (
              <FastImage
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 5,
                }}
                source={{
                  uri: storyData[index].items[0].srcURL,
                  priority: FastImage.priority.cover,
                }}
              />
            ) : (
              <Video
                source={{ uri: storyData[index].items[0].srcURL }}
                style={{
                  height: '100%',
                  width: '100%',
                  borderRadius: 5,
                }}
                volume={0}
                resizeMode="cover"
                shouldPlay={true}
                isMuted={true}
                isLooping={true}
              />
            )}

            <LinearGradient
              colors={['#043F7C', '#FF5757']}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: 57,
                bottom: 80,
                zIndex: 1000,
              }}
            >
              <Image
                source={{ uri: storyData[index].userImageURL }}
                defaultSource={require('../../../assets/images/banner/placeholder-image.png')}
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 45 / 2,
                  borderColor: 'white',
                }}
                resizeMode="cover"
              />
            </LinearGradient>
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                position: 'absolute',
                // bottom: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                padding: 5,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'flex-start',
                zIndex: 50,
              }}
            >
              <Text
                category="s2"
                style={{
                  color: 'white',
                  marginLeft: 5,
                  marginTop: 50,
                  zIndex: 1000,
                }}
                numberOfLines={1}
              >
                {storyData[index].userLastName.toLowerCase().capitalize()}
              </Text>
              <Text
                category="s2"
                style={{
                  color: 'white',
                  marginBottom: 5,
                  marginLeft: 5,
                  zIndex: 1000,
                }}
                numberOfLines={1}
              >
                {storyData[index].userFirstName.toLowerCase().capitalize()}
              </Text>
            </View>
          </TouchableOpacity>
          // <TouchableOpacity
          //   activeOpacity={0.75}
          //   style={{
          //     // width: IS_PORTRAIT
          //     //   ? width / (4 + extraWidth)
          //     //   : width / (6 + extraWidth),
          //     marginRight: 10,
          //   }}
          // onPress={() => onStorySelect(index)}
          // >
          //   <View
          //     style={{
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //     }}
          //   >
          //     <LinearGradient
          //       colors={['#043F7C', '#FF5757']}
          //       style={{
          //         height: 40,
          //         width: 40,
          //         borderRadius: 20,
          //         alignItems: 'center',
          //         justifyContent: 'center',
          //       }}
          //     >
          //       <Image
          //         source={{ uri: storyData[index].userImageURL }}
          //         style={{
          //           height: 80,
          //           width: 80,
          //           borderRadius: 40,
          //         }}
          //         resizeMode="contain"
          //         isHorizontal
          //       />
          //     </LinearGradient>
          //     <Text
          //       numberOfLines={1}
          //       category="c2"
          //       style={{ marginTop: 10, textAlign: 'center' }}
          //     >
          //       {storyData[index].userLastName.toLowerCase().capitalize()}
          //     </Text>
          //   </View>
          // </TouchableOpacity>
        )}
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal
          callBackAfterSwipe={(g) => onScrollChange(g)}
          ref={modalScroll}
          style={styles.container}
        >
          {storyData.map((item, index) => (
            <StoryContainer
              key={index}
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 9,
    textAlign: 'center',
  },
});

export default Stories;
