// // prettier-ignore
// import React, {
//     useState, useRef, useContext, useCallback, useMemo
//   } from 'react';

// import {
//   View,
//   Animated,
//   ScrollView,
//   useWindowDimensions,
//   Image,
//   StyleSheet,
//   Text,
//   Share,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
// } from 'react-native';

// import { useInfiniteQuery } from 'react-query';

// import { LinearGradient } from 'expo-linear-gradient';

// import { VideoProgress } from 'react-video-progress';

// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { useFocusEffect, useIsFocused } from '@react-navigation/native';

// import { Video, Audio } from 'expo-av';

// import {
//   IconCHeartToggle,
//   IconCShare,
//   IconEye,
//   IconCChat,
//   IconPlayPause,
//   IconCVote,
//   IconCCoin,
// } from 'src/components/CustomIcons';

// import {
//   sendComment,
//   handleLike,
//   handleFollow,
//   getUserData,
//   getUserEntries,
// } from '../../../../../services/Requests/index';

// import VideoFullscreen from 'src/components/VideoFullscreen';

// import { v4 as uuidv4 } from 'uuid';

// import firebase from '@react-native-firebase/app';

// import FetchFailed from 'src/components/DataFetch/FetchFailed';

// import Placeholders from 'src/components/Placeholders';

// import Api from 'src/api';

// import { viewVideo } from '../../../../../services/Requests/index';

// import sound from '../../../../../assets/audio/sound.mp3';

// import InteractIcon from 'src/components/InteractIcon';

// const WoozPostsArea = ({ navigation }) => {
//   const { width, height } = useWindowDimensions();

//   const { bottom, top } = useSafeAreaInsets();

//   const [shouldPlay, setShouldPlay] = useState(true);

//   // check for some odd devices like mine
//   const spacing = top % 1 === 0 ? bottom + top : 0;

//   const VIEW_HEIGHT = height - (57 + spacing);

//   const [index, setIndex] = useState(0);

//   const videoRef = useRef(null);

//   const videoViewRef = useRef(null);

//   const scrollViewRef = useRef(null);

//   const isMounted = useRef(false);

//   const opacity = useRef(new Animated.Value(0.5)).current;

//   const videoLength = useRef(0);

//   const screenIsFocused = useIsFocused();

//   const currentVideoIndex = useRef(0);

//   const onPlaybackStatusUpdate = async (playbackStatus, entryId) => {
//     if (playbackStatus.didJustFinish) {
//       const res = await viewVideo(entryId);
//     }
//   };

//   const routeUserProfile = async (userId) => {
//     const userData = await getUserData(userId);
//     const { data } = userData;
//     await navigation.navigate('UserProfile', data);
//   };

//   const toggleMute = async () => {
//     // setMuteState(!muteState);
//     return;
//     // console.log(videoRef);
//     // videoRef.current.setIsMutedAsync(muteState);
//   };

//   const handleShare = async (params, value) => {
//     const firebaseConfig = {
//       apiKey: 'AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
//       authDomain: 'woozeee-d7f6c.firebaseapp.com',
//       databaseURL: 'https://woozeee-d7f6c.firebaseio.com',
//       projectId: 'woozeee-d7f6c',
//       storageBucket: 'woozeee-d7f6c.appspot.com',
//       messagingSenderId: '979696525592',
//       appId: '1:979696525592:web:ec27a203184d23e0dcfe6d',
//       measurementId: 'G-XQKMT94R9R',
//     };

//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }
//     try {
//       const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         json: true,
//         body: JSON.stringify({
//           dynamicLinkInfo: {
//             domainUriPrefix: 'https://app.woozeee.com',
//             link: `https://app.woozeee.com/entry/?${params}=${value}`,
//           },
//         }),
//       };

//       const res = await fetch(
//         'https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyA5kH1HxdiF085vwaYEZ3jTMSm1CMELJfg',
//         requestOptions,
//       );
//       const _res = await res.json();

//       const result = await Share.share({
//         message: _res.shortLink,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const handlePlayPause = () => {
//     setShouldPlay(!shouldPlay);
//   };

//   useFocusEffect(
//     useCallback(() => {
//       isMounted.current = true;

//       if (isMounted.current && videoViewRef.current) {
//         videoViewRef.current.resetPlayState(true);
//       }

//       return () => {
//         isMounted.current = false;

//         if (videoViewRef.current) {
//           videoViewRef.current.resetPlayState(true);
//         }
//       };
//     }, [videoViewRef]),
//   );

//   const { status, data, refetch } = useInfiniteQuery(
//     ['inFiniteWoozVideos', 1],
//     async ({ pageParam = 1 }) => {
//       const promise = await Api.getWoozVideos();
//       promise.cancel = () => Api.cancelRequest('Request aborted');
//       return promise;
//     },
//     {
//       getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
//       getNextPageParam: (lastPage) => lastPage.nextID ?? false,
//       keepPreviousData: true,
//       cacheTime: 1000 * 60 * 1,
//     },
//   );

//   if (status === 'loading') {
//     return (
//       <Placeholders
//         mediaLeft={false}
//         count={1}
//         numColumns={1}
//         maxHeight={height * 0.75}
//         maxWidth={width}
//       />
//     );
//   }
//   if (status === 'error') {
//     return (
//       <FetchFailed
//         onPress={refetch}
//         info={t('networkError')}
//         retry={t('retry')}
//       />
//     );
//   }
//   if (
//     // prettier-ignore
//     status !== 'loading'
//       && status !== 'error'
//       && data.pages[0].pageData.data.length > 0
//   ) {
//     videoLength.current = data.pages[0].pageData.data.length;

//     const res = data.pages.map((page) => page.pageData.data);
//     const final = res.reduce((acc, element) => {
//       return [...acc, ...element];
//     }, []);

//     const onMomentumScrollEnd = async ({ nativeEvent }) => {
//       // console.log(nativeEvent);
//       const newIndex = Math.ceil(nativeEvent.contentOffset.y / VIEW_HEIGHT);

//       //   console.log(final[index]);
//       currentVideoIndex.current = newIndex;

//       try {
//         const { sound: soundObject, status } = await Audio.Sound.createAsync(
//           sound,
//           { shouldPlay: true },
//         );
//         await soundObject.playAsync();
//       } catch (error) {
//         console.log(error);
//       }
//       if (
//         // prettier-ignore
//         newIndex !== index
//             && newIndex < videoLength.current
//             && newIndex >= 0
//       ) {
//         opacity.setValue(0);
//         setIndex(newIndex);
//         videoViewRef.current?.resetPlayState(true);
//       }
//     };

//     const WoozVideo = ({ data, vidRef, vidViewRef, _index }) => {
//       return (
//         <View style={{ height: VIEW_HEIGHT }} onPress={toggleMute}>
//           <Video
//             // ref={videoViewRef}
//             resizeMode="cover"
//             style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
//             source={{ uri: data.mediaURL }}
//             isLooping
//             isMuted={_index === currentVideoIndex.current ? false : true}
//             shouldPlay={
//               screenIsFocused && _index === currentVideoIndex.current
//                 ? true
//                 : false
//             }
//             onPlaybackStatusUpdate={(playbackStatus) =>
//               onPlaybackStatusUpdate(playbackStatus, data._id)
//             }
//             onReadyForDisplay={() =>
//               Animated.timing(opacity, {
//                 toValue: 1,
//                 useNativeDriver: true,
//                 duration: 500,
//               }).start()
//             }
//           />
//           <LinearGradient
//             colors={['transparent', 'transparent', 'rgba(0,0,0,.5)']}
//             style={{ flex: 1, justifyContent: 'flex-end' }}
//           >
//             <View
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'flex-end',
//                 flexDirection: 'row',
//               }}
//             >
//               <View
//                 style={{
//                   width: '80%',
//                   padding: 10,
//                   marginBottom: 50,
//                   justifyContent: 'flex-end',
//                   alignItems: 'flex-start',
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: 'white',
//                     fontWeight: 'bold',
//                     fontSize: 16,
//                     marginBottom: 5,
//                   }}
//                 >
//                   @{data.userDisplayName}
//                 </Text>
//                 <Text category="h6" style={{ color: 'white', fontSize: 14 }}>
//                   {data.description}{' '}
//                   <Text
//                     status="control"
//                     category="h6"
//                     style={{ fontWeight: 'bold' }}
//                   >
//                     #havefun #makemoney #giveback #woozeee #woozeeet(wooz it)
//                   </Text>
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   width: '20%',
//                   alignItems: 'flex-end',
//                   padding: 10,
//                 }}
//               >
//                 <View
//                   style={{
//                     marginVertical: 10,
//                     // alignItems: 'center',
//                     // justifyContent: 'center',
//                   }}
//                 >
//                   <InteractIcon
//                     status={'basic'}
//                     Accessory={(evaProps) => (
//                       <IconPlayPause {...evaProps} isPlaying={!shouldPlay} />
//                     )}
//                     height={32}
//                     width={32}
//                     onPress={handlePlayPause}
//                   />
//                 </View>
//                 <InteractIcon
//                   style={{ marginBottom: 15 }}
//                   Accessory={IconCHeartToggle}
//                   status={data.userEntryData.isLike ? 'danger' : 'control'}
//                   //   textContent={data.likes}
//                   // onPress={toggleLike}
//                 />
//                 <InteractIcon
//                   style={{ marginBottom: 10 }}
//                   Accessory={(evaProps) => <IconCChat {...evaProps} active />}
//                   //   textContent={data.totalComments}
//                   //   onPress={routeComments}
//                 />
//                 <InteractIcon
//                   style={{ marginBottom: 15 }}
//                   Accessory={(evaProps) => <IconCShare {...evaProps} active />}
//                   onPress={() => handleShare('entries', data._id)}
//                 />

//                 <TouchableOpacity
//                   style={{ alignItems: 'center', marginBottom: 5 }}
//                   onPress={() => routeUserProfile(data.userId)}
//                 >
//                   <Image
//                     source={{ uri: data.userImageURL }}
//                     defaultSource={require('assets/images/banner/profile.jpg')}
//                     style={{
//                       height: 40,
//                       width: 40,
//                       borderRadius: 20,
//                       borderWidth: 2,
//                       borderColor: 'white',
//                     }}
//                     resizeMode="cover"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </LinearGradient>
//         </View>
//       );
//     };

//     return (
//       <View style={{ flex: 1, justifyContent: 'flex-end' }}>
//         <ScrollView
//           style={{
//             flex: 1,
//             backgroundColor: 'transparent',
//           }}
//           ref={scrollViewRef}
//           pagingEnabled
//           disableIntervalMomentum
//           showsHorizontalScrollIndicator={false}
//           showsVerticalScrollIndicator={false}
//           onMomentumScrollEnd={onMomentumScrollEnd}
//         >
//           {final.map((item, index) => {
//             return <WoozVideo data={item} key={index} _index={index} />;
//           })}
//         </ScrollView>
//       </View>
//     );
//   }
//   return (
//     <FetchFailed onPress={refetch} info={t('noVideos')} retry={t('refresh')} />
//   );
// };

// export default WoozPostsArea;
