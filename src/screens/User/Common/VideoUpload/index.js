import React, { useState, useContext, useCallback, useEffect } from 'react';

import { View, ScrollView } from 'react-native';

import { Video } from 'expo-av';

// prettier-ignore
import {
  Button,
  Layout,
  Text,
  Divider,
  Toggle,
  Select,
  SelectItem,
  IndexPath,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';
import RNFetchBlob from 'rn-fetch-blob';
import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';

const UPLOAD_GROUPS = [
  { title: 'Flicks' },
  { title: 'Creativity' },
  { title: 'Music' },
  { title: 'Dance' },
  { title: 'Lifestyle' },
  { title: 'Smart Device' },
];

const UPLOAD_CATEGORIES = [
  { title: 'Movie Trailer' },
  { title: 'Nollywood' },
  { title: 'Comedy' },
  { title: 'Skits' },
];

export default function VideoUpload({ route, navigation }) {
  const { editorResult } = route.params;
  // console.log(editorResult, "editorResult")
  const t = useContext(LocaleContext);
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

  const getVideoUri = async () => {
    const video = editorResult.video;
    const videoUri = await RNFetchBlob.fs.readFile(video, 'base64');
    // console.log('videoUri', videoUri);
    uploadFileToFirebase(videoUri, video);
  };

  useEffect(() => {
    getVideoUri();
  }, []);

  const uploadFileToFirebase = async (videoUri, video) => {
    const uploadTask = storage()
      .ref(`allFiles/${'femmy222'}`)
      .putString(videoUri, 'base64', { contentType: 'mp4' });
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
        });
      },
    );
  };

  const [uploadLocations, setUploadLocations] = useState({
    stories: false,
    feeds: false,
    wooz: false,
  });

  const [form, setFormValues] = useState({
    message: '',
  });

  const [selectedGroup, setSelectedGroup] = useState(new IndexPath(0));

  const [selectedCategory, setSelectedCategory] = useState(new IndexPath(0));

  const renderGroups = () => (
    <Text>{UPLOAD_GROUPS[selectedGroup.row].title}</Text>
  );

  const renderCategories = () => (
    <Text>{UPLOAD_CATEGORIES[selectedCategory.row].title}</Text>
  );

  const handleChooseGroup = async (index) => {
    setSelectedGroup(index);
  };

  const handleChooseCategory = async (index) => {
    setSelectedCategory(index);
  };

  const handleVideoRef = useCallback(
    (ref) => {
      const videoComp = ref;

      (async () => {
        try {
          await videoComp?.loadAsync({ uri: editorResult?.video });
        } catch (e) {
          const msg = e;
        }
      })();
    },
    [editorResult?.video],
  );

  const handleUploadLoc = (loc) => {
    setUploadLocations((prevState) => ({
      ...prevState,
      [loc]: !prevState[loc],
    }));
  };

  // prettier-ignore
  const VideoPreview = useCallback(
    () => (
      <View
        style={{
          flex: 1,
          paddingTop: 10,
          paddingHorizontal: 15,
          marginBottom: 20,
        }}
      >
        <Video
          ref={handleVideoRef}
          useNativeControls
          resizeMode="contain"
          style={{ height: 300, width: '100%' }}
        />
      </View>
    ),
    [handleVideoRef],
  );

  return (
    <>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title="woozeee"
          navigation={navigation}
          icon="logout"
          screen="social"
        />
        <ScrollView
          style={{ flex: 1, paddingVertical: 10 }}
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={{ paddingBottom: 40 }}>
            <VideoPreview />
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ paddingHorizontal: 10 }}>
              <View style={{ flex: 1, marginHorizontal: 5, marginBottom: 10 }}>
                <GeneralTextField
                  type="caption"
                  label={`${t('caption')} (${t('optional')})`}
                  placeholder={t('addCaption')}
                  setFormValues={setFormValues}
                  multiline
                  maxHeight={50}
                />
              </View>
              <View style={{ flex: 1, marginHorizontal: 5 }}>
                <GeneralTextField
                  type="hashtag"
                  label={`${t('hashTag')} (${t('optional')})`}
                  placeholder="#woozeeelife"
                  setFormValues={setFormValues}
                  multiline
                  maxHeight={50}
                />
              </View>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ paddingRight: 15, paddingLeft: 10 }}>
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
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text category="s2" style={{ marginLeft: 10 }}>
                    {t('selectGroup')}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Select
                    value={renderGroups}
                    selectedIndex={selectedGroup}
                    onSelect={handleChooseGroup}
                  >
                    {UPLOAD_GROUPS.map((option) => (
                      <SelectItem key={option.title} title={option.title} />
                    ))}
                  </Select>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text category="s2" style={{ marginLeft: 10 }}>
                    {t('selectCategory')}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Select
                    value={renderCategories}
                    selectedIndex={selectedCategory}
                    onSelect={handleChooseCategory}
                  >
                    {UPLOAD_CATEGORIES.map((option) => (
                      <SelectItem key={option.title} title={option.title} />
                    ))}
                  </Select>
                </View>
              </View>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            {/* Start */}
            <View
              style={{
                flex: 1,
                paddingRight: 15,
                paddingLeft: 10,
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
                  <Text category="s2" style={{ marginLeft: 10 }}>
                    {t('wooz')}
                  </Text>
                </View>
                <Toggle
                  checked={uploadLocations.stories}
                  onChange={(e) => handleUploadLoc('stories')}
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
                  <Text category="s2" style={{ marginLeft: 10 }}>
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
                  <Text category="s2" style={{ marginLeft: 10 }}>
                    {t('stories')}
                  </Text>
                </View>
                <Toggle
                  checked={uploadLocations.wooz}
                  onChange={(e) => handleUploadLoc('wooz')}
                />
              </View>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ paddingHorizontal: 15 }}>
              <Button
                status="danger"
                disabled={Object.values(uploadLocations).every(
                  (item) => item === false,
                )}
              >
                <Text status="control" category="h6">
                  {t('postVideo')}
                </Text>
              </Button>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </>
  );
}
