import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import { useIsFocused } from '@react-navigation/native';

import { Toast, Root } from 'native-base';

export default function VerifyWithCode({ route, navigation }) {
  const { authOptions } = useContext(AuthContext);

  const { verifyAction, resendToken } = authOptions;

  const { userInfo } = route.params;

  const [isLoading, setLoading] = useState(false);

  const [verifyCode, setVerifyCode] = useState({
    emailAddress: userInfo.email,
  });

  const isFocused = useIsFocused();

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const t = useContext(LocaleContext);

  const routeLogin = () => navigation.navigate('Login');

  const verifyAccount = async () => {
    if (verifyCode.code.length > 0) {
      await verify();
    } else {
      return;
    }
  };

  const handleResend = async () => {
    const res = await resendToken(verifyCode);
    Toast.show({
      text: res.message,
      buttonText: 'Okay',
      position: 'bottom',
      type: 'info',
      duration: 3000,
    });
  };

  const verify = async () => {
    // let tokenError = null;
    const res = await verifyAction(verifyCode);
    if (res.error) {
      Toast.show({
        text: res.message,
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
    } else {
      Toast.show({
        text: res.message,
        buttonText: 'Okay',
        position: 'bottom',
        type: 'success',
        duration: 3000,
      });
      routeLogin();
    }

    // try {
    //   setLoading(true);
    // } catch (e) {
    //   tokenError = e;
    // } finally {
    //   setErrorMsg((prevState) => ({
    //     ...prevState,
    //     auth: tokenError,
    //   }));
    // }
    // if (isFocused) setLoading(false);
  };

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={t('accountVerification')}
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
            <View style={{ paddingBottom: 10 }}>
              <View style={{ paddingVertical: 10 }}>
                <GeneralTextField
                  type="code"
                  label={t('verificationCode')}
                  autoCompleteType="off"
                  textContentType="oneTimeCode"
                  validate="required"
                  setFormValues={setVerifyCode}
                />
                <Button
                  size="tiny"
                  appearance="ghost"
                  style={{ alignSelf: 'flex-end' }}
                  onPress={handleResend}
                >
                  <Text status="primary" category="s2">
                    {t('resendCode')}
                  </Text>
                </Button>
              </View>
              <View style={{ paddingVertical: 20 }}>
                <Button
                  status="danger"
                  size="large"
                  accessibilityLiveRegion="assertive"
                  accessibilityComponentType="button"
                  accessibilityLabel="Continue"
                  disabled={isLoading}
                  onPress={verifyAccount}
                >
                  <Text status="control">{t('submit')}</Text>
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
                <Text>{`${t('haveAccount')}?`}</Text>
                <Button appearance="ghost" size="tiny" onPress={routeLogin}>
                  <Text category="h6" status="primary">
                    {t('signIn')}
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
