// prettier-ignore
import React, {
  useState, useMemo, useCallback, useContext, useEffect, useRef
} from 'react';

// prettier-ignore
import {
  TextInput,
  View,
  Image,
  useWindowDimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import Moment from 'react-moment';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

// prettier-ignore
import {
  Layout, Card, Text, List
} from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import InteractIcon from 'src/components/InteractIcon';

import { IconClose, IconPaperPlane } from 'src/components/CustomIcons';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

export default function Comments({ route, navigation }) {
  const { height } = useWindowDimensions();

  const [isLoading, setLoading] = useState(false);

  const replyRef = useRef(null);

  const { bottom, top } = useSafeAreaInsets();

  const INSETS = bottom + top + 180;

  const t = useContext(LocaleContext);

  const { currUserData, postItem } = route.params;

  const [showReplies, setShowReplies] = useState(false);

  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [commentId, setCommentId] = useState('');
  const [userImg, setUserImg] = useState('');

  const getUserImg = async () => {
    const res = await AsyncStorage.getItem('userImage');
    setUserImg(res);
    // console.log('image is ->', res);
  };

  getUserImg();

  const fetchComments = async () => {
    setLoading(true);
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

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (e) {
      console.log(e);
    }

    const allComments = await firestore()
      .collection('entryComments')
      .doc(postItem._id.trim())
      .collection('comments')
      .orderBy('sentAt', 'asc')
      .get();

    const _comments = [];
    // console.log(' allcomments is', allComments);
    allComments.forEach((snap) => {
      let replies = Object.assign(snap._data, {
        replyId: snap.id,
        parentCommentId: snap._ref._documentPath._parts[3],
      });
      _comments.push(replies);
    });

    setComments([..._comments]);
    // console.log('fetched comments is', _comments);
    setLoading(false);
  };

  const fetchReplies = async (commentId) => {
    setShowReplies(!showReplies);
    // console.log(commentId);
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

    try {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    } catch (e) {
      console.log(e);
    }

    const allReplies = await firestore()
      .collection('entryComments')
      .doc(postItem._id.trim())
      .collection('comments')
      .doc(commentId)
      .collection('replies')
      .get();

    const _replies = [];
    allReplies.forEach((snap) => {
      let replies = Object.assign(snap._data, { commentId: commentId });
      _replies.push(replies);
    });

    setReplies([..._replies]);
    // console.log('fetched replies are', _replies);
  };

  // setTimeout(() => {

  //   setLoading(false);
  // }, 3000);

  useEffect(() => {
    fetchComments();
  }, []);

  const closeComments = useCallback(() => navigation.pop(), [navigation]);

  const renderCardHeader = useCallback(
    () => (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 15,
        }}
      >
        <Text category="h5">{t('comments')}</Text>
        <View>
          <InteractIcon
            Accessory={IconClose}
            status="primary"
            height={32}
            width={32}
            onPress={closeComments}
          />
        </View>
      </View>
    ),
    [t, closeComments],
  );

  const sendComment = async (commentMessage) => {
    // console.log(entryId);
    if (commentId) {
      // console.log(commentMessage, commentId);
      setCommentId('');
    } else {
      // console.log(commentMessage);
      return;
    }
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
    // // console.log(item, commentMessage);

    if (commentId) {
      await firestore()
        .collection('entryComments')
        .doc(postItem._id.trim())
        .collection('comments')
        .doc(commentId)
        .collection('replies')
        .add({
          senderId: currUserData.user._id,
          text: commentMessage,
          userFirstName: currUserData.user.fName,
          userLastName: currUserData.user.sName,
          userName: `@iam${currUserData.user.fName.toLowerCase()}${currUserData.user.sName.toLowerCase()}`,
          imgUrl: currUserData.user.imgUrl,
          sentAt: Date(),
          delivered: false,
          sent: true,
        });
    } else {
      await firestore()
        .collection('entryComments')
        .doc(postItem._id.trim())
        .collection('comments')
        .doc()
        .set({
          senderId: currUserData.user._id,
          text: commentMessage,
          userFirstName: currUserData.user.fName,
          userLastName: currUserData.user.sName,
          userName: `@iam${currUserData.user.fName.toLowerCase()}${currUserData.user.sName.toLowerCase()}`,
          imgUrl: currUserData.user.imgUrl,
          sentAt: Date(),
          delivered: false,
          sent: true,
        });
    }
    setComments([
      ...comments,
      {
        senderId: currUserData.user._id,
        text: commentMessage,
        userFirstName: currUserData.user.fName,
        userLastName: currUserData.user.sName,
        userName: `@iam${currUserData.user.fName.toLowerCase()}${currUserData.user.sName.toLowerCase()}`,
        imgUrl: currUserData.user.imgUrl,
        sentAt: Date(),
        delivered: false,
        sent: true,
      },
    ]);
  };

  const renderCardFooter = () => {
    const [text, setText] = useState('');
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 15,
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
          <Image
            source={{ uri: userImg }}
            // defaultSource={require('assets/images/user/user1.png')}
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <TextInput
            ref={replyRef}
            placeholder="Leave a comment"
            onChangeText={(text) => setText(text)}
            style={{
              borderWidth: 0.5,
              height: 40,
              paddingHorizontal: 5,

              borderColor: 'gray',
              borderRadius: 5,
              color: 'grey',
            }}
            defaultValue={text}
          />
        </View>
        <InteractIcon
          Accessory={IconPaperPlane}
          status="primary"
          height={32}
          width={32}
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
    );
  };

  const changeFocus = (_id) => {
    replyRef.current.focus();
    setCommentId(_id);
  };

  const ReplyComponent = ({ userName, message, img, time, replyId }) => {
    return (
      <View style={{ marginLeft: 40 }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 15,
            }}
          >
            <LinearGradient
              colors={['#043F7C', '#FF5757']}
              style={{
                height: 24,
                width: 24,
                borderRadius: 12,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Image
                source={img}
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 10,
                  borderColor: 'white',
                }}
              />
            </LinearGradient>
            <Layout
              level="4"
              style={{
                flex: 1,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                category="c2"
                style={{ alignSelf: 'flex-start', marginBottom: 2 }}
              >
                {userName}
              </Text>
              <Text category="c2" style={{ marginBottom: 2 }}>
                {message}
              </Text>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, textAlign: 'right' }}
                  />
                )}
              >
                {time}
              </Moment>
            </Layout>
          </View>
          <View style={{ marginVertical: 5, marginLeft: 50 }}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => changeFocus(replyId)}
            >
              <Text category="c2">{t('reply')}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ReplyComponent />
      </View>
    );
  };

  // prettier-ignore
  const Message = ({ userName, message, img, time, replyId, parentCommentId }) => {
    return useMemo(
      () => (
        <View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginTop: 15,
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
                <Image
                  source={{uri: img}}
                  style={{
                    height: 30,
                    width: 30,
                    borderRadius: 15,
                    borderColor: 'white',
                  }}
                />
              </LinearGradient>
              <Layout
                level="4"
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 10,
                  marginHorizontal: 5,
                }}
              >
                <Text category="s2" style={{ alignSelf: 'flex-start', marginBottom:2 }}>
                  {userName}
                </Text>
                <Text category="p2" style={{ marginBottom:2 }}>{message}</Text>
                <Moment
                  fromNow
                  element={(momentProps) => (
                    <Text category="c1" {...momentProps} style={{ fontSize: 10, textAlign:'right' }} />
                  )}
                >
                  {time}
                </Moment>
              </Layout>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <View style={{ marginVertical: 5, marginLeft: 50 }}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => changeFocus(replyId)}
                >
                  <Text category="c1">{t('reply')}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 5, marginLeft: 20 }}>
                <TouchableOpacity
                  activeOpacity={0.75}
                  onPress={() => fetchReplies(replyId)}
                >
                <Text category="c1">View replies</Text> 
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {replies.length > 0 && parentCommentId == replies[0].commentId ? (
            replies.map((reply, index) => (
              <>
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  marginTop: 15,
                  marginLeft:40
                }}
              >
                {/* <LinearGradient
                  colors={['#043F7C', '#FF5757']}
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    source={reply.imgUrl}
                    style={{
                      height: 30,
                      width: 30,
                      borderRadius: 15,
                      borderColor: 'white',
                    }}
                  />
                </LinearGradient> */}
                <Layout
                  level="4"
                  style={{
                    flex: 1,
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 10,
                    marginHorizontal: 5,
                  }}
                >
                  <Text category="s2" style={{ alignSelf: 'flex-start', marginBottom:2 }}>
                    {reply.userName}
                  </Text>
                  <Text category="p2" style={{ marginBottom:2 }}>{reply.text}</Text>
                  <Moment
                    fromNow
                    element={(momentProps) => (
                      <Text category="c1" {...momentProps} style={{ fontSize: 10, textAlign:'right' }} />
                    )}
                  >
                    {reply.sentAt}
                  </Moment>
                </Layout>
            </View>
            <View style={{ marginVertical: 5, marginLeft: 80 }}>
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => changeFocus(parentCommentId)}
            >
              <Text category="c1">{t('reply')}</Text>
            </TouchableOpacity>
          </View>
          </>
            ))
          ):null}       
        </View>
      ),
      [],
    );
  }
  return useMemo(
    () => (
      <Layout level="5" style={{ flex: 1 }}>
        <Card
          style={{
            flex: 1,
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
          }}
          header={renderCardHeader}
          footer={renderCardFooter}
        >
          <View
            style={{
              height: height - INSETS,
              justifyContent: 'flex-end',
            }}
          >
            {!isLoading && comments.length > 0 ? (
              <List
                style={{
                  backgroundColor: 'transparent',
                  paddingVertical: 10,
                  flex: 1,
                }}
                contentContainerStyle={{}}
                alwaysBounceVertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={comments}
                keyExtractor={(_, i) => i.toString()}
                renderItem={(comment, index) => (
                  <Message
                    key={index}
                    userName={`${comment.item.userFirstName} ${comment.item.userLastName}`}
                    message={`${comment.item.text}`}
                    time={`${comment.item.sentAt}`}
                    replyId={comment.item.replyId}
                    img={comment.item.imgUrl}
                    parentCommentId={comment.item.parentCommentId}
                  />
                )}
                getItemLayout={(data, index) => ({
                  length: 150,
                  offset: 150 * index,
                  index,
                })}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={require('../../../../assets/images/banner/addComment.png')}
                  resizeMode="contain"
                  style={{
                    width: 200,
                    height: 200,
                    marginVertical: 20,
                  }}
                />
                <Text category="s2" status="basic">
                  No comments. Add comment
                </Text>
              </View>
            )}
          </View>
        </Card>
        {/* <Spinner visible={isLoading} /> */}
      </Layout>
    ),
    [height, INSETS, renderCardFooter, renderCardHeader],
  );
}
