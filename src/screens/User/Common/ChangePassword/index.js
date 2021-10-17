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

import axios from '../../../../services/api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChangePassword({ navigation }) {
  const [isLoading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [user_id, setUserId] = useState('');

  const [form, setFormValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const updatePassword = () => {
    setLoading(true);
    const data = form;
    axios
      .put(`user/update-password?userId=${user_id}`, data, {
        headers: { Authorization: token },
      })
      .then((res) => {
        // console.log(res, "response")
        setLoading(false);
        const message = res.data.message;
        alert(message);
      })
      .catch((err) => {
        setLoading(false);
        // console.log("err", err.response)
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid')
        .then((response) => {
          setUserId(response);
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
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`Change Password`}
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
                type="oldPassword"
                label={t('oldPassword')}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                value={form.oldPassword}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="newPassword"
                label={t('password')}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                value={form.newPassword}
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="confirmPassword"
                label={`${t('confirm')} ${t('password')}`}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                value={form.confirmPassword}
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
                <Text status="control">{`Change Password`}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
