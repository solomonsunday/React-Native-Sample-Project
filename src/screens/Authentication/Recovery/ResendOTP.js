import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import { Toast, Content, Root } from 'native-base';

export default function ResendOTP({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const { authOptions } = useContext(AuthContext);

  const { forgotPassword, resendToken, checkExistingMail } = authOptions;

  const [email, setFormValues] = useState('');

  const t = useContext(LocaleContext);

  const routeRegister = () => navigation.navigate('Register');
  const routeVerifyWithCode = () =>
    navigation.navigate('VerifyWithCode', { userInfo: { email: email.email } });

  const isEmailValid = (emailAddress) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const sendOTP = async () => {
    if (isEmailValid(email.email)) {
      //check if email exist, if it does, send a new otp to it, if not then ask user to register
      const res = await checkExistingMail(email.email);

      if (res.error) {
        Toast.show({
          text: res.message,
          position: 'bottom',
          type: 'danger',
          duration: 3000,
        });
      } else {
        handleResend();
        // console.log('res message', res.message);
      }
    }
    return;
  };

  const handleResend = async () => {
    setLoading(!isLoading);
    const res = await resendToken({ emailAddress: email.email });
    // console.log('Res', res);
    if (res.message == 'User Mismatch') {
      Toast.show({
        text: res.message,
        buttonText: 'Okay',
        position: 'bottom',
        type: 'danger',
        duration: 3000,
      });
      setLoading(false);
    } else {
      setLoading(false);
      routeVerifyWithCode();
    }
  };

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={t('resendCode')}
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
                  type="email"
                  label={t('emailAddress')}
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  validate="email"
                  // onChangeText={
                  //   isEmailValid(email) ? setDisabled(false) : setDisabled(true)
                  // }
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
                  onPress={handleResend}
                  disabled={isLoading}
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
                <Button appearance="ghost" size="large" onPress={routeRegister}>
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
