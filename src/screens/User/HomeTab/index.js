// prettier-ignore
import React, {
  useContext, useRef, useCallback, useState, useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

// prettier-ignore
import {
  Layout, Text, List, Button,
} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  LoadingContext,
  LocaleContext,
  AppSettingsContext,
} from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';
import OneSignal from 'react-native-onesignal';

import OverlayLoader from 'src/components/OverlayLoader';

import useDisableAndroidExit from 'src/hooks/useDisableAndroidExit';

import BackgroundVideo from 'src/components/BackgroundVideo';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

/* DATA */

const woozeeeCategories = [
  {
    title: 'social',
    banner: require('assets/images/banner/woozeee-socials.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fsocial.mp4?alt=media&token=afc818c3-7857-4368-88b9-3d2d16baea09',
    screen: 'SocialRoute',
  },
  {
    title: 'marketplace',
    banner: require('assets/images/banner/woozeee-marketplace.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fmarket.mp4?alt=media&token=2709a1b4-8d3b-4d74-a364-63a276e94493',
    screen: 'MarketPlaceRoute',
    // screen: 'openComingSoonMarket',
  },
  {
    title: 'charity',
    banner: require('assets/images/banner/woozeee-charity.jpg'),
    video:
      'https://firebasestorage.googleapis.com/v0/b/woozeee-d7f6c.appspot.com/o/app-assets%2Fcharity.mp4?alt=media&token=c837385b-fef5-4df3-ad36-c36560fe0ee0',
    // screen: 'CharityRoute',
    screen: 'openComingSoonCharity',
  },
];

const styles = StyleSheet.create({
  cardContent: {
    height: '100%',
    width: '95%',
    maxWidth: 600,
    position: 'absolute',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Home({ navigation }) {
  useDisableAndroidExit();

  const { width, height } = useWindowDimensions();

  const sheetRefCare = useRef(null);
  const sheetRefWallet = useRef(null);
  const sheetRefRewards = useRef(null);
  const sheetComingSoonMarket = useRef(null);
  const sheetComingSoonCharity = useRef(null);

  const [isBalanceVisible, setBalanceVisible] = useState(true);
  const [insureCardNo, setInsureCardNo] = useState(null);
  const [walletCardNo, setWalletCardNo] = useState(null);
  const [rewardCardNo, setRewardCardNo] = useState(null);
  const [insureAmt, setInsureAmt] = useState(null);
  const [walletAmt, setWalletAmt] = useState(null);
  const [rewardAmt, setRewardAmt] = useState(null);
  const [fullname, setFullName] = useState(null);

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 190 : 170;

  const CATEGORY_HEIGHT = IS_PORTRAIT ? 250 : 220;

  const t = useContext(LocaleContext);

  const { isLoading } = useContext(LoadingContext);

  const { appState } = useContext(AppSettingsContext);

  const woozeeeCards = [
    {
      balance: parseInt(insureAmt).toFixed(2),
      cardNum: insureCardNo,
      banner: require('assets/images/card/card3.png'),
      action: 'openCare',
    },
    {
      balance: parseInt(walletAmt).toFixed(2),
      cardNum: walletCardNo,
      banner: require('assets/images/card/card1.png'),
      action: 'openWallet',
    },
    {
      balance: parseInt(rewardAmt).toFixed(2),
      cardNum: rewardCardNo,
      banner: require('assets/images/card/card2.png'),
      action: 'openRewards',
    },
  ];

  const fetchFromAsyncStorage = () => {
    // Fetch Data from Asynchstorage

    AsyncStorage.getItem('fullName')
      .then((res) => {
        setFullName(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('insureCardNo')
      .then((res) => {
        setInsureCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('walletCardNo')
      .then((res) => {
        setWalletCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('rewardCardNo')
      .then((res) => {
        setRewardCardNo(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('insureAmt')
      .then((res) => {
        setInsureAmt(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('walletAmt')
      .then((res) => {
        setWalletAmt(res);
      })
      .catch((err) => err);
    AsyncStorage.getItem('rewardAmt')
      .then((res) => {
        setRewardAmt(res);
      })
      .catch((err) => err);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchFromAsyncStorage();
      OneSignal.setNotificationOpenedHandler((notification) => {
        console.log('OneSignal: notification opened:', notification);
        navigation.navigate('SocialRoute');
      });
    });

    return unsubscribe;
  }, [navigation]);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const setAppThem = async () => {
    await AsyncStorage.setItem('appTheme', BG_THEME);
  };

  setAppThem();

  // const routeTo = (route) => navigation.replace(route);

  const toggleBalanceVisibility = useCallback(() => {
    setBalanceVisible((prevState) => !prevState);
  }, []);

  const ACTION_SHEETS = {
    openCare: () => sheetRefCare.current.open(),
    openWallet: () => sheetRefWallet.current.open(),
    openRewards: () => sheetRefRewards.current.open(),
    MarketPlaceRoute: () => navigation.replace('MarketPlaceRoute', navigation),
    openComingSoonCharity: () => sheetComingSoonCharity.current.open(),
    openComingSoonMarket: () => sheetComingSoonMarket.current.open(),
    SocialRoute: () => navigation.replace('SocialRoute'),
    MarketPlaceRoute: () => navigation.replace('MarketPlaceRoute'),
  };

  const RewardsSheet = useCallback(
    () => (
      <RBSheet
        ref={sheetRefRewards}
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
              {`woozeee ${t('rewards')}`}
            </Text>
            <View style={{ flex: 1 }}>
              <Image
                source={require('assets/images/gifs/qr-code-scan.gif')}
                defaultSource={require('assets/images/gifs/qr-code-scan.gif')}
                resizeMode="cover"
                style={{ height: '100%', width: 200, minHeight: 150 }}
              />
            </View>
            <Text category="h6" style={{ marginVertical: 5 }}>
              Hello {fullname}
            </Text>
            <Text style={{ marginVertical: 5 }}>{t('redeem')}</Text>
            <View style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}>
              <Button
                status="danger"
                size="small"
                onPress={() => sheetRefRewards.current.close()}
              >
                <Text status="control" category="h6">
                  {t('gotIt')}
                </Text>
              </Button>
            </View>
          </View>
        </Layout>
      </RBSheet>
    ),
    [t, BG_THEME, fullname],
  );

  const CareSheet = useCallback(
    () => (
      <RBSheet
        ref={sheetRefCare}
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
              {`woozeee ${t('care')}`}
            </Text>
            <View style={{ flex: 1 }}>
              <Image
                source={require('assets/images/gifs/qr-code-scan.gif')}
                defaultSource={require('assets/images/gifs/qr-code-scan.gif')}
                resizeMode="cover"
                style={{ height: '100%', width: 200, minHeight: 150 }}
              />
            </View>
            <Text category="h6" style={{ marginVertical: 5 }}>
              Hello {fullname}
            </Text>
            <Text style={{ marginVertical: 5 }}>{t('acceptCharge')}</Text>
            <View style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}>
              <Button
                status="danger"
                size="small"
                onPress={() => sheetRefCare.current.close()}
              >
                <Text status="control" category="h6">
                  {t('gotIt')}
                </Text>
              </Button>
            </View>
          </View>
        </Layout>
      </RBSheet>
    ),
    [t, BG_THEME, fullname],
  );

  const WalletSheet = useCallback(
    () => (
      <RBSheet
        ref={sheetRefWallet}
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
              {`woozeee ${t('wallet')}`}
            </Text>
            <View style={{ flex: 1 }}>
              <Image
                source={require('assets/images/gifs/qr-code-scan.gif')}
                defaultSource={require('assets/images/gifs/qr-code-scan.gif')}
                resizeMode="cover"
                style={{ height: '100%', width: 200, minHeight: 150 }}
              />
            </View>
            <Text category="h6" style={{ marginVertical: 5 }}>
              Hello {fullname}
            </Text>
            <Text style={{ marginVertical: 5 }}>{t('completeTransfer')}</Text>
            <View style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}>
              <Button
                status="danger"
                size="small"
                onPress={() => sheetRefWallet.current.close()}
              >
                <Text status="control" category="h6">
                  {t('gotIt')}
                </Text>
              </Button>
            </View>
          </View>
        </Layout>
      </RBSheet>
    ),
    [t, BG_THEME, fullname],
  );

  const MarketSheet = useCallback(
    () => (
      <RBSheet
        ref={sheetComingSoonMarket}
        height={height}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
            paddingVertical: 20,
          },
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
            position: 'relative',
          }}
        >
          <Image
            source={require('assets/images/banner/marketplace.jpg')}
            defaultSource={require('assets/images/banner/marketplace.jpg')}
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
          >
            <Layout
              level="5"
              style={{
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 25,
                paddingTop: 20,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 400,
              }}
            >
              <Text category="h5" style={{ marginBottom: 20 }}>
                {`woozeee ${t('marketplace')}`}
              </Text>
              <View style={{ flex: 1 }}>
                <Image
                  source={require('assets/images/gifs/marketplace.gif')}
                  defaultSource={require('assets/images/gifs/marketplace.gif')}
                  resizeMode="contain"
                  style={{ height: '100%', width: 200, minHeight: 150 }}
                />
              </View>
              <Text category="h6" style={{ marginVertical: 5 }}>
                Hello {fullname}
              </Text>
              <Text style={{ marginVertical: 5, textAlign: 'center' }}>
                {t('marketComing')}
              </Text>
              <View
                style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}
              >
                <Button
                  status="danger"
                  size="small"
                  onPress={() => sheetComingSoonMarket.current.close()}
                >
                  <Text status="control" category="h6">
                    {t('beBack')}
                  </Text>
                </Button>
              </View>
            </Layout>
          </View>
        </View>
      </RBSheet>
    ),
    [t, BG_THEME, height, fullname],
  );

  const CharitySheet = useCallback(
    () => (
      <RBSheet
        ref={sheetComingSoonCharity}
        height={height}
        closeOnDragDown
        animationType="fade"
        customStyles={{
          container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: BG_THEME,
            paddingVertical: 20,
          },
        }}
      >
        <View
          style={{
            flex: 1,
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            paddingBottom: 30,
            position: 'relative',
          }}
        >
          <Image
            source={require('assets/images/banner/charity.jpg')}
            defaultSource={require('assets/images/banner/charity.jpg')}
            resizeMode="contain"
            style={{
              height: '100%',
              width: '100%',
            }}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
            }}
          >
            <Layout
              level="5"
              style={{
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 25,
                paddingTop: 20,
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                height: 400,
              }}
            >
              <Text category="h5" style={{ marginBottom: 20 }}>
                {`woozeee ${t('charity')}`}
              </Text>
              <View style={{ flex: 1 }}>
                <Image
                  source={require('assets/images/gifs/charity.gif')}
                  defaultSource={require('assets/images/gifs/charity.gif')}
                  resizeMode="contain"
                  style={{ height: '100%', width: 200, minHeight: 150 }}
                />
              </View>
              <Text category="h6" style={{ marginVertical: 5 }}>
                Hello {fullname}
              </Text>
              <Text style={{ marginVertical: 5, textAlign: 'center' }}>
                {t('charityComing')}
              </Text>
              <View
                style={{ marginTop: 10, alignSelf: 'center', width: '100%' }}
              >
                <Button
                  status="danger"
                  size="small"
                  onPress={() => sheetComingSoonCharity.current.close()}
                >
                  <Text status="control" category="h6">
                    {t('beBack')}
                  </Text>
                </Button>
              </View>
            </Layout>
          </View>
        </View>
      </RBSheet>
    ),
    [t, BG_THEME, height],
  );

  const Balance = (props) => {
    const { value, point } = props;
    const [wholeNum, decimalNum] = value.split('.');

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          marginBottom: 5,
        }}
      >
        <Text category="p2">{decimalNum ? 'N' : null}</Text>
        <Text category="h5" style={{ marginHorizontal: 5 }}>
          {isBalanceVisible ? wholeNum : 'XXX,XXX'}
        </Text>
        <Text category="p2">
          {/* eslint-disable-next-line no-nested-ternary */}
          {isBalanceVisible
            ? decimalNum
              ? `.${decimalNum}`
              : `${point}(s)`
            : '.XX'}
        </Text>
      </View>
    );
  };

  const WoozeeeCards = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: CARD_HEIGHT,
        width: IS_PORTRAIT ? width / 1.75 : width / 3,
        paddingHorizontal: 5,
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
      onPress={ACTION_SHEETS[data.item.action]}
    >
      <Balance value={data.item.balance} point={t('point')} />
      <Image
        source={data.item.banner}
        defaultSource={data.item.banner}
        style={{
          height: IS_PORTRAIT ? 140 : 120,
          width: '100%',
          borderRadius: 5,
          resizeMode: 'contain',
        }}
      />
      <Text
        category="c2"
        style={{
          position: 'absolute',
          bottom: IS_PORTRAIT ? 140 / 1.9 : 120 / 1.9,
          color: 'white',
          right: 10,
        }}
      >
        {` ${data.item.cardNum}`}
      </Text>
      <Text
        category="s2"
        style={{
          position: 'absolute',
          bottom: IS_PORTRAIT ? 140 / 5 : 120 / 5,
          color: 'white',
          left: 20,
        }}
      >
        {fullname}
      </Text>
    </TouchableOpacity>
  );

  const renderWoozeeeCategory = (data) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        height: IS_PORTRAIT ? 250 : 220,
        width: IS_PORTRAIT ? width : width / 2,
        marginVertical: 5,
        position: 'relative',
        alignItems: 'center',
        alignSelf: 'center',
      }}
      onPress={ACTION_SHEETS[data.item.screen]}
    >
      <View style={styles.cardContent}>
        <BackgroundVideo
          videoUri={data.item.video}
          thumbUri={data.item.banner}
          style={{ borderRadius: 5 }}
          isMuted
        />
      </View>

      <View
        style={[
          styles.cardContent,
          { backgroundColor: 'rgba(0, 0, 0, 0, 0.25' },
        ]}
      >
        <Text category="h4" style={{ color: 'white' }}>
          {` woozeee ${t(data.item.title)} `}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderWoozeeeCards = () => (
    <View style={{ flex: 1, paddingTop: 15, Height: 180 }}>
      <List
        style={{ backgroundColor: 'transparent' }}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        alwaysBounceHorizontal
        alwaysBounceVertical
        horizontal={IS_PORTRAIT}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        data={woozeeeCards}
        keyExtractor={(_, i) => i.toString()}
        renderItem={WoozeeeCards}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
      />
    </View>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <OverlayLoader isLoading={isLoading} />
      <TopNavigationArea
        title="woozeee"
        navigation={navigation}
        screen="user"
        balanceVisible={isBalanceVisible}
        toggleBalance={toggleBalanceVisibility}
      />

      <View style={{ flex: 1 }}>
        <List
          ListHeaderComponent={renderWoozeeeCards}
          style={{ backgroundColor: 'transparent' }}
          horizontal={!IS_PORTRAIT}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          data={woozeeeCategories}
          keyExtractor={(_, i) => i.toString()}
          renderItem={renderWoozeeeCategory}
          getItemLayout={(data, index) => ({
            length: CATEGORY_HEIGHT,
            offset: CATEGORY_HEIGHT * index,
            index,
          })}
        />
      </View>
      <RewardsSheet />
      <CareSheet />
      <WalletSheet />
      <MarketSheet />
      <CharitySheet />
    </Layout>
  );
}
