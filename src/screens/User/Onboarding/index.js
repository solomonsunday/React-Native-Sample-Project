import React, { useState, useContext, useEffect } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Layout, Text, Button } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';
import OneSignal from 'react-native-onesignal';

const SLIDE_CONTENT = [
  {
    id: 1,
    banner: require('assets/images/onboarding/wallet.jpg'),
    title: 'woozeee wallet',
    description:
      'Securely stores users payment information and passwords and allows you to make and receive electronic payments. It is linked to a bank account.',
    activateAction: 'activateWallet',
  },
  {
    id: 2,
    banner: require('assets/images/onboarding/care.jpg'),
    title: 'woozeee care',
    description:
      'Opt-out insurance for all users covering, Medical assurance, Travel insurance (air and road travel) by Axa Mansard, Legal consultation and Road rescue).',
    activateAction: 'activateCare',
  },
  // {
  //   id: 3,
  //   banner: require('assets/images/onboarding/rewards.jpg'),
  //   title: 'woozeee reward',
  //   description:
  //     'Earn money, points and gift cards for completing transactions in the woozeee ecosystem.',
  //   activateAction: 'goHome',
  // },
];

const RenderImage = ({ src }) => (
  <Image
    source={src}
    defaultSource={src}
    resizeMode="cover"
    style={{ height: '100%', width: '100%' }}
  />
);

export default function Onboarding({ route, navigation }) {
  // const { isActivated } = route.params;
  // console.log(route);
  const [prevAction, setPrevAction] = useState(false);
  const [lastIndex, setLastIndex] = useState(false);

  if (route.params !== undefined) {
    // console.log(route.params);
    // setLastIndex(lastIndex + 1);
  }
  // isActivated !== undefined && setLastIndex(lastIndex + 1);

  const t = useContext(LocaleContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      OneSignal.setNotificationOpenedHandler((notification) => {
        console.log('OneSignal: notification opened:', notification);
        navigation.navigate('SocialRoute');
      });
    });

    return unsubscribe;
  }, [navigation]);

  const checkLastIndex = (nextIndex) => {
    setTimeout(() => {
      if (nextIndex >= SLIDE_CONTENT.length - 1) {
        setLastIndex(true);
        return;
      }

      setLastIndex(false);
    }, 0);
  };

  const ACTIVATE_SCREENS = {
    activateWallet: () => navigation.navigate('ActivateWallet'),
    activateCare: () => navigation.navigate('ActivateCare'),
    goHome: () => navigation.replace('UserRoute'),
  };

  const routeHome = () => navigation.replace('UserRoute');

  const NextButton = () => (
    <Text status="danger" category="h6">
      {t('skip')}
    </Text>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <Swiper
        loop={false}
        showsButtons
        onIndexChanged={checkLastIndex}
        paginationStyle={{ bottom: '45%' }}
        activeDotColor="#043F7C"
        activeDotStyle={{ width: 16 }}
        buttonWrapperStyle={{
          paddingBottom: 50,
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}
        nextButton={<NextButton />}
        prevButton={<Text />}
      >
        {SLIDE_CONTENT.map((item) => (
          <View
            style={{
              flex: 1,
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
            key={item.id}
          >
            <RenderImage src={item.banner} />
            <View
              style={{
                flex: 1,
                position: 'absolute',
                bottom: '10%',
                paddingHorizontal: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingHorizontal: 25,
                }}
              >
                <Text
                  status="primary"
                  category="h5"
                  style={{ marginBottom: 15 }}
                >
                  {item.title}
                </Text>
                <Text
                  status="primary"
                  style={{
                    textAlign: 'center',
                    lineHeight: 24,
                    marginBottom: 25,
                  }}
                >
                  {item.description}
                </Text>
              </View>
              <View style={{ flex: 1, width: '100%', position: 'relative' }}>
                <Button
                  status="danger"
                  style={{ marginBottom: 10 }}
                  onPress={ACTIVATE_SCREENS[item.activateAction]}
                >
                  <Text status="control" category="h6">
                    {t('activate')}
                  </Text>
                </Button>
                {lastIndex && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: -30,
                      alignSelf: 'center',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.5}
                      status="danger"
                      appearance="ghost"
                      onPress={routeHome}
                    >
                      <Text status="danger" category="h6">
                        {t('getStarted')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </Layout>
  );
}
