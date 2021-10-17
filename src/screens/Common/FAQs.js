import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function FAQs({ navigation }) {
  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('faqs')}
        navigation={navigation}
        screen="auth"
      />
      <ScrollView alwaysBounceVertical showsHorizontalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 15,
            paddingTop: 10,
          }}
        >
          <View style={{ marginBottom: 15 }}>
            <Text category="h5" style={{ marginVertical: 5 }}>
              Introduction
            </Text>
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text category="h5" style={{ marginVertical: 5 }}>
              How to navigate
            </Text>
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text category="h5" style={{ marginVertical: 5 }}>
              How to pay
            </Text>
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
