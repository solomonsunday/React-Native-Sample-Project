import React from 'react';

import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { getUserData } from '../../services/Requests/index';

import { LinearGradient } from 'expo-linear-gradient';

import { Input, Layout, List, Text, Divider } from '@ui-kitten/components';

const UserTemplate = ({
  userProfilePic,
  displayName,
  userId,
  navigation,
  sendTo,
}) => {
  const sendMessage = async () => {
    // console.log('message sent');
    sendTo();
    // const userData = await getUserData(userId);
    // const { data } = userData;
    // await navigation.navigate('UserProfile', data);
  };

  return (
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
            // justifyContent: 'center',
            paddingHorizontal: 5,
            // paddingVertical: 5,
          }}
          onPress={sendMessage}
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
              source={userProfilePic}
              style={{
                height: 30,
                width: 30,
                borderRadius: 15,
                borderColor: 'white',
              }}
            />
          </LinearGradient>
          <View style={{ flex: 1, marginHorizontal: 10 }}>
            <Text category="s2">{displayName}</Text>
          </View>
        </TouchableOpacity>
      </Layout>
      <Divider />
    </>
  );
};

export default UserTemplate;
