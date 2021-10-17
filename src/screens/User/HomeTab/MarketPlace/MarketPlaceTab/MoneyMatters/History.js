import React, { useState, useEffect, useMemo } from 'react';

import {
  Layout,
  Text,
  Datepicker,
  Button,
  Divider,
} from '@ui-kitten/components';

import Carousel from 'react-native-snap-carousel';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

import { v4 as uuidv4 } from 'uuid';

import TopNavigationArea from 'src/components/TopNavigationArea/index';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { Image, StyleSheet, TextInput, View } from 'react-native';

import { TextIcon } from 'src/components/IconPacks/TextIcon';

import { Video } from 'expo-av';

import lapo from '../../../../../../assets/images/moneyMatters/lapo.png';

import { GeneralSelect } from 'src/components/FormFields/index';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const History = ({ route, navigation }) => {
  let categories = [
    { id: 1, title: 'All' },
    { id: 2, title: 'Loan' },
    { id: 3, title: 'Savings' },
    { id: 4, title: 'Insurance' },
    { id: 5, title: 'Mutual Funds' },
  ];

  const [currentCategory, setCurrentCategory] = useState('All');

  const ActiveTab = ({ title }) => {
    return (
      <View
        style={{
          display: 'flex',
          paddingHorizontal: 10,
          marginRight: 8,
          marginBottom: 15,
          backgroundColor: currentCategory === title ? '#043F7C' : '#E8EAF6',
          borderColor: '#043F7C',
          borderWidth: 1,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 5,
        }}
      >
        {currentCategory === title ? (
          <Text category="h6" style={{ color: 'white' }}>
            {title}
          </Text>
        ) : (
          <Text style={{ color: '#043F7C' }}>{title}</Text>
        )}
      </View>
    );
  };

  const Options = ({ title }) => {
    return (
      <View
        style={{
          display: 'flex',
          borderRadius: 5,
          justifyContent: 'center',
          backgroundColor: 'white',
          //   height: 120,
          padding: 15,
          marginVertical: 10,
          elevation: 5,
          shadowColor: '#dcdcdc',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 1,
          shadowRadius: 1,
        }}
      >
        <Text category="c2" status="primary" style={{ marginBottom: 10 }}>
          {title.toUpperCase()}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Image source={lapo} resizeMode="contain" />
          <Text
            category="h5"
            style={{
              color: 'rgba(0,0,0,.6)',
            }}
          >
            {`₦50,000.00`}
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
        >
          <MaterialCommunityIcons
            name="clock-time-nine-outline"
            size={13}
            color="rgba(0,0,0,.4)"
            style={{ marginHorizontal: 5 }}
          />
          <Text category="c1" status="primary">
            Fri, 25 Feb 2021 - Sat, 26 Feb 2024
          </Text>
        </View>
      </View>
    );
  };

  const handleSelect = (item) => {
    setCurrentCategory(item.title);
  };

  return useMemo(
    () => (
      <Layout level="6" style={{ flex: 1 }}>
        <View
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelect(item)}>
                <ActiveTab title={item.title} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Options title={currentCategory} />
        </View>
      </Layout>
    ),
    [route, navigation, currentCategory],
  );
};
const styles = StyleSheet.create({
  slide: {
    height: 200,
    borderRadius: 15,
  },
  slider: {
    width: 350,
    height: 200,
  },
  container: {
    // paddingLeft: 20,
  },
});

export default History;
