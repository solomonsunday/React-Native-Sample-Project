import React, { useContext } from 'react';

import { View, ScrollView, Image, StyleSheet } from 'react-native';

// prettier-ignore
import {
  Layout, Button, Text,
} from '@ui-kitten/components';

import { Ionicons } from '@expo/vector-icons';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import {
  IconForward,
  IconDownload,
  IconShare,
} from 'src/components/CustomIcons';
import { ProfilePosts } from 'src/components/SocialPosts/index';

export default function Success({ navigation, route }) {
  // const { success } = route.params;
  // console.log(success);
  const t = useContext(LocaleContext);
  const styles = StyleSheet.create({
    successText: {
      opacity: 0.7,
      textAlign: 'center',
      marginVertical: 10,
    },
  });
  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea navigation={navigation} screen="default" />
      <ScrollView
        alwaysBounceVertical
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 30,
              alignItems: 'center',
            }}
          >
            {/* <Image
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
              source={require('../../../assets/images/askADoc/success.png')}
            /> */}

            {/* <Image
              source={require('../../../assets/images/askADoc/success.png')}
              style={{
                width: 120,
                height: 120,
                resizeMode: 'contain',
                marginTop: 30,
              }}
            /> */}
            <View
              style={{
                backgroundColor: '#1CD699',
                width: 100,
                height: 100,
                borderRadius: 150,
                marginVertical: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name="md-checkmark" size={50} color="white" />
            </View>
            <Text category="h6">Transaction completed!</Text>
            {/* <Text
              category="c1"
              status="basic"
              style={{ textAlign: 'center', marginVertical: 10 }}
            >
              {success}
            </Text> */}
          </View>
          <View style={{ paddingHorizontal: 20, paddingTop: 50 }}>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconForward}>
                <Text
                  category="h6"
                  status="control"
                  style={{ marginRight: 50 }}
                >
                  {t('continue')}
                </Text>
              </Button>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconDownload}>
                <Text category="h6" status="control">
                  {t('downloadReceipt')}
                </Text>
              </Button>
            </View>
            <View style={{ paddingVertical: 10 }}>
              <Button status="danger" accessoryRight={IconShare}>
                <Text category="h6" status="control">
                  {t('shareReceipt')}
                </Text>
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
