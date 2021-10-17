import React, { useEffect, useState } from 'react';
import Video from 'react-native-video';
import { Dimensions, StyleSheet, Platform, View, ActivityIndicator, Alert } from 'react-native';
import { Layout, List, Text } from '@ui-kitten/components';
import Orientation from "react-native-orientation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../../services/api/index';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { getEmail } from 'src/api/index';


const MoviePage = ({navigation, route}) => {
  const {data} = route.params;
  const item = data
  const [videoPlayer, setVideoPlayer] = useState(null);
  const [token, setToken] = useState(null);
  const [opacity, setOpacity] = useState(0);

  const upDateMovieList = () => {
    const data = {
      movieId: item?._id,
      status: 'viewed'
    };
    axios.post(`movie-data`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res, "response")
      })
      .catch((err) => {
        console.log("err", err.response)
      });
  };
  const onReadyForDisplay = () => {
    upDateMovieList()
    }

  useEffect(() => {
    AsyncStorage.getItem('USER_AUTH_TOKEN')
    .then((res) => {
      setToken(res);

    })
    .catch((err) => err);
    if (Platform.OS === 'android') {
      const subscribe = navigation.addListener('focus', () => {
        Orientation.lockToLandscape();
        });
  
      const unsubscribe = navigation.addListener('blur', () => {
        Orientation.lockToPortrait();
  
       //    cancelAppointment()
       //    clearInterval()
       });
      return subscribe, unsubscribe;
    }
  }, [navigation]);
  const onLoad = () => {
    setOpacity(0)
  }

  const onLoadStart = () => {
    setOpacity(1)
  }

  const onBuffer = ({isBuffering}) => {
    if (isBuffering) {
      setOpacity(1)
    }else {
      setOpacity(0)
    }
  
  }
  const onError = () => {
    // Alert.alert('Network failure, please try again')
  }

  return(
<>
{Platform.OS === 'android' ? 
<View onLayout={(event) => {
   const { width, height } = Dimensions.get('window')
}}  style={styles.fullScreen}>
    {/* <TopNavigationArea
        title={item.title}
        // navigation={navigation}
        screen="auth"
      /> */}
    <View style= {styles.videoView}>
                <Video
                  poster= {'https://res.cloudinary.com/oluwafemi/image/upload/v1630054534/iPhone_11_Pro_Max_-_1_2.png'}  
                  controls= {true}
                  resizeMode= {Platform.OS === 'android' ? 'cover' : 'contain'}
                  // fullscreen= {true}
                  onReadyForDisplay = {onReadyForDisplay}
                  // fullscreenOrientation= "landscape"
                  source={{uri: item.url === undefined ? item.mediaURL : item.url.mobile["360"]}} 
                  // source= {{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                ref={(ref) => {
                  setVideoPlayer(ref)
                }}  
                onLoadStart= {onLoadStart} 
                onLoad={onLoad}                                    // Store reference
                onBuffer={onBuffer}     
                 onError={onError}            
                style={styles.androidContainer} />
                <ActivityIndicator
                animating
                size="large"
                color="#FF5757"
                style={[styles.activityIndicator, {opacity: opacity}]}
            />
    </View>

    </View>: 
          <Layout level="6" style={{ flex: 1 }}>
            {/* {buffering ? 
                <View style={styles.loaderScreen}>
                <ActivityIndicator  size="large" color="#FF5757" />
               </View>: null  
          } */}
              {/* <TopNavigationArea
                  title={item.title}
                  // navigation={navigation}
                  screen="auth"
                /> */}
                  <Video
                  poster= {'https://res.cloudinary.com/oluwafemi/image/upload/v1630054534/iPhone_11_Pro_Max_-_2_1.png'} 
                  controls= {true}
                  resizeMode= "contain"
                  fullscreen= {true}
                  onReadyForDisplay = {onReadyForDisplay}
                  fullscreenOrientation= "landscape"
                  source={{uri: item.url === undefined ? item.mediaURL : item.url.mobile["360"]}} 
                  // source= {{uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                ref={(ref) => {
                    setVideoPlayer(ref)
                }} 
                onLoadStart= {onLoadStart} 
                onLoad={onLoad}                                    // Store reference
                onBuffer={onBuffer}                // Callback when remote video is buffering
                onError={onError}               // Callback when video cannot be loaded
                style={styles.backgroundVideo} />
                <ActivityIndicator
                animating
                size="large"
                color="#fff"
                style={[styles.activityIndicator, {opacity: opacity}]}
            />
          </Layout>



}

</>
  )
}
var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  activityIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(35) : hp(20),
    left: 70,
    right: 70,
    height: 50,
},
  loaderScreen: {
    position: 'absolute',
    top: 30
  },
  androidContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    // flex: 1,
    backgroundColor: 'black',
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').height
    // alignItems: 'center',
    // justifyContent: 'center'
  },

  videoView: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: 'yellow'
},
  fullScreen: {
    flex: 1,
    backgroundColor: 'black',
    height: Dimensions.get('screen').width,
    width: Dimensions.get('screen').height
    
},
});

export default MoviePage;