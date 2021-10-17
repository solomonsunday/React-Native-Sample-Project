import React, { useContext, useEffect, useState } from 'react';

import { StyleSheet, Text } from 'react-native';

import UserProfile from '../../../../../screens/User/Common/UserProfile';

import { ProfilePosts, LikedProfilePosts } from 'src/components/SocialPosts';

import { Layout } from '@ui-kitten/components';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from '../../../../../services/api';

import { trendingUrl } from 'src/api/dummy';

export default function Profile({ navigation }) {
  const [user, setUser] = useState({});

  const [_userId, setUserId] = useState('');

  const getUserProfile = (user_id) => {
    // setLoading(true)
    AsyncStorage.getItem('USER_AUTH_TOKEN')
      .then((res) => {
        axios
          .get(`user/user?userId=${user_id}`, {
            headers: { Authorization: res },
          })
          .then((response) => {
            // setLoading(false)
            const user_data = response.data.user;
            setUser(user_data);
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    // AsyncStorage.getAllKeys((err, keys) => {
    //   AsyncStorage.multiGet(keys, (error, stores) => {
    //     stores.map((result, i, store) => {
    //       console.log('async stuff ', { [store[i][0]]: store[i][1] });
    //       return true;
    //     });
    //   });
    // });
    const unsubscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('userid')
        .then((response) => {
          setUserId(response);
          getUserProfile(response);
        })
        .catch((err) => err);
    });

    return unsubscribe;
  }, []);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      {user && user._id && (
        <UserProfile navigation={navigation} route={{ params: { user } }} />
      )}
    </Layout>
  );
}
