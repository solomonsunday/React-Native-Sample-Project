import React, { useCallback, useRef, useState, useContext } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
  Radio,
  RadioGroup,
} from '@ui-kitten/components';

import RBSheet from 'react-native-raw-bottom-sheet';

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  List,
} from 'react-native';

import { v4 as uuidv4 } from 'uuid';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { ScrollView } from 'react-native-gesture-handler';

import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { LocaleContext, AppSettingsContext } from 'src/contexts';

import { IconArrowDown } from 'src/components/CustomIcons';

export default function AdditionalInfo(props) {
  const ACCOUNTS = [
    {
      id: 1,
      title: 'Select',
      //   image: require('assets/images/banks/woozeee.png'),
    },
    {
      id: 2,
      title: 'Access Bank - ₦ 34,677.02',
      image: require('assets/images/banks/access.png'),
    },
    {
      id: 3,
      title: 'UBA - ₦ 25,500.44',
      image: require('assets/images/banks/uba.png'),
    },
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
  ];
  const [form, setFormValues] = useState({
    mobile: '',
    amount: '',
    pin: '',
    product: '',
    account: '',
  });

  const handleAccountChange = (index) => {
    setSelectedOption(index);
    setFormValues((prevState) => ({
      ...prevState,
      account: ACCOUNTS[index].title,
    }));
  };

  const { appState } = useContext(AppSettingsContext);

  const BG_THEME = appState.darkMode ? '#070A0F' : '#F7F9FC';

  const t = useContext(LocaleContext);

  const [selectedOption, setSelectedOption] = useState(0);

  const sheetRef = useRef(null);

  const openAccountSheet = () => sheetRef.current.open();

  const AccountSheet = useCallback(
    () => (
      <RBSheet
        ref={sheetRef}
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
              width: '100%',
              justifyContent: 'flex-start',
              paddingBottom: 25,
              paddingHorizontal: 20,
            }}
          >
            <Text category="h6" style={{ fontSize: 16 }} status="primary">
              Receiving Account / Wallet
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
                </Radio>
              ))}
            </RadioGroup>
          </View>
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 20,
              width: '100%',
            }}
          >
            <Button
              status="danger"
              accessibilityLiveRegion="assertive"
              accessibilityComponentType="button"
              accessibilityLabel="Continue"
              style={{
                width: '100%',
                elevation: 5,
                shadowColor: '#dcdcdc',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 1,
                shadowRadius: 1,
              }}
              onPress={() => sheetRef.current.close()}
            >
              <Text status="control">{t('done')}</Text>
            </Button>
          </View>
        </Layout>
      </RBSheet>
    ),
    [BG_THEME, t, selectedOption],
  );

  const DurationOption = ({ period }) => {
    return (
      <View
        style={{
          display: 'flex',
          padding: 15,
          //   marginVertical: 10,
        }}
      >
        <Text category="s2" status="basic">
          {period}
        </Text>
        <Divider
          style={{
            marginTop: 15,
          }}
        />
      </View>
    );
  };

  const ModalContent = () => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          height: '100%',
        }}
      ></View>
    );
  };

  const routeConfirm = () => {
    props.navigation.navigate('MoneyMattersConfirmation');
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Additional Information`}
        navigation={props.navigation}
        screen="auth"
      />
      <View style={styles.container}>
        <Text
          status="basic"
          style={{
            marginBottom: 10,
          }}
        >
          Payment Account / Wallet
        </Text>
        <View
          style={{
            backgroundColor: '#F3F3F7',
            borderRadius: 5,
            marginBottom: 20,
          }}
        >
          <Button
            appearance="outline"
            accessoryRight={IconArrowDown}
            style={{ justifyContent: 'space-between' }}
            onPress={() => openAccountSheet()}
          >
            {/* <Text style={{ color: 'gray', fontSize: 14 }}>Select</Text> */}
            {form.account || 'Select'}
          </Button>
        </View>
        <Text status="basic">Utility Bill</Text>
        <Button
          status="basic"
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
            borderColor: 'transparent',
            color: '#FF5757',
          }}
          accessoryRight={() => (
            <MaterialIcons name="drive-folder-upload" size={24} color="black" />
          )}
        >
          <Text style={{ color: 'gray', fontSize: 14 }}>Upload file here</Text>
        </Button>
        <View style={{ marginVertical: 15 }}>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            // disabled={isLoading}
            onPress={routeConfirm}
            style={{
              elevation: 5,
              shadowColor: '#dcdcdc',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 1,
              shadowRadius: 1,
            }}
          >
            <Text status="control">{'Proceed'}</Text>
          </Button>
        </View>
      </View>
      <AccountSheet />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  cardContainer: {},
});
