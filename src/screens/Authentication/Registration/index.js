import React, { useContext, useState } from 'react';

import { View, ScrollView, Image } from 'react-native';

import Constants from 'expo-constants';

import { Layout, Button, Text, CheckBox } from '@ui-kitten/components';

import { Toast, Content, Root } from 'native-base';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import {
  IconCGoogle,
  IconCFacebook,
  IconCTwitter,
  IconCApple,
} from 'src/components/CustomIcons';

import SignUpWithGoogle from '../../../services/Requests/googleSignIn';
import SignUpWithFacebook from '../../../services/Requests/facebookSignIn';
import SignUpWithApple from 'src/services/Requests/appleSignIn';

export default function Register({ navigation }) {
  const { authOptions } = useContext(AuthContext);
  const { checkExistingMail, googleSignup, facebookSignup, appleSignup } =
    authOptions;
  const [isLoading, setLoading] = useState(false);
  const [checked, setChecked] = React.useState(false);

  // function callGoogleSigunp() {
  //   SignUpWithGoogle({ googleSignup });
  // }
  // function callFBSigunp() {
  //   SignUpWithFacebook({ facebookSignup });
  // }

  // function callAppleSignup() {
  //   SignUpWithApple({ appleSignup });
  // }

  const [form, setFormValues] = useState({
    email: '',
  });

  const isEmailValid = (emailAddress) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const validateEmail = async () => {
    setLoading(!isLoading);
    if (isEmailValid(form.email)) {
      //does email already exist ? throw Toast else route to Full
      const res = await checkExistingMail(form.email);
      // console.log('res', res);
      const { error, message } = res;
      if (error) {
        Toast.show({
          text: message,
          buttonText: 'Okay',
          position: 'bottom',
          type: 'danger',
          duration: 2000,
        });
        setLoading(false);
      } else {
        setLoading(false);
        routeRegisterFull();
      }
    } else {
      return;
    }
  };

  const t = useContext(LocaleContext);

  const routeLogin = () => navigation.navigate('Login');
  const routeRegisterFull = () => navigation.navigate('RegisterFull', { form });

  const routeTermsConditions = () => navigation.navigate('TermsConditions');
  const routePrivacyPolicy = () => navigation.navigate('PrivacyPolicy');

  return (
    <Root>
      <Layout level="6" style={{ flex: 1 }}>
        <TopNavigationArea
          title={t('signUp')}
          navigation={navigation}
          icon="back"
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
                  keyboardType="email-address"
                  validate="email"
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
                  onPress={validateEmail}
                  disabled={isLoading || !checked}
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
              <CheckBox
              checked={checked}
              onChange={nextChecked => setChecked(nextChecked)}
              >
                Accept Terms and Conditions
              </CheckBox>

                <Text category="p2">{`${t('continueAgree')} woozeee's`}</Text>
                <Button
                  appearance="ghost"
                  size="large"
                  onPress={routeTermsConditions}
                >
                  <Text status="primary" category="s2">
                    {t('termsConditions')}
                  </Text>
                </Button>
                <Text category="p2">{`${t('confirmRead')} woozeee's`}</Text>
                <Button
                  appearance="ghost"
                  size="large"
                  onPress={routePrivacyPolicy}
                >
                  <Text status="primary" category="s2">
                    {t('privacyPolicy')}
                  </Text>
                </Button>
              </View>
              {/* <View
              style={{
                alignItems: 'center',
                paddingTop: 50,
                paddingBottom: 10,
              }}
            >
              <Text>{t('orContinueWith')}</Text>
            </View> */}
              {/* <View style={{ paddingVertical: 10 }}>
              <Button
                status="primary"
                size="medium"
                appearance="outline"
                accessoryLeft={() => (
                  <Image
                    source={require('../../../assets/images/icon/access.png')}
                    defaultSource={require('../../../assets/images/icon/access.png')}
                    resizeMode="cover"
                  />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Access Bank"
                onPress={SignUpWithGoogle}
                style={{ marginVertical: 5, backgroundColor: '#F5821E' }}
              >
                <Text category="s1" style={{ color: 'white' }}>
                  Access Bank
                </Text>
              </Button>
              <Button
                status="primary"
                size="medium"
                appearance="outline"
                accessoryLeft={() => (
                  <IconCGoogle style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Google"
                style={{ marginVertical: 5, backgroundColor: 'white' }}
                onPress={callGoogleSigunp}
              >
                <Text category="s1" style={{ color: 'black' }}>
                  Google
                </Text>
              </Button>
              <Button
                status="primary"
                size="medium"
                accessoryLeft={() => (
                  <IconCFacebook style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Facebook"
                style={{ marginVertical: 5 }}
                onPress={callFBSigunp}
              >
                <Text category="s1" status="control">
                  Facebook
                </Text>
              </Button>
              <Button
                status="info"
                size="medium"
                accessoryLeft={() => (
                  <IconCTwitter style={{ height: 20, width: 20 }} />
                )}
                accessibilityLiveRegion="polite"
                accessibilityComponentType="button"
                accessibilityLabel="Sign up with Twitter"
                style={{ marginVertical: 5 }}
              >
                <Text category="s1" status="control">
                  Twitter
                </Text>
              </Button>
              {Constants.platform.ios && (
                <Button
                  size="medium"
                  accessoryLeft={() => (
                    <IconCApple style={{ height: 20, width: 20 }} />
                  )}
                  accessibilityLiveRegion="polite"
                  accessibilityComponentType="button"
                  accessibilityLabel="Sign up with Apple"
                  style={{ marginVertical: 5, backgroundColor: 'black' }}
                  onPress={callAppleSignup}
                >
                  <Text category="s1" status="control">
                    Apple
                  </Text>
                </Button>
              )}
            </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  paddingVertical: 10,
                }}
              >
                <Text>{`${t('haveAccount')}?`}</Text>
                <Button appearance="ghost" size="large" onPress={routeLogin}>
                  <Text status="primary" category="h6">
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
