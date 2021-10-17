// prettier-ignore
import React, {
  useContext, useState, useRef, useCallback, useEffect
} from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Dimensions,
  ScrollView,
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

import TopNavigationArea from 'src/components/TopNavigationArea';

import InteractIcon from 'src/components/InteractIcon';

import { LocaleContext, AppSettingsContext, AuthContext } from 'src/contexts';

import { GeneralTextField, GeneralSelect } from 'src/components/FormFields';

import { Toast, Content, Root } from 'native-base';

import { v4 as uuidv4 } from 'uuid';

import {
  IconArrowDown,
  IconCCheck,
  IconClose,
} from 'src/components/CustomIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  FlutterwaveInit,
  PayWithFlutterwave,
  FlutterwaveButton,
} from 'flutterwave-react-native';

import { getEmail, getToken } from '../../../../api/index';

const ACCOUNTS = [
  {
    id: 1,
    title: 'woozeee Wallet - ₦ 99,394.99',
    image: require('assets/images/banks/woozeee.png'),
  },
  {
    id: 2,
    title: 'Access Bank - ₦ 34,677.02',
    image: require('assets/images/banks/access.png'),
  },
  // {
  //   id: 3,
  //   title: 'UBA - ₦ 25,500.44',
  //   image: require('assets/images/banks/uba.png'),
  // },
  {
    id: 4,
    title: 'Globus Bank -₦ 24,222.18',
    image: require('assets/images/banks/globus.png'),
  },
  {
    id: 5,
    title: 'Zenith Bank -₦ 1,000.00',
    image: require('assets/images/banks/zenith.png'),
  },
  {
    id: 6,
    title: 'Online Payment',
    image: require('assets/images/banks/others.png'),
  },
];

/* DATA */
const woozeeeCards = [
  {
    id: 1,
    banner: require('assets/images/card/ekedc.png'),
    title: 'EKEDC',
    serviceId: 'eko-electric',
  },
  {
    id: 2,
    banner: require('assets/images/card/iedc.png'),
    title: 'IEDC',
    serviceId: 'ikeja-electric',
  },
  {
    id: 3,
    banner: require('assets/images/card/aedc.png'),
    title: 'AEDC',
    serviceId: 'abuja-electric',
  },
  {
    id: 5,
    banner: require('assets/images/card/pedc.jpg'),
    title: 'PHED',
    serviceId: 'portharcourt-electric"',
  },
  {
    id: 6,
    banner: require('assets/images/card/kedc.jpg'),
    title: 'KAEDCO',
    serviceId: 'kaduna-electric',
  },
  {
    id: 7,
    banner: require('assets/images/card/jedc.jpg'),
    title: 'JED',
    serviceId: 'jos-electric',
  },
  {
    id: 8,
    banner: require('assets/images/card/kaedc.jpg'),
    title: 'KEDCO',
    serviceId: 'kano-electric',
  },
  // {
  //   id: 4,
  //   banner: require('assets/images/card/irecharge.png'),
  //   title: 'iRECHARGE',
  //   serviceId: 'ir-electric',
  // },
];

const PLACE = [
  { title: 'PLACE 1' },
  { title: 'PLACE 2' },
  { title: 'PLACE 3' },
];

const TYPE = [{ title: 'Select' }, { title: 'Prepaid' }, { title: 'Postpaid' }];

export default function Electricity({ navigation }) {
  const renderSpinner = () => <Spinner size="tiny" status="danger" />;

  const [emailAddress, setEmail] = useState('');

  const email = async () => {
    const res = await getEmail();
    setEmail(res);
  };

  email();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const CARD_HEIGHT = IS_PORTRAIT ? 180 : 160;

  const [activeOperator, setActiveOperator] = useState(null);

  const { authOptions } = useContext(AuthContext);

  const { verifyPin, verifyMeter } = authOptions;

  const [serviceId, setServiceId] = useState(null);

  const [isLoading, setLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState(0);

  const t = useContext(LocaleContext);

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const accountSheetRef = useRef(null);

  const [customerName, setCustomerName] = useState('');

  const confirmSheetRef = useRef(null);

  const [form, setFormValues] = useState({
    mobile: '',
    meterNumber: '',
    // selectPlace: '',
    selectType: '',
    amount: '',
    pin: '',
    serviceId: '',
    // account: '',
  });

  const handleAccountChange = (index) => {
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      account: ACCOUNTS[index].title,
    }));
  };

  const onClickOperator = (i) => {
    if (i === activeOperator) {
      setActiveOperator(null);
    } else {
      setActiveOperator(i);
      setServiceId(woozeeeCards[i - 1].serviceId);
      setFormValues((prevState) => ({
        ...prevState,
        serviceId: woozeeeCards[i - 1].serviceId,
      }));
    }
  };

  const handleOpenConfirmSheet = async () => {
    setLoading(true);
    const res = await verifyPin(form.pin);

    if (
      form.mobile !== '' &&
      form.pin !== '' &&
      form.meterNumber !== '' &&
      form.amount !== '' &&
      form.selectType !== '' &&
      form.serviceId !== ''
    ) {
      if (res.message === 'User pin is Incorrect' || res.error === true) {
        Toast.show({
          text: 'User pin is Incorrect/Invalid',
          position: 'bottom',
          type: 'danger',
          duration: 3000,
        });
      } else {
        setTimeout(() => {
          navigation.navigate('TransactionSummary', {
            form: {
              network: form.serviceId,
              amount: form.amount,
              mobile: form.mobile,
              selectType: form.selectType,
              serviceId: form.serviceId,
              pin: form.pin,
              meterNumber: form.meterNumber,
            },
            serviceType: 'Electricity Bill Payment',
          });
        }, 1000);
      }
      // setLoading(false);
    } else {
      Toast.show({
        text: 'All fields must be filled to proceed',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
    }
    setLoading(false);
  };

  const routeSuccess = () => navigation.navigate('Success');

  const [btnState, setBtnState] = useState(false);

  useEffect(() => {
    if (form.account === 'Online Payment') {
      setBtnState(true);
    } else {
      setBtnState(false);
    }
  }, [form.account]);

  const handleConfirmTransaction = async () => {
    confirmSheetRef.current.close();
    setLoading(false);
  };

  const handleRedirect = async (res) => {
    const reqBody = {
      requestId: res.transaction_id,
      variationCode: form.selectType.toLowerCase(),
      amount: form.amount,
      phone: '08120254644',
      // phone: form.mobile,
      billerCode: form.meterNumber,
      serviceId: form.serviceId,
      pin: form.pin,
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
    console.log(response);
  };

  // prettier-ignore
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
          paddingBottom: 30,
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
              {t('biller')}
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {woozeeeCards[activeOperator - 1]?.title || '----'}
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
              {t('meterNumber')}
            </Text>
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {form.meterNumber || '----'}
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
              Customer Name
            </Text>
           
            <Text
              category="s2"
              style={{ flex: 1, marginHorizontal: 5, textAlign: 'left' }}
            >
              {customerName || '----'}
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
              {`₦ ${form.amount || 0}`}
            </Text>
          </View>
        </View>
        <View style={{ width: '100%', paddingHorizontal: 15, paddingTop: 10 }}>
          {/* <View style={{ paddingVertical: 5 }}>
            <GeneralTextField
              type="pin"
              label={t('transactionPin')}
              keyboardType="number-pad"
              validate="required"
              setFormValues={setFormValues}
            />
          </View> */}
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

  const AccountSheet = useCallback(
    () => (
      <RBSheet
        ref={accountSheetRef}
        height={420}
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

  const WoozeeeCards = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.75}
      style={{
        width: width / 4.1,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        maxHeight: 130,
      }}
      onPress={() => onClickOperator(item.id)}
    >
      <Image
        source={item.banner}
        defaultSource={item.banner}
        style={{
          width: '100%',
          borderRadius: 10,
          maxHeight: 100,
          borderWidth: 0.8,
          borderColor: 'grey',
        }}
        resizeMode="cover"
      />
      {item.id === activeOperator && (
        <View style={{ position: 'absolute', top: 0, right: 0 }}>
          <IconCCheck
            style={{
              height: 25,
              width: 25,
            }}
          />
        </View>
      )}
      <Text category="s2">{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={t('electricity')}
          navigation={navigation}
          screen="default"
        />
        <ScrollView
          style={{ flex: 1 }}
          alwaysBounceVertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingTop: 20 }}>
              <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
                <Text category="s1">{t('selectBiller')}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <List
                  style={{ backgroundColor: 'transparent' }}
                  contentContainerStyle={{ paddingHorizontal: 5 }}
                  horizontal
                  alwaysBounceHorizontal
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
            </View>
            <View
              style={{
                flex: 1,
                paddingBottom: 20,
                marginTop: 10,
              }}
            >
              <View style={{ paddingHorizontal: 15 }}>
                <View style={{ paddingVertical: 5 }}>
                  <GeneralTextField
                    type="meterNumber"
                    label={t('meterNumber')}
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                {/* <View style={{ paddingVertical: 10 }}>
                <GeneralSelect
                  type="selectPlace"
                  label={t('selectPlace')}
                  data={PLACE}
                  setFormValues={setFormValues}
                />
              </View>*/}
                <View style={{ paddingVertical: 10 }}>
                  <GeneralSelect
                    type="selectType"
                    label={t('selectType')}
                    data={TYPE}
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ paddingVertical: 5 }}>
                  <GeneralTextField
                    type="mobile"
                    label={t('mobileNum')}
                    autoCompleteType="tel"
                    textContentType="telephoneNumber"
                    validate="required"
                    setFormValues={setFormValues}
                  />
                </View>
                <View style={{ paddingVertical: 5 }}>
                  <GeneralTextField
                    type="amount"
                    label={t('amount')}
                    keyboardType="number-pad"
                    validate="required"
                    setFormValues={setFormValues}
                    // accessoryLeft={IconCNaira}
                  />
                </View>
                <View style={{ paddingVertical: 5 }}>
                  <GeneralTextField
                    type="pin"
                    label={t('transactionPin')}
                    autoCompleteType="password"
                    textContentType="password"
                    keyboardType="numeric"
                    maxLength={4}
                    validate="password"
                    secure
                    value={form.pin}
                    setFormValues={setFormValues}
                    validate="required"
                    // accessoryLeft={IconCNaira}
                  />
                </View>

                <View style={{ paddingVertical: 20 }}>
                  <Button
                    status="danger"
                    size="large"
                    accessibilityLiveRegion="assertive"
                    accessibilityComponentType="button"
                    accessoryLeft={isLoading ? renderSpinner : null}
                    accessibilityLabel="Continue"
                    onPress={handleOpenConfirmSheet}
                    disabled={isLoading}
                  >
                    <Text status="control">{t('proceed')}</Text>
                  </Button>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <AccountSheet />
        <ConfirmSheet />
      </Layout>
    </Root>
  );
}
