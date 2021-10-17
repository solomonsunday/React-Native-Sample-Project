import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, List, Text, Button,
} from '@ui-kitten/components';
import { t } from 'i18n-js';

const FOLLOWS = [
  {
    img: require('assets/images/user/user2.png'),
    fullName: 'Frank Wazobia',
    userName: '@frankWazobia',
    date: '2021-03-20',
    following: false,
  },
  {
    img: require('assets/images/user/user1.png'),
    fullName: 'Suzzy Sue',
    userName: '@suzzySue',
    date: '2021-02-10',
    following: false,
  },
  {
    img: require('assets/images/user/user3.png'),
    fullName: 'Micheal Angelo',
    userName: '@michealAngelo',
    date: '2020-05-10',
    following: false,
  },
];

export default function Suggested({ navigation }) {
  const routeChats = () => navigation.navigate('Chats');

  const renderItem = ({ index, item }) => (
    <>
      <Layout
        level="6"
        style={{
          marginVertical: 5,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.75}
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
          onPress={routeChats}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 44,
              width: 44,
              borderRadius: 22,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={item.img}
              style={{
                height: 40,
                width: 40,
                borderRadius: 20,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text category="s2" style={{ marginBottom: 5 }}>
              {item.fullName}
            </Text>
            <Text category="c1" numberOfLines={1}>
              {item.userName}
            </Text>
          </View>
          <View style={{ width: 100 }}>
            {item.following ? (
              <Button
                size="tiny"
                status="primary"
                style={{ paddingHorizontal: 0 }}
              >
                <Text category="c2" status="control">
                  {t('following')}
                </Text>
              </Button>
            ) : (
              <Button
                size="tiny"
                status="primary"
                appearance="outline"
                style={{ paddingHorizontal: 0 }}
              >
                <Text category="c2" status="primary">
                  {t('follow')}
                </Text>
              </Button>
            )}
          </View>
        </TouchableOpacity>
      </Layout>
    </>
  );
  return (
    <List
      style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
      alwaysBounceVertical
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={FOLLOWS}
      keyExtractor={(_, i) => i.toString()}
      renderItem={renderItem}
      getItemLayout={(data, index) => ({
        length: 150,
        offset: 150 * index,
        index,
      })}
    />
  );
}
