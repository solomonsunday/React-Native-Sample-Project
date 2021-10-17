import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../services/api';

export default function getUserProfile(user_id) {
  AsyncStorage.getItem('USER_AUTH_TOKEN')
    .then((res) => {
      axios
        .get(`user/user?userId=${user_id}`, {
          headers: { Authorization: res },
        })
        .then((response) => {
          // setLoading(false)
          const user_data = response.data.user;
          //   setUserInfo(user_data);
          AsyncStorage.setItem('userImg', user_data.imgUrl);
        })
        .catch((err) => {
          console.log(err.response);
        });
    })
    .catch((err) => {
      console.log(err);
    });

  //   console.log('User Profile is ', userInfo);
}
