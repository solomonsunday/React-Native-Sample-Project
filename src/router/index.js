import React, { useState, useContext, useEffect } from 'react';

import { Alert, Platform, BackHandler } from 'react-native';

import { useNetInfo } from '@react-native-community/netinfo';

import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';

import * as SplashScreen from 'expo-splash-screen';

import { AuthContext } from 'src/contexts';

import { Toast, Content, Root } from 'native-base';

import { firebase as fb } from '@react-native-firebase/dynamic-links';

/* Screens import */
import Intro from 'src/screens/Authentication';
import Login from 'src/screens/Authentication/Login';
import Register from 'src/screens/Authentication/Registration';
import RegisterFull from 'src/screens/Authentication/Registration/RegisterFull';
import VerifyWithCode from 'src/screens/Authentication/Verification';
import RecoverWithEmail from 'src/screens/Authentication/Recovery';
import ResendOTP from 'src/screens/Authentication/Recovery/ResendOTP';
import RecoveryFull from '../screens/Authentication/Recovery/RecoveryFull';

// Common screens
import FAQs from 'src/screens/Common/FAQs';
import TermsConditions from 'src/screens/Common/TermsConditions';
import PrivacyPolicy from 'src/screens/Common/PrivacyPolicy';
import About from 'src/screens/Common/About';

// Common User Screens
import Settings from 'src/screens/User/Common/Settings';
import SettingsGlobal from 'src/screens/User/Common/SettingsGlobal';
import EditProfile from 'src/screens/User/Common/EditProfile';
import ChangePassword from 'src/screens/User/Common/ChangePassword';
import GeneratePin from 'src/screens/User/Common/GeneratePin';
import UploadEntries from 'src/screens/User/Common/VideoUpload/UploadEntries';
import PreviewEntry from 'src/screens/User/Common/VideoUpload/PreviewEntry';

import Report from '../components/ReportCard/index';
import Search from 'src/screens/User/Common/Search';
import Movies from 'src/screens/User/Common/Movies';
import ViewMovies from 'src/screens/User/Common/ViewMovies';
import MoviePage from 'src/screens/User/Common/ViewMovies/MoviePage';
import ChallengePage from 'src/screens/User/Common/ChallengePage/index';
import LiveStream from 'src/screens/User/Common/LiveStream';
import Messaging from 'src/screens/User/Common/Messaging';
import Comments from 'src/screens/User/Common/Comments';
import Chats from 'src/screens/User/Common/Chats';
import ChatScreen from '../screens/User/Common/Messaging/ChatScreen';
import Rankings from 'src/screens/User/Common/Rankings';
import UserProfile from 'src/screens/User/Common/UserProfile';
import ProfilePostsWooz from 'src/screens/User/Common/UserProfile/ProfilePostsWooz';
import ProfileLikedPosts from 'src/screens/User/Common/UserProfile/ProfileLikedPosts';
import Follow from 'src/screens/User/Common/Follow';
import DeepLinkPost from '../components/DeepLinkVideo/index';

// Ask a doctor

// Onboarding
import Onboarding from 'src/screens/User/Onboarding';

import ActivateWallet from 'src/screens/User/Onboarding/ActivateWallet';
import ActivateWalletPictureUpload from 'src/screens/User/Onboarding/ActivateWallet/PictureUpload';
import ActivateWalletSelectBanks from 'src/screens/User/Onboarding/ActivateWallet/SelectBanks';
import ActivateWalletCreatePin from 'src/screens/User/Onboarding/ActivateWallet/CreatePin';
import ActivateWalletOTPVerification from 'src/screens/User/Onboarding/ActivateWallet/OTPVerification';

import ActivateCare from 'src/screens/User/Onboarding/ActivateCare';
import ActivateCareSoloLitePlan from 'src/screens/User/Onboarding/ActivateCare/SoloLitePlan';
import ActivateCareSoloPlan from 'src/screens/User/Onboarding/ActivateCare/SoloPlan';
import ActivateCareFamilyPlan from 'src/screens/User/Onboarding/ActivateCare/FamilyPlan';
import ActivateCareElitePlan from 'src/screens/User/Onboarding/ActivateCare/ElitePlan';

// Wallet Screens
import TransactionHistory from 'src/screens/User/WalletTab/TransactionHistory';

// BillPay Screens
import Success from 'src/screens/User/BillPayTab/Success';
import BillAirtime from 'src/screens/User/BillPayTab/Bills/Airtime';
import BillMobileData from 'src/screens/User/BillPayTab/Bills/MobileData';
import BillCableTv from 'src/screens/User/BillPayTab/Bills/CableTv';
import BillElectricity from 'src/screens/User/BillPayTab/Bills/Electricity';

/* Routes import */
import UserRoute from './User';
import SocialRoute from './User/HomeTab/Social';
import MarketPlaceRoute from './User/HomeTab/MarketPlace';
import AskADoctorRoute from './User/HomeTab/MarketPlace/AskDoctor';
import CharityRoute from './User/HomeTab/Charity';
import AskADoctor from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/index';
import Appointments from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/Appointments';
import AppointmentDetails from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/Appointments/AppointmentDetails';
import DoctorProfile from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/DoctorProfile/index';
import PaymentPage from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/Payment/index';
import ConfirmationPage from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/Confirmation/index';
import InnerPages from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/InnerPages/index';
import DetailsPage from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/InnerPages/details';
import Consultation from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/AskADocVertical/AskADoctor/Consultation/index';
import MoreOptions from 'src/screens/User/Common/Movies/More/index';
import PreviouslyViewed from 'src/screens/User/Common/Movies/More/PreviouslyViewed/index';
import MyList from 'src/screens/User/Common/Movies/More/MyList/index';
import ComingSoon from 'src/screens/User/Common/Movies/More/ComingSoon/index';
// import MoneyMatters from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/index';
import MoneyMatters from 'src/router/User/HomeTab/MarketPlace/MoneyMatters/index';
import MoneyMattersServices from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/MoneyMattersServices';
import Duration from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/Duration';
import SearchResults from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/SearchResults';
import AdditionalInfo from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/AdditionalInfo';
import MoneyMattersConfirmation from 'src/screens/User/HomeTab/MarketPlace/MarketPlaceTab/MoneyMatters/Confirmation';
import FlutterPay from '../screens/Common/FlutterPay';
import DataFlutterPay from '../screens/Common/DataFlutterPay';
import CableFlutterPay from '../screens/Common/CableFlutterPay';
import ElectricFlutterPay from '../screens/Common/ElectricFlutterPay';
import OtherCategories from 'src/screens/User/Common/Movies/OtherCategories/index';
import TransactionSummary from '../screens/User/Common/TransactionSummary';
import PaymentSchedule from 'src/screens/User/Onboarding/ActivateCare/PaymentSchedule';
import WoozeePaySummary from 'src/screens/User/Onboarding/ActivateCare/PaySummary';
import TransferMoney from 'src/screens/User/WalletTab/TransferMoney';
import Accounts from 'src/screens/User/WalletTab/Accounts';
const { Navigator, Screen } = createStackNavigator();

export default function Router() {
  const { authState } = useContext(AuthContext);

  const netInfo = useNetInfo();

  const checkForConnectivity = () => {
    if (netInfo.isConnected == false || netInfo.isInternetReachable == false) {
      Toast.show({
        text: 'You are offline',
        // buttonText: ',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      console.log(netInfo);
    } else if (
      netInfo.isConnected == true &&
      netInfo.isInternetReachable == false
    ) {
      Toast.show({
        text: 'You are offline',
        // buttonText: ',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      console.log('from else ', netInfo);
    } else {
      return;
      // Toast.show({
      //   text: 'You are online',
      //   // buttonText: ',
      //   position: 'top',
      //   type: 'success',
      //   duration: 3000,
      // });
    }
  };

  const screens = {
    Auth: {
      Intro,
      Login,
      Register,
      VerifyWithCode,
      RegisterFull,
      RecoverWithEmail,
      RecoveryFull,
      ResendOTP,
    },

    User: {
      Onboarding,
      ActivateWallet,
      ActivateWalletPictureUpload,
      ActivateWalletSelectBanks,
      ActivateWalletCreatePin,
      ActivateWalletOTPVerification,
      PaymentSchedule,
      ActivateCare,
      ActivateCareSoloLitePlan,
      ActivateCareSoloPlan,
      ActivateCareFamilyPlan,
      ActivateCareElitePlan,
      WoozeePaySummary,
      UserRoute,
      SocialRoute,
      MarketPlaceRoute,
      AskADoctorRoute,
      MoneyMatters,
      CharityRoute,
      EditProfile,
      ChangePassword,
      GeneratePin,
      Consultation,
      MoneyMattersServices,
      SearchResults,
      Duration,
      MoneyMattersConfirmation,
      AdditionalInfo,
      UploadEntries,
      PreviewEntry,
      Settings,
      SettingsGlobal,
      Movies,
      ViewMovies,
      OtherCategories,
      MoviePage,
      MoreOptions,
      PreviouslyViewed,
      MyList,
      ComingSoon,
      LiveStream,
      Messaging,
      Comments,
      DeepLinkPost,
      Chats,
      ChatScreen,
      Search,
      Rankings,
      UserProfile,
      ProfilePostsWooz,
      ProfileLikedPosts,
      Follow,
      TransactionHistory,
      Success,
      BillAirtime,
      BillMobileData,
      BillCableTv,
      BillElectricity,
      Report,
      AskADoctor,
      Appointments,
      DoctorProfile,
      PaymentPage,
      ConfirmationPage,
      AppointmentDetails,
      InnerPages,
      DetailsPage,
      FlutterPay,
      DataFlutterPay,
      ElectricFlutterPay,
      CableFlutterPay,
      TransactionSummary,
      TransferMoney,
      Accounts,
      ChallengePage,
    },

    Common: {
      FAQs,
      TermsConditions,
      PrivacyPolicy,
      About,
    },
  };

  useEffect(() => {
    (async () => {
      await SplashScreen.hideAsync();
    })();
    checkForConnectivity();
  }, [netInfo]);

  const config = {
    screens: {
      DeepLinkPost: '/:_id',
    },
  };

  const linking = {
    prefixes: ['https://app.woozeee.com/entry'],
    config,
  };

  const getAppLaunchLink = async () => {
    // Linking.addEventListener('verify', (url) => {
    //   alert(url);
    // });

    // const res = await Linking.getInitialURL();
    // alert(res);

    try {
      const res = await fb.dynamicLinks().getInitialLink();
      alert(res.url);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAppLaunchLink();
  }, []);

  return (
    <Root>
      <NavigationContainer linking={linking}>
        <Navigator detachInactiveScreens headerMode="none">
          {Object.entries({
            ...(authState.loginToken ? screens.User : screens.Auth),
            ...screens.Common,
          }).map(([name, component]) => (
            <Screen name={name} component={component} key={name} />
          ))}
        </Navigator>
      </NavigationContainer>
    </Root>
  );
}
