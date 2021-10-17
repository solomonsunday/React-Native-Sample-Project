import React, { useContext, useRef } from 'react';

// prettier-ignore
import {
  Image, TouchableOpacity, Alert,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

// prettier-ignore
import {
  Layout, Divider, Button, Text,
} from '@ui-kitten/components';

// import { VESDK, Configuration } from 'react-native-videoeditorsdk';

import { LocaleContext } from 'src/contexts';

import getLibraryPermission from 'src/utilities/getLibraryPermission';
import getCameraPermission from 'src/utilities/getCameraPermission';

import ImageVideoPicker from 'src/utilities/ImageVideoPicker';
import ImageVideoCamera from 'src/utilities/ImageVideoCamera';

import { IconVideoOutline, IconCloudUploadOutline } from '../CustomIcons';

const libraryVideoPicker = ImageVideoPicker('Videos');

const cameraVideoRecorder = ImageVideoCamera('Videos');

// const configuration = {
//   ...Configuration,
//   // tools: ['filter'],
// };

export default function SocialUpload(props) {
  const { navigation, theme } = props;

  const sheetRef = useRef(null);

  const t = useContext(LocaleContext);

  const handleSelectVideo = async () => {
    await getLibraryPermission();

    const videoFile = await libraryVideoPicker();

    // if (!videoFile?.uri) return;

    // if (videoFile.duration > 60 * 1000) {
    //   Alert.alert(
    //     'Video too long',
    //     'Video file should not be greater than 60secs',
    //     [{ text: 'Ok', style: 'default' }],
    //   );
    //   return;
    // }

    // const editorResult = await VESDK.openEditor(videoFile.uri, configuration);

    // if (!editorResult?.video) return;

    // navigation.navigate('VideoUpload', { editorResult });
  };

  const handleRecordVideo = async () => {
    await getCameraPermission();

    // const videoFile = await cameraVideoRecorder();

    // if (!videoFile) return;

    // const editorResult = await VESDK.openEditor(videoFile, configuration);

    // if (!editorResult?.video) return;

    // navigation.navigate('VideoUpload', { editorResult });
  };

  const handleOpenSheet = () => sheetRef.current.open();

  return (
    <Layout
      level="3"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 58,
        height: 58,
        top: -30,
        borderRadius: 29,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 6,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate('UploadEntries', {entries: false})}>
        <Image
          source={require('assets/images/icon/upload.png')}
          defaultSource={require('assets/images/icon/upload.png')}
          style={{
            width: 52,
            height: 52,
            borderRadius: 26,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <RBSheet
        ref={sheetRef}
        height={180}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme,
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
            accessoryLeft={(evaProps) => (
              <IconCloudUploadOutline {...evaProps} height={32} width={32} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={handleSelectVideo}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('upload')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 2, width: '100%' }} />
          <Button
            appearance="ghost"
            status="basic"
            accessoryLeft={(evaProps) => (
              <IconVideoOutline {...evaProps} height={32} width={32} />
            )}
            style={{
              width: '100%',
              justifyContent: 'flex-start',
            }}
            onPress={handleRecordVideo}
          >
            <Text style={{ fontSize: 16 }} status="basic">
              {t('record')}
            </Text>
          </Button>
        </Layout>
      </RBSheet>
    </Layout>
  );
}
