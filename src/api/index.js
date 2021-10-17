import React, { useState } from 'react';
import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';

const { CancelToken } = axios;

const source = CancelToken.source();

export const getToken = () => {
  return AsyncStorage.getItem('USER_AUTH_TOKEN');
};

export const getEmail = () => {
  return AsyncStorage.getItem('email');
};

export const createInstance = async () => {
  return axios.create({
    baseURL: `https://apis.woozeee.com/api/v1/`,
    timeout: 60000,
    timeoutErrorMessage: 'Request took too long, please try again',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json:charset=utf-8',
      Authorization: `${await getToken()}`,
    },
  });
};

export default {
  getAllUsers: async (name) => {
    const instance = await createInstance();

    const res = await instance.get(`user/search?q=${name}`);
    const { data } = res;
    return data;
  },
  getUserByEmail: async (email) => {
    const instance = await createInstance();

    const res = await instance.get(`user/user?email=${email}`);
    const { data } = res;
    return data;
  },
  getComments: async () => {
    // const [comments, setComments] = useState([]);
    // const res = db.collection('entryComments');
    // const data = await res.get();
    // console.log(data);
    // data.docs.forEach((comment) => {
    //   console.log(setComments(comment));
    // });
    // return comments;
  },
  getStories: async () => {
    const instance = await createInstance();

    const res = await instance.get('stories');
    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
    };
  },
  getMovies: async () => {
    const instance = await createInstance();

    const res = await instance.get('movies?pageNumber=1&pageSize=10');

    const { data } = res;
    return {
      pageData: data,
    };
  },
  getTrendingChallenges: async () => {
    const instance = await createInstance();

    const res = await instance.get('challenges-category');

    const { data } = res;
    return {
      pageData: data,
    };
  },
  getChallenges: async () => {
    const instance = await createInstance();

    const res = await instance.get(`challenge-groups`);

    const { data } = res;
    // console.log(data);
    return {
      pageData: data,
    };
  },
  getVideos: async (page = 1, cursor = 1) => {
    const instance = await createInstance();

    const res = await instance.get(`entries?pageSize=10&pageNumber=${page}`);

    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },
  getWoozVideos: async (pageNumber) => {
    const instance = await createInstance();
    console.log(pageNumber);
    const res = await instance.get(
      `entries?pageSize=10&type=video`,
      // `entries?pageSize=10&type=video&pageNumber=${pageNumber}`,
    );

    const { data } = res;
    return {
      pageData: data,
      previousID: 1,
      // nextID: page + 1,
    };
  },
  getDeepLinkPost: async (entryId) => {
    const instance = await createInstance();

    const res = await instance.get(`entries/${entryId}`);

    const { data } = res;
    return data;
  },

  getWoozData: async (page = 1, id) => {
    const instance = await createInstance();

    const res = await instance.get(
      `entries?challengeId=${id}&pageNumber=${page}`,
    );
    const { data } = res;
    // console.log('from fetch => ', );
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },
  getExploreData: async (page = 1, id) => {
    const instance = await createInstance();

    const res = await instance.get(
      `entries?categoryId=${id}&pageNumber=${page}`,
    );
    const { data } = res;
    // console.log('from fetch => ', );
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },

  getExplore: async () => {
    const instance = await createInstance();

    const res = await instance.get(`category-groups`);

    const { data } = res;
    // console.log(data);
    return {
      pageData: data,
    };
  },

  getLikedPosts: async (userId) => {
    const instance = await createInstance();

    const res = await instance.get(`entry-data?action=like&userId=${userId}`);

    const { data } = res;
    // console.log(user);
    return {
      pageData: data,
    };
  },
  getChallengeRanking: async (page, size, challengeId) => {
    const instance = await createInstance();

    const res = await instance.get(
      `entries?sortBy=totalVotes&sortOrder=1&pageNumber=${page}&pageSize=${size}&challengeId=${challengeId}`,
    );

    const { data } = res;
    return data;
  },
  getUserPosts: async (page = 1, id) => {
    const instance = await createInstance();

    const res = await instance.get(`entries?userId=${id}&pageNumber=${page}`);
    const { data } = res;
    // console.log('from fetch => ', );
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },
  deleteUserPosts: async (id) => {
    // return id;
    const instance = await createInstance();

    const res = await instance.delete(`entries/${id}`);
    const { data } = res;
    return data;
  },
  getUserLikedPosts: async (page = 1, id) => {
    const instance = await createInstance();

    const res = await instance.get(
      `entry-data?pageNumber=${page}&pageSize=10&action=like&userId=${id}`,
    );
    const { data } = res;
    // console.log('from fetch => ', );
    return {
      pageData: data,
      previousID: 1,
      nextID: page + 1,
    };
  },

  cancelRequest: (msg) => source.cancel(msg),
};
