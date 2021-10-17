import React, { useCallback, useEffect, useContext, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Layout, Text, Button, Divider, Toggle } from '@ui-kitten/components';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {
  StyleSheet,
  BackHandler,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import { Toast, Root } from 'native-base';

// prettier-ignore
import { LocaleContext } from 'src/contexts';
import { Platform } from 'react-native';
import axios from '../../../../services/api/index';
import { useNetInfo } from '@react-native-community/netinfo';
import CustomField from 'src/components/CustomField/index';
import Spinner from 'react-native-loading-spinner-overlay';

const PreviewEntry = (props) => {
  const { editorResult, imageUri, entries } = props.route.params;
  const [token, setToken] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [caption, setCaption] = useState('');
  const [uploadLocations, setUploadLocations] = useState({
    // stories: false,
    feeds: false,
    wooz: false,
  });
  // const handleUploadLoc = (loc) => {
  //   setUploadLocations((prevState) => ({
  //     ...prevState,
  //     [loc]: !prevState[loc],
  //   }));
  // };
  const netInfo = useNetInfo();

  const checkForConnectivity = () => {
    if (netInfo.isConnected == false || netInfo.isInternetReachable == false) {
      Toast.show({
        text: 'You are offline',
        // buttonText: ',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      console.log(netInfo);
    } else if (
      netInfo.isConnected == true &&
      netInfo.isInternetReachable == false
    ) {
      Toast.show({
        text: 'You are offline',
        // buttonText: ',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      console.log('from else ', netInfo);
    } else {
      return;
      // Toast.show({
      //   text: 'You are online',
      //   // buttonText: ',
      //   position: 'top',
      //   type: 'success',
      //   duration: 3000,
      // });
    }
  };

  const t = useContext(LocaleContext);
  // Remove File Prefix from Path

  const normalizePath = async (path) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const filePrefix = 'file://';
      if (path.startsWith(filePrefix)) {
        path = path.substring(filePrefix.length);
        try {
          path = decodeURI(path);
        } catch (e) {}
      }
    }
    return path;
  };
  const upLoadEntries = (url, type) => {
    if (entries === true) {
      const data = {
        mediaURL: url,
        description: caption,
        type: type,
      };
      axios
        .post(`stories`, data, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res);
          setLoading(false);
          Toast.show({
            text: 'Upload Succesful!',
            buttonText: 'Okay',
            position: 'bottom',
            type: 'success',
            duration: 3000,
          });
          setTimeout(() => {
            props.navigation.popToTop();
          }, 1000);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
          Toast.show({
            text: 'Upload Not Succesful!',
            buttonText: 'Okay',
            position: 'bottom',
            type: 'failed',
            duration: 3000,
          });
          setTimeout(() => {
            props.navigation.popToTop();
          }, 1000);
        });
    } else {
      // const wooz = uploadLocations.wooz ? 'wooz' : null;
      // const feeds = uploadLocations.feeds ? 'feed' : null;
      // const stories = uploadLocations.stories ? 'story': null;
      const data = {
        mediaURL: url,
        entryTypes: ['feeds', 'feed'],
        description: caption,
        type: type,
      };
      axios
        .post(`entries`, data, { headers: { Authorization: token } })
        .then((res) => {
          console.log(res);
          const message = res.message;
          setLoading(false);
          Toast.show({
            text: 'Upload Succesful!',
            buttonText: 'Okay',
            position: 'bottom',
            type: 'success',
            duration: 3000,
          });
          setTimeout(() => {
            props.navigation.popToTop();
          }, 3000);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
          Toast.show({
            text: 'Upload Not Succesful!',
            buttonText: 'Okay',
            position: 'bottom',
            type: 'failed',
            duration: 3000,
          });
          setTimeout(() => {
            props.navigation.popToTop();
          }, 3000);
        });
    }
  };
  const uploadFileToFirebase = async (videoUri, video, type) => {
    if (editorResult === null) {
      const name = `Woozee${Math.random()}`;
      const uploadTask = storage()
        .ref(`mediaEntries/${'image'}${name}`)
        .putString(videoUri, 'base64', { contentType: 'jpg' });
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log('upload error', error);
          setLoading(false);
          Toast.show({
            text: 'Network failure',
            buttonText: 'Okay',
            position: 'top',
            type: 'failed',
            duration: 3000,
          });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            upLoadEntries(downloadURL, type);
          });
        },
      );
    } else {
      const name = `Woozee${Math.random()}`;
      const uploadTask = storage()
        .ref(`mediaEntries/${'video'}${name}`)
        .putString(videoUri, 'base64', { contentType: 'video/mp4' });
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads;
          console.log('upload error', error);
          setLoading(false);
          Toast.show({
            text: 'Network failure',
            buttonText: 'Okay',
            position: 'top',
            type: 'failed',
            duration: 3000,
          });
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            upLoadEntries(downloadURL, type);
          });
        },
      );
    }
  };

  const getVideoUri = async (type = 'video') => {
    setLoading(true);
    const video = editorResult;
    const filePath = await normalizePath(video);
    const videoUri = await RNFetchBlob.fs.readFile(filePath, 'base64');
    // console.log('videoUri', videoUri);
    uploadFileToFirebase(videoUri, video, type);
  };
  const getImageUri = async (type = 'photo') => {
    setLoading(true);
    const image = imageUri;
    // const filePath = normalizePath(video)
    const realPath = await RNFetchBlob.fs.readFile(image, 'base64');
    // console.log('videoUri', videoUri);
    uploadFileToFirebase(realPath, image, type);
  };

  useEffect(() => {
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        setToken(res);
      })
      .catch((err) => err);
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
    // if (editorResult === null) {
    //   getImageUri()
    // }else {
    //   getVideoUri()
    // }
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        props.navigation.goBack();
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  console.log('editor', editorResult);
  const handleVideoRef = useCallback(
    (ref) => {
      const videoComp = ref;

      (async () => {
        try {
          await videoComp?.loadAsync({ uri: editorResult });
        } catch (e) {
          const msg = e;
        }
      })();
    },
    [editorResult],
  );

  const VideoPreview = useCallback(
    () => (
      <View
        style={{
          //   flex: 1,
          paddingTop: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
        }}
      >
        <Video
          ref={handleVideoRef}
          useNativeControls
          resizeMode="cover"
          style={{ height: 300, width: '100%' }}
        />
      </View>
    ),
    [handleVideoRef],
  );

  // if (isLoading) {
  //   return (
  //     <Layout level="6" style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
  //      <ActivityIndicator  size="large" color="#FDB813" />
  //     </Layout>
  //   );
  // }
  console.log('value', uploadLocations);
  return (
    <Root>
      <Layout level="6" style={{ flex: 1, padding: 25 }}>
        {imageUri === null ? (
          <VideoPreview />
        ) : (
          <Image
            style={{ height: 300, width: '100%', resizeMode: 'cover' }}
            source={{ uri: imageUri }}
          />
        )}
        <View
          style={{ marginHorizontal: 5, marginBottom: 10, marginVertical: 20 }}
        >
          {/* <GeneralTextField
                  type="caption"
                  label={`Caption`}
                  placeholder={'AddCaption'}
                  setFormValues={setFormValues}
                  multiline
                  height={100}
                  value= {form.caption}
                /> */}
          <CustomField
            label="Caption"
            
            placeholder={'Add Caption'}
            multiline
            height={100}
            value={caption}
            onChangeText={(nextValue) => setCaption(nextValue)}
          />
        </View>
        {/* {entries ? null : (
          <View
            style={{
              flex: 1,
              paddingRight: 5,
              paddingLeft: 5,
            }}
          >
            <View style={{ marginBottom: 5 }}>
              <Text status="primary" category="c2">
                {t('showOn')}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text category="s2" style={{ marginLeft: 0 }}>
                  {t('feeds')}
                </Text>
              </View>
              <Toggle
                checked={uploadLocations.feeds}
                onChange={(e) => handleUploadLoc('feeds')}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text category="s2" style={{ marginLeft: 0 }}>
                  {t('wooz')}
                </Text>
              </View>
              <Toggle
                checked={uploadLocations.wooz}
                onChange={(e) => handleUploadLoc('wooz')}
              />
            </View>

          </View>
        )} */}
        {isLoading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#ff2a00"
          />
        ) : (
          <View style={{ paddingHorizontal: 15, marginVertical: 30 }}>
            {imageUri === null ? (
              <Button
                onPress={() => getVideoUri()}
                disabled={isLoading}
                status="danger"
              >
                <Text status="control" category="h6">
                  {`Post`}
                </Text>
              </Button>
            ) : (
              <Button
                onPress={() => getImageUri()}
                disabled={isLoading}
                status="danger"
              >
                <Text status="control" category="h6">
                  {`Post`}
                </Text>
              </Button>
            )}
          </View>
        )}
        <Spinner visible={isLoading} />
      </Layout>
    </Root>
  );
};

const styles = StyleSheet.create({
  loading: {
    marginBottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

export default PreviewEntry;
