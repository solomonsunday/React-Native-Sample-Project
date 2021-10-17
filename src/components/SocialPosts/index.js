// prettier-ignore
import React, {
  useCallback, useMemo, useState, useContext,
} from 'react';

import {
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { useInfiniteQuery } from 'react-query';

import { v4 as uuidv4 } from 'uuid';

import Api from 'src/api';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { List, Text } from '@ui-kitten/components';

import FastImage from 'react-native-fast-image';

import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign } from '@expo/vector-icons';

import { LocaleContext } from 'src/contexts';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import { ChallengeVideoCard } from '../../components/SocialCard/index';

import {
  UserProfilePostCard,
  ExploreVideoCard,
  UserPostLikedCard,
} from '../../components/SocialCard/index';

import VideoCard from 'src/components/SocialCard';

import Placeholders from 'src/components/Placeholders';

import StoryCard from 'src/components/SocialCard/StoryCard';

import { useNavigation } from '@react-navigation/native';

import VideoFullscreen from 'src/components/VideoFullscreen';

import { IconPlusCircle } from 'src/components/CustomIcons';

import Stories from '../../components/UserStories/screens/Stories';

export const TrendingPosts = ({ info }) => {
  const t = useContext(LocaleContext);
  return useMemo(
    () => (
      <View style={{ marginBottom: 20, paddingVertical: 5 }}>
        <View style={{ paddingHorizontal: 10 }}>
          <Text category="h6" style={{ marginBottom: 5 }}>
            {t('trendingChallenges')}
          </Text>
        </View>
        <List
          style={{ backgroundColor: 'transparent' }}
          alwaysBounceHorizontal
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={info}
          keyExtractor={(_, i) => i.toString()}
          renderItem={(renderData) => (
            <VideoCard data={renderData.item} extraWidth={0.5} />
          )}
          getItemLayout={(data, index) => ({
            length: 200,
            offset: 200 * index,
            index,
          })}
        />
      </View>
    ),
    [t, info],
  );
};

export const StoryPosts = ({ info }) => {
  const t = useContext(LocaleContext);

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = IS_PORTRAIT ? 3 : 5;

  const [userImg, setUserImg] = useState('');

  const getUserImg = async () => {
    const res = await AsyncStorage.getItem('userImage');
    setUserImg(res);
  };

  getUserImg();
  // console.log('info from StoryPosts -> ', info);

  const RenderCategoryHeader = () => (
    <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('UploadEntries', { entries: true })}
        style={{
          height: 150,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + 0.5)
            : width / (COLUMN_COUNT + 0.5),
          // paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        <FastImage
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 5,
          }}
          source={{
            uri: userImg,
            priority: FastImage.priority.cover,
          }}
        />

        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            width: 50,
            borderRadius: 25,
            position: 'absolute',
            backgroundColor: 'white',
            right: 57,
            bottom: 80,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <AntDesign name="plus" size={24} color="blue" />
        </View>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            position: 'absolute',
            // bottom: 0,
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
            status="basic"
            style={{
              color: 'white',
              marginLeft: 5,
              marginTop: 50,
              zIndex: 1000,
            }}
          >
            Add
          </Text>
          <Text
            category="s2"
            status="basic"
            style={{ color: 'white', marginLeft: 5, zIndex: 1000 }}
          >
            {t('yourStory')}
          </Text>
        </View>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate('UploadEntries', { entries: true })}
        activeOpacity={0.75}
        style={{ position: 'relative' }}
      >
        <Image
          source={{ uri: userImg }}
          // defaultSource={require('assets/images/user/user2.png')}
          style={{
            height: 80,
            width: 80,
            borderRadius: 40,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            borderRadius: 15,
            position: 'absolute',
            backgroundColor: 'white',
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconPlusCircle height={28} width={28} fill="#043F7C" />
        </View>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <View style={{ paddingVertical: 5 }}>
      <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
        <Text category="h6">{t('recentStories')}</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          paddingHorizontal: 10,
          // paddingBottom: 5,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <RenderCategoryHeader />
        <Stories storyData={info} extraWidth={0.5} />
      </ScrollView>
    </View>
  );
};

// prettier-ignore
export const UsersPosts = ({ info, exploreData }) => {
  const { data} = exploreData;
  return data ? (
    data.map((item) => {
      return item.subs.map((sub) => {
        return sub.entries.length ? (
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              paddingVertical: 5,
              maxHeight: 235,
            }}
            key={uuidv4()}
          >
            {/* <View style={{ paddingHorizontal: 10 }}>
              <Text>Text category="h6" status="danger" style={{ marginBottom: 10 }}>
                {item.groupName}
              </Text>
              <Text category="c1" style={{ marginBottom: 5 }}>
                {`${sub.totalEntries} Video(s)`}
              </Text>
            </View> */}

            <View style={{ paddingHorizontal: 10 }}>
            <Text category="h6" status="basic" style={{ marginBottom: 15 }}>
                {sub.categoryName}
              </Text>
              <Text category="c1" style={{ marginBottom: 5 }}>
                {`${sub.categoryName} ${sub.entries.length} clip(s)`}
              </Text>
              <List
                  style={{ backgroundColor: 'transparent' }}
                  alwaysBounceHorizontal
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  data={sub.entries}
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={(renderData) => (
                    <VideoCard data={renderData} extraWidth={0.5} />
                  )}
                  getItemLayout={(data, index) => ({
                    length: 200,
                    offset: 200 * index,
                    index,
                  })}
                />
           </View>
          </View>
        ): null
      })
    })
  ): null
}

export const ChallengePosts = ({ chaData }) => {
  return chaData && chaData.data ? (
    chaData.data.map((item) => {
      return item.subs.map((sub) => {
        return sub.challenges.length ? (
          <View
            style={{
              flex: 1,
              marginBottom: 10,
              paddingVertical: 5,
              maxHeight: 235,
            }}
            key={uuidv4()}
          >
            <View style={{ paddingHorizontal: 10 }}>
              <Text category="h6" status="basic" style={{ marginBottom: 15 }}>
                {/* {sub.categoryName} */}Coming Soon
              </Text>
              <Text category="c1" style={{ marginBottom: 5 }}>
                {`${sub.totalEntries} Video(s)`}
              </Text>
            </View>
            <View>
              <List
                style={{ backgroundColor: 'transparent' }}
                alwaysBounceHorizontal
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={sub.challenges}
                keyExtractor={(_, i) => i.toString()}
                renderItem={(renderData) => (
                  <ChallengeVideoCard data={renderData} extraWidth={0.5} />
                )}
                getItemLayout={(data, index) => ({
                  length: 200,
                  offset: 200 * index,
                  index,
                })}
              />
            </View>
          </View>
        ) : null;
      });
    })
  ) : (
    <></>
  );
};

// prettier-ignore
export const ProfilePosts = (props) => {
  const { allEntries, origin } = props;
  // console.log("prop is ", props);

  const {firstTenEntries} = allEntries
  
  return (
    firstTenEntries && firstTenEntries.length ? 
    <List
    style={{
      backgroundColor: 'transparent',
    }}
    contentContainerStyle={{
      paddingBottom: 25,
      paddingTop: 5,
    }}
    // alwaysBounceVertical
    showsHorizontalScrollIndicator={true}
    showsVerticalScrollIndicator={false}
    numColumns={3}
    data={firstTenEntries.reverse()}
    keyExtractor={(_, i) => i.toString()}
    renderItem={(renderData) => (
      <UserProfilePostCard data={renderData} extraWidth={0} numColumns={3} allPosts={allEntries} />
    )}
    getItemLayout={(data, index) => ({
      length: 200,
      offset: 200 * index,
      index,
    })}
  /> :  <View
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Image
            source={require('../../assets/images/banner/noPost.png')}
            resizeMode="contain"
            style={{
              width: 200,
              height: 200,
              marginTop: 50,
            }}
          />
          <Text category="s2" status="basic" style={{marginTop: 20}}>
            User has no posts yet
          </Text>
        </View>

  )
}

export const LikedProfilePosts = ({ userId }) => {
  // console.log('from props  -> ', userId);
  const t = useContext(LocaleContext);
  const { width, height } = useWindowDimensions();
  const [likedData, setLikedData] = useState({});

  const PLACEHOLDER_CONFIG = {
    count: 4,
    numColumns: 2,
    maxHeight: 150,
    mediaLeft: true,
  };

  const getMaxHeight = () => {
    if (PLACEHOLDER_CONFIG.maxHeight <= 1) {
      return height * PLACEHOLDER_CONFIG.maxHeight;
    }
    return PLACEHOLDER_CONFIG.maxHeight;
  };

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['LikedData', 1],
    async ({ pageParam = 1 }) => {
      const promise = await Api.getUserLikedPosts(pageParam, userId);
      if (data !== {} && data !== undefined) {
        setLikedData(data);
        // console.log('Data is -> ', data);
      } else {
        setLikedData({ message: 'No data loaded' });
      }
      promise.cancel = () => Api.cancelRequest('Request aborted');
      return promise;
    },
    {
      getPreviousPageParam: (firstPage) => firstPage.previousID ?? false,
      getNextPageParam: (lastPage) => lastPage.nextID ?? false,
      keepPreviousData: true,
      staleTime: 0,
      cacheTime: 0,
    },
  );

  if (status === 'loading') {
    // console.log(likedData);
    return (
      <Placeholders
        mediaLeft={PLACEHOLDER_CONFIG.mediaLeft}
        row
        count={PLACEHOLDER_CONFIG.count || 4}
        numColumns={PLACEHOLDER_CONFIG.numColumns || 2}
        maxHeight={getMaxHeight()}
        maxWidth={width}
      />
    );
  }

  if (status === 'error') {
    return (
      <FetchFailed
        onPress={refetch}
        info={t('networkError')}
        retry={t('retry')}
      />
    );
  }

  if (
    status !== 'error' &&
    status !== 'loading' &&
    data.pages[0].pageData.data.length < 0
  ) {
    // console.log('no liked data');

    return (
      <FetchFailed
        onPress={refetch}
        info={t('noVideos')}
        retry={t('refresh')}
      />
    );
  }

  if (status !== 'error' && status !== 'loading') {
    // console.log(likedData);
    return (
      <List
        style={{
          backgroundColor: 'transparent',
        }}
        contentContainerStyle={{
          paddingBottom: 25,
          paddingTop: 5,
        }}
        // alwaysBounceVertical
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        data={data.pages[0].pageData.data}
        keyExtractor={(_, i) => i.toString()}
        renderItem={(renderData) => (
          <UserPostLikedCard
            data={renderData}
            extraWidth={0}
            numColumns={3}
            allLikedPosts={data.pages[0].pageData.data}
          />
        )}
        getItemLayout={(data, index) => ({
          length: 200,
          offset: 200 * index,
          index,
        })}
      />
    );
  }
  // console.log(data);
  return (
    <List
      style={{
        backgroundColor: 'transparent',
      }}
      contentContainerStyle={{
        paddingBottom: 25,
        paddingTop: 5,
      }}
      // alwaysBounceVertical
      showsHorizontalScrollIndicator={true}
      showsVerticalScrollIndicator={false}
      numColumns={3}
      data={data.pages[0].pageData.data}
      keyExtractor={(_, i) => i.toString()}
      renderItem={(renderData) => (
        <UserPostLikedCard data={renderData} extraWidth={0} numColumns={3} />
      )}
      getItemLayout={(data, index) => ({
        length: 200,
        offset: 200 * index,
        index,
      })}
    />
    // <Text>Liked</Text>
  );
};

export const WoozPosts = ({ info }) => {
  const { bottom, top } = useSafeAreaInsets();

  const { height } = useWindowDimensions();

  const [activeIndex, setActiveIndex] = useState(0);

  const CONTENT_SPACE = bottom + top;

  const ITEM_HEIGHT = height - CONTENT_SPACE;

  const VIEWABILITY_CONFIG = useMemo(
    () => ({
      minimumViewTime: 200,
      viewAreaCoveragePercentThreshold: 60,
    }),
    [],
  );

  // show currently viewing video
  const handleViewItemsChanged = useCallback((data) => {
    setActiveIndex(data.changed[0].index);
  }, []);

  const renderPost = useCallback(
    (renderData) => (
      <VideoFullscreen
        data={renderData}
        extraWidth={0.5}
        activeIndex={activeIndex}
        viewHeight={ITEM_HEIGHT}
      />
    ),
    [ITEM_HEIGHT, activeIndex],
  );

  return (
    <List
      style={{
        backgroundColor: 'transparent',
        height: ITEM_HEIGHT,
      }}
      alwaysBounceVertical
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={info}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderPost}
      extraData={activeIndex}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={ITEM_HEIGHT}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      onViewableItemsChanged={handleViewItemsChanged}
      viewabilityConfig={VIEWABILITY_CONFIG}
    />
  );
};

// export const SocialPosts = ({ info }) => {
//   const { height } = useWindowDimensions();

//   const [activeIndex, setActiveIndex] = useState(0);

//   const ITEM_HEIGHT = height / 2;

//   const VIEWABILITY_CONFIG = useMemo(
//     () => ({
//       minimumViewTime: 100,
//       viewAreaCoveragePercentThreshold: 50,
//     }),
//     [],
//   );

//   // show currently viewing video
//   const handleViewItemsChanged = useCallback((data) => {
//     setActiveIndex(data.changed[0].index);
//   }, []);

//   return useMemo(
//     () => (
//       <List
//         style={{
//           flex: 1,
//           backgroundColor: 'transparent',
//           height: ITEM_HEIGHT,
//         }}
//         alwaysBounceVertical
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         data={info}
//         renderItem={(renderData) => (
//           <VideoView
//             data={renderData}
//             activeIndex={activeIndex}
//             viewHeight={ITEM_HEIGHT}
//           />
//         )}
//         extraData={activeIndex}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         snapToInterval={ITEM_HEIGHT}
//         getItemLayout={(data, index) => ({
//           length: ITEM_HEIGHT,
//           offset: ITEM_HEIGHT * index,
//           index,
//         })}
//         initialNumToRender={4}
//         onViewableItemsChanged={handleViewItemsChanged}
//         viewabilityConfig={VIEWABILITY_CONFIG}
//       />
//     ),
//     [
//       info,
//       activeIndex,
//       handleViewItemsChanged,
//       VIEWABILITY_CONFIG,
//       ITEM_HEIGHT,
//     ],
//   );
// };

// export const AllPosts = ({ info }) => {
//   const { width, height } = useWindowDimensions();

//   const IS_PORTRAIT = height > width;

//   const ListHeader = () => (
//     <View style={{ padding: 10 }}>
//       <Text category="h5">Summer Videos</Text>
//     </View>
//   );

//   return useMemo(
//     () => (
//       <List
//         style={{
//           backgroundColor: 'transparent',
//         }}
//         contentContainerStyle={{
//           paddingTop: 5,
//           paddingBottom: 15,
//         }}
//         alwaysBounceVertical
//         showsHorizontalScrollIndicator={false}
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={ListHeader}
//         numColumns={IS_PORTRAIT ? 2 : 3}
//         key={IS_PORTRAIT ? 2 : 3}
//         data={info}
//         renderItem={(renderData) => (
//           <VideoCard data={renderData.item} extraWidth={0} />
//         )}
//         getItemLayout={(data, index) => ({
//           length: 175,
//           offset: 175 * index,
//           index,
//         })}
//       />
//     ),
//     [info, IS_PORTRAIT],
//   );
// };
