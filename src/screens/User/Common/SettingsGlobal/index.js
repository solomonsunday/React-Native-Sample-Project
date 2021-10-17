import React, { useState, useContext } from 'react';

import { View, ScrollView } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text, Toggle, Divider,
} from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconForwardIos } from 'src/components/CustomIcons';

export default function Settings({ navigation }) {
  const t = useContext(LocaleContext);

  const { authOptions } = useContext(AuthContext);

  const { logout } = authOptions;

  const [isLoading, setLoading] = useState(false);

  const [autoPlay, setAutoPlay] = useState(true);
  const [postNotif, setPostNotif] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [hideAccount, setHideAccount] = useState(false);
  const [disableAccount, setDisableAccount] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (e) {
      const err = e;
    } finally {
      setLoading(false);
    }
  };

  const routeAbout = () => navigation.navigate('About');
  const routePrivacyPolicy = () => navigation.navigate('PrivacyPolicy');
  // const routeBack = () => navigation.goBack();

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('settings')}
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
            padding: 15,
          }}
        >
          <View style={{ marginBottom: 10, paddingHorizontal: 15 }}>
            <Text status="primary" category="c2">
              {t('settings')}
            </Text>
          </View>
          <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('account')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 5 }} />
          <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
            onPress={routePrivacyPolicy}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('privacySafety')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 5 }} />
          {/* <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('notifications')}
            </Text>
          </Button> */}
          {/* <Divider style={{ marginVertical: 5 }} /> */}
          {/* <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('display')}
            </Text>
          </Button> */}
          {/* <Divider style={{ marginVertical: 5 }} /> */}
          <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
            onPress={routeAbout}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('aboutWoozeee')}
            </Text>
          </Button>
          <Divider style={{ marginVertical: 5 }} />
          {/* <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('referrals')}
            </Text>
          </Button> */}
          {/* <Divider style={{ marginVertical: 5 }} /> */}
          {/* <Button
            appearance="outline"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderColor: 'transparent',
            }}
            accessoryRight={IconForwardIos}
          >
            <Text category="s2" status="" style={{ marginLeft: 10 }}>
              {t('help')}
            </Text>
          </Button> */}
          <View style={{ marginVertical: 20 }}>
            <Button appearance="ghost" onPress={handleLogout}>
              <Text status="danger" category="s1">
                {t('logout')}
              </Text>
            </Button>
            <Text category="c2" style={{ textAlign: 'center' }}>
              {`${t('version')} 1.0.0`}
            </Text>
          </View>
          {/* <View style={{ paddingVertical: 20 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              accessoryLeft={isLoading ? renderSpinner : null}
              onPress={routeBack}
              disabled={isLoading}
            >
              <Text status="control">{t('close')}</Text>
            </Button>
          </View> */}
        </View>
      </ScrollView>
    </Layout>
  );
}
