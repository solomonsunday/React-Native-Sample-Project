import React, { useContext, useState, useEffect } from 'react';

import { View, Image } from 'react-native';

// prettier-ignore
import {
  Layout, Text, List, Divider,
} from '@ui-kitten/components';

import Api from 'src/api';

import { LinearGradient } from 'expo-linear-gradient';

import { LocaleContext } from 'src/contexts';

import TopNavigationArea from 'src/components/TopNavigationArea';

import { IconCStarFill } from 'src/components/CustomIcons';

import rank1 from '../../../../assets/images/icon/rank1-filled.png';
import rank2 from '../../../../assets/images/icon/rank2-filled.png';
import rank3 from '../../../../assets/images/icon/rank3-filled.png';

const RANKINGS = [
  {
    id: 1,
    fullName: 'The Boss',
    image: require('assets/images/user/user2.png'),
    votes: 83721,
  },
  {
    id: 2,
    fullName: 'Star Express',
    image: require('assets/images/drawable/icon.png'),
    votes: 24213,
  },
  {
    id: 3,
    fullName: 'Justine Babel',
    image: require('assets/images/user/user3.png'),
    votes: 2282,
  },
  {
    id: 4,
    fullName: 'Klien Alloy',
    image: require('assets/images/drawable/icon.png'),
    votes: 1311,
  },
  {
    id: 5,
    fullName: 'Window Bright',
    image: require('assets/images/drawable/icon.png'),
    votes: 12,
  },
  {
    id: 6,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 7,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 8,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 9,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 10,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 11,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
  {
    id: 12,
    fullName: 'Uchiha Sasuke',
    image: require('assets/images/user/user1.png'),
    votes: 4,
  },
];

export default function LeaderBoard({ route, navigation }) {
  const [ranks, setRanks] = useState([]);
  const t = useContext(LocaleContext);

  const { challengeId } = route.params;

  // console.log(challengeId);

  const getRankings = async () => {
    const res = await Api.getChallengeRanking(1, 30, challengeId);
    const { data } = res;
    setRanks(data);
    // console.log(res);
  };

  useEffect(() => {
    getRankings();
  }, []);

  const topRanks = ranks.slice(0, 3);
  const rankData = [
    { ...topRanks[1], pos: 2 },
    { ...topRanks[0], pos: 1 },
    { ...topRanks[2], pos: 3 },
  ];

  const rankIcons = [rank1, rank2, rank3];

  const getTopRanks = (ranks) => {
    const TOP_RANK = [
      {
        id: 1,
        pos: 2,
        stars: 4,
        rankIcon: require('assets/images/icon/rank2-filled.png'),
        data: ranks[1],
      },
      {
        id: 2,
        pos: 1,
        stars: 5,
        rankIcon: require('assets/images/icon/rank1-filled.png'),
        data: ranks[0],
      },
      {
        id: 3,
        pos: 3,
        stars: 3,
        rankIcon: require('assets/images/icon/rank3-filled.png'),
        data: ranks[2],
      },
    ];
    return TOP_RANK;
  };

  const RankItem = ({ item, position }) => {
    return (
      <View
        style={{
          paddingHorizontal: '1.5%',
          width: '30%',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'relative',
            marginBottom: 10,
          }}
        >
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: position === 1 ? 84 : 64,
              width: position === 1 ? 84 : 64,
              borderRadius: position === 1 ? 42 : 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: item.userImgURL }}
              defaultSource={item.userImageURL}
              style={{
                height: position === 1 ? 80 : 60,
                width: position === 1 ? 80 : 60,
                borderRadius: position === 1 ? 40 : 30,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
          {/* <Text>{item.pos}</Text> */}
          <Image
            source={rankIcons[item.pos - 1]}
            defaultSource={rankIcons[item.pos - 1]}
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              position: 'absolute',
              left: position === 1 ? 33 : 22,
              bottom: -7,
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text
            category="s2"
            status="control"
            style={{ textAlign: 'center' }}
            numberOfLines={1}
          >
            {`${item.userFirstName} ${item.userLastName}`}
          </Text>
          <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            {/* {stars.map(() => (
              <IconCStarFill style={{ height: 10, width: 10 }} />
            ))} */}
          </View>
          {position === 1 ? (
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingHorizontal: 15,
                paddingVertical: 20,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text status="danger" category="h5" style={{ marginBottom: 5 }}>
                {item.totalVotes}
              </Text>
              <Text status="danger" category="s2">
                {t('votes')}
              </Text>
            </View>
          ) : (
            <View
              style={{
                backgroundColor: 'rgba(255, 87, 87, 0.5)',
                padding: 15,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                alignItems: 'center',
              }}
            >
              <Text category="h6" style={{ marginBottom: 5, color: '#C4C4C4' }}>
                {item.totalVotes}
              </Text>
              <Text category="c2" style={{ color: '#C4C4C4' }}>
                {t('votes')}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderHeaderArea = () => (
    <View
      level="5"
      style={{ flex: 1, backgroundColor: 'black', position: 'relative' }}
    >
      <Image
        source={require('assets/images/drawable/logo-dark.png')}
        defaultSource={require('assets/images/drawable/logo-dark.png')}
        resizeMode="contain"
        style={{
          position: 'absolute',
          width: '90%',
          alignSelf: 'center',
          tintColor: '#222',
        }}
      />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingTop: 15,
        }}
      >
        {rankData.map((data, index) => {
          return <RankItem item={data} position={index} key={index} />;
        })}
      </View>
    </View>
  );

  const renderOtherRanks = (data) => (
    <>
      <Layout
        level="6"
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderTopLeftRadius: data.index === 0 ? 10 : 0,
          borderTopRightRadius: data.index === 0 ? 10 : 0,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Text category="label" style={{ marginRight: 10 }}>
            {data.index + 4}
          </Text>
          <LinearGradient
            colors={['#043F7C', '#FF5757']}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={data.item.userImageURL}
              defaultSource={data.item.userImageURL}
              style={{
                height: 36,
                width: 36,
                borderRadius: 18,
                borderColor: 'white',
              }}
              resizeMode="cover"
            />
          </LinearGradient>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingRight: 5,
              paddingLeft: 5,
              maxWidth: 230,
              marginLeft: 5,
            }}
          >
            <Text category="s2" style={{ marginRight: 5 }}>
              {`${data.item.userFirstName} ${data.item.userLastName}`}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text category="c2" style={{ marginRight: 5 }}>
            {data.item.totalVotes}
          </Text>
          <Text category="c1" style={{ fontSize: 10 }}>
            {t('votes')}
          </Text>
        </View>
      </Layout>
      <Divider style={{ paddingVertical: 1 }} />
    </>
  );

  return (
    <Layout level="6" style={{ flex: 1 }}>
      <TopNavigationArea
        // title={ranks[0].hashtagName}
        navigation={navigation}
        screen="default"
        search
      />

      <View style={{ flex: 1 }}>
        <List
          style={{ backgroundColor: 'black' }}
          ListHeaderComponent={renderHeaderArea}
          data={ranks.slice(3)}
          alwaysBounceHorizontal
          alwaysBounceVertical
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={renderOtherRanks}
          keyExtractor={(_, i) => i.toString()}
        />
      </View>
    </Layout>
  );
}
