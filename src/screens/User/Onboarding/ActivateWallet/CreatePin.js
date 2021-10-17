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

export default function CreatePin({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);

  selectedBanks = route.params;

  const banksData = { 'Zenith Bank': zenith, UBA: uba, 'Globus Bank': globus };

  const t = useContext(LocaleContext);

  const routeCare = () =>
    navigation.navigate('Onboarding', { isActivated: true });

  return useMemo(() => {
    return (
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title="Account(s)"
          navigation={navigation}
          screen="auth"
        />
        <Text
          category="c2"
          status="basic"
          style={{ marginLeft: 15, marginTop: 15 }}
        >
          Selected Accounts
        </Text>
        <BankOptions logo={access} name="Access Bank" />
        {selectedBanks.map((bank) => (
          <BankOptions logo={banksData[bank.name]} name={bank.name} />
        ))}
        <Text
          category="c2"
          status="basic"
          style={{ marginLeft: 15, marginTop: 15 }}
        >
          Account Setup
        </Text>
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          <GeneralTextField
            status="primary"
            type="pin"
            label="Pin"
            // setFormValues={setFormValues}
          />
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 15 }}>
          <GeneralTextField
            status="primary"
            type="pin"
            label="Confirm Pin"
            // setFormValues={setFormValues}
          />
        </View>
        <View style={{ marginVertical: 20, marginHorizontal: 15 }}>
          <Button
            status="danger"
            size="large"
            accessibilityLiveRegion="assertive"
            accessibilityComponentType="button"
            accessibilityLabel="Continue"
            onPress={routeCare}
            disabled={isLoading}
          >
            <Text status="control">{t('complete')}</Text>
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
