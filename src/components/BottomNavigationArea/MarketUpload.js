import React, { useContext, useRef, useState } from 'react';

// prettier-ignore
import {
  View, Image, TouchableOpacity,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

// prettier-ignore
import {
  Layout, Divider, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import { IconVideoOutline, IconCloudUploadOutline } from '../CustomIcons';

import { GeneralTextField } from 'src/components/FormFields';

export default function MarketUpload(props) {
  const { navigation, theme } = props;

  const [form, setFormValues] = useState({});

  const { appState } = useContext(AppSettingsContext);

  const sheetRef = useRef(null);

  const t = useContext(LocaleContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const handleOpenSheet = () => sheetRef.current.open();

  return (
    <Layout
      level="3"
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: 52,
        height: 52,
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
        backgroundColor: '#FF5757',
      }}
    >
      <TouchableOpacity onPress={handleOpenSheet}>
        <Image
          source={require('assets/images/icon/scan.png')}
          defaultSource={require('assets/images/icon/upload-market.png')}
          style={{
            width: 25,
            height: 25,
            // borderRadius: 25,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
      <RBSheet
        ref={sheetRef}
        height={400}
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
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              width: '100%',
              paddingHorizontal: 25,
            }}
          >
            <Text category="h5" style={{ marginBottom: 20 }}>
              Scan Product
            </Text>
            <View style={{ flex: 1 }}>
              <Image
                source={require('assets/images/gifs/qr-code-scan.gif')}
                defaultSource={require('assets/images/gifs/qr-code-scan.gif')}
                resizeMode="cover"
                style={{ height: '100%', width: 200, minHeight: 150 }}
              />
            </View>
            <Text category="c2" style={{ marginVertical: 10 }}>
              Have a code ?
            </Text>
            <GeneralTextField
              type="qrCode"
              placeholder={'Input code here'}
              setFormValues={setFormValues}
              style={{ marginVertical: 5 }}
            />
            {/* <Text >{t('completeTransfer')}</Text> */}
            <View style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}>
              <Button
                status="danger"
                size="small"
                onPress={() => sheetRef.current.close()}
              >
                <Text status="control" category="h6">
                  {t('continue')}
                </Text>
              </Button>
            </View>
          </View>
        </Layout>
      </RBSheet>
    </Layout>
  );
}
