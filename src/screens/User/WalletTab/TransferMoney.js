import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  Dimensions,
} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  Layout,
  Text,
  List,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from '@ui-kitten/components';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import TopNavigationArea from 'src/components/TopNavigationArea';

import InteractIcon from 'src/components/InteractIcon';

import { LocaleContext, AppSettingsContext, AuthContext } from 'src/contexts';

import { GeneralTextField } from 'src/components/FormFields';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  FlutterwaveInit,
  PayWithFlutterwave,
  FlutterwaveButton,
} from 'flutterwave-react-native';

import {
  IconArrowDown,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

import { Toast, Content, Root } from 'native-base';

import WalletProcess from './WalletProcess';
import BankProcess from './BankProcess';

function TransferMoney(props) {
  const [isWalletSelected, setWalletSelected] = useState(true);
  function toggleTab() {
    if (isWalletSelected) {
      setWalletSelected(!isWalletSelected);
    } else {
      return;
    }
  }

  const routeConfirm = () => {
    console.log(props);
    props.navigation.navigate('MoneyMattersConfirmation');
  };

  const t = useContext(LocaleContext);

  const WalletTab = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50,
          alignItems: 'center',
          backgroundColor: isWalletSelected ? '#043F7C' : '#E8EAF6',
          borderColor: '#043F7C',
          borderWidth: 1,
          width: 190,
          height: 55,
          borderRadius: 5,
        }}
      >
        <Ionicons
          name="wallet"
          size={30}
          color={isWalletSelected ? 'white' : '#043F7C'}
        />
        {isWalletSelected ? (
          <Text style={{ color: 'white' }}>Wallet</Text>
        ) : (
          <Text style={{ color: '#043F7C' }}>Wallet</Text>
        )}
      </View>
    );
  };

  const BankTab = () => {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 50,
          alignItems: 'center',
          backgroundColor: !isWalletSelected ? '#043F7C' : '#E8EAF6',
          borderColor: '#043F7C',
          borderWidth: 1,
          width: 190,
          height: 55,
          borderRadius: 5,
        }}
      >
        <FontAwesome
          name="bank"
          size={23}
          color={!isWalletSelected ? 'white' : '#043F7C'}
        />
        {isWalletSelected ? (
          <Text style={{ color: '#043F7C' }}>Bank</Text>
        ) : (
          <Text style={{ color: 'white' }}>Bank</Text>
        )}
      </View>
    );
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'Transfer Money'}
        navigation={props.navigation}
        screen="default"
      />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginVertical: 15,
        }}
      >
        <TouchableOpacity onPress={() => setWalletSelected(true)}>
          <WalletTab />
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTab}>
          <BankTab />
        </TouchableOpacity>
      </View>
      {!isWalletSelected ? <BankProcess /> : <WalletProcess />}
      <View
        style={{
          marginVertical: 30,
          width: '100%',
          paddingHorizontal: 15,
        }}
      >
        <Button
          status="primary"
          accessibilityLiveRegion="assertive"
          accessibilityComponentType="button"
          accessibilityLabel="Continue"
          style={{ width: '100%' }}
          onPress={routeConfirm}
        >
          <Text status="control">{t('proceed')}</Text>
        </Button>
      </View>
    </Layout>
  );
}

export default TransferMoney;
