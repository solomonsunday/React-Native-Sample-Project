import React, { useState, useEffect } from 'react';

import { View, ScrollView } from 'react-native';

import { Layout } from '@ui-kitten/components';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import WithDefaultFetch from 'src/components/DataFetch';

import { ChallengePosts } from 'src/components/SocialPosts';

import { challengeUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 6,
  numColumns: 2,
  maxHeight: 200,
  mediaLeft: true,
};

// prettier-ignore
const UserPostsArea = () => WithDefaultFetch(ChallengePosts, challengeUrl, PLACEHOLDER_CONFIG);

export default function Versus({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

  // const [data, setData] = useState([]);

  // const getChallenges = async () => {
  //   const res = await Api.getChallenges();
  //   const { data } = res;
  //   console.log(res.pageData.data);
  //   setData(res.pageData.data);
  // };
  // useEffect(() => {
  //   getChallenges();
  // }, data);
  //prettier - ignore;
  // const {
  //   status,
  //   data,
  // } = useInfiniteQuery(['inFiniteChallengeVideos'], async () => {
  //   const promise = await Api.getChallenges();
  //   promise.cancel = () => Api.cancelRequest('Request aborted');
  //   return promise;
  // });

  // console.log('challenge data -> ', data);

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, paddingVertical: 10 }}
        alwaysBounceVertical
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ paddingBottom: 20 }}>
          <View>
            <UserPostsArea />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
