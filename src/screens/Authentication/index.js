import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';

import { View, StyleSheet, Image } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LoadingContext, LocaleContext } from 'src/contexts';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import OverlayLoader from 'src/components/OverlayLoader';

import BackgroundVideo from 'src/components/BackgroundVideo';

import useAudioPlayer from 'src/hooks/useAudioPlayer';

import { IconVolume } from 'src/components/CustomIcons';

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 9,
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  brandMotto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // flexWrap: 'wrap',
    marginBottom: 25,
  },
});

export default function Intro({ navigation }) {
  useDisableAndroidExit();

  const { isLoading } = useContext(LoadingContext);

  const t = useContext(LocaleContext);

  const VolumeButton = () => {
    const [isMuted, setIsMuted] = useState(false);

    const soundObj = useAudioPlayer(
      require('assets/audio/woozeee_Instrumental.mp3'),
      isMuted,
    );

    useEffect(
      () => () => {
        (async () => {
          try {
            await soundObj.unloadAsync();
          } catch (e) {
            const msg = e;
          }
        })();
      },
      [soundObj],
    );

    const handleAudioMute = useCallback(async () => {
      try {
        const muteState = !isMuted;
        await soundObj.setIsMutedAsync(muteState);
        setIsMuted(muteState);
      } catch (e) {
        const msg = e;
      }
    }, [isMuted, soundObj]);

    return useMemo(
      () => (
        <Button
          appearance="ghost"
          size="tiny"
          accessibilityLiveRegion="polite"
          accessibilityComponentType="button"
          accessibilityHint="Volume Toggle"
          accessoryLeft={(evaProps) => (
            <IconVolume
              {...evaProps}
              height={32}
              width={32}
              isClosed={isMuted}
            />
          )}
          onPress={handleAudioMute}
        />
      ),
      [handleAudioMute, isMuted],
    );
  };

  const routeLogin = () => navigation.navigate('Login');

  const routeRegister = () => navigation.navigate('Register');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      {/* Onboarding screen background video */}
      <BackgroundVideo
        videoUri="https://woozeee-socials-artifacts.s3.eu-central-1.amazonaws.com/app-assets/intro.mp4"
        thumbUri={require('assets/images/banner/onboarding-video-thumb.jpg')}
        isMuted
      />
      <View style={styles.uiContainer}>
        <View style={{ alignSelf: 'flex-end' }}>
          <VolumeButton />
        </View>
        <View style={{ alignItems: 'center', paddingBottom: 50 }}>
          <View style={{ marginBottom: 20 }}>
            <Image
              source={require('assets/images/drawable/logo.png')}
              resizeMode="contain"
              style={{ maxWidth: 200, height: 30 }}
            />
          </View>
          <View style={styles.brandMotto}>
            <Text category="h6" status="control">
              {t('haveFun')}
            </Text>
            <Text status="control" style={{ marginHorizontal: 10 }}>
              |
            </Text>
            <Text category="h6" status="control">
              {t('makeMoney')}
            </Text>
            <Text status="control" style={{ marginHorizontal: 10 }}>
              |
            </Text>
            <Text category="h6" status="control">
              {t('giveBack')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              status="danger"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityHint="Sign in or Sign up"
              onPress={routeRegister}
              style={{ width: '45%', marginRight: '2.5%' }}
            >
              <Text status="control" category="h6">
                {t('signUp')}
              </Text>
            </Button>
            <Button
              status="primary"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityHint="Sign in or Sign up"
              onPress={routeLogin}
              style={{ width: '45%', marginLeft: '2.5%' }}
            >
              <Text status="control" category="h6">
                {t('signIn')}
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </Layout>
  );
}
