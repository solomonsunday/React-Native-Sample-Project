import React, {
  Component,
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  Share,
  TouchableWithoutFeedback,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';

import UserTemplate from '../UserTemplate/index';

import Moment from 'react-moment';

import Api from 'src/api';

import useAppSettings from 'src/reducers/useAppSettings';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LinearGradient } from 'expo-linear-gradient';

import FastImage from 'react-native-fast-image';

// prettier-ignore
import {
    Text, Button, Divider, Layout, Input, List
  } from '@ui-kitten/components';

import { useFocusEffect } from '@react-navigation/native';

import { AppSettingsContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import firebase from '@react-native-firebase/app';

import dl from '@react-native-firebase/dynamic-links';

import '@react-native-firebase/auth';

import firestore from '@react-native-firebase/firestore';

import { SendMessage, RecieveMessage } from '../../services/Firebase/Message';

import { AddUser } from '../../services/Firebase/Users';

import InteractIcon from 'src/components/InteractIcon';

import { Toast, Content, Root } from 'native-base';

import {
  sendComment,
  handleLike,
  handleFollow,
  getUserData,
  viewVideo,
  handleBookmark,
} from '../../services/Requests/index';

import {
  IconCHeart,
  IconCChat,
  IconCShareVariant,
  IconMoreHorizontal,
  IconPaperPlane,
  IconBookmark,
  IconSearch,
  IconCEye,
} from 'src/components/CustomIcons';

import axios from 'axios';

import { Feather, Ionicons } from '@expo/vector-icons';

import { TextInput } from 'react-native';

import Search from '../../screens/User/Common/Search/index';

export default function ImageView({ data, viewHeight, navigation, t }) {
  // const db = firebase.firestore();
  // prettier-ignore
  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const [appTheme, setTheme] = useState('');
  const [_userId, setUserId] = useState('');
  const [userImg, setUserImg] = useState('');
  const [shareLink, setShareLink] = useState('');

  const getTheme = async () => {
    const res = await AsyncStorage.getItem('appTheme');
    setTheme(res);
  };

  const getUserId = async () => {
    const res = await AsyncStorage.getItem('userid');
    setUserId(res);
    // console.log(res);
  };

  const getUserImg = async () => {
    const res = await AsyncStorage.getItem('userImage');
    setUserImg(res);
  };

  getUserId();
  getTheme();
  getUserImg();

  const { item } = data;

  const { userId } = item;

  const sheetRef = useRef(null);

  const sendSheet = useRef(null);

  const [isBookmarked, setBookmarked] = useState(item.userEntryData.isBookmark);

  const [isLiked, setLiked] = useState(item.userEntryData.isLike);

  const [totalLikes, setTotalLikes] = useState(item.totalLikes);

  const [form, setFormValues] = useState({
    comment: '',
    entryId: item.userId,
  });

  const [following, setFollowing] = useState(item.userEntryData.isFollow);

  const likeData = {
    entryId: item._id,
    isLike: isLiked,
  };

  const [userList, setUserList] = useState([]);

  const fetchUsers = async () => {
    const res = await Api.getAllUsers(searchForm.value);
    const { users } = res;
    setUserList([...users]);
  };

  const generateLink = async (params, value) => {
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

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      json: true,
      body: JSON.stringify({
        dynamicLinkInfo: {
          // ios: {
          //   bundleId: 'app.woozeee.com',
          //   appStoreId: '1549457766',
          // },
          // android: {
          //   packageName: 'app.woozeee.com',
          // },
          domainUriPrefix: 'https://app.woozeee.com',
          link: `https://app.woozeee.com/entry/?${params}=${value}`,
          // social: JSON.stringify({
          //   title: 'woozeee Challenges',
          //   descriptionText: 'Challenge entry on woozeee',
          //   imageUrl:
          //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxO_eYxfA2ZQaIuJIIEuYm8d72bH2jgHwvBA&usqp=CAU',
          // }),
        },
      }),
    };

    const res = await fetch(
      'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
      requestOptions,
    );
    const _res = await res.json();
    console.log(_res);
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
            // ios: {
            //   bundleId: 'app.woozeee.com',
            //   appStoreId: '1549457766',
            // },
            // android: {
            //   packageName: 'app.woozeee.com',
            // },
            domainUriPrefix: 'https://app.woozeee.com',
            link: `https://app.woozeee.com/entry/?${params}=${value}`,
            // social: JSON.stringify({
            //   title: 'woozeee Challenges',
            //   descriptionText: 'Challenge entry on woozeee',
            //   imageUrl:
            //     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxO_eYxfA2ZQaIuJIIEuYm8d72bH2jgHwvBA&usqp=CAU',
            // }),
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
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log(result.activityType);
          alert('Done');
          sheetRef.current.close();
        } else {
          // shared
          alert('Post Shared!');
          sheetRef.current.close();
        }
      } else if (result.action === Share.dismissedAction) {
        // alert('Action dismissed');
      }
      sheetRef.current.close();
    } catch (e) {
      console.log(e);
    }
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

  const deletePost = async (entryId) => {
    sheetRef.current.close();
    Alert.alert(
      'Delete Action',
      'Are you sure you want to delete this post ?',
      [
        {
          text: 'No',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const res = await Api.deleteUserPosts(entryId);
            if (res.statusCode == 200) {
              //close sheet and bring up suceess toast
              Toast.show({
                text: 'Post successfully deleted',
                buttonText: 'Okay',
                position: 'bottom',
                type: 'success',
                duration: 3000,
              });
            } else {
              //close sheet and bring up suceess toast
              Toast.show({
                text: 'Unable to delete post',
                buttonText: 'Okay',
                position: 'bottom',
                type: 'success',
                duration: 3000,
              });
            }
          },
          style: 'ok',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const toggleBookmark = async () => {
    setBookmarked(!isBookmarked);
    // console.log(!isBookmarked);
    const res = await handleBookmark(item.userEntryData.entryId, !isBookmarked);
    // console.log(res);
  };

  const toggleFollow = async () => {
    setFollowing(!following);
    await handleFollow(userId, !following);
  };

  const sendComment = async (commentMessage) => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);

    const firebaseConfig = {
      apiKey: 'AIzaSyARWCPqpauNDiveSI26tvmKsyn4p_XNzh8',
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

    await firestore()
      .collection('entryComments')
      .doc(data.item._id.trim())
      .collection('comments')
      .doc()
      .set({
        senderId: userData.data.user._id,
        text: commentMessage,
        userFirstName: userData.data.user.fName,
        userLastName: userData.data.user.sName,
        userName: `@iam${userData.data.user.fName.toLowerCase()}${userData.data.user.sName.toLowerCase()}`,
        imgUrl: userData.data.user.sName.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      });
  };

  const sharePostToDm = async (
    currentUserId,
    guestUserId,
    postUrl,
    name,
    guestUserImg,
  ) => {
    SendMessage(currentUserId, guestUserId, postUrl, '')
      .then((res) => {
        // console.log(res);
        // this.setState({ message: '' })
      })
      .catch((err) => {
        alert(err);
      });

    RecieveMessage(currentUserId, guestUserId, postUrl, '')
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        alert(err);
      });

    AddUser(name, guestUserId, guestUserImg);

    sendSheet.current.close();
  };

  const routeReport = () => {
    sheetRef.current.close();
    navigation.navigate('Report', data);
  };

  const routeUserProfile = async () => {
    const userData = await getUserData(item.userId);
    const { data } = userData;
    // await navigation.navigate('UserProfile', data);

    item.userId !== _userId
      ? await navigation.navigate('UserProfile', data)
      : await navigation.navigate('ProfileTab');
  };

  const routeComments = async () => {
    const userId = await AsyncStorage.getItem('userid');
    const userData = await getUserData(userId);
    const { data } = userData;
    await navigation.navigate('Comments', {
      currUserData: data,
      postItem: item,
    });
  };

  const handleSend = async () => {
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
            link: `https://app.woozeee.com/entry/?$entries=${item._id}`,
          },
        }),
      };

      const res = await fetch(
        'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
        requestOptions,
      );
      const _res = await res.json();
      setShareLink(_res.shortLink);
    } catch (e) {
      console.log(e);
    }

    sendSheet.current.open();
  };

  const handleOpenSheet = () => sheetRef.current.open();

  const [text, setText] = useState('');

  const [searchForm, setSearchFormValues] = useState({
    value: '',
    status: 'basic',
  });

  const handleChange = (inputSearch) => {
    setSearchFormValues((prevState) => ({
      ...prevState,
      value: inputSearch,
    }));
  };

  let params = { chat: null };
  let _route = { params };

  return useMemo(
    () => (
      <Root>
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderColor: 'rgba(143, 155, 179, 0.08)',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingLeft: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                activeOpacity={0.75}
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={routeUserProfile}
              >
                <LinearGradient
                  colors={['#043F7C', '#FF5757']}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FastImage
                    style={{
                      height: 36,
                      width: 36,
                      borderRadius: 18,
                      borderColor: 'white',
                    }}
                    source={{
                      uri: item.userImageURL,
                      priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </LinearGradient>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingRight: 5,
                    paddingLeft: 5,
                    maxWidth: 190,
                  }}
                >
                  <Text
                    status="primary"
                    category="s2"
                    style={{ marginRight: 5 }}
                  >
                    {item.userDisplayName}
                  </Text>
                  <Text status="danger" category="s2">
                    {/* {item.userDisplayName} */}
                  </Text>
                </View>
                {/* <FastImage
                style={{
                  height: 16,
                  width: 16,
                  borderRadius: 8,
                }}
                source={{
                  uri: item.mediaURL,
                  priority: FastImage.priority.normal,
                }}
                resizeMode={FastImage.resizeMode.cover}
              /> */}
                {/* <Image
                  source={require('assets/images/icon/verified-1.png')}
                  defaultSource={require('assets/images/icon/verified-1.png')}
                  style={{
                    height: 16,
                    width: 16,
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                /> */}
              </TouchableOpacity>
            </View>
            <View>
              <InteractIcon
                style={{ marginHorizontal: 5 }}
                Accessory={IconMoreHorizontal}
                status="basic"
                height={28}
                width={28}
                onPress={handleOpenSheet}
              />
            </View>
          </View>
          <TouchableWithoutFeedback
          // onPress={
          //   data.item.type && data.item.type == 'video'
          //     ? () => toggleMute()
          //     : null
          // }
          >
            <View
              style={{
                marginVertical: 10,
                height: viewHeight - 100,
              }}
            >
              {data.item.description !== '' && (
                <Text
                  // status="primary"
                  category="s2"
                  style={{ marginLeft: 10, marginBottom: 8, width: '90%' }}
                >
                  {data.item.description}
                </Text>
              )}
              <ImageBackground
                blurRadius={10}
                style={{
                  flex: 1,
                  zIndex: 100,
                }}
                source={{ uri: item.mediaURL }}
                resizeMode="stretch"
              >
                <FastImage
                  style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    zIndex: 1000,
                  }}
                  source={{
                    uri: item.mediaURL,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </ImageBackground>
            </View>
          </TouchableWithoutFeedback>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: 5,
              }}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 8,
                }}
              >
                {isLiked ? (
                  <Ionicons
                    name="md-heart-sharp"
                    style={{
                      marginVertical: 1,
                      marginRight: 5,
                    }}
                    size={22}
                    color="red"
                    onPress={toggleLike}
                  />
                ) : (
                  <Ionicons
                    name="ios-heart-outline"
                    style={{
                      marginVertical: 1,
                      marginRight: 5,
                    }}
                    size={22}
                    color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                    onPress={toggleLike}
                  />
                )}
                {totalLikes > 0 && (
                  <Text
                    category="s2"
                    style={{ color: isLiked ? 'red' : 'gray' }}
                  >
                    {totalLikes}
                  </Text>
                )}
              </View>
              <Ionicons
                name="ios-chatbox-ellipses-outline"
                style={{
                  marginVertical: 2,
                  marginHorizontal: 10,
                }}
                size={21}
                color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                onPress={routeComments}
              />
              <Feather
                name="send"
                size={20}
                color={appTheme === '#F7F9FC' ? 'black' : 'white'}
                style={{
                  marginVertical: 2,
                  marginHorizontal: 8,
                }}
                onPress={
                  () => handleSend()
                  // props.navigation.navigate('DeepLinkPost', { _id: item._id })
                }
              />
            </View>
            {/* <View>
              <InteractIcon
                style={{ marginHorizontal: 5 }}
                Accessory={(evaProps) => (
                  <IconBookmark {...evaProps} active={isBookmarked} />
                )}
                direction="row"
                status={isBookmarked ? 'danger' : 'basic'}
                height={24}
                width={24}
                onPress={toggleBookmark}
              />
            </View> */}
          </View>
          <View style={{ marginTop: 15, paddingHorizontal: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                // padding: 15,
                alignItems: 'center',
              }}
            >
              <LinearGradient
                colors={['#043F7C', '#FF5757']}
                style={{
                  height: 34,
                  width: 34,
                  borderRadius: 17,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FastImage
                  source={{
                    uri: userImg,
                    priority: FastImage.priority.normal,
                  }}
                  style={{
                    height: 36,
                    width: 36,
                    borderRadius: 18,
                    borderColor: 'white',
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </LinearGradient>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <TextInput
                  placeholder="Leave a comment"
                  onChangeText={(text) => setText(text)}
                  style={{
                    height: 40,
                    paddingHorizontal: 5,
                    color: 'grey',
                  }}
                  defaultValue={text}
                />
              </View>
              <View style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                <InteractIcon
                  Accessory={IconPaperPlane}
                  status="primary"
                  height={28}
                  width={28}
                  onPress={() => {
                    if (text !== '') {
                      sendComment(text);
                      setText('');
                    } else {
                      console.log('enter a comment');
                    }
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: 5 }}>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10 }}
                  />
                )}
              >
                {item.createdAt}
              </Moment>
            </View>
          </View>
        </View>
        <RBSheet
          ref={sheetRef}
          height={205}
          closeOnDragDown
          animationType="fade"
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            },
          }}
        >
          <Layout
            level="5"
            style={{
              flex: 1,
              width: '100%',
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              paddingBottom: 30,
            }}
          >
            {item.userId !== _userId ? (
              <Button
                appearance="ghost"
                status="basic"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
                onPress={toggleFollow}
              >
                <Text style={{ fontSize: 16 }} status="basic">
                  {following ? t('unfollow') : t('follow')}
                </Text>
              </Button>
            ) : (
              <Button
                appearance="ghost"
                status="basic"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                }}
                onPress={() => deletePost(item._id)}
              >
                <Text style={{ fontSize: 16 }} status="basic">
                  Delete Post
                </Text>
              </Button>
            )}
            <Divider style={{ marginVertical: 2, width: '100%' }} />
            <Button
              appearance="ghost"
              status="basic"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
              onPress={routeReport}
            >
              <Text style={{ fontSize: 16 }} status="basic">
                {t('makeReport')}
              </Text>
            </Button>
            {/* <Divider style={{ marginVertical: 2, width: '100%' }} />
            <Button
              appearance="ghost"
              status="basic"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Text style={{ fontSize: 16 }} status="basic">
                {t('downloadMedia')}
              </Text>
            </Button> */}
            <Divider style={{ marginVertical: 2, width: '100%' }} />
            <Button
              appearance="ghost"
              status="basic"
              style={{
                width: '100%',
                justifyContent: 'center',
              }}
              onPress={
                () => handleShare('entries', item._id)
                // () => generateLink('entries', item._id)
              }
            >
              <Text style={{ fontSize: 16 }} status="basic">
                {t('shareTo')}
              </Text>
            </Button>
          </Layout>
        </RBSheet>
        <RBSheet
          ref={sendSheet}
          height={400}
          closeOnDragDown
          animationType="fade"
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'transparent',
            },
          }}
        >
          <Layout
            level="5"
            style={{
              flex: 1,
              width: '100%',
              // paddingBottom: 30,
            }}
          >
            <View
              style={{
                height: '90%',
              }}
            >
              <View
                style={{
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                  marginHorizontal: 20,
                  marginTop: 15,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text category="h6" status="primary">
                  Share Post To
                </Text>
                <Feather
                  name="x"
                  size={24}
                  color="#2E5894"
                  onPress={() => sendSheet.current.close()}
                />
              </View>
              <Search
                route={_route}
                shareToDm={true}
                shareToDmFn={(_name, _guestUserId, _guestUserImg) =>
                  sharePostToDm(
                    _userId,
                    _guestUserId, //user's dm
                    shareLink,
                    _name,
                    _guestUserImg,
                  )
                }
              />
            </View>
          </Layout>
        </RBSheet>
      </Root>
    ),
    [data, isBookmarked, isLiked, totalLikes, following, navigation],
  );
}
