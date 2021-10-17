import React, { useContext, useEffect, useState } from 'react';

import {
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useInfiniteQuery } from 'react-query';

import { Layout, List, Text } from '@ui-kitten/components';

import Api from 'src/api';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import FetchFailed from 'src/components/DataFetch/FetchFailed';

import Placeholders from 'src/components/Placeholders';

import MovieCard from 'src/components/SocialCard/MovieCard';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MovieScroll from 'src/components/MovieScroll';
import { ScrollView } from 'react-native-gesture-handler';
import MovieDescription from 'src/components/MovieDescription';
import FeaturedMovie from 'src/components/FeaturedMovie';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../services/api/index';
import { Toast, Root } from 'native-base';

// const StoryPostsArea = () => WithDefaultFetch(StoryPosts, trendingUrl, PLACEHOLDER_CONFIG1);

export default function Explore({ navigation, route }) {
  const { width, height } = useWindowDimensions();
  const { movie_data, signal } = route.params;
  const [userData, setUserData] = useState([]);
  const { bottom, top } = useSafeAreaInsets();

  const t = useContext(LocaleContext);

  const watchMovie = (data) => {
    console.log("userData?.accounts", userData)
    if (userData?.accounts.length != 0 && userData?.hasCare) {
      //if I have account and I have care,
      if (userData.isPinSet === false) {
        //then check if I have a pin set up
        Toast.show({
          text: 'You need to set your pin',
          buttonText: 'Ok!',
          position: 'top',
          type: 'danger',
          duration: 3000,
        });
        setTimeout(() => {
          navigation.navigate('GeneratePin'); 
        }, 3000)
      //if I don't
      } else {
        navigation.replace('MoviePage', { data: data }); //if I do
      }
    } else {
      Toast.show({
        text: 'You need to activate your care and wallet',
        buttonText: 'Ok!',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      setTimeout(() => {
        navigation.replace('Onboarding');
      }, 3000) //if I don't have an account or I don't have care
    }
  };

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  useEffect(() => {
    const subscribe = navigation.addListener('focus', () => {
      const userData = getUserData()
      userData.then(res => setUserData(res)).catch(err => err);
    });
    return subscribe;
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      padding: 10,
    },
    textStyle: {
      fontSize: 20,
      fontWeight: '700',
    },
    actions: {
      width: wp('75%'),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageCon: {
      minHeight: hp(20),
    },
    // textshadow:{
    //   fontSize:100,
    //   color:'#FFFFFF',
    //   fontFamily:'Times New Roman',
    //   paddingLeft:30,
    //   paddingRight:30,
    //   textShadowColor:'#FF5757',
    //   textShadowOffset:{width: 2, height: 2},
    //   textShadowRadius:5,
    // },
  });
  return (
    <Root>
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea title="Movie" navigation={navigation} screen="auth" />
      <View style={styles.imageCon}>
        {signal === true ? (
          <TouchableOpacity>
            <FeaturedMovie
              poster={movie_data.posterURL[0]}
              url={movie_data}
              active
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity>
            <FeaturedMovie
              poster={movie_data.item.posterURL[0]}
              url={movie_data.item}
              active
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView style={styles.container}>
        {signal === true ? (
          <MovieDescription
            onPress={() => watchMovie(movie_data)}
            data={movie_data}
            // label = {movie_data?.casts[0][0]?.__isNew__ === true ? 'New' : 'Classic'}
            year={movie_data?.year}
            // casts = {movie_data?.casts[0][0]?.value}
            title={movie_data?.title}
            price={`₦${movie_data?.price}`}
            description={movie_data?.description}
            paid
          />
        ) : (
          <MovieDescription
            onPress={() => watchMovie(movie_data.item)}
            // inList= {movieData.item?.movieData?.inList}
            data={movie_data?.item}
            // label = {movie_data?.item?.casts[0][0]?.__isNew__ === true ? 'New' : 'Classic'}
            year={movie_data?.item?.year}
            // casts = {movie_data?.item?.casts[0][0]?.value}
            title={movie_data?.item?.title}
            price={`₦${movie_data?.item.price}`}
            description={movie_data?.item.description}
            paid
          />
        )}
        <View>
          <MovieScroll show category_id="" />
        </View>
      </ScrollView>
    </Layout>
    </Root>
  );
}
