import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

import { useIsFocused } from '@react-navigation/native';

export default function RegisterFull({ route, navigation }) {
  // prettier-ignore
  const {
    authOptions,
  } = useContext(AuthContext);

  const { form } = route.params;

  const [userInfo, setUserInfo] = useState({
    email: form.email,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    confirmPassword: '',
  });

  const { signup } = authOptions;

  const t = useContext(LocaleContext);

  const isFocused = useIsFocused();

  const [errorMsg, setErrorMsg] = useState({
    auth: null,
  });

  const routeLogin = () => navigation.navigate('Login');

  const routeVerifyWithCode = () =>
    navigation.navigate('VerifyWithCode', { userInfo });

  const isUserInfoValid = () => {
    const { firstName, lastName, password, confirmPassword } = userInfo;
    if (
      firstName.length > 0 &&
      lastName.length > 0 &&
      password === confirmPassword
    ) {
      return true;
    } else {
      return false;
    }
  };

  const [isLoading, setLoading] = useState(isUserInfoValid());

  const signUp = async () => {
    if (isUserInfoValid() == true) {
      await signupUser();
      await routeVerifyWithCode();
    } else {
      return;
    }
  };

  const signupUser = async () => {
    let signupError = null;

    try {
      setLoading(true);
      await signup(userInfo);
    } catch (e) {
      signupError = e;
    } finally {
      if (signupError) {
        setErrorMsg((prevState) => ({
          ...prevState,
          auth: signupError,
        }));
      }
      if (isFocused) setLoading(false);
    }
  };

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={`${t('registration')} ${t('details')}`}
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
            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <GeneralTextField
                  type="firstName"
                  label={t('firstName')}
                  autoCompleteType="name"
                  textContentType="givenName"
                  validate="required"
                  setFormValues={setUserInfo}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <GeneralTextField
                  type="lastName"
                  label={t('lastName')}
                  autoCompleteType="name"
                  textContentType="familyName"
                  validate="required"
                  setFormValues={setUserInfo}
                />
              </View>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="userName"
                label="Username"
                validate="required"
                setFormValues={setUserInfo}
              />
            </View>
            {/* <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="referralCode"
                label={t('referralCode')}
                // validate="required"
                setFormValues={setUserInfo}
              />
            </View> */}
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="password"
                label={t('password')}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                setFormValues={setUserInfo}
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
                setFormValues={setUserInfo}
              />
            </View>
            <View style={{ paddingVertical: 20 }}>
              <Button
                status="danger"
                size="large"
                accessibilityLiveRegion="assertive"
                accessibilityComponentType="button"
                accessibilityLabel="Continue"
                onPress={signUp}
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
                paddingVertical: 10,
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
  );
}
