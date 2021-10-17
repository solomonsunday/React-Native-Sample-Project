import React, { useRef, useContext, useState, useEffect } from 'react';
import { StyleSheet, View, Image, Linking, Share } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { v4 as uuidv4 } from 'uuid';

import firebase from '@react-native-firebase/app';
import { Layout, List, Text } from '@ui-kitten/components';
import { TextIcon } from './IconPacks/TextIcon';
import MovieComponent from './MovieComponent';
import { LocaleContext, AppSettingsContext } from 'src/contexts';
import { Rating, AirbnbRating } from 'react-native-ratings';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../services/api/index';

const MovieDescription = (props) => {
  const sheetRef = useRef(null);
  const [inlist, setInList] = useState(true);
  const [token, setToken] = useState(null);

  const handleOpenSheet = () => sheetRef.current.open();
  const { appState } = useContext(AppSettingsContext);
  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';
  let movie_data;
  let duration;
  // console.log("inlist", props.inList)
  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour ' : ' hours ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' min ' : ' mins ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' sec' : ' sec') : '';
    return hDisplay + mDisplay + sDisplay;
  }
  if (props.featured) {
    movie_data = props.featured;
    // duration = new Date(props.featured?.duration * 1000).toISOString().substr(11, 5);
    duration = secondsToHms(props.featured?.duration);
  } else {
    movie_data = props.data;
    // duration = new Date(props.data?.duration * 1000).toISOString().substr(11, 5);
    duration = secondsToHms(props.data?.duration);
  }
  const addToMyList = () => {
    setInList(false);
    upDateMyList();
  };
  const removeFromMyList = () => {
    setInList(true);
    upDateMyList();
  };

  const upDateMyList = () => {
    const data = {
      movieId: movie_data?._id,
      inList: inlist,
    };
    axios
      .post(`movie-data`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res, 'response');
      })
      .catch((err) => {
        console.log('err', err.response);
      });
  };
  useEffect(() => {
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        setToken(res);
        // setInList(props.inList)
      })
      .catch((err) => err);
  }, []);

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
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout level="6" style={styles.container}>
      <Text category="h1" style={styles.textStyle}>
        {/* {props.title} */}
        {movie_data?.title}
      </Text>
      <MovieComponent
        // data = {movie_data}
        label={'New'}
        year={movie_data?.year}
        rating="18+"
        duration={duration}
        // duration= {new Date(movie_data?.duration * 1000).toISOString().substr(11, 8)}
        quality="HD"
        toplist="10"
        trend="#1"
      />

      <Text category="h4">
        {props?.price === '₦undefined' ? null : props?.price}
      </Text>
      <View>
        {props.paid ? (
        <View style= {{flexDirection: 'row', justifyContent: 'space-between', width: '75%'}}>
          <TextIcon
            width= "80%"
            onPress={props?.onPress}
            bg="#FF5757"
            color="white"
            fill="white"
            text="Watch"
            icon_name="play-circle-outline"
          />
          <TextIcon
            addBorder
            borderWidth= {2}
            borderColor= "#FF5757"
            width= "80%"
            onPress={handleOpenSheet}
            bg="#FFf"
            color="#FF5757"
            fill="#FF5757"
            text="More Info"
            icon_name="alert-circle-outline"
          />
        </View>
        ) : (
          <TextIcon
            // onPress= {() => console.log('Hello')}

            // onPress= {() => navigation.navigate('MoviePage', {item: movie_data.item})}
            onPress={() => navigation.navigate('FlutterPay')}
            bg="#FF5757"
            color="white"
            fill="white"
            text="Watch"
            icon_name="play-circle-outline"
          />
        )}
      </View>
      <View>
        {/* <Text>
                {movie_data.item.description}
              </Text> */}
        <View style={{ marginVertical: 5 }}>
          <Text style={{ marginBottom: 5 }} numberOfLines={1}>
            {props.description}
          </Text>
          <Text numberOfLines={1}>
            Casts: {movie_data?.casts?.map((cast) => `${cast.name},`)}
          </Text>
          {/* <Text numberOfLines= {1}>
                Director: {props.director}
                </Text> */}
        </View>
        <View style={styles.actions}>
          {!inlist ? (
            <TextIcon
              onPress={removeFromMyList}
              bg="transparent"
              color="grey"
              fill="grey"
              text="My List"
              icon_name={'checkmark-outline'}
            />
          ) : (
            <TextIcon
              onPress={addToMyList}
              bg="transparent"
              color="grey"
              fill="grey"
              text="My List"
              icon_name={'plus-outline'}
            />
          )}

          {/* <TextIcon
            onPress={handleOpenSheet}
            bg="transparent"
            color="grey"
            fill="grey"
            text="More Info"
            icon_name="alert-circle-outline"
          /> */}
          <TextIcon
            onPress={() => handleShare('entries', uuidv4())}
            bg="transparent"
            color="#494949"
            fill="#494949"
            text="Share"
            icon_name="share"
          />
        </View>
      </View>
      <View>
        <RBSheet
          ref={sheetRef}
          height={180}
          closeOnDragDown
          animationType="fade"
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: BG_THEME,
            },
          }}
        >
          <View style={styles.ratingContainer}>
            <View>
              <Text style={styles.textAlign} category="h5">
                {movie_data?.title}
              </Text>
              <Text numberOfLines={5} style={styles.textAlign}>
                {movie_data?.description}
              </Text>
              {/* <Text>
                    casts: {movie_data.casts[0]}
                  </Text> */}
            </View>
          </View>
        </RBSheet>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: '700',
  },
  actions: {
    width: wp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textAlign: {
    textAlign: 'center',
  },
  ratingContainer: {
    // backgroundColor: 'red',
    height: 150,
    paddingBottom: 50,
    paddingHorizontal: 10,
  },
});

export default MovieDescription;
