import React, { useContext, useRef } from 'react';

// prettier-ignore
import {
  Image, TouchableOpacity,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

// prettier-ignore
import {
  Layout, Divider, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import { IconVideoOutline, IconCloudUploadOutline } from '../CustomIcons';

export default function CharityUpload(props) {
  const { navigation, theme } = props;

  const sheetRef = useRef(null);

  const t = useContext(LocaleContext);

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
        borderRadius: 26,
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
      <TouchableOpacity onPress={handleOpenSheet}>
        <Image
          source={require('assets/images/icon/upload-charity.png')}
          defaultSource={require('assets/images/icon/upload-charity.png')}
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
