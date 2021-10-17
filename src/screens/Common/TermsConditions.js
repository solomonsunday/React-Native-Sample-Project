import React, { useContext } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout, Text } from '@ui-kitten/components';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

export default function TermsConditions({ navigation }) {
  const t = useContext(LocaleContext);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        title={t('termsConditions')}
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
              2. Terms and Conditions of use
            </Text>

            <Text style={{ lineHeight: 25, marginVertical: 5 }}>
              You confirm that you are at least 18 years of age or are accessing
              the Platform under the supervision of a parent or legal guardian.
              Both parties agree that this platform may only be used in
              accordance with these Terms and Condition of Use. If you do not
              agree with the Terms and Conditions of Use or do not wish to be
              bound by them, you agree to refrain from using this platform. We
              grant you a non-transferable, revocable and non-exclusive license
              to use this platform, in accordance with the Terms and Conditions
              of Use, for such things as: shopping for personal items sold on
              the platform, gathering prior information regarding our products
              and services and making purchases. Commercial use or use on behalf
              of any third party is prohibited, except as explicitly permitted
              by us in advance. These Terms and Conditions of Use specifically
              prohibit actions such as: accessing our servers or internal
              computer systems, interfering in any way with the functionality of
              this platform, gathering or altering any underlying software code,
              infringing any intellectual property rights. This list is
              non-exhaustive and similar actions are also strictly prohibited.
              Any breach of these Terms and Conditions of Use shall result in
              the immediate revocation of the license granted in this paragraph
              without prior notice to you. Should we determine at our sole
              discretion that you are in breach of any of these conditions, we
              reserve the right to deny you access to this platform and its
              contents and do so without prejudice to any available remedies at
              law or otherwise. Certain services and related features that may
              be made available on the Platform may require registration or
              subscription. Should you choose to register or subscribe for any
              such services or related features, you agree to provide accurate
              and current information about yourself, and to promptly update
              such information if there are any changes. Every user of the
              Platform is solely responsible for keeping passwords and other
              account identifiers safe and secure. The account owner is entirely
              responsible for all activities that occur under such password or
              account. The Platform shall not be responsible or liable, directly
              or indirectly, in any way for any loss or damage of any kind
              incurred as a result of, or in connection with, your failure to
              comply with this section. During the registration process you
              agree to receive promotional emails from the platform. You can
              subsequently opt out of receiving such promotional emails by
              clicking on the link at the bottom of any promotional email.
            </Text>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
