import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function PrivacyPolicy({ navigation }) {
  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('privacyPolicy')}
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
            <Text category="h5" style={{ marginVertical: 5 }}>
              1. Introduction
            </Text>
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
            <Text category="h5" style={{ marginVertical: 5 }}>
              2. Privacy Policy
            </Text>
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              We view protection of your privacy as a very important principle.
              We understand clearly that you and your personal information are
              two of our most important assets. We store and process your
              information on computers that may be protected by physical as well
              as reasonable technological security measures and procedures in
              accordance with all relevant laws and rules there under. If you
              object to your information being transferred or used in this way,
              please do not use the woozeee platform. Information submitted may
              be made available to woozeee Partners who can in turn use it for
              verification purpose. This policy describes the information we
              process to support woozeee and other platform and features. You
              can find additional tools and information in the woozeee Terms and
              Conditions. The collection and use of personal data by eConnect
              are guided by certain principles. These principles state that
              personal data should: • Be processed fairly, lawfully, and in a
              transparent manner. • Be obtained for a specified and lawful
              purpose and shall not be processed in any manner incompatible with
              such purposes. • Be adequate, relevant, and limited to what is
              necessary to fulfill the purpose of processing. • Be accurate and
              where necessary, up-to-date. If the event data is inaccurate,
              steps should be taken to rectify or erase such data. • Not be kept
              for longer than necessary for the purpose of processing. • Be
              processed in accordance with the data subject’s rights. • Be kept
              safe from unauthorized processing, and accidental loss, damage, or
              destruction using adequate technical and organizational measures.
            </Text>
            <Text category="h5" style={{ marginVertical: 5 }}>
              2. Safety
            </Text>
            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              We use the information we have to verify accounts and activity,
              combat harmful conduct, detect and prevent spam and other bad
              experiences, maintain the integrity of our Platform, and promote
              safety and security on and off of woozeee Platform. For example,
              we use data we have to investigate suspicious activity or
              violations of our terms or policies, or to detect when someone
              needs help. To learn more, visit the woozeee security tips.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
