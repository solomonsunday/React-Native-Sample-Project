import React, {
  Component,
  useState,
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react';

import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
} from 'react-native';

import { Button, Text } from '@ui-kitten/components';

import firebase from '@react-native-firebase/app';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  IconCHeartToggle,
  IconCShare,
  IconEye,
  IconCChat,
  IconPlayPause,
  IconCVote,
  IconCCoin,
} from 'src/components/CustomIcons';

import {
  sendComment,
  handleLike,
  handleFollow,
  getUserData,
  getUserEntries,
} from '../../services/Requests/index';

import { LinearGradient } from 'expo-linear-gradient';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 99,
    // paddingBottom: 25,
  },
});

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

const VideoView = forwardRef((props, ref) => {
  // prettier-ignore
  const {
    data, height, videoRef, challenge, navigation
  } = props;

  const { item } = data;

  const [isLiked, setLiked] = useState(data.userEntryData.isLike);
  const [totalLikes, setTotalLikes] = useState(data.totalLikes);

  const [shouldPlay, setShouldPlay] = useState(true);

  const [muteState, setIsMuted] = useState(false);
  const likeData = {
    entryId: data._id,
    isLike: isLiked,
  };

  const routeUserProfile = async (userId) => {
    const userData = await getUserData(userId);
    const { data } = userData;
    await navigation.navigate('UserProfile', data);
  };

  const toggleLike = async () => {
    setLiked(!isLiked);
    const newLikesCount = isLiked ? totalLikes - 1 : totalLikes + 1;
    setTotalLikes(newLikesCount);

    // We want to update the total like count that is returned from the server
    // So we have fresh like count after interaction with the like icon (:
    handleLike(likeData).then((resData) => {
      // The meta contains new count for the entry
      // resData.meta.totalLikes.totalLikes
      // resData.meta.totalLikes.totalVotes
      // resData.meta.totalLikes.totalViews
      // resData.meta.totalLikes.totalComments
      setTotalLikes(resData.meta.totalLikes);
    });
  };

  const handleShare = async (params, value) => {
    const firebaseConfig = {
      apiKey: 'AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
      authDomain: 'woozeee-d7f6c.firebaseapp.com',
      databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
      projectId: 'woozeee-d7f6c',
      storageBucket: 'woozeee-d7f6c.appspot.com',
      messagingSenderId: '979696525592',
      appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
      measurementId: 'G-XQKMT94R9R',
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        json: true,
        body: JSON.stringify({
          dynamicLinkInfo: {
            domainUriPrefix: 'https://app.woozeee.com',
            link: `https://app.woozeee.com/entry/?${params}=${value}`,
          },
        }),
      };

      const res = await fetch(
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
        requestOptions,
      );
      const _res = await res.json();
      // console.log(_res);

      const result = await Share.share({
        message: _res.shortLink,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const [isVoted, setVoted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!muteState);
    videoRef.current.setIsMutedAsync(muteState);
  };

  const togglePause = useCallback(() => {
    // console.log(videoRef);
    (async () => {
      try {
        if (videoRef) {
          const status = await videoRef.current.getStatusAsync();

          if (!status.isLoaded) return;

          if (status.isPlaying) {
            await videoRef.current.pauseAsync();
            setShouldPlay(false);
          } else {
            await videoRef.current.playAsync();
            setShouldPlay(true);
          }
        }
      } catch (e) {
        const msg = e;
      }
    })();
  }, [videoRef]);

  const toggleVote = useCallback(() => setVoted((prevState) => !prevState), []);

  useImperativeHandle(ref, () => ({
    resetPlayState(playState) {
      setShouldPlay(playState);
    },
  }));

  let lastTap = null;
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleMute();
    } else {
      lastTap = now;
    }
  };

  const routeComments = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);
    await navigation.navigate('Comments', {
      currUserData: userData.data,
      postItem: data,
    });
  };

  return useMemo(
    () => (
      <View
        style={{
          flex: 1,
          height,
          zIndex: 95,
        }}
      >
        <TouchableWithoutFeedback onPress={() => handleDoubleTap()}>
          <View
            style={{
              backgroundColor: 'transparent',
              height,
            }}
          ></View>
        </TouchableWithoutFeedback>
        <View style={styles.uiContainer}>
          <TouchableWithoutFeedback onPress={() => toggleMute()}>
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,.5)']}
              // style={{ justifyContent: 'flex-end' }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  width: '100%',
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  paddingBottom: 20,
                }}
              >
                <View
                  style={{
                    width: '85%',
                    // paddingHorizontal: 5,
                    marginBottom: 30,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginBottom: 5,
                    }}
                  >
                    @{data.userDisplayName}
                  </Text>
                  {data.description ? (
                    <Text
                      category="h6"
                      style={{ color: 'white', fontSize: 14 }}
                    >
                      {data.description}{' '}
                      <Text
                        status="control"
                        category="h6"
                        style={{ fontWeight: 'bold' }}
                      >
                        #havefun💃 #makemoney💰 #giveback🎁 #woozeee
                        #woozeeet(wooz it)
                      </Text>
                    </Text>
                  ) : (
                    <Text
                      status="control"
                      category="h6"
                      style={{ fontWeight: 'bold' }}
                    >
                      #havefun💃 #makemoney💰 #giveback🎁 #woozeee
                      #woozeeet(wooz it)
                    </Text>
                  )}
                </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 15,
                      // zIndex: 1,
                    }}
                  >
                    <InteractIcon
                      status={!shouldPlay ? 'control' : 'success'}
                      Accessory={(evaProps) => (
                        <IconPlayPause {...evaProps} isPlaying={!shouldPlay} />
                      )}
                      height={33}
                      width={33}
                      onPress={togglePause}
                    />
                  </View>

                  <InteractIcon
                    style={{ marginBottom: 15 }}
                    Accessory={IconCHeartToggle}
                    status={isLiked ? 'danger' : 'control'}
                    textContent={data.totalLikes}
                    onPress={toggleLike}
                  />
                  <InteractIcon
                    style={{ marginBottom: 15 }}
                    Accessory={(evaProps) => <IconCChat {...evaProps} active />}
                    textContent={data.totalComments}
                    onPress={routeComments}
                  />
                  <InteractIcon
                    style={{ marginBottom: 15 }}
                    Accessory={(evaProps) => (
                      <IconCShare {...evaProps} active />
                    )}
                    onPress={() => handleShare('entries', data._id)}
                  />

                  <TouchableOpacity
                    style={{ alignItems: 'center', marginBottom: 5 }}
                    onPress={() => routeUserProfile(data.userId)}
                  >
                    <Image
                      source={{ uri: data.userImageURL }}
                      defaultSource={require('assets/images/banner/profile.jpg')}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 20,
                        borderWidth: 2,
                        borderColor: 'white',
                      }}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </TouchableWithoutFeedback>
        </View>
      </View>
    ),
    [
      height,
      item,
      challenge,
      shouldPlay,
      togglePause,
      isLiked,
      toggleLike,
      isVoted,
      toggleVote,
    ],
  );
});

export default VideoView;
