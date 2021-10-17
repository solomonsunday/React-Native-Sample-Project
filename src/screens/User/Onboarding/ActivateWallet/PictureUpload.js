import React, { useContext, useState, useRef } from 'react';

// prettier-ignore
import {
  View, ScrollView, Image, TouchableOpacity,
} from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text, Divider,
} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import getLibraryPermission from 'src/utilities/getLibraryPermission';
import getCameraPermission from 'src/utilities/getCameraPermission';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';
import ImageVideoCamera from 'src/utilities/ImageVideoCamera';

const libraryImagePicker = ImageVideoPicker('Images');

const cameraImageTaker = ImageVideoCamera('Images');

export default function PictureUpload({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [userImage, setUserImage] = useState(
    'https://i.postimg.cc/v8KBxf5f/placeholder-image.png',
  );

  const sheetRef = useRef(null);

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const handleSelectImage = async () => {
    await getLibraryPermission();

    const imageFile = await libraryImagePicker([1, 1]);

    if (!imageFile?.uri) return;

    setUserImage(imageFile.uri);
  };

  const handleSnapImage = async () => {
    await getCameraPermission();

    const imageFile = await cameraImageTaker([1, 1]);

    if (!imageFile) return;

    setUserImage(imageFile);
  };

  const handleOpenSheet = () => sheetRef.current.open();

  // prettier-ignore
  const routeActivateWalletOTPVerify = () => navigation.navigate('ActivateWalletSelectBanks');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('uploadPicture')}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              position: 'relative',
              alignItems: 'center',
              paddingVertical: 50,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.75}
              style={{
                backgroundColor: '#EDF1F7',
                bottom: 0,
                borderRadius: 100,
                height: 200,
                width: 200,
              }}
              onPress={() => handleOpenSheet()}
            >
              <Image
                source={{ uri: userImage }}
                style={{
                  borderColor: 'white',
                  borderWidth: 3,
                  borderRadius: 100,
                  height: '100%',
                  resizeMode: 'cover',
                  width: '100%',
                }}
                resizeMode="cover"
              />
              <Image
                source={require('assets/images/icon/camera-outline.png')}
                defaultSource={require('assets/images/icon/camera-outline.png')}
                style={{
                  position: 'absolute',
                  height: 50,
                  width: 50,
                  top: 75,
                  left: 75,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 15 }}>
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                disabled={isLoading}
                onPress={routeActivateWalletOTPVerify}
              >
                <Text status="control">{t('next')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <RBSheet
        ref={sheetRef}
        height={170}
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
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={handleSelectImage}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('chooseFromLibrary')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            style={{
              width: '100%',
              justifyContent: 'center',
            }}
            onPress={handleSnapImage}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('takePhoto')}
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </Layout>
  );
}
