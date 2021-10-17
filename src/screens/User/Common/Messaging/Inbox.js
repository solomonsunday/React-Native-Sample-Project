import React from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import Moment from 'react-moment';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, List, Text, Divider,
} from '@ui-kitten/components';

const MESSAGES = [
  {
    img: require('assets/images/user/user2.png'),
    userName: 'Frank Wazobia',
    details: 'Chats from below',
    date: '2021-03-20',
  },
  {
    img: require('assets/images/user/user1.png'),
    userName: 'Suzzy Sue',
    details: 'Chats from below and above',
    date: '2021-02-10',
  },
  {
    img: require('assets/images/user/user3.png'),
    userName: 'Micheal Angelo',
    details: 'Chats from below and above and left and right and ok',
    date: '2020-05-10',
  },
];

export default function Inbox({ navigation }) {
  const routeChats = () => navigation.navigate('MessageInbox');

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
            alignItems: 'flex-end',
            paddingHorizontal: 5,
            paddingVertical: 5,
          }}
          onPress={routeChats}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 34,
              width: 34,
              borderRadius: 17,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={item.img}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text category="s2" style={{ marginBottom: 5 }}>
              {item.userName}
            </Text>
            <Text category="c1" numberOfLines={1}>
              {item.details}
            </Text>
          </View>
          <View style={{ width: 80 }}>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text category="c1" {...momentProps} style={{ fontSize: 10 }} />
              )}
            >
              {item.date}
            </Moment>
          </View>
        </TouchableOpacity>
      </Layout>
      <Divider />
    </>
  );
  return (
    <List
      style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
      alwaysBounceVertical
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={MESSAGES}
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
