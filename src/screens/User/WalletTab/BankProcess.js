import React, {
  useRef,
  useState,
  useContext,
  useCallback,
  useEffect,
} from 'react';
import { View, StyleSheet, Image, TextInput } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  Layout,
  Text,
  List,
  Button,
  RadioGroup,
  Radio,
  Card,
  Divider,
} from '@ui-kitten/components';

import {
  IconArrowDown,
  // IconCNaira,
  IconCCheck,
  IconCPhoneBookFill,
  IconClose,
} from 'src/components/CustomIcons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import globus from '../../../assets/images/icon/globus.png';

const _sendTo = [
  { id: 1, title: 'Self' },
  { id: 2, title: 'Others' },
];

function BankProcess(props) {
  const [accountNumber, setAccountNumber] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedSource, setSelectedSource] = useState(0);
  const [selectedReciepient, setSelectedReciepient] = useState(0);
  const { appState } = useContext(AppSettingsContext);
  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  // async function getBankDetails() {
  //   AsyncStorage.getItem('globusAcn').then((res) => {
  //     setAccountNumber(res);
  //   });

  //   AsyncStorage.getItem('globusBal').then((res) => {
  //     setAccountBalance(res);
  //   });
  // }

  useEffect(() => {
    // getBankDetails();
  }, []);

  // const ACCOUNTS = [
  //   {
  //     id: 4,
  //     title: `Globus Bank - ₦${accountBalance}`,
  //     acctNo: accountNumber,
  //     image: require('assets/images/banks/globus.png'),
  //   },
  // ];

  const [form, setFormValues] = useState({
    _sendTo: '',
    source: '',
    receipient: '',
    accountNumber: '',
    amount: '',
    message: '',
  });

  const t = useContext(LocaleContext);

  const sendToSheet = useRef(null);

  const accountSheetRef = useRef(null);

  const receipientAccountSheetRef = useRef(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      _sendTo: _sendTo[index].title,
    }));
  };

  const handleSourceOption = (index) => {
    setSelectedSource(index);
    setFormValues((prevState) => ({
      ...prevState,
      source: ACCOUNTS[index].title,
    }));
  };

  const handleReceipientOption = (index) => {
    setSelectedReciepient(index);
    setFormValues((prevState) => ({
      ...prevState,
      receipient: ACCOUNTS[index].title,
    }));
  };

  const SendTo = useCallback(
    () => (
      <RBSheet
        ref={sendToSheet}
        height={280}
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
              {t('accounts')}
            </Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <RadioGroup
              selectedIndex={selectedOption}
              onChange={handleOptionChange}
            >
              {_sendTo.map((option) => (
                <Radio key={option.id}>
                  <Text category="s2">{option.title}</Text>
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
              status="primary"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              style={{ width: '100%' }}
              onPress={() => sendToSheet.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedOption],
  );

  const AccountSheet = useCallback(
    () => (
      <RBSheet
        ref={accountSheetRef}
        height={250}
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
              selectedIndex={selectedSource}
              onChange={handleSourceOption}
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
              status="primary"
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
    [BG_THEME, t, selectedSource],
  );

  const ReceipientAccountSheet = useCallback(
    () => (
      <RBSheet
        ref={receipientAccountSheetRef}
        height={250}
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
              selectedIndex={selectedReciepient}
              onChange={handleReceipientOption}
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
              status="primary"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              style={{ width: '100%' }}
              onPress={() => receipientAccountSheetRef.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedReciepient],
  );

  return (
    <Layout level="6" style={styles.container}>
      <Text category="s1" status="basic" style={{ marginBottom: 10 }}>
        Source*
      </Text>
      <Button
        appearance="outline"
        accessoryRight={IconArrowDown}
        style={{ justifyContent: 'space-between' }}
        onPress={() => accountSheetRef.current.open()}
      >
        <Text>{form.source || 'Select'}</Text>
      </Button>
      <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
        Receipient's Bank*
      </Text>
      <Button
        appearance="outline"
        accessoryRight={IconArrowDown}
        style={{ justifyContent: 'space-between' }}
        onPress={() => receipientAccountSheetRef.current.open()}
      >
        <Text>{form.receipient || 'Select'}</Text>
      </Button>
      <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
        Account Number*
      </Text>
      <TextInput
        placeholder={'XXXXXXXXXXX'}
        placeholderTextColor="gray"
        status="primary"
        style={{
          textAlign: 'left',
          paddingLeft: 10,
          backgroundColor: '#F3F3F7',
          width: '100%',
          height: 50,
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onChangeText={(text) =>
          setFormValues((prevState) => {
            return {
              ...prevState,
              accountNumber: text,
            };
          })
        }
      />
      <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
        Amount*
      </Text>
      <View
        style={{
          width: '100%',
          height: 50,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#043F7C',
              width: 45,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomLeftRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            <Text category="h6" style={{ color: 'white' }}>
              ₦
            </Text>
          </View>
          <View>
            <TextInput
              placeholder={'Amount'}
              placeholderTextColor="gray"
              status="primary"
              style={{
                textAlign: 'left',
                paddingLeft: 10,
                backgroundColor: '#F3F3F7',
                width: 340,
                height: 50,
                justifyContent: 'center',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}
              onChangeText={(text) =>
                setFormValues((prevState) => {
                  return {
                    ...prevState,
                    amount: text,
                  };
                })
              }
            />
          </View>
        </View>
      </View>
      <Text category="s1" status="basic" style={{ marginVertical: 10 }}>
        Message
      </Text>
      <TextInput
        placeholder={'Enter Message'}
        placeholderTextColor="gray"
        status="primary"
        style={{
          textAlign: 'left',
          paddingLeft: 10,
          backgroundColor: '#F3F3F7',
          width: '100%',
          height: 50,
          justifyContent: 'center',
          borderRadius: 5,
        }}
        onChangeText={(text) =>
          setFormValues((prevState) => {
            return {
              ...prevState,
              message: text,
            };
          })
        }
      />

      {/* <SendTo />
      <AccountSheet />
      <ReceipientAccountSheet /> */}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});

export default BankProcess;
