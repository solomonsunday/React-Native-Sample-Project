import React, { useMemo } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@ui-kitten/components';

export default function StoryCard(props) {
  const { data, extraWidth } = props;

  // console.log(data);

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          width: IS_PORTRAIT
            ? width / (4 + extraWidth)
            : width / (6 + extraWidth),
          paddingHorizontal: 10,
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 84,
              width: 84,
              borderRadius: 42,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: data.item.userImageURL }}
              defaultSource={require('assets/images/banner/placeholder-image.png')}
              style={{
                height: 80,
                width: 80,
                borderRadius: 40,
              }}
              resizeMode="cover"
            />
          </LinearGradient>
          <Text category="c2" style={{ marginTop: 10, textAlign: 'center' }}>
            {data.item.userFirstName}
            {data.item.userLastName}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [IS_PORTRAIT, data, extraWidth, width],
  );
}
