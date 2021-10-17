import React from 'react';

import { View, ScrollView } from 'react-native';

import useModifiedAndroidBackAction from 'src/hooks/useModifiedAndroidBackAction';

import { Layout } from '@ui-kitten/components';

import WithDefaultFetch from 'src/components/DataFetch';

import { UsersPosts } from 'src/components/SocialPosts';

import { challengeUrl } from 'src/api/dummy';

const PLACEHOLDER_CONFIG = {
  count: 6,
  numColumns: 2,
  maxHeight: 200,
  mediaLeft: true,
};

// prettier-ignore
const UserPostsArea = () => WithDefaultFetch(UsersPosts, challengeUrl, PLACEHOLDER_CONFIG);

export default function Explore({ navigation }) {
  useModifiedAndroidBackAction(navigation, 'SocialRoute');

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
