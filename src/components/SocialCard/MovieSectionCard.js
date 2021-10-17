import React, { useMemo } from 'react';

import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';

import { Text } from '@ui-kitten/components';

import { LinearGradient } from 'expo-linear-gradient';

import { IconEye } from 'src/components/CustomIcons';

export default function MovieCard(props) {
  const { data, extraWidth, navigation } = props;

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  return (
    <View
      style={{
        width: IS_PORTRAIT
          ? width / (2 + extraWidth)
          : width / (4 + extraWidth),
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      <TouchableOpacity
        onPress={props.pressed}
        activeOpacity={0.75}
        style={{
          width: '100%',
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <Image
          source={{ uri: data.posterURL[0] }}
          defaultSource={require('assets/images/banner/movie_placeholder.png')}
          style={{
            height: 200,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {/* <View
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.25)',
              paddingHorizontal: 6,
              paddingVertical: 3,
              borderRadius: 10,
              flexDirection: 'row',
            }}
          >
            <IconEye
              style={{ height: 20, width: 20, marginRight: 5 }}
              fill="white"
            />
            <Text category="c2" status="control">
              {data.totalViews}
            </Text>
          </View> */}
        {data.posterURL ? (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 48,
              width: 48,
              borderRadius: 24,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: -20,
            }}
          >
            <Image
              source={{ uri: data.posterURL[0] }}
              defaultSource={require('assets/images/banner/placeholder-image.png')}
              style={{
                height: 44,
                width: 44,
                borderRadius: 22,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
        ) : null}
      </TouchableOpacity>
      <View style={{ marginTop: 20 }}>
        <Text
          numberOfLines={1}
          category="p2"
          style={{ textAlign: 'center', lineHeight: 20 }}
        >
          {`${data.title}`}
        </Text>
      </View>
    </View>
  );
}
