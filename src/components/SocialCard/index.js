import React, { useMemo, useCallback } from 'react';

import {
  View,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';

import Video from 'react-native-video';

import Moment from 'react-moment';

import { useNavigation } from '@react-navigation/native';

import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@ui-kitten/components';
import { useState } from 'react';

export default function VideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(
    () => navigation.navigate('ExploreWooz', data.item),
    [navigation],
  );

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeChallengeWooz}
      >
        <Image
          source={{ uri: data.item.medialThumbnail }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 175,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {data.item ? (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 10,
              top: 5,
            }}
          >
            <Image
              source={{ uri: data.item.medialThumbnail }}
              defaultSource={require('assets/images/banner/placeholder-image.png')}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
        ) : null}
        {data.item ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              padding: 5,
              width: '100%',
            }}
          >
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
              {data.item.userDisplayName}
            </Text>
            <View>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, color: 'white' }}
                  />
                )}
              >
                {data.item.createdAt}
              </Moment>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function UserProfilePostCard(props) {
  const { data, extraWidth, numColumns, allPosts } = props;
  // console.log('from allPosts user UserProfilePostCard-> ', data);

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = () => {
    navigation.navigate('DeepLinkPost', { _id: data.item._id }), [navigation];
  };

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeChallengeWooz}
      >
        {data.item.type === 'video' ? (
          <Video
            source={{ uri: data.item.mediaURL }}
            paused={true}
            style={{
              height: 175,
              width: '100%',
              borderRadius: 5,
            }}
            resizeMode="cover"
          />
        ) : (
          <Image
            source={{ uri: data.item.mediaURL }}
            defaultSource={require('assets/images/banner/placeholder-image.png')}
            style={{
              height: 175,
              width: '100%',
              borderRadius: 5,
            }}
            resizeMode="cover"
          />
        )}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function UserPostLikedCard(props) {
  const { data, extraWidth, numColumns, allLikedPosts } = props;

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeLikedDataWooz = () => {
    // console.log(data);
    navigation.navigate('DeepLinkPost', { _id: data.item.entryId }),
      [navigation];
  };
  // const routeLikedDataWooz = () => {
  //   console.log(data);

  // };

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        onPress={routeLikedDataWooz}
      >
        <Video
          poster={data.item.entryMediaURL}
          source={{ uri: data.item.entryMediaURL }}
          paused={true}
          style={{
            height: 175,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeLikedDataWooz],
  );
}

export function ChallengeVideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const challenge = data.item;

  // console.log('Challenge data from challenge video card => ', challenge);
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(() => {
    // const res = await getWoozData(challenge._id);
    navigation.navigate('ChallengeWooz', challenge), [navigation];
  });

  // const routeChallengePage = () => navigation.navigate('ChallengePage');

  // console.log('challenge -> ', challenge);
  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        // onPress={routeChallengePage}
      >
        <Image
          source={{ uri: challenge.imageURL }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 175,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {challenge ? (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 10,
              top: 5,
            }}
          >
            <Image
              source={{ uri: challenge.sponsorImageURL }}
              defaultSource={require('../../assets/images/banner/placeholder-image.png')}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
        ) : null}
        {challenge ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              padding: 5,
              width: '100%',
            }}
          >
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
              {challenge.hashtagName}
            </Text>
            <View>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, color: 'white' }}
                  />
                )}
              >
                {challenge.createdAt}
              </Moment>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function ChallengesVideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  const challenges = data.item;

  console.log('Challenge data from challenge video card => ', challenges);
  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(() => {
    // const res = await getWoozData(challenge._id);
    navigation.navigate('ChallengeWooz', challenges), [navigation];
  });

  // console.log('challenge -> ', challenge);
  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        // onPress={routeChallengeWooz}
      >
        <Image
          source={{ uri: challenges.imageURL }}
          defaultSource={require('assets/images/banner/placeholder-image.png')}
          style={{
            height: 175,
            width: '100%',
            borderRadius: 5,
          }}
          resizeMode="cover"
        />
        {challenges ? (
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              left: 10,
              top: 5,
            }}
          >
            <Image
              source={{ uri: challenges.sponsorImageURL }}
              defaultSource={require('../../assets/images/banner/placeholder-image.png')}
              style={{
                height: 32,
                width: 32,
                borderRadius: 16,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
        ) : null}
        {challenges ? (
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              position: 'absolute',
              bottom: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              padding: 5,
              width: '100%',
            }}
          >
            <Text
              category="c2"
              style={{ color: 'white', marginBottom: 5 }}
              numberOfLines={1}
            >
              {challenges.hashtagName}
            </Text>
            <View>
              <Moment
                fromNow
                element={(momentProps) => (
                  <Text
                    category="c1"
                    {...momentProps}
                    style={{ fontSize: 10, color: 'white' }}
                  />
                )}
              >
                {challenges.createdAt}
              </Moment>
            </View>
          </View>
        ) : null}
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}

export function ExploreVideoCard(props) {
  // prettier-ignore
  const {
    data, extraWidth, numColumns,
  } = props;

  // const { item } = data;

  // console.log('from explore card -> ', data);

  const navigation = useNavigation();

  const { width, height } = useWindowDimensions();

  const IS_PORTRAIT = height > width;

  const COLUMN_COUNT = numColumns ?? (IS_PORTRAIT ? 3 : 5);

  const routeChallengeWooz = useCallback(() => {
    navigation.navigate('ChallengeWooz', challenge), [navigation];
  });

  return useMemo(
    () => (
      <TouchableOpacity
        activeOpacity={0.75}
        style={{
          height: 180,
          width: IS_PORTRAIT
            ? width / (COLUMN_COUNT + extraWidth)
            : width / (COLUMN_COUNT + extraWidth),
          paddingHorizontal: 3,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
        // onPress={routeChallengeWooz}
      >
        <LinearGradient
          colors={['#043F7C', '#FF5757']}
          style={{
            height: 36,
            width: 36,
            borderRadius: 18,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 10,
            top: 5,
          }}
        >
          <Image
            source={require('../../assets/images/banner/placeholder-image.png')}
            defaultSource={require('../../assets/images/banner/placeholder-image.png')}
            style={{
              height: 32,
              width: 32,
              borderRadius: 16,
              borderColor: 'white',
            }}
            resizeMode="cover"
          />
        </LinearGradient>

        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            position: 'absolute',
            bottom: 5,
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            padding: 5,
            width: '100%',
          }}
        >
          <Text
            category="c2"
            style={{ color: 'white', marginBottom: 5 }}
            numberOfLines={1}
          >
            {data.categoryName}
          </Text>
          <View>
            <Moment
              fromNow
              element={(momentProps) => (
                <Text
                  category="c1"
                  {...momentProps}
                  style={{ fontSize: 10, color: 'white' }}
                />
              )}
            >
              {/* {challenge.createdAt} */}
            </Moment>
          </View>
        </View>
      </TouchableOpacity>
    ),
    [COLUMN_COUNT, IS_PORTRAIT, extraWidth, width, data, routeChallengeWooz],
  );
}
