import React, { useContext, useEffect, useState } from 'react';

// prettier-ignore
import {
  View, ScrollView
} from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';
import { Toast, Root } from 'native-base';

import axios from '../../../../services/api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GeneratePin({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState('');
  const [_email, setEmail] = useState('');

  const [form, setFormValues] = useState({
    pin: '',
    confirmPin: '',
  });

  const updatePassword = () => {
    setLoading(true);
    if (form.pin === form.confirmPin) {
      const data = {
        email: _email,
        pin: form.pin,
      };

      axios
        .post(`user/update-pin`, data, {
          headers: { Authorization: token },
        })
        .then((res) => {
          console.log('response', res);
          setLoading(false);
          const message = res.data.message;
          Toast.show({
            text: message,
            // buttonText: 'Okay',
            position: 'top',
            type: 'info',
            duration: 3000,
          });
          setTimeout(() => {
            navigation.navigate('Settings');
          }, 3500);
        })
        .catch((err) => {
          setLoading(false);
          console.log('err', err);
        });
    } else {
      //toast show
      //close sheet and bring up suceess toast
      Toast.show({
        text: 'Pin mismatch',
        // buttonText: 'Okay',
        position: 'top',
        type: 'danger',
        duration: 3000,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid')
        .then((response) => {
          setUserId(response);
        })
        .catch((err) => err);
      AsyncStorage.getItem('email')
        .then((response) => {
          setEmail(response);
        })
        .catch((err) => err);
      AsyncStorage.getItem('USER_AUTH_TOKEN')
        .then((res) => {
          setToken(res);
        })
        .catch((err) => err);
    });

    return unsubscribe;
  }, [navigation]);

  const t = useContext(LocaleContext);
  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={`Generate Pin`}
          navigation={navigation}
          screen="auth"
        />
        <ScrollView
          alwaysBounceVertical
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <View style={{ padding: 15 }}>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="pin"
                  label={'Pin'}
                  autoCompleteType="password"
                  textContentType="password"
                  keyboardType="numeric"
                  maxLength={4}
                  validate="password"
                  secure
                  value={form.pin}
                  setFormValues={setFormValues}
                />
              </View>

              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="confirmPin"
                  label={'Confirm Pin'}
                  autoCompleteType="password"
                  textContentType="password"
                  keyboardType="numeric"
                  maxLength={4}
                  validate="password"
                  secure
                  value={form.confirmPin}
                  setFormValues={setFormValues}
                />
              </View>
              <View
                style={{
                  paddingVertical: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              ></View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  disabled={isLoading}
                  onPress={() => updatePassword()}
                >
                  <Text status="control">{`Generate Pin`}</Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </Root>
  );
}
