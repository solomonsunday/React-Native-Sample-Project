import React, { useState, useEffect } from 'react';

import { View, Image, TouchableOpacity } from 'react-native';

import {
  getUserData,
  getFollowData,
} from '../../../../services/Requests/index';

import { LinearGradient } from 'expo-linear-gradient';

// prettier-ignore
import {
  Layout, List, Text, Button,
} from '@ui-kitten/components';

import { t } from 'i18n-js';

export default function Following({ userID, navigation }) {
  String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  };

  const [followingList, setFollowingList] = useState([]);

  const res = async () => {
    const following = await getFollowData(userID, 'followers');
    setFollowingList(following.data);
  };

  useEffect(() => {
    res();
  }, []);

  const routeUserProfile = async (userId) => {
    const userData = await getUserData(userId);
    await navigation.navigate('UserProfile', userData.data);
  };

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
          onPress={() => routeUserProfile(item.userId)}
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
              source={item.imgUrl}
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
              {`${item.userFirstName
                .toLowerCase()
                .capitalize()} ${item.userLastName.toLowerCase().capitalize()}`}
            </Text>
            {/* <Text category="c1" numberOfLines={1}>
              {item.displayName}
            </Text> */}
          </View>
          {/* <View style={{ width: 100 }}>
            <Button
              size="tiny"
              status="primary"
              style={{ paddingHorizontal: 0 }}
            >
              <Text category="c2" status="control">
                {t('following')}
              </Text>
            </Button>
          </View> */}
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
      data={followingList}
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
