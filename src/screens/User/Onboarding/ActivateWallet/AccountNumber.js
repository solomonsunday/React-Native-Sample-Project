import React, { useContext, useState } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Button, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { GeneralTextField } from 'src/components/FormFields';

export default function AccountNumber({ navigation }) {
  const [isLoading, setLoading] = useState(false);

  const [form, setFormValues] = useState({
    password: '',
    pin: '',
  });

  const t = useContext(LocaleContext);

  // prettier-ignore
  const routeHome = () => navigation.navigate('UserRoute');

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('accountNumber')}
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
            <Text status="primary" category="c2" style={{ marginBottom: 5 }}>
              {t('yourAccountNumIs')}
            </Text>
            <Text status="primary" category="h3">
              0112633921
            </Text>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="password"
                label={t('password')}
                autoCompleteType="password"
                textContentType="password"
                validate="password"
                secure
                setFormValues={setFormValues}
              />
            </View>
            <View style={{ paddingVertical: 10 }}>
              <GeneralTextField
                type="pin"
                label={`${t('pin')} (4 ${t('digits')})`}
                keyboardType="number-pad"
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
                onPress={routeHome}
                disabled={isLoading}
              >
                <Text status="control">{t('complete')}</Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
