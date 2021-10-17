import axios from 'axios';

import firebase from '@react-native-firebase/app';

import firestore from '@react-native-firebase/firestore';

import { getToken } from '../../api/index';

export const baseUrl = 'https://apis.woozeee.com/api/v1/';

const axiosReq = async (methodType, reqData) => {
  const config = {
    method: { methodType },
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
    body: JSON.stringify(reqData),
  };
  let action = methodType.toLowerCase();
  const res = await axios[action](baseUrl + 'entry-data', reqData, config);
  // console.log(res.data);
  // return res;
};

export const sendReport = async (userReason, userId) => {
  const data = {
    reason:
      userReason.reason === 'Others' ? userReason.others : userReason.reason,
    section: 'socials',
    entryId: userId,
    resolved: false,
  };
  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
    url: `${baseUrl}complaints`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleVote = async (voteData) => {
  // const currentVoteEntryId = voteData.entryId; --to store the entryId of the previously voted challenge
  const body = {
    entryId: voteData.entryId,
    isVote: true,
  };

  const token = await getToken();

  const config = {
    method: voteData.isVote ? 'delete' : 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
    url: `${baseUrl}entry-data`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleLike = async (likeData) => {
  console.log('likeData', likeData);
  const body = {
    entryId: likeData.entryId,
    isLike: true,
  };
  const token = await getToken();

  const config = {
    method: likeData.isLike ? 'delete' : 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: body,
    url: `${baseUrl}entry-data`,
  };

  let res;

  try {
    res = await axios(config);
    // console.log('res', res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleFollow = async (userId, following) => {
  // console.log(userId, following);
  const data = {
    userId,
    isFollow: true,
  };

  const token = await getToken();

  const config = {
    method: following ? 'post' : 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data,
    url: `${baseUrl}user-data`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (id) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
  };
  const res = await axios.get(baseUrl + `user/user?userId=${id}`, config);
  return res;
};

export const getUserEntries = async (id) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
  };
  const res = await axios.get(baseUrl + `entries?userId=${id}`, config);
  return res;
};

export const getFollowData = async (userId, action) => {
  const config = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${await getToken()}`,
    },
  };
  const res = await axios.get(
    baseUrl + `user-data?userId=${userId}&action=${action}`,
    config,
  );

  const { data } = res;
  return data;
};

export const sendComment = async (comment) => {
  const res = await firestore().collection('entryComments').get();
  // console.log(res);
};

export const viewVideo = async (id) => {
  const data = {
    entryId: id,
    isView: true,
  };

  // console.log(data);
  const token = await getToken();

  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
    url: `${baseUrl}entry-data`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleBookmark = async (id, isBookmarked) => {
  const data = {
    entryId: id,
    isBookmark: true,
  };

  const token = await getToken();

  const config = {
    method: !isBookmarked ? 'delete' : 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token,
    },
    data: data,
    url: `${baseUrl}entry-data`,
  };

  let res;

  try {
    res = await axios(config);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
