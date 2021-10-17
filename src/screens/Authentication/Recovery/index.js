import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { AuthContext, LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

export default function RecoverWithEmail({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const { authOptions } = useContext(AuthContext);

  const { forgotPassword } = authOptions;

  const [email, setFormValues] = useState('');

  const t = useContext(LocaleContext);

  const routeRegister = () => navigation.navigate('Register');

  const isEmailValid = (emailAddress) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  };

  const routeRecoveryFull = async () => {
    if (isEmailValid(email.email)) {
      const res = await forgotPassword(email.email);
      // console.log(res);
      navigation.navigate('RecoveryFull', email);
    }
    return;
  };

  return (
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
                onPress={routeRecoveryFull}
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
  );
}
