import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { useIsFocused } from '@react-navigation/native';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { Toast, Content, Root } from 'native-base';

import { GeneralTextField } from 'src/components/FormFields';

export default function RecoveryFull({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);

  const { authOptions } = useContext(AuthContext);

  const { email } = route.params;

  const t = useContext(LocaleContext);

  const { verifyNewPassword } = authOptions;

  const isFocused = useIsFocused();

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const [form, setFormValues] = useState({
    email,
    password: '',
  });

  const loginUser = async () => {
    // console.log(form);
    const res = await verifyNewPassword(form);
    if (res.error == false) {
      Toast.show({
        text: 'Password Reset Successful',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'success',
        duration: 3000,
      });
    } else {
      Toast.show({
        text: 'Password Reset Failed',
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    }
    setTimeout(() => {
      navigation.navigate('Login');
    }, 4000);
  };

  const routeRegister = () => navigation.navigate('Register');

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={t('accountRecovery')}
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
              padding: 15,
            }}
          >
            {errorMsg.auth ? (
              <View
                style={{
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <Text
                  status="danger"
                  category="label"
                  style={{ marginRight: 2 }}
                >
                  {` ${t('error')}! `}
                </Text>
                <Text status="danger" category="p2">
                  {t(errorMsg.auth)}
                </Text>
              </View>
            ) : null}
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="token"
                  label={t('verificationCode')}
                  autoCompleteType="off"
                  textContentType="oneTimeCode"
                  validate="required"
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="password"
                  label={t('newPassword')}
                  textContentType="password"
                  validate="password"
                  secure
                  setFormValues={setFormValues}
                />
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  disabled={isLoading}
                  onPress={loginUser}
                >
                  <Text status="control">{t('continue')}</Text>
                </Button>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <Text>{`${t('dontHaveAccount')}?`}</Text>
                <Button appearance="ghost" size="tiny" onPress={routeRegister}>
                  <Text category="h6" status="primary">
                    {t('signUp')}
                  </Text>
                </Button>
              </View>
            </View>
          </View>
        </ScrollView>
      </Layout>
    </Root>
  );
}
