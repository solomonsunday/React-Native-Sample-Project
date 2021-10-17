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
  Spinner as Sp,
} from '@ui-kitten/components';

import TopNavigationArea from 'src/components/TopNavigationArea';

import Spinner from 'react-native-loading-spinner-overlay';

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

import { v4 as uuidv4 } from 'uuid';

import { getEmail, getToken } from '../../../../api/index';

import {
  IconArrowDown,
  // IconCNaira,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

import { Toast, Content, Root } from 'native-base';

const ACCOUNTS = [
  {
    id: 1,
    title: 'Select',
    // image: require('assets/images/banks/woozeee.png'),
  },
  // {
  //   id: 2,
  //   title: 'Access Bank - ₦ 34,677.02',
  //   image: require('assets/images/banks/access.png'),
  // },
  // {
  //   id: 3,
  //   title: 'UBA - ₦ 25,500.44',
  //   image: require('assets/images/banks/uba.png'),
  // },
  // {
  //   id: 4,
  //   title: 'Globus Bank -₦ 24,222.18',
  //   image: require('assets/images/banks/globus.png'),
  // },
  // {
  //   id: 5,
  //   title: 'Zenith Bank -₦ 1,000.00',
  //   image: require('assets/images/banks/zenith.png'),
  // },
  {
    id: 6,
    title: 'Online Payment',
    image: require('assets/images/banks/others.png'),
  },
];

function TransactionSummary(props) {
  const renderSpinner = () => <Sp size="tiny" status="basic" />;

  const [isLoadingSpin, setIsLoading] = useState(false);

  const [emailAddress, setEmail] = useState('');

  const [btnState, setBtnState] = useState(false);

  const email = async () => {
    const res = await getEmail();
    setEmail(res);
  };
  email();

  const {
    route: { params },
  } = props;

  const { width, height } = useWindowDimensions();

  const [isLoading, setLoading] = useState(false);

  const IS_PORTRAIT = height > width;

  const { authOptions } = useContext(AuthContext);

  const { verifyPin } = authOptions;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const [activeOperator, setActiveOperator] = useState(null);

  const [selectedOption, setSelectedOption] = useState(0);

  const [form, setFormValues] = useState({
    mobile: '',
    amount: '',
    pin: '',
    network: '',
    account: '',
  });

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const accountSheetRef = useRef(null);

  const confirmSheetRef = useRef(null);

  const routeSuccess = () =>
    props.navigation.navigate('Success', {
      success: 'Transaction Complete!',
    });

  const handleOpenAccountSheet = async () => accountSheetRef.current.open();

  const handleConfirmTransaction = async () => {
    confirmSheetRef.current.close();
    setLoading(false);
  };

  const handleAccountChange = (index) => {
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      account: ACCOUNTS[index].title,
    }));
  };

  const handleOpenConfirmSheet = () => {
    confirmSheetRef.current.open();
  };

  useEffect(() => {
    if (form.account === 'Online Payment') {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [form.account]);

  const handleRedirect = async (res) => {
    if (params.serviceType == 'Airtime Purchase') {
      //   res.status === 'successful' && routeSuccess();
      setIsLoading(true);

      const reqBody = {
        requestId: res.transaction_id,
        amount: params.form.amount,
        // phone: '08011111111',
        phone: form.mobile,
        serviceId: params.form.network,
        pin: params.form.pin,
        //   transaction_id: res.transaction_id,
      };

      const result = await fetch(
        'https://apis.woozeee.com/api/v1/bill-payment/load',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${await getToken()}`,
          },
          body: JSON.stringify(reqBody),
        },
      );
      const response = await result.json();
      setIsLoading(false);

      routeSuccess();
    } else if (params.serviceType == 'Data Purchase') {
      setIsLoading(true);

      const reqBody = {
        requestId: res.transaction_id,
        variationCode: params.form.variationCode,
        amount: params.form.amount,
        // phone: '08011111111',
        phone: form.mobile,
        serviceId: params.form.serviceId,
        pin: params.form.pin,
      };

      const result = await fetch(
        'https://apis.woozeee.com/api/v1/bill-payment/load',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${await getToken()}`,
          },
          body: JSON.stringify(reqBody),
        },
      );

      const response = await result.json();
      setIsLoading(false);

      routeSuccess();
    } else if (params.serviceType == 'Cable Bill Payment') {
      setIsLoading(true);
      const reqBody = {
        requestId: res.transaction_id,
        variationCode: params.form.variationCode.toLowerCase(),
        amount: params.form.amount,
        // phone: '08120254644',
        phone: form.mobile,
        billerCode: params.form.cardNumber,
        serviceId: params.form.serviceId,
        pin: params.form.pin,
      };

      const result = await fetch(
        'https://apis.woozeee.com/api/v1/bill-payment/load',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${await getToken()}`,
          },
          body: JSON.stringify(reqBody),
        },
      );

      const response = await result.json();
      setIsLoading(false);

      routeSuccess();
    } else {
      setIsLoading(true);
      const reqBody = {
        requestId: res.transaction_id,
        variationCode: params.form.selectType.toLowerCase(),
        amount: params.form.amount,
        phone: form.mobile,
        billerCode: params.form.meterNumber,
        serviceId: params.form.serviceId,
        pin: params.form.pin,
      };

      const result = await fetch(
        'https://apis.woozeee.com/api/v1/bill-payment/load',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `${await getToken()}`,
          },
          body: JSON.stringify(reqBody),
        },
      );

      const response = await result.json();
      setIsLoading(false);

      routeSuccess();
    }
  };

  const AccountSheet = useCallback(
    () => (
      <RBSheet
        ref={accountSheetRef}
        height={300}
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
            justifyContent: 'flex-start',
            paddingBottom: 30,
          }}
        >
          <View
            style={{
              width: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 25,
              paddingHorizontal: 20,
            }}
          >
            <Text category="h6" style={{ fontSize: 16 }} status="primary">
              {t('source')}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <RadioGroup
              selectedIndex={selectedOption}
              onChange={handleAccountChange}
            >
              {ACCOUNTS.map((option) => (
                <Radio key={option.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: wp('80%'),
                    }}
                  >
                    <Text category="s2">{option.title}</Text>
                    <Image
                      source={option.image}
                      defaultSource={option.image}
                      resizeMode="cover"
                      style={{ height: 25, width: 25 }}
                    />
                  </View>
                  <Text>{}</Text>
                </Radio>
              ))}
            </RadioGroup>
          </View>
          <Divider style={{ marginVertical: 20, width: '100%', height: 2 }} />
          <View
            style={{
              paddingHorizontal: 20,
              width: '100%',
            }}
          >
            <Button
              status="danger"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              style={{ width: '100%' }}
              onPress={() => accountSheetRef.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedOption],
  );

  const ConfirmSheet = () => (
    <RBSheet
      ref={confirmSheetRef}
      height={320}
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
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: 15,
            paddingHorizontal: 20,
          }}
        >
          <Text category="h6" style={{ fontSize: 16 }} status="primary">
            {t('confirmTrans')}
          </Text>
          <InteractIcon
            Accessory={(evaProps) => <IconClose {...evaProps} fill="#888" />}
            height={30}
            width={30}
            onPress={() => confirmSheetRef.current.close()}
          />
        </View>
        <Divider style={{ marginBottom: 20, width: '100%' }} />
        <View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              {t('network')}
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {params.form.network.toUpperCase() || '----'}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              {t('mobileNum')}
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {params.form.mobile || '----'}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <Text
              category="s2"
              appearance="hint"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'right' }}
            >
              {t('amount')}
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {`₦ ${params.form.amount || 0}`}
            </Text>
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 15, paddingTop: 10 }}>
          <View style={{ paddingTop: 10 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              onPress={handleConfirmTransaction}
            >
              <Text status="control">{t('confirm')}</Text>
            </Button>
          </View>
        </View>
      </Layout>
    </RBSheet>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'Summary'}
        navigation={props.navigation}
        screen="default"
      />
      <View>
        <Text
          status="basic"
          style={{ textAlign: 'left', marginLeft: 15, marginVertical: 15 }}
        >
          Transaction Summary
        </Text>
        <View
          activeOpacity={0.75}
          style={{
            paddingHorizontal: 15,
            width: '100%',
          }}
        >
          <Layout
            level="1"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 5,
              shadowColor: '#000',
              borderRadius: 5,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 2,
              height: 180,
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text category="c1" status="basic">
                Service Type
              </Text>
              <Text category="c2" status="basic">
                {params.serviceType}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text category="c1" status="basic">
                Service Provider
              </Text>
              <Text category="c2" status="basic">
                {params.form.network.toUpperCase()}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text category="c1" status="basic">
                Price
              </Text>
              <Text category="c2" status="basic">
                ₦{params.form.amount}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                paddingHorizontal: 15,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}
            >
              <Text category="c2" status="basic">
                Total Price (+ VAT)
              </Text>
              <Text category="h5" status="basic">
                ₦{params.form.amount}
              </Text>
            </View>
          </Layout>
        </View>
        <View style={{ paddingVertical: 30, marginHorizontal: 15 }}>
          <Text category="label" appearance="hint" style={{ marginBottom: 5 }}>
            {t('paymentAccount')}
          </Text>
          <Button
            appearance="outline"
            accessoryRight={IconArrowDown}
            style={{ justifyContent: 'space-between' }}
            onPress={handleOpenAccountSheet}
          >
            <Text>{form.account || t('paymentAccount')}</Text>
          </Button>
        </View>
        {btnState ? (
          <View style={{ paddingHorizontal: 15 }}>
            <PayWithFlutterwave
              //   onInitializeError={(e) => console.log(e)}
              onRedirect={(res) => handleRedirect(res)}
              options={{
                tx_ref: uuidv4(),
                authorization: 'FLWPUBK-390a836de9de85a9b5169e56fb6cc965-X',
                customer: {
                  email: emailAddress,
                },
                amount: +params.form.amount,
                currency: 'NGN',
                payment_options: 'card',
              }}
            />
          </View>
        ) : (
          <View style={{ paddingHorizontal: 15 }}>
            <Button
              status="danger"
              size="large"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessoryLeft={isLoading ? renderSpinner : null}
              accessibilityLabel="Continue"
              onPress={handleOpenConfirmSheet}
              disabled={true}
            >
              <Text status="control">{t('confirm')}</Text>
            </Button>
          </View>
        )}
      </View>
      <AccountSheet />
      <ConfirmSheet />
      <Spinner visible={isLoadingSpin} />
    </Layout>
  );
}

export default TransactionSummary;
