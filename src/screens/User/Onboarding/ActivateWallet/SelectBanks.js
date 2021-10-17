import React, { useContext, useState, useMemo, useEffect } from 'react';

import {
  View,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';

import { Layout, Button, Text, CheckBox } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import BankOptions from '../../../../components/BankOptionButton';

import zenith from '../../../../assets/images/icon/zenith.png';
import access from '../../../../assets/images/icon/accessColored.png';
import uba from '../../../../assets/images/icon/uba.png';
import globus from '../../../../assets/images/icon/globus.png';

export default function SelectBanks({ navigation }) {
  const [selectedBanks, setSelectedBanks] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const [checked, setChecked] = useState(false);
  const [zenithCheck, setZenithCheck] = useState(false);
  const [ubaCheck, setUbaCheck] = useState(false);
  const [globusCheck, setGlobusCheck] = useState(false);

  function changeState(bank) {
    if (bank.name == 'Zenith Bank') {
      setZenithCheck(!zenithCheck);
    } else if (bank.name == 'UBA') {
      setUbaCheck(!ubaCheck);
    } else {
      setGlobusCheck(!globusCheck);
    }
  }

  const banksData = [
    {
      name: 'Zenith Bank',
      logo: zenith,
      selected: zenithCheck,
    },
    {
      name: 'UBA',
      logo: uba,
      selected: ubaCheck,
    },
    {
      name: 'Globus Bank',
      logo: globus,
      selected: globusCheck,
    },
  ];

  const t = useContext(LocaleContext);

  //   // prettier-ignore
  let res;
  useEffect(() => {
    res = banksData.filter((bank) => bank.selected !== false);
    // console.log(res);
  }, [banksData]);

  const routeActivateWalletOTPVerify = () =>
    navigation.navigate('ActivateWalletOTPVerification', res);

  return useMemo(() => {
    return (
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title="Select Bank(s)"
          navigation={navigation}
          screen="auth"
        />
        <Text
          category="c2"
          status="basic"
          style={{ marginLeft: 15, marginTop: 15 }}
        >
          Primary Bank
        </Text>
        <TouchableWithoutFeedback>
          <View style={styles.container}>
            <View
              style={{
                elevation: 5,
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                borderColor: checked ? '#043F7C' : '#dcdcdc',
                borderWidth: 1,
                // shadowColor: '#dcdcdc',
                // shadowOffset: { width: 0, height: 1 },
                // shadowOpacity: 1,
                // shadowRadius: 1,
              }}
            >
              <View style={styles.innerContainer}>
                <Image
                  source={access}
                  style={styles.img}
                  resizeMode="contain"
                  defaultSource={access}
                />
                <Text style={{ color: 'black' }}>Access Bank</Text>
              </View>
              <CheckBox
                status="basic"
                checked={true}
                onChange={(nextChecked) => {
                  setChecked(nextChecked);
                }}
                style={styles.checkbox}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <Text
          category="c2"
          status="basic"
          style={{ marginLeft: 15, marginTop: 15 }}
        >
          Secondary Bank(s)
        </Text>
        {banksData.map((bank, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => changeState(bank)}
          >
            <View style={styles.container}>
              <View
                style={{
                  elevation: 5,
                  borderRadius: 5,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderColor: checked ? '#043F7C' : '#dcdcdc',
                  borderWidth: 1,
                  // shadowColor: '#dcdcdc',
                  // shadowOffset: { width: 0, height: 1 },
                  // shadowOpacity: 1,
                  // shadowRadius: 1,
                }}
              >
                <View style={styles.innerContainer}>
                  <Image
                    source={bank.logo}
                    style={styles.img}
                    resizeMode="contain"
                    defaultSource={bank.logo}
                  />
                  <Text style={{ color: 'black' }}>{bank.name}</Text>
                </View>
                <CheckBox
                  status="basic"
                  checked={bank.selected}
                  onChange={() => {
                    changeState(bank);
                  }}
                  style={styles.checkbox}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
        <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            onPress={routeActivateWalletOTPVerify}
            disabled={isLoading}
          >
            <Text status="control">{t('next')}</Text>
          </Button>
        </View>
      </Layout>
    );
  }, [banksData]);
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginVertical: 15,
  },
  outterContainer: {
    elevation: 5,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  checkbox: {
    alignSelf: 'center',
    marginRight: 15,
    // borderColor: '#dcdcdc',
  },
  img: {
    margin: 15,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
