import React from 'react';
import { Image } from 'react-native';

const IconProvider = (source) => ({
  toReactElement: ({ animation, ...props }) => (
    <Image
      {...props}
      source={source}
      defaultSource={source}
      resizeMode="cover"
    />
  ),
});

const AssetIconsPack = {
  name: 'assets',
  icons: {
    home: IconProvider(require('assets/images/icon/home.png')),
    'home-outline': IconProvider(
      require('assets/images/icon/home-outline.png'),
    ),
    wallet: IconProvider(require('assets/images/icon/wallet.png')),
    'wallet-outline': IconProvider(
      require('assets/images/icon/wallet-outline.png'),
    ),
    list: IconProvider(require('assets/images/icon/list.png')),
    'list-outline': IconProvider(
      require('assets/images/icon/list-outline.png'),
    ),
    clock: IconProvider(require('assets/images/icon/clock.png')),
    'clock-outline': IconProvider(
      require('assets/images/icon/clock-outline.png'),
    ),
    social: IconProvider(require('assets/images/icon/social.png')),
    'social-outline': IconProvider(
      require('assets/images/icon/social-outline.png'),
    ),
    wooz: IconProvider(require('assets/images/icon/wooz.png')),
    'wooz-outline': IconProvider(
      require('assets/images/icon/wooz-outline.png'),
    ),
    supercup: IconProvider(require('assets/images/icon/supercup.png')),
    'supercup-outline': IconProvider(
      require('assets/images/icon/supercup-outline.png'),
    ),
    user: IconProvider(require('assets/images/icon/user.png')),
    'user-outline': IconProvider(
      require('assets/images/icon/user-outline.png'),
    ),
    'user-2': IconProvider(require('assets/images/icon/user-2-outline.png')),
    'user-2-outline': IconProvider(
      require('assets/images/icon/user-2-outline.png'),
    ),
    // wooz: IconProvider(require('assets/images/icon/wooz.png')),
    // 'wooz-outline': IconProvider(
    //   require('assets/images/icon/wooz-outline.png'),
    // ),
    movies: IconProvider(require('assets/images/icon/movies.png')),
    'movies-outline': IconProvider(
      require('assets/images/icon/movies-outline.png'),
    ),
    chat: IconProvider(require('assets/images/icon/chat.png')),
    'chat-outline': IconProvider(
      require('assets/images/icon/chat-outline.png'),
    ),
    heart: IconProvider(require('assets/images/icon/heart.png')),
    'heart-outline': IconProvider(
      require('assets/images/icon/heart-outline.png'),
    ),
    'heart-filled': IconProvider(
      require('assets/images/icon/heart-filled.png'),
    ),
    'eye-outline': IconProvider(require('assets/images/icon/eye-outline.png')),
    share: IconProvider(require('assets/images/icon/share.png')),
    'share-outline': IconProvider(
      require('assets/images/icon/share-outline.png'),
    ),
    'reorder-left-outline': IconProvider(
      require('assets/images/icon/reorder-left-outline.png'),
    ),
    'video-outline': IconProvider(
      require('assets/images/icon/video-outline.png'),
    ),
    'notification-outline': IconProvider(
      require('assets/images/icon/notification-new-outline.png'),
    ),
    'notification-new-outline': IconProvider(
      require('assets/images/icon/notification-new-outline.png'),
    ),
    'search-outline': IconProvider(
      require('assets/images/icon/search-outline.png'),
    ),
    'market-outline': IconProvider(
      require('assets/images/icon/market-outline.png'),
    ),
    market: IconProvider(require('assets/images/icon/market-outline.png')),
    'cart-outline': IconProvider(
      require('assets/images/icon/cart-outline.png'),
    ),
    cart: IconProvider(require('assets/images/icon/cart-outline.png')),
    'grid-outline': IconProvider(
      require('assets/images/icon/grid-outline.png'),
    ),
    grid: IconProvider(require('assets/images/icon/grid-outline.png')),
    vote: IconProvider(require('assets/images/icon/vote.png')),
    medal: IconProvider(require('assets/images/icon/medal.png')),
    charity: IconProvider(require('assets/images/icon/charity.png')),
    'charity-outline': IconProvider(require('assets/images/icon/charity.png')),
    campaign: IconProvider(require('assets/images/icon/campaign-outline.png')),
    'campaign-outline': IconProvider(
      require('assets/images/icon/campaign-outline.png'),
    ),
    hero: IconProvider(require('assets/images/icon/hero-outline.png')),
    'hero-outline': IconProvider(
      require('assets/images/icon/hero-outline.png'),
    ),
    google: IconProvider(require('assets/images/icon/google-fill.png')),
    facebook: IconProvider(require('assets/images/icon/facebook.png')),
    twitter: IconProvider(require('assets/images/icon/twitter.png')),
    apple: IconProvider(require('assets/images/icon/apple.png')),
    'camera-outline': IconProvider(
      require('assets/images/icon/camera-outline.png'),
    ),
    'phone-outline': IconProvider(
      require('assets/images/icon/phone-outline.png'),
    ),
    'microphone-outline': IconProvider(
      require('assets/images/icon/microphone-outline.png'),
    ),
    'arrow-up-outline': IconProvider(
      require('assets/images/icon/arrow-up-outline.png'),
    ),
    'atm-card': IconProvider(require('assets/images/icon/atm-card.png')),
    bag: IconProvider(require('assets/images/icon/bag.png')),
    card: IconProvider(require('assets/images/icon/card.png')),
    giftbox: IconProvider(require('assets/images/icon/giftbox.png')),
    naira: IconProvider(require('assets/images/icon/naira.png')),
    'plus-outline': IconProvider(
      require('assets/images/icon/plus-outline.png'),
    ),
    'snow-outline': IconProvider(
      require('assets/images/icon/snow-outline.png'),
    ),
    'wallet-fill': IconProvider(require('assets/images/icon/wallet-fill.png')),
    'star-fill': IconProvider(require('assets/images/icon/star-fill.png')),
    'share-ios': IconProvider(require('assets/images/icon/share-ios.png')),
    'share-android': IconProvider(
      require('assets/images/icon/share-android.png'),
    ),
    'mobile-topup': IconProvider(
      require('assets/images/icon/mobile-topup.png'),
    ),
    'data-topup': IconProvider(require('assets/images/icon/data-topup.png')),
    electricity: IconProvider(require('assets/images/icon/electricity.png')),
    'cable-tv': IconProvider(require('assets/images/icon/cable-tv.png')),
    'check-filled': IconProvider(
      require('assets/images/icon/check-filled.png'),
    ),
    'phonebook-outline': IconProvider(
      require('assets/images/icon/phonebook-outline.png'),
    ),
    'phonebook-filled': IconProvider(
      require('assets/images/icon/phonebook-filled.png'),
    ),
    startstream: IconProvider(require('assets/images/icon/startstream.png')),
    livestreams: IconProvider(require('assets/images/icon/livestreams.png')),
    'coin-filled': IconProvider(require('assets/images/icon/coin-filled.png')),
  },
};

export default AssetIconsPack;
