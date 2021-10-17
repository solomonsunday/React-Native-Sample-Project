import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

export default function OTPVerification({ route, navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    otp: '',
  });

  const t = useContext(LocaleContext);

  // prettier-ignore
  const routeCare = () => navigation.navigate('ActivateWalletCreatePin', route.params);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('otpVerify')}
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
          <View style={{ marginBottom: 20 }}>
            <Text status="primary" category="h6" style={{ marginBottom: 5 }}>
              {t('weSentACode')}
            </Text>
            <Text status="primary" category="c2">
              {t('enterToVerify')}
            </Text>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="otp"
                keyboardType="number-pad"
                status="primary"
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
                onPress={routeCare}
                disabled={isLoading}
              >
                <Text status="control">{t('next')}</Text>
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
              <Text>{`${t('didNotReceiveOtp')}?`}</Text>
              <Button appearance="ghost" size="tiny">
                <Text category="h6" status="primary">
                  {`${t('resend')} 0:59`}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
