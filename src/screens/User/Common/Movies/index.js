import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

import { Layout, List, Text } from '@ui-kitten/components';
import { Overlay } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieCard from 'src/components/SocialCard/MovieCard';

import { trendingUrl } from 'src/api/dummy';
import Versus from '../../HomeTab/Social/ChallengeTab/VersusTab/index';
import { TextIcon } from 'src/components/IconPacks/TextIcon';
import AllMovies from './AllMovies/index';
import TvSeries from './TvSeries/index';
import MyMovies from './MyMovies/index';
import MyCategories from './Categories/index';

// const MOVIE_CATEGORIES = [
//   {
//     id: 1,
//     title: 'All',
//   },
//   {
//     id: 2,
//     title: 'Trending',
//     active: true,
//   },
//   {
//     id: 3,
//     title: 'woozeee Originals',
//   },
//   {
//     id: 4,
//     title: 'Classics',
//   },
//   {
//     id: 5,
//     title: 'Anime',
//   },
//   {
//     id: 6,
//     title: 'Romance',
//   },
//   {
//     id: 7,
//     title: 'Triller',
//   },
// ];

// const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

// const renderMovieCategory = ({ item }) => (
//   <Layout
//     level={item.active ? '6' : '2'}
//     style={{
//       height: 40,
//       marginHorizontal: 5,
//       borderRadius: 10,
//     }}
//   >
//     <TouchableOpacity
//       activeOpacity={0.75}
//       style={{
//         backgroundColor: 'transparent',
//         borderColor: 'transparent',
//         borderRadius: 0,
//         borderBottomWidth: 3,
//         paddingHorizontal: 15,
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '100%',
//         borderBottomColor: item.active && '#FF5757',
//       }}
//     >
//       <Text status="basic" category="c2">
//         {item.title}
//       </Text>
//     </TouchableOpacity>
//   </Layout>
// );

// const renderMovieCategories = () => (
//   <View style={{ marginBottom: 20, height: 45 }}>
//     <List
//       style={{
//         flex: 1,
//         backgroundColor: 'transparent',
//       }}
//       contentContainerStyle={{
//         paddingHorizontal: 10,
//       }}
//       alwaysBounceHorizontal
//       horizontal
//       showsHorizontalScrollIndicator={false}
//       showsVerticalScrollIndicator={false}
//       data={MOVIE_CATEGORIES}
//       keyExtractor={(_, i) => i.toString()}
//       renderItem={renderMovieCategory}
//       getItemLayout={(data, index) => ({
//         length: 50,
//         offset: 50 * index,
//         index,
//       })}
//     />
//   </View>
// );

export default function Explore({ navigation }) {
  const { width, height } = useWindowDimensions();

  const { bottom, top } = useSafeAreaInsets();

  const t = useContext(LocaleContext);

  // const SocialPostsArea = () => {
  //   const {
  //     status,
  //     data,
  //     error,
  //     isFetching,
  //     isFetchingNextPage,
  //     isFetchingPreviousPage,
  //     fetchNextPage,
  //     fetchPreviousPage,
  //     refetch,
  //     hasNextPage,
  //     hasPreviousPage,
  //   } = useInfiniteQuery(
  //     ['infiniteMovies', 1],
  //     async ({ pageParam = 1 }) => {
  //       const promise = await Api.getVideos(trendingUrl, 1, pageParam);
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
  //         mediaLeft
  //         row
  //         count={4}
  //         numColumns={2}
  //         maxHeight={270}
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
  //     && status !== 'error'
  //     && data.pages[0].pageData.data.length > 0
  //   ) {
  //     return data.pages.map((page) => (
  //       <React.Fragment key={page.nextID}>
  //         <View style={{ flex: 1 }}>
  //           <List
  //             style={{
  //               backgroundColor: 'transparent',
  //             }}
  //             contentContainerStyle={{
  //               paddingVertical: 20,
  //               paddingHorizontal: 7,
  //             }}
  //             ListHeaderComponent={renderMovieCategories}
  //             alwaysBounceVertical
  //             showsHorizontalScrollIndicator={false}
  //             showsVerticalScrollIndicator={false}
  //             numColumns={2}
  //             data={page.pageData.data}
  //             keyExtractor={(_, i) => i.toString()}
  //             renderItem={(renderData) => (
  //               <MovieCard data={renderData.item} extraWidth={0} />
  //             )}
  //             getItemLayout={(data, index) => ({
  //               length: 300,
  //               offset: 300 * index,
  //               index,
  //             })}
  //           />
  //         </View>
  //       </React.Fragment>
  //     ));
  //   }
  //   return (
  //     <FetchFailed
  //       onPress={refetch}
  //       info={t('noVideos')}
  //       retry={t('refresh')}
  //     />
  //   );
  // };
  const styles = StyleSheet.create({
    tabView: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingHorizontal: '2%',
    },
    activeTabTextColor: {
      color: 'rgba(255, 87, 87, 1)',
      fontSize: 13,
    },
    tabTextColor: {
      // color: '#494949',
      fontSize: 13,
    },
    overlay: {
      backgroundColor: 'transparent',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    backdropStyle: {
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    scroll: {
      paddingVertical: 20,
      marginVertical: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 10,
    },
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'third', title: 'Movies' },
    { key: 'second', title: 'Drama' },
    { key: 'fourth', title: 'Categories' },
  ]);

  const renderScene = SceneMap({
    first: AllMovies,
    second: AllMovies,
    third: MyMovies,
    fourth: MyCategories,
  });

  // Some Updates

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: 'rgba(255, 87, 87, 1)' }}
      style={{ backgroundColor: 'transparent' }}
      renderLabel={({ route, focused, color }) => (
        <Text
          numberOfLines={1}
          style={[focused ? styles.activeTabTextColor : styles.tabTextColor]}
          status="basic"
        >
          {route.title}
        </Text>
      )}
    />
  );
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        icon="logout"
        pressed={() => navigation.navigate('MoreOptions')}
        screen="search"
      />
      {/* <View style= {styles.tabView}>
          <TextIcon 
          show
          bg= "transparent"
          color= "#494949" fill= "#494949" 
          text= "Category" 
          icon_name= "arrow-ios-downward-outline" />
      </View> */}
      <TabView
        renderTabBar={renderTabBar}
        swipeEnabled={false}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
      {/* <SocialPostsArea /> */}
    </Layout>
  );
}
