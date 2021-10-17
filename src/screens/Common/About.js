import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function About({ navigation }) {
  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={'About woozeee'}
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
            <Text
              category="s2"
              appearance="hint"
              style={{ textAlign: 'center', marginBottom: 10 }}
            >
              Last Updated September 2021
            </Text>
            {/* <Text category="h5" style={{ marginVertical: 5 }}>
              1. Introduction
            </Text> */}
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              Welcome to the woozeee (the “Site”). These terms & conditions
              (“Terms and Conditions”) apply to the Site, and all of its
              divisions, subsidiaries, and affiliate operated Internet sites
              which reference these Terms and Conditions. This website is owned
              and operated by eConnect NetPower Limited. For the purposes of
              this website, “seller”, “we”, “us” and “our” all refer to
              woozeee.com The Site reserves the right, to change, modify, add,
              or remove portions of both the Terms and Condition of Use and the
              Terms and Conditions of Sale at any time. Changes will be
              effective when posted on the Site with no other notice provided.
              Please check these Terms and Conditions regularly for updates.
              Your continued use of the Site following the posting of changes to
              these Terms and Conditions constitutes your acceptance of those
              changes. Kindly review the Terms and Conditions listed below
              diligently prior to using this website as your use of the website
              indicates your agreement to be wholly bound by its Terms and
              Conditions without modification. You agree that if you are unsure
              of the meaning of any part of these Terms and Conditions or have
              any questions regarding the Terms and Conditions, you will not
              hesitate to contact us for clarification. These Terms and
              Conditions fully govern the use of this website. No extrinsic
              evidence, whether oral or written, will be incorporated.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
